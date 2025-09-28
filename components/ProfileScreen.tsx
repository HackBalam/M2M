// User profile screen showing user information and account management
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { getUserSession, logoutUserWithDisconnect, useWalletConnection } from '../services/walletService';
import { getUserById, UserData } from '../services/userService';
import { profileStyles } from '../styles/profileStyles';

/**
 * User profile screen component that displays user information
 * Shows UUID, wallet address, username, and account management options
 * @returns JSX.Element - Profile screen with user information
 */
export default function ProfileScreen() {
  // Router for navigation
  const router = useRouter();

  // Wallet connection hook for disconnect functionality
  const { disconnectWallet } = useWalletConnection();

  // Component state
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  /**
   * Load user data on component mount
   */
  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  /**
   * Handle user logout
   */
  const handleLogout = useCallback(async () => {
    // Show confirmation alert
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsLoggingOut(true);
              await logoutUserWithDisconnect(disconnectWallet);
              router.replace('/');
            } catch (error) {
              console.error('Error during logout:', error);
              Alert.alert(
                'Error',
                'Ocurrió un error al cerrar sesión. Por favor intenta nuevamente.',
                [{ text: 'OK' }]
              );
            } finally {
              setIsLoggingOut(false);
            }
          }
        }
      ]
    );
  }, [router, disconnectWallet]);

  /**
   * Load user data from session and Firebase
   */
  const loadUserData = useCallback(async () => {
    try {
      setIsLoading(true);

      // Get user session from local storage
      const session = await getUserSession();

      // If no session exists, redirect to login
      if (!session || !session.isLoggedIn) {
        router.replace('/');
        return;
      }

      // Get complete user data from Firebase
      const userData = await getUserById(session.userId);

      // If user data not found in Firebase, redirect to login
      if (!userData) {
        Alert.alert(
          'Error',
          'No se pudo cargar la información del usuario. Por favor inicia sesión nuevamente.',
          [
            {
              text: 'OK',
              onPress: async () => {
                try {
                  await logoutUserWithDisconnect(disconnectWallet);
                  router.replace('/');
                } catch (error) {
                  console.error('Error during logout:', error);
                  router.replace('/');
                }
              }
            }
          ]
        );
        return;
      }

      // Set user data
      setUser(userData);

    } catch (error) {
      console.error('Error loading user data:', error);

      // Show error alert
      Alert.alert(
        'Error',
        'Ocurrió un error al cargar tu información. Por favor intenta nuevamente.',
        [
          {
            text: 'Reintentar',
            onPress: loadUserData
          },
          {
            text: 'Cerrar sesión',
            onPress: handleLogout
          }
        ]
      );
    } finally {
      setIsLoading(false);
    }
  }, [router, handleLogout]);


  /**
   * Copy text to clipboard (functionality placeholder)
   * @param text - Text to copy
   * @param label - Label for success message
   */
  const copyToClipboard = (text: string, label: string) => {
    // TODO: Implement clipboard functionality if needed
    Alert.alert('Copiado', `${label} copiado al portapapeles`, [{ text: 'OK' }]);
  };

  /**
   * Format date for display
   * @param date - Date to format
   * @returns Formatted date string
   */
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Show loading screen while loading user data
  if (isLoading) {
    return (
      <SafeAreaView style={profileStyles.container}>
        <View style={profileStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={profileStyles.loadingText}>Cargando perfil...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Show error if user data not available
  if (!user) {
    return (
      <SafeAreaView style={profileStyles.container}>
        <View style={profileStyles.errorContainer}>
          <Text style={profileStyles.errorText}>Error al cargar el perfil</Text>
          <TouchableOpacity style={profileStyles.retryButton} onPress={loadUserData}>
            <Text style={profileStyles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={profileStyles.container}>
      <ScrollView style={profileStyles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header section */}
        <View style={profileStyles.headerContainer}>
          <Text style={profileStyles.title}>Mi Perfil</Text>
          <Text style={profileStyles.subtitle}>Información de tu cuenta M2M</Text>
        </View>

        {/* User information section */}
        <View style={profileStyles.infoContainer}>
          {/* Username card */}
          <View style={profileStyles.infoCard}>
            <Text style={profileStyles.cardTitle}>Nombre de usuario</Text>
            <View style={profileStyles.cardContent}>
              <Text style={profileStyles.cardValue}>@{user.username}</Text>
            </View>
          </View>

          {/* User ID card */}
          <View style={profileStyles.infoCard}>
            <Text style={profileStyles.cardTitle}>ID de usuario</Text>
            <View style={profileStyles.cardContent}>
              <Text style={profileStyles.cardValueSmall}>{user.id}</Text>
              <TouchableOpacity
                onPress={() => copyToClipboard(user.id, 'ID de usuario')}
                style={profileStyles.copyButton}
              >
                <Text style={profileStyles.copyButtonText}>Copiar</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Wallet address card */}
          <View style={profileStyles.infoCard}>
            <Text style={profileStyles.cardTitle}>Dirección de wallet</Text>
            <View style={profileStyles.cardContent}>
              <Text style={profileStyles.cardValueSmall}>{user.walletAddress}</Text>
              <TouchableOpacity
                onPress={() => copyToClipboard(user.walletAddress, 'Dirección de wallet')}
                style={profileStyles.copyButton}
              >
                <Text style={profileStyles.copyButtonText}>Copiar</Text>
              </TouchableOpacity>
            </View>
            {/* Shortened address for quick reference */}
            <Text style={profileStyles.cardSubtitle}>
              {`${user.walletAddress.substring(0, 6)}...${user.walletAddress.substring(user.walletAddress.length - 4)}`}
            </Text>
          </View>

          {/* Account creation date card */}
          <View style={profileStyles.infoCard}>
            <Text style={profileStyles.cardTitle}>Cuenta creada</Text>
            <Text style={profileStyles.cardValue}>{formatDate(user.createdAt)}</Text>
          </View>
        </View>

        {/* Future features section */}
        <View style={profileStyles.featuresContainer}>
          <Text style={profileStyles.featuresTitle}>Próximamente</Text>
          <Text style={profileStyles.featuresDescription}>
            • Sistema de chat entre usuarios
          </Text>
          <Text style={profileStyles.featuresDescription}>
            • Personalización de perfil
          </Text>
          <Text style={profileStyles.featuresDescription}>
            • Configuración de privacidad
          </Text>
        </View>
      </ScrollView>

      {/* Action buttons section */}
      <View style={profileStyles.actionContainer}>
        {/* Refresh button */}
        <TouchableOpacity
          style={profileStyles.refreshButton}
          onPress={loadUserData}
          disabled={isLoading}
        >
          <Text style={profileStyles.refreshButtonText}>Actualizar</Text>
        </TouchableOpacity>

        {/* Logout button */}
        <TouchableOpacity
          style={[
            profileStyles.logoutButton,
            isLoggingOut && profileStyles.logoutButtonDisabled
          ]}
          onPress={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={profileStyles.logoutButtonText}>Cerrar sesión</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}