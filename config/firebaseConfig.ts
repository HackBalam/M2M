// Firebase configuration and initialization
/*import {
  ENV_FIREBASE_APIKEY,
  ENV_FIREBASE_APPID,
  ENV_FIREBASE_AUTHDOMAIN,
  ENV_FIREBASE_MEASUREMENTID,
  ENV_FIREBASE_MESSAGINGSENDERID,
  ENV_FIREBASE_PROJECTID,
  ENV_FIREBASE_STORAGEBUCKET
} from '@env';*/
import { /*getApp, getApps,*/ initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration object using environment variables
const firebaseConfig = {
  apiKey: "AIzaSyDrY3Hy-m4_3e8J1uUBPuh4fB5KU4nG2Rs",
  authDomain: "mesageapp-14a6a.firebaseapp.com",
  projectId: "mesageapp-14a6a",
  storageBucket: "mesageapp-14a6a.firebasestorage.app",
  messagingSenderId: "846417924555",
  appId: "1:846417924555:web:23a653a7eb27517c92264e",
  measurementId: "G-DJJCJCV4FB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase app (check if already initialized to prevent re-initialization)
//const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore database
export const db = getFirestore(app);

// Export app instance for potential future use
export default app;