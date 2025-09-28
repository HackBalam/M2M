// Login screen component with wallet connection and user authentication
import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppKit, AppKitButton } from '@reown/appkit-ethers-react-native';
import { FlexView } from '@reown/appkit-ui-react-native';
import { useRouter } from 'expo-router';
import { useWalletConnection, saveUserSession, getUserSession } from '../services/walletService';
import { checkUserExists } from '../services/userService';
import { loginStyles } from '../styles/loginStyles';

/**
 * Login screen component that handles wallet connection and user authentication
 * @returns JSX.Element - Login screen with wallet connection functionality
 */
export default function LoginScreen() {
  // Router for navigation between screens
  const router = useRouter();

  // Wallet connection hook for managing wallet state
  const { address, isConnected, isConnecting } = useWalletConnection();

  // Local state for managing login process
  const [isLoading, setIsLoading] = useState(false);
  const [hasCheckedSession, setHasCheckedSession] = useState(false);
  const [hasProcessedAuth, setHasProcessedAuth] = useState(false);

  /**
   * Check for existing user session on component mount
   * If user has active session, navigate to profile screen
   */
  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        // Check if user has active session
        const session = await getUserSession();

        // If session exists and user is logged in, navigate to profile
        if (session && session.isLoggedIn) {
          router.replace('/profile');
          return;
        }

        // Mark session check as complete
        setHasCheckedSession(true);
      } catch (error) {
        console.error('Error checking existing session:', error);
        setHasCheckedSession(true);
      }
    };

    checkExistingSession();
  }, [router]);

  /**
   * Handle wallet connection state changes
   * When wallet is connected, check if user exists in database
   */
  useEffect(() => {
    /**
     * Handle user authentication process after wallet connection
     * Check if user exists, if not redirect to username setup
     * If user exists, save session and navigate to profile
     */
    const handleUserAuthentication = async () => {
      if (!address || !hasCheckedSession || !isConnected || isLoading || hasProcessedAuth) {
        return;
      }

      setIsLoading(true);
      setHasProcessedAuth(true);

      try {
        // Add timeout to prevent hanging
        const authTimeout = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Authentication timeout')), 10000)
        );

        // Check if user exists in Firebase database with timeout
        const existingUser = await Promise.race([
          checkUserExists(address),
          authTimeout
        ]);

        if (existingUser) {
          // User exists - save session and navigate to profile
          await saveUserSession({
            userId: existingUser.id,
            walletAddress: existingUser.walletAddress,
            isLoggedIn: true
          });

          // Navigate to profile screen with user data
          router.replace('/profile');
        } else {
          // User doesn't exist - navigate to username setup
          router.push('/username-setup');
        }
      } catch (error) {
        console.error('Error during authentication:', error);

        // Reset auth state to allow retry
        setHasProcessedAuth(false);

        // Show error alert to user
        Alert.alert(
          'Error de autenticación',
          'Ocurrió un error al verificar tu cuenta. Por favor intenta nuevamente.',
          [{ text: 'OK' }]
        );
      } finally {
        setIsLoading(false);
      }
    };

    // Reset auth state when wallet disconnects
    if (!isConnected && hasProcessedAuth) {
      setHasProcessedAuth(false);
      setIsLoading(false);
    }

    // Handle user authentication after wallet connection
    handleUserAuthentication();
  }, [isConnected, address, hasCheckedSession, hasProcessedAuth, router]);

  // Show loading spinner while checking session
  if (!hasCheckedSession) {
    return (
      <SafeAreaView style={loginStyles.container}>
        <View style={loginStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={loginStyles.loadingText}>Verificando sesión...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={loginStyles.container}>
      {/* App title */}
      <View style={loginStyles.headerContainer}>
        <Text style={loginStyles.title}>M2M</Text>
        <Text style={loginStyles.subtitle}>
          Conecta tu wallet para acceder a la aplicación
        </Text>
      </View>

      {/* Wallet connection section */}
      <View style={loginStyles.walletContainer}>
        {/* Show loading state while processing authentication */}
        {isLoading && (
          <View style={loginStyles.processingContainer}>
            <ActivityIndicator size="small" color="#007AFF" />
            <Text style={loginStyles.processingText}>
              Procesando autenticación...
            </Text>
          </View>
        )}

        {/* Wallet connection button */}
        <FlexView style={loginStyles.buttonContainer}>
          <AppKitButton
            balance="show"
            disabled={isLoading || isConnecting}
          />
        </FlexView>

        {/* Connection status indicator */}
        {isConnecting && (
          <View style={loginStyles.statusContainer}>
            <ActivityIndicator size="small" color="#007AFF" />
            <Text style={loginStyles.statusText}>Conectando wallet...</Text>
          </View>
        )}

        {/* Connected wallet info */}
        {isConnected && address && !isLoading && (
          <View style={loginStyles.statusContainer}>
            <Text style={loginStyles.statusText}>
              ✅ Wallet conectada: {`${address.substring(0, 6)}...${address.substring(address.length - 4)}`}
            </Text>
          </View>
        )}
      </View>

      {/* Help text */}
      <View style={loginStyles.helpContainer}>
        <Text style={loginStyles.helpText}>
          Si es tu primera vez, se creará una cuenta automáticamente
        </Text>
        <Text style={loginStyles.helpText}>
          Si ya tienes cuenta, iniciarás sesión automáticamente
        </Text>
      </View>

      {/* AppKit modal component */}
      <AppKit />
    </SafeAreaView>
  );
}