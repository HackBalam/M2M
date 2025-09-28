// Styles for username setup screen component
import { StyleSheet } from 'react-native';

export const usernameSetupStyles = StyleSheet.create({
  // Main container for the screen
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // Container for keyboard avoiding view
  keyboardContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },

  // Header section with title and instructions
  headerContainer: {
    marginTop: 40,
    marginBottom: 30,
  },

  // Main title
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 16,
  },

  // Subtitle with instructions
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },

  // Container for connected wallet information
  walletInfo: {
    backgroundColor: '#F0F8FF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
    alignItems: 'center',
  },

  // Label for wallet info
  walletLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },

  // Wallet address text
  walletAddress: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    fontFamily: 'monospace',
  },

  // Form container
  formContainer: {
    paddingTop: 20,
    paddingBottom: 10,
  },

  // Username input container
  inputContainer: {
    marginBottom: 24,
  },

  // Input label
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },

  // Wrapper for input and spinner
  inputWrapper: {
    position: 'relative',
  },

  // Text input field
  textInput: {
    borderWidth: 2,
    borderColor: '#E1E5E9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#333333',
  },

  // Input field error state
  inputError: {
    borderColor: '#FF3B30',
    backgroundColor: '#FFF5F5',
  },

  // Spinner inside input
  inputSpinner: {
    position: 'absolute',
    right: 16,
    top: 16,
  },

  // Error message text
  errorText: {
    fontSize: 14,
    color: '#FF3B30',
    marginTop: 6,
    marginLeft: 4,
    minHeight: 20,
  },

  // Character count text
  characterCount: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'right',
    marginTop: 4,
  },

  // Requirements container
  requirementsContainer: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },

  // Requirements title
  requirementsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },

  // Individual requirement text
  requirement: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 18,
    marginVertical: 2,
  },

  // Button container
  buttonContainer: {
    marginTop: 'auto',
    paddingVertical: 20,
    gap: 12,
  },

  // Create account button
  createButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },

  // Disabled state for create button
  createButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },

  // Create button text
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Back button
  backButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#E1E5E9',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Back button text
  backButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
  },

  // Loading container for initial state
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Loading text
  loadingText: {
    fontSize: 16,
    color: '#666666',
    marginTop: 16,
    textAlign: 'center',
  },
});