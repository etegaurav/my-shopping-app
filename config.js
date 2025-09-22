// Firebase Configuration
// This file should be generated from environment variables during build
// DO NOT commit the actual config values to version control

export const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || "AIzaSyBna-YARBNGTEeF5hJg8oTwicaudRo8oqI",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "shop-app-57cd9.firebaseapp.com",
    projectId: process.env.FIREBASE_PROJECT_ID || "shop-app-57cd9",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "shop-app-57cd9.firebasestorage.app",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "166816611204",
    appId: process.env.FIREBASE_APP_ID || "1:166816611204:web:956843c5251e0171dc7bd1"
};

// Alternative: Load config from a secure API endpoint
export async function loadFirebaseConfig() {
    try {
        const response = await fetch('/api/firebase-config');
        if (!response.ok) {
            throw new Error('Failed to load Firebase config');
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading Firebase config:', error);
        // Fallback to default config or show error
        throw error;
    }
}