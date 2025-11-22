const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();

// Conditionally load passport for Google OAuth
let passport;
try {
  if (process.env.GOOGLE_CLIENT_ID) {
    passport = require('passport');
    // Initialize passport strategy if Google OAuth is configured
    require('../config/passport');
  }
} catch (err) {
  console.log('Google OAuth not configured - passport disabled');
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

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create new user
    const user = new User({
      name,
      email,
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

    // Find user
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      console.log(`Login attempt failed: User not found with email: ${normalizedEmail}`);
      return res.status(400).json({ message: 'No account found with this email. Please sign up first.' });
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
      return res.status(400).json({ message: 'Incorrect password. Please try again.' });
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
// @desc    Initiate Google OAuth
// @access  Public
if (passport && process.env.GOOGLE_CLIENT_ID) {
  router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

  // @route   GET /api/auth/google/callback
  // @desc    Google OAuth callback
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
  // Google OAuth not configured - return error
  router.get('/google', (req, res) => {
    res.status(503).json({ message: 'Google OAuth is not configured. Please set up Google OAuth credentials.' });
  });
  
  router.get('/google/callback', (req, res) => {
    res.status(503).json({ message: 'Google OAuth is not configured.' });
  });
}

module.exports = router;

