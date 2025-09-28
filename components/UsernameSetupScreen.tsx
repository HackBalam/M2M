// Username setup screen for new users
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useWalletConnection, saveUserSession } from '../services/walletService';
import { createUser, isUsernameTaken } from '../services/userService';
import { usernameSetupStyles } from '../styles/usernameSetupStyles';

/**
 * Username setup screen component for new users
 * Allows users to choose a username after wallet connection
 * @returns JSX.Element - Username setup screen with form
 */
export default function UsernameSetupScreen() {
  // Router for navigation
  const router = useRouter();

  // Wallet connection state
  const { address, isConnected } = useWalletConnection();

  // Form state
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  /**
   * Redirect to login if wallet is not connected
   */
  useEffect(() => {
    // If wallet is not connected, redirect to login screen
    if (!isConnected || !address) {
      router.replace('/');
      return;
    }
  }, [isConnected, address, router]);

  /**
   * Validate username input
   * @param text - Username to validate
   * @returns boolean - true if valid, false if invalid
   */
  const validateUsername = (text: string): boolean => {
    // Reset previous error
    setUsernameError('');

    // Check if username is empty
    if (!text.trim()) {
      setUsernameError('El nombre de usuario es obligatorio');
      return false;
    }

    // Check minimum length
    if (text.length < 3) {
      setUsernameError('El nombre de usuario debe tener al menos 3 caracteres');
      return false;
    }

    // Check maximum length
    if (text.length > 20) {
      setUsernameError('El nombre de usuario no puede tener más de 20 caracteres');
      return false;
    }

    // Check if contains only alphanumeric characters and underscores
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(text)) {
      setUsernameError('El nombre de usuario solo puede contener letras, números y guiones bajos');
      return false;
    }

    // Check if starts with a letter
    if (!/^[a-zA-Z]/.test(text)) {
      setUsernameError('El nombre de usuario debe comenzar con una letra');
      return false;
    }

    return true;
  };

  /**
   * Handle username input change with validation
   * @param text - New username value
   */
  const handleUsernameChange = (text: string) => {
    // Remove spaces and convert to lowercase
    const cleanedText = text.toLowerCase().replace(/\s/g, '');
    setUsername(cleanedText);

    // Validate username format
    if (cleanedText) {
      validateUsername(cleanedText);
    } else {
      setUsernameError('');
    }
  };

  /**
   * Check if username is available when user stops typing
   */
  const checkUsernameAvailability = async () => {
    if (!username || usernameError) return;

    setIsCheckingUsername(true);

    try {
      // Check if username is already taken
      const isTaken = await isUsernameTaken(username);

      if (isTaken) {
        setUsernameError('Este nombre de usuario ya está en uso');
      }
    } catch (error) {
      console.error('Error checking username availability:', error);
      setUsernameError('Error al verificar disponibilidad del nombre de usuario');
    } finally {
      setIsCheckingUsername(false);
    }
  };

  /**
   * Handle username blur event (when user finishes typing)
   */
  const handleUsernameBlur = () => {
    if (username && !usernameError) {
      checkUsernameAvailability();
    }
  };

  /**
   * Handle form submission to create new user account
   */
  const handleCreateAccount = async () => {
    // Validate wallet connection
    if (!address) {
      Alert.alert('Error', 'Wallet no conectada. Por favor conecta tu wallet primero.');
      router.replace('/');
      return;
    }

    // Validate username
    if (!validateUsername(username)) {
      return;
    }

    // Check if username is available before creating account
    setIsLoading(true);

    try {
      // Double-check username availability
      const isTaken = await isUsernameTaken(username);
      if (isTaken) {
        setUsernameError('Este nombre de usuario ya está en uso');
        setIsLoading(false);
        return;
      }

      // Create new user account
      const newUser = await createUser({
        walletAddress: address,
        username: username
      });

      // Save user session
      await saveUserSession({
        userId: newUser.id,
        walletAddress: newUser.walletAddress,
        isLoggedIn: true
      });

      // Show success message
      Alert.alert(
        'Cuenta creada',
        `¡Bienvenido, ${newUser.username}! Tu cuenta ha sido creada exitosamente.`,
        [
          {
            text: 'Continuar',
            onPress: () => router.replace('/profile')
          }
        ]
      );

    } catch (error) {
      console.error('Error creating user account:', error);

      // Show error alert
      Alert.alert(
        'Error al crear cuenta',
        'Ocurrió un error al crear tu cuenta. Por favor intenta nuevamente.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading if wallet state is being determined
  if (!isConnected || !address) {
    return (
      <SafeAreaView style={usernameSetupStyles.container}>
        <View style={usernameSetupStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={usernameSetupStyles.loadingText}>Verificando conexión...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={usernameSetupStyles.container}>
      <KeyboardAvoidingView
        style={usernameSetupStyles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header section */}
          <View style={usernameSetupStyles.headerContainer}>
            <Text style={usernameSetupStyles.title}>¡Bienvenido!</Text>
            <Text style={usernameSetupStyles.subtitle}>
              Para completar tu registro, elige un nombre de usuario único
            </Text>

            {/* Connected wallet info */}
            <View style={usernameSetupStyles.walletInfo}>
              <Text style={usernameSetupStyles.walletLabel}>Wallet conectada:</Text>
              <Text style={usernameSetupStyles.walletAddress}>
                {`${address.substring(0, 6)}...${address.substring(address.length - 4)}`}
              </Text>
            </View>
          </View>

          {/* Form section */}
          <View style={usernameSetupStyles.formContainer}>
            {/* Username input */}
            <View style={usernameSetupStyles.inputContainer}>
              <Text style={usernameSetupStyles.inputLabel}>Nombre de usuario</Text>

              <View style={usernameSetupStyles.inputWrapper}>
                <TextInput
                  style={[
                    usernameSetupStyles.textInput,
                    usernameError ? usernameSetupStyles.inputError : null
                  ]}
                  value={username}
                  onChangeText={handleUsernameChange}
                  onBlur={handleUsernameBlur}
                  placeholder="Ej: usuario123"
                  placeholderTextColor="#999999"
                  autoCapitalize="none"
                  autoCorrect={false}
                  maxLength={20}
                  editable={!isLoading}
                />

                {/* Loading indicator while checking username */}
                {isCheckingUsername && (
                  <ActivityIndicator
                    size="small"
                    color="#007AFF"
                    style={usernameSetupStyles.inputSpinner}
                  />
                )}
              </View>

              {/* Error message with consistent height */}
              <View style={{minHeight: 24}}>
                {usernameError ? (
                  <Text style={usernameSetupStyles.errorText}>{usernameError}</Text>
                ) : null}
              </View>

              {/* Character count */}
              <Text style={usernameSetupStyles.characterCount}>
                {username.length}/20 caracteres
              </Text>
            </View>

            {/* Username requirements */}
            <View style={usernameSetupStyles.requirementsContainer}>
              <Text style={usernameSetupStyles.requirementsTitle}>Requisitos:</Text>
              <Text style={usernameSetupStyles.requirement}>• Mínimo 3 caracteres</Text>
              <Text style={usernameSetupStyles.requirement}>• Solo letras, números y guiones bajos</Text>
              <Text style={usernameSetupStyles.requirement}>• Debe comenzar con una letra</Text>
            </View>
          </View>
        </ScrollView>

        {/* Action buttons - Fixed at bottom */}
        <View style={usernameSetupStyles.buttonContainer}>
          {/* Create account button */}
          <TouchableOpacity
            style={[
              usernameSetupStyles.createButton,
              (!username || usernameError || isLoading || isCheckingUsername) && usernameSetupStyles.createButtonDisabled
            ]}
            onPress={handleCreateAccount}
            disabled={!username || !!usernameError || isLoading || isCheckingUsername}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={usernameSetupStyles.createButtonText}>Crear Cuenta</Text>
            )}
          </TouchableOpacity>

          {/* Back to login button */}
          <TouchableOpacity
            style={usernameSetupStyles.backButton}
            onPress={() => router.replace('/')}
            disabled={isLoading}
          >
            <Text style={usernameSetupStyles.backButtonText}>Volver al inicio</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}