# Firebase Security Setup Guide

## 🔒 Security Improvements Implemented

### 1. Removed Hardcoded Firebase Config
- Firebase configuration is now loaded from server endpoint `/api/firebase-config`
- API keys are stored in environment variables on the server
- Client-side code no longer contains sensitive configuration

### 2. Server-Side Configuration Protection
- Express server validates request origins
- Only allowed domains can fetch Firebase config
- Environment variables protect sensitive data

### 3. Firestore Security Rules
- Implemented proper database access controls
- Users can only access their own data
- Collaborative lists require proper permissions

## 🚀 Setup Instructions

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment Variables
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your actual Firebase values
# Get these from Firebase Console > Project Settings > General
```

### Step 3: Update Firestore Rules
1. Go to Firebase Console
2. Navigate to Firestore Database > Rules
3. Replace the rules with the content from `firestore.rules`
4. Click "Publish"

### Step 4: Configure Domain Restrictions (Optional)
1. Go to Firebase Console > Authentication > Settings
2. Add your domain to "Authorized domains"
3. For the API key, go to Google Cloud Console > APIs & Credentials
4. Edit your API key and add HTTP referrer restrictions

### Step 5: Start the Server
```bash
# Development
npm run dev

# Production
npm start
```

## 🔧 Additional Security Measures

### Content Security Policy (CSP)
The server includes CSP headers to prevent XSS attacks and unauthorized script execution.

### CORS Protection
Cross-origin requests are limited to specified domains only.

### Input Sanitization
All user inputs should be validated and sanitized (implement in your application logic).

## 🌐 Deployment Considerations

### Environment Variables for Production
Set these environment variables on your hosting platform:
- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`
- `ALLOWED_ORIGINS` (comma-separated list of allowed domains)

### HTTPS Only
Always use HTTPS in production to protect data in transit.

### Regular Security Audits
- Monitor Firebase usage and access patterns
- Review Firestore security rules regularly
- Keep dependencies updated

## 🔍 Testing Security

### Test Config Endpoint
```bash
# Should work from allowed origin
curl -H "Origin: http://localhost:3000" http://localhost:3000/api/firebase-config

# Should be blocked from unauthorized origin
curl -H "Origin: http://malicious-site.com" http://localhost:3000/api/firebase-config
```

### Test Firestore Rules
Use the Firebase Console Rules Playground to test your security rules with different scenarios.

## 🆘 Troubleshooting

### Common Issues:
1. **Config not loading**: Check if server is running and CORS is properly configured
2. **Firebase connection fails**: Verify environment variables are set correctly
3. **Permission denied**: Check Firestore rules and ensure user authentication works
4. **CORS errors**: Add your domain to ALLOWED_ORIGINS environment variable

### Debug Mode:
Set `NODE_ENV=development` to enable more detailed error logging.