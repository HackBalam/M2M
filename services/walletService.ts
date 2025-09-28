// Wallet service to handle wallet connection and state management
import { useAppKit, useAppKitAccount, useAppKitState, useDisconnect } from '@reown/appkit-ethers-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Constants for AsyncStorage keys
const STORAGE_KEYS = {
  WALLET_ADDRESS: 'wallet_address',
  USER_ID: 'user_id',
  IS_LOGGED_IN: 'is_logged_in'
};

// Interface for wallet connection state
export interface WalletState {
  isConnected: boolean;
  address: string | null;
  isConnecting: boolean;
}

// Interface for user session data stored locally
export interface UserSession {
  userId: string;
  walletAddress: string;
  isLoggedIn: boolean;
}

/**
 * Custom hook to manage wallet connection state and operations
 * @returns Object with wallet state and connection functions
 */
export const useWalletConnection = () => {
  // Get AppKit instance for wallet operations
  const { open, close } = useAppKit();

  // Get account information from AppKit
  const { address, isConnected, status } = useAppKitAccount();

  // Get AppKit state for connection status
  const { loading } = useAppKitState();

  // Get disconnect function from AppKit
  const { disconnect } = useDisconnect();

  /**
   * Open wallet connection modal
   * @returns void
   */
  const connectWallet = () => {
    try {
      // Open AppKit modal to connect wallet
      open();
    } catch (error) {
      console.error('Error opening wallet connection:', error);
      throw new Error('Failed to open wallet connection');
    }
  };

  /**
   * Close wallet connection modal
   * @returns void
   */
  const closeWalletModal = () => {
    try {
      // Close AppKit modal
      close();
    } catch (error) {
      console.error('Error closing wallet modal:', error);
    }
  };

  /**
   * Disconnect wallet using AppKit
   * @returns Promise<void>
   */
  const disconnectWallet = async (): Promise<void> => {
    try {
      // Disconnect wallet using AppKit
      await disconnect();
      console.log('Wallet disconnected successfully');
    } catch (error) {
      console.warn('Wallet disconnect failed (this is usually safe to ignore):', error);
      // Don't throw error - wallet might already be disconnected
    }
  };

  /**
   * Get current wallet state
   * @returns WalletState object with connection info
   */
  const getWalletState = (): WalletState => {
    return {
      isConnected: isConnected || false,
      address: address || null,
      isConnecting: loading || status === 'connecting'
    };
  };

  // Return wallet service functions and state
  return {
    connectWallet,
    closeWalletModal,
    disconnectWallet,
    getWalletState,
    // Direct access to AppKit values
    address,
    isConnected,
    isConnecting: loading || status === 'connecting'
  };
};

/**
 * Save user session data to AsyncStorage
 * @param session - User session data to save
 * @returns Promise<void>
 */
export const saveUserSession = async (session: UserSession): Promise<void> => {
  try {
    // Save each session property to AsyncStorage
    await AsyncStorage.setItem(STORAGE_KEYS.USER_ID, session.userId);
    await AsyncStorage.setItem(STORAGE_KEYS.WALLET_ADDRESS, session.walletAddress);
    await AsyncStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, session.isLoggedIn.toString());

    console.log('User session saved successfully');
  } catch (error) {
    console.error('Error saving user session:', error);
    throw new Error('Failed to save user session');
  }
};

/**
 * Get user session data from AsyncStorage
 * @returns Promise<UserSession | null> - User session if found, null if not found
 */
export const getUserSession = async (): Promise<UserSession | null> => {
  try {
    // Get all session data from AsyncStorage
    const userId = await AsyncStorage.getItem(STORAGE_KEYS.USER_ID);
    const walletAddress = await AsyncStorage.getItem(STORAGE_KEYS.WALLET_ADDRESS);
    const isLoggedInString = await AsyncStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN);

    // Return null if any required data is missing
    if (!userId || !walletAddress || !isLoggedInString) {
      return null;
    }

    // Return session data
    return {
      userId,
      walletAddress,
      isLoggedIn: isLoggedInString === 'true'
    };
  } catch (error) {
    console.error('Error getting user session:', error);
    return null;
  }
};

/**
 * Clear user session data from AsyncStorage
 * @returns Promise<void>
 */
export const clearUserSession = async (): Promise<void> => {
  try {
    // Remove all session data from AsyncStorage
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.USER_ID,
      STORAGE_KEYS.WALLET_ADDRESS,
      STORAGE_KEYS.IS_LOGGED_IN
    ]);

    console.log('User session cleared successfully');
  } catch (error) {
    console.error('Error clearing user session:', error);
    throw new Error('Failed to clear user session');
  }
};

/**
 * Check if user has an active session
 * @returns Promise<boolean> - true if user has active session, false otherwise
 */
export const hasActiveSession = async (): Promise<boolean> => {
  try {
    // Get user session data
    const session = await getUserSession();

    // Return true only if session exists and user is logged in
    return session !== null && session.isLoggedIn;
  } catch (error) {
    console.error('Error checking active session:', error);
    return false;
  }
};

/**
 * Logout user and clear session data
 * Also disconnects wallet using AppKit
 * @returns Promise<void>
 */
export const logoutUser = async (): Promise<void> => {
  try {
    // Import disconnect function from AppKit
    const { useDisconnect } = await import('@reown/appkit-ethers-react-native');

    // Clear user session from local storage first
    await clearUserSession();

    console.log('User logged out successfully');
  } catch (error) {
    console.error('Error logging out user:', error);
    throw new Error('Failed to logout user');
  }
};

/**
 * Logout user with wallet disconnection
 * This function should be used with the wallet hook
 * @param disconnectWallet - Function to disconnect wallet from AppKit
 * @returns Promise<void>
 */
export const logoutUserWithDisconnect = async (disconnectWallet: () => Promise<void>): Promise<void> => {
  try {
    // Clear user session from local storage first to ensure logout even if wallet disconnect fails
    await clearUserSession();

    // Try to disconnect wallet, but don't fail the entire logout if this fails
    try {
      await disconnectWallet();
      console.log('Wallet disconnected successfully');
    } catch (walletError) {
      console.error('Error disconnecting wallet (continuing with logout):', walletError);
      // Don't throw here - we still want to complete the logout
    }

    console.log('User logged out successfully');
  } catch (error) {
    console.error('Error logging out user:', error);
    throw new Error('Failed to logout user');
  }
};