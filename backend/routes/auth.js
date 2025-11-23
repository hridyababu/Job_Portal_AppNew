const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();

// Load passport for Google OAuth
let passport;
try {
  passport = require('passport');
  // Initialize passport strategy (will only work if credentials are configured)
  require('../config/passport');
} catch (err) {
  console.log('Passport not available:', err.message);
}

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'your_jwt_secret_key_change_this_in_production', {
    expiresIn: '30d'
  });
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role } = req.body;

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    
    if (existingUser) {
      // Update existing user with new name and password
      existingUser.name = name;
      existingUser.password = password; // Will be hashed by pre-save hook
      if (role && existingUser.role !== role) {
        existingUser.role = role;
      }
      await existingUser.save();
      
      // Generate token for updated user
      const token = generateToken(existingUser._id);
      
      return res.status(200).json({
        token,
        user: {
          id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
          role: existingUser.role
        },
        message: 'Account updated successfully. You are now logged in.'
      });
    }

    // Create new user
    const user = new User({
      name,
      email: normalizedEmail,
      password,
      role: role || 'user'
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Normalize email (lowercase and trim)
    const normalizedEmail = email.toLowerCase().trim();

    // Find user (case-insensitive)
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      console.log(`Login attempt failed: User not found with email: ${normalizedEmail}`);
      return res.status(400).json({ 
        message: 'No account found with this email. Please sign up first.',
        suggestion: 'You can sign up with this email to create an account or update an existing one.'
      });
    }

    // Check if user has a password (not a Google-only account)
    if (!user.password) {
      console.log(`Login attempt failed: User ${normalizedEmail} has no password (Google OAuth account)`);
      return res.status(400).json({ message: 'This account was created with Google. Please use "Continue with Google" to sign in.' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log(`Login attempt failed: Incorrect password for email: ${normalizedEmail}`);
      return res.status(400).json({ 
        message: 'Incorrect password. Please try again.',
        suggestion: 'If you forgot your password, you can sign up again with the same email to reset it.'
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', require('../middleware/auth'), async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/auth/google
// @desc    Initiate Google OAuth - Redirects to Google's login page
// @access  Public
console.log('Auth route - Checking OAuth config:');
console.log('  passport:', passport ? 'LOADED' : 'NOT LOADED');
console.log('  GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? 'SET' : 'NOT SET');
console.log('  GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'NOT SET');

if (passport && 
    process.env.GOOGLE_CLIENT_ID && 
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_CLIENT_ID !== 'your-google-client-id' &&
    process.env.GOOGLE_CLIENT_SECRET !== 'your-google-client-secret') {
  
  console.log('✅ Google OAuth route configured - redirecting to Google');
  
  // Real Google OAuth - redirects to Google's official login page
  router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

  // @route   GET /api/auth/google/callback
  // @desc    Google OAuth callback - Google redirects here after login
  // @access  Public
  router.get('/google/callback', 
    passport.authenticate('google', { session: false }),
    async (req, res) => {
      try {
        const token = generateToken(req.user._id);
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
        
        // Redirect to frontend with token
        res.redirect(`${frontendUrl}/auth/callback?token=${token}&name=${encodeURIComponent(req.user.name)}&email=${encodeURIComponent(req.user.email)}`);
      } catch (error) {
        console.error('Google OAuth callback error:', error);
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
        res.redirect(`${frontendUrl}/auth/callback?error=authentication_failed`);
      }
    }
  );
} else {
  // Google OAuth not configured - only real OAuth is allowed
  console.log('❌ Google OAuth route NOT configured');
  router.get('/google', (req, res) => {
    console.log('GET /api/auth/google - OAuth not configured');
    res.status(503).json({ 
      message: 'Google OAuth is not configured. Please set up Google OAuth credentials to use Google login.',
      setupRequired: true,
      debug: {
        passport: passport ? 'loaded' : 'not loaded',
        clientId: process.env.GOOGLE_CLIENT_ID ? 'set' : 'not set',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ? 'set' : 'not set'
      },
      instructions: [
        '1. Go to https://console.cloud.google.com/',
        '2. Create OAuth 2.0 credentials',
        '3. Add to backend/.env file:',
        '   GOOGLE_CLIENT_ID=your-client-id',
        '   GOOGLE_CLIENT_SECRET=your-client-secret',
        '   GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback',
        '4. Restart your backend server',
        '5. See QUICK_GOOGLE_SETUP.md for step-by-step guide'
      ]
    });
  });
  
  router.get('/google/callback', (req, res) => {
    res.status(503).json({ message: 'Google OAuth is not configured.' });
  });
}

module.exports = router;

