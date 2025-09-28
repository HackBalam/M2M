import "react-native-get-random-values";
import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { initializeReownAppKit } from '../config/reownConfig';

export default function RootLayout() {
  const [isAppKitInitialized, setIsAppKitInitialized] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize Reown AppKit once when app starts
        await initializeReownAppKit();
        setIsAppKitInitialized(true);
      } catch (error) {
        console.error('Failed to initialize AppKit:', error);
        setIsAppKitInitialized(true); // Still show the app even if AppKit fails
      }
    };

    initializeApp();
  }, []);

  // Show loading screen while AppKit initializes
  if (!isAppKitInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return <Stack />;
}
