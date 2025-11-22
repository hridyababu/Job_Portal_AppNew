# 🔧 Troubleshooting Login Issues

## Common Login Problems and Solutions

### ❌ Problem: "Invalid credentials" or "No account found with this email"

**Possible Causes:**

1. **Account doesn't exist**
   - You haven't signed up yet
   - You signed up with a different email

2. **Email case sensitivity**
   - Email should be case-insensitive, but make sure you're using the exact email you signed up with

3. **Account was created with Google OAuth**
   - If you signed up using "Continue with Google", you can't use email/password login
   - You must use "Continue with Google" button

**Solutions:**

✅ **Check if you have an account:**
- Try signing up again with the same email
- If it says "User already exists", then the account exists
- If it creates a new account, your previous account might have been deleted

✅ **Create a new account:**
- Click "Sign Up" instead of "Sign In"
- Fill in your details
- Make sure password is at least 6 characters
- After signing up, you'll be automatically logged in

✅ **Use the test recruiter account:**
- Email: `recruiter@test.com`
- Password: `password123`
- Run `cd backend && npm run seed` if you haven't already

---

### ❌ Problem: "Incorrect password"

**Possible Causes:**

1. **Wrong password entered**
2. **Password has extra spaces**
3. **Password was changed but you're using old password**

**Solutions:**

✅ **Double-check your password:**
- Make sure Caps Lock is off
- Check for extra spaces before/after password
- Try typing password in a text editor first to see what you're typing

✅ **Reset password (if needed):**
- Currently, there's no password reset feature
- You'll need to create a new account with a different email
- Or manually update password in database

---

### ❌ Problem: "This account was created with Google"

**Solution:**
- You signed up using Google OAuth
- You must use the "Continue with Google" button to log in
- You cannot use email/password for Google OAuth accounts

---

## 🔍 How to Check Your Account in Database

If you want to verify your account exists:

1. **Open MongoDB Compass** or use MongoDB shell
2. **Connect to:** `mongodb://localhost:27017/jobportal`
3. **Go to:** `users` collection
4. **Search for your email** (case-insensitive)
5. **Check:**
   - Does the user exist?
   - Does it have a `password` field? (should be a long hash)
   - What is the `role`? (user or recruiter)

---

## 🆕 Quick Fix: Create a New Account

If nothing works, just create a new account:

1. Click "Sign Up" (not "Sign In")
2. Enter your details:
   - Name
   - Email (use a different one if needed)
   - Password (at least 6 characters)
3. Click "Continue"
4. You'll be automatically logged in

---

## 📝 Test Accounts

After running the seed script (`npm run seed` in backend folder):

**Recruiter Account:**
- Email: `recruiter@test.com`
- Password: `password123`

**Note:** No regular user account is created by seed script. You need to sign up manually.

---

## 🐛 Debug Steps

1. **Check backend console:**
   - Look for error messages
   - Check if login request is received
   - See what email is being searched

2. **Check browser console:**
   - Open Developer Tools (F12)
   - Go to Console tab
   - Look for error messages

3. **Check Network tab:**
   - Open Developer Tools (F12)
   - Go to Network tab
   - Try logging in
   - Check the `/api/auth/login` request
   - See the response message

---

## ✅ Still Not Working?

1. Make sure backend is running: `cd backend && npm run dev`
2. Make sure MongoDB is running
3. Try creating a fresh account with a new email
4. Check that you're using the correct email format (with @ and domain)

---

## 💡 Tips

- **Always sign up first** if you're a new user
- **Use the same email** you signed up with
- **Password is case-sensitive** - check Caps Lock
- **Minimum 6 characters** for password
- **Test with recruiter account** first to verify login works

