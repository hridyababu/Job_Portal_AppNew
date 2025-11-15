const express = require('express');
const router = express.Router();

// @route   GET /api/categories
// @desc    Get all job categories
// @access  Public
router.get('/', (req, res) => {
  const categories = [
    'Programming',
    'Data Science',
    'Designing',
    'Networking',
    'Management',
    'Marketing',
    'Cybersecurity'
  ];
  
  res.json(categories);
});

// @route   GET /api/categories/locations
// @desc    Get all locations
// @access  Public
router.get('/locations', (req, res) => {
  const locations = [
    'Bangalore',
    'Washington',
    'Hyderabad',
    'Mumbai',
    'California',
    'Chennai',
    'New York'
  ];
  
  res.json(locations);
});

module.exports = router;

