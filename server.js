const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: [
                "'self'", 
                "'unsafe-inline'", // Required for inline scripts, consider removing in production
                "https://www.gstatic.com"
            ],
            styleSrc: ["'self'", "'unsafe-inline'"],
            connectSrc: [
                "'self'",
                "https://*.googleapis.com",
                "https://*.firebaseio.com",
                "https://*.cloudfunctions.net"
            ],
            imgSrc: ["'self'", "data:", "https:"]
        }
    }
}));

app.use(cors({
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:3000'],
    credentials: true
}));

app.use(express.json());
app.use(express.static('public'));

// Serve Firebase configuration securely
app.get('/api/firebase-config', (req, res) => {
    // Only serve config to authenticated requests or from allowed origins
    const origin = req.get('Origin');
    const referer = req.get('Referer');
    
    // Add your domain validation logic here
    const allowedDomains = process.env.ALLOWED_ORIGINS ? 
        process.env.ALLOWED_ORIGINS.split(',') : 
        ['http://localhost:3000'];
    
    const isValidOrigin = allowedDomains.some(domain => 
        origin === domain || (referer && referer.startsWith(domain))
    );
    
    if (!isValidOrigin) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    
    // Return Firebase config from environment variables
    const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID
    };
    
    // Validate that all required config values are present
    const requiredFields = ['apiKey', 'authDomain', 'projectId'];
    const missingFields = requiredFields.filter(field => !firebaseConfig[field]);
    
    if (missingFields.length > 0) {
        console.error('Missing Firebase config fields:', missingFields);
        return res.status(500).json({ error: 'Server configuration error' });
    }
    
    res.json(firebaseConfig);
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log('📁 Serving files from ./public directory');
    console.log('🔥 Firebase config available at /api/firebase-config');
});