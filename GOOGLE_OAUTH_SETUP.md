# Google OAuth Setup Guide

To enable Google OAuth authentication, you need to set up Google OAuth credentials.

## Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google Identity Services** (or use OAuth 2.0):
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Identity" or go directly to Credentials
   - Note: Google+ API is deprecated, but OAuth 2.0 still works
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:5000/api/auth/google/callback` (for development)
     - `https://yourdomain.com/api/auth/google/callback` (for production)
   - Click "Create"
   - Copy the **Client ID** and **Client Secret**

## Step 2: Update Backend .env File

Add these variables to your `backend/.env` file:

```env
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
FRONTEND_URL=http://localhost:3000
SESSION_SECRET=your-random-session-secret-here
```

## Step 3: Install Dependencies

Make sure you've installed all required packages:

```bash
cd backend
npm install
```

## Step 4: Restart Your Servers

Restart both backend and frontend servers for changes to take effect.

## Testing

1. Click "Continue with Google" button in the login modal
2. You'll be redirected to Google's login page
3. After authentication, you'll be redirected back to the app
4. You should be automatically logged in

## Troubleshooting

- **"redirect_uri_mismatch" error**: Make sure the redirect URI in Google Console exactly matches `GOOGLE_CALLBACK_URL` in your .env file
- **"invalid_client" error**: Verify your Client ID and Secret are correct
- **CORS errors**: Ensure `FRONTEND_URL` in backend .env matches your frontend URL

## Production Deployment

For production:
1. Update `GOOGLE_CALLBACK_URL` to your production backend URL
2. Update `FRONTEND_URL` to your production frontend URL
3. Add production redirect URI in Google Cloud Console
4. Use secure session secrets


