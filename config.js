// Firebase Configuration
// This file should be generated from environment variables during build
// DO NOT commit the actual config values to version control

export const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || "your-api-key-here",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
    projectId: process.env.FIREBASE_PROJECT_ID || "your-project-id",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "your-project.firebasestorage.app",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "123456789",
    appId: process.env.FIREBASE_APP_ID || "1:123456789:web:abcdef"
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