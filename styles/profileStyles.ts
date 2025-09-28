// Styles for user profile screen component
import { StyleSheet } from 'react-native';

export const profileStyles = StyleSheet.create({
  // Main container for the profile screen
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // Scroll container
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },

  // Header section
  headerContainer: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
  },

  // Main title
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },

  // Subtitle
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },

  // Container for user information cards
  infoContainer: {
    marginBottom: 30,
  },

  // Individual information card
  infoCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E1E5E9',
  },

  // Card title
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Card content container (for items with copy button)
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Main card value
  cardValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },

  // Small card value (for long text like addresses)
  cardValueSmall: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    fontFamily: 'monospace',
    flex: 1,
    marginRight: 12,
  },

  // Card subtitle (for shortened addresses)
  cardSubtitle: {
    fontSize: 12,
    color: '#999999',
    marginTop: 4,
    fontFamily: 'monospace',
  },

  // Copy button
  copyButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  // Copy button text
  copyButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Future features container
  featuresContainer: {
    backgroundColor: '#F0F8FF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
  },

  // Features section title
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 12,
  },

  // Features description text
  featuresDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 4,
  },

  // Action buttons container
  actionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#E1E5E9',
    backgroundColor: '#FFFFFF',
  },

  // Refresh button
  refreshButton: {
    backgroundColor: '#F8F9FA',
    borderWidth: 2,
    borderColor: '#E1E5E9',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },

  // Refresh button text
  refreshButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },

  // Logout button
  logoutButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },

  // Disabled logout button
  logoutButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },

  // Logout button text
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Loading container
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

  // Error container
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },

  // Error text
  errorText: {
    fontSize: 18,
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 20,
  },

  // Retry button
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },

  // Retry button text
  retryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});