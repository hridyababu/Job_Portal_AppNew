# 🚀 Quick Google OAuth Setup

## ⚡ Fast Setup (5 minutes)

### Step 1: Get Google Credentials

1. Go to: https://console.cloud.google.com/
2. Click "Create Project" (or select existing)
3. Go to: **APIs & Services** → **Credentials**
4. Click: **+ CREATE CREDENTIALS** → **OAuth client ID**
5. If prompted, configure OAuth consent screen first:
   - User Type: **External** (for testing)
   - App name: **Job Portal**
   - User support email: **Your email**
   - Developer contact: **Your email**
   - Click **Save and Continue**
   - Scopes: Click **Save and Continue**
   - Test users: Add your email, Click **Save and Continue**
6. Back to Credentials:
   - Application type: **Web application**
   - Name: **Job Portal OAuth**
   - Authorized redirect URIs: 
     ```
     http://localhost:5000/api/auth/google/callback
     ```
   - Click **CREATE**
7. **Copy** the **Client ID** and **Client Secret**

### Step 2: Add to .env File

Open `backend/.env` and add:

```env
GOOGLE_CLIENT_ID=paste-your-client-id-here
GOOGLE_CLIENT_SECRET=paste-your-client-secret-here
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
FRONTEND_URL=http://localhost:3000
SESSION_SECRET=any-random-string-here-make-it-secret
```

### Step 3: Restart Backend

```bash
cd backend
# Stop the server (Ctrl+C)
npm run dev
```

### Step 4: Test

1. Open: http://localhost:3000
2. Click **Login** → **Continue with Google**
3. You'll be redirected to Google's login page
4. Sign in with your Google account
5. You'll be redirected back and logged in!

---

## ✅ That's It!

Once configured, clicking "Continue with Google" will:
1. Redirect to Google's official login page
2. Only real Google accounts can sign in
3. After login, redirect back to your app
4. User is automatically logged in

---

## ❌ If You See Error

**"Google OAuth is not configured"** means:
- Check your `.env` file has the credentials
- Make sure you copied Client ID and Secret correctly
- Restart your backend server after adding credentials
- Check the redirect URI matches exactly in Google Console

---

**Need help?** See `GOOGLE_OAUTH_SETUP.md` for detailed instructions.

