// Styles for login screen component
import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
  // Main container for the login screen
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },

  // Header section with title and subtitle
  headerContainer: {
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 20,
  },

  // Main app title
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 16,
    textAlign: 'center',
  },

  // Subtitle with instructions
  subtitle: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },

  // Container for wallet connection components
  walletContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },

  // Container for wallet connection button
  buttonContainer: {
    gap: 16,
    width: '100%',
    alignItems: 'center',
  },

  // Container for processing/loading state
  processingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#F0F8FF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
  },

  // Text for processing state
  processingText: {
    fontSize: 16,
    color: '#007AFF',
    marginLeft: 8,
    fontWeight: '500',
  },

  // Container for connection status
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E1E5E9',
  },

  // Text for connection status
  statusText: {
    fontSize: 14,
    color: '#333333',
    marginLeft: 8,
    textAlign: 'center',
  },

  // Container for help/instruction text
  helpContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginBottom: 30,
  },

  // Help text styling
  helpText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
    marginVertical: 4,
  },

  // Container for initial loading state
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Text for initial loading state
  loadingText: {
    fontSize: 16,
    color: '#666666',
    marginTop: 16,
    textAlign: 'center',
  },
});