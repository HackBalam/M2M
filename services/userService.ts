// User management service for Firebase operations
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import uuid from 'react-native-uuid';
import { db } from '../config/firebaseConfig';

// Interface defining user data structure
export interface UserData {
  id: string;           // UUID generated for user
  walletAddress: string; // Wallet address from connected wallet
  username: string;      // User-chosen username
  createdAt: Date;      // Account creation timestamp
}

// Interface for new user registration
export interface NewUserData {
  walletAddress: string;
  username: string;
}

/**
 * Check if a user exists in the database by wallet address
 * @param walletAddress - The wallet address to search for
 * @returns Promise<UserData | null> - User data if found, null if not found
 */
export const checkUserExists = async (walletAddress: string): Promise<UserData | null> => {
  try {
    // Create query to find user by wallet address
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('walletAddress', '==', walletAddress.toLowerCase()));

    // Execute query
    const querySnapshot = await getDocs(q);

    // Return user data if found
    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data() as UserData;
      return {
        ...userData,
        createdAt: userData.createdAt instanceof Date ? userData.createdAt : new Date(userData.createdAt)
      };
    }

    // Return null if user not found
    return null;
  } catch (error) {
    console.error('Error checking if user exists:', error);
    throw new Error('Failed to check user existence');
  }
};

/**
 * Create a new user in the database
 * @param userData - New user data containing wallet address and username
 * @returns Promise<UserData> - Created user data including generated UUID
 */
export const createUser = async (userData: NewUserData): Promise<UserData> => {
  try {
    // Generate unique UUID for the user
    const userId = uuid.v4() as string;

    // Create complete user data object
    const newUser: UserData = {
      id: userId,
      walletAddress: userData.walletAddress.toLowerCase(), // Store address in lowercase for consistency
      username: userData.username,
      createdAt: new Date()
    };

    // Save user to Firestore using UUID as document ID
    await setDoc(doc(db, 'users', userId), newUser);

    console.log('User created successfully:', newUser);
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
};

/**
 * Get user data by UUID
 * @param userId - The UUID of the user to retrieve
 * @returns Promise<UserData | null> - User data if found, null if not found
 */
export const getUserById = async (userId: string): Promise<UserData | null> => {
  try {
    // Get user document by UUID
    const userDoc = await getDoc(doc(db, 'users', userId));

    // Return user data if document exists
    if (userDoc.exists()) {
      const userData = userDoc.data() as UserData;
      return {
        ...userData,
        createdAt: userData.createdAt instanceof Date ? userData.createdAt : new Date(userData.createdAt)
      };
    }

    // Return null if user not found
    return null;
  } catch (error) {
    console.error('Error getting user by ID:', error);
    throw new Error('Failed to get user data');
  }
};

/**
 * Check if a username is already taken
 * @param username - The username to check
 * @returns Promise<boolean> - true if username is taken, false if available
 */
export const isUsernameTaken = async (username: string): Promise<boolean> => {
  try {
    // Create query to find users with the specified username
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', username.toLowerCase()));

    // Execute query
    const querySnapshot = await getDocs(q);

    // Return true if username is found (taken), false if not found (available)
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking username availability:', error);
    throw new Error('Failed to check username availability');
  }
};

/**
 * Update user data in the database
 * @param userId - The UUID of the user to update
 * @param updateData - Partial user data to update
 * @returns Promise<void>
 */
export const updateUser = async (userId: string, updateData: Partial<Omit<UserData, 'id' | 'createdAt'>>): Promise<void> => {
  try {
    // Update user document with new data
    await setDoc(doc(db, 'users', userId), updateData, { merge: true });
    console.log('User updated successfully');
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
};