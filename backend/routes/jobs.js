// const express = require('express');
// const { body, validationResult } = require('express-validator');
// const Job = require('../models/Job');
// const auth = require('../middleware/auth');
// const router = express.Router();

// // @route   GET /api/jobs
// // @desc    Get all jobs with filters
// // @access  Public
// router.get('/', async (req, res) => {
//   try {
//     const { category, location, level, search, page = 1, limit = 10 } = req.query;
    
//     const query = {};
    
//     if (category) {
//       query.category = category;
//     }
    
//     if (location) {
//       query.location = { $regex: location, $options: 'i' };
//     }
    
//     if (level) {
//       query.level = level;
//     }
    
//     if (search) {
//       query.$or = [
//         { title: { $regex: search, $options: 'i' } },
//         { description: { $regex: search, $options: 'i' } },
//         { company: { $regex: search, $options: 'i' } }
//       ];
//     }

//     const skip = (parseInt(page) - 1) * parseInt(limit);
    
//     const jobs = await Job.find(query)
//       .populate('postedBy', 'name email')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(parseInt(limit));
    
//     const total = await Job.countDocuments(query);
    
//     res.json({
//       jobs,
//       totalPages: Math.ceil(total / parseInt(limit)),
//       currentPage: parseInt(page),
//       total
//     });
//   } catch (error) {
//     console.error('Get jobs error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // @route   GET /api/jobs/:id
// // @desc    Get single job
// // @access  Public
// router.get('/:id', async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.id).populate('postedBy', 'name email');
    
//     if (!job) {
//       return res.status(404).json({ message: 'Job not found' });
//     }
    
//     res.json(job);
//   } catch (error) {
//     console.error('Get job error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // @route   POST /api/jobs
// // @desc    Create a new job
// // @access  Private (Recruiter)
// router.post('/', [
//   auth,
//   body('title').trim().notEmpty().withMessage('Title is required'),
//   body('company').trim().notEmpty().withMessage('Company is required'),
//   body('location').trim().notEmpty().withMessage('Location is required'),
//   body('category').notEmpty().withMessage('Category is required'),
//   body('level').notEmpty().withMessage('Level is required'),
//   body('description').trim().notEmpty().withMessage('Description is required')
// ], async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     if (req.user.role !== 'recruiter') {
//       return res.status(403).json({ message: 'Only recruiters can post jobs' });
//     }

//     const jobData = {
//       ...req.body,
//       postedBy: req.user._id
//     };

//     const job = new Job(jobData);
//     await job.save();

//     res.status(201).json(job);
//   } catch (error) {
//     console.error('Create job error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // @route   PUT /api/jobs/:id
// // @desc    Update a job
// // @access  Private (Recruiter - Owner)
// router.put('/:id', [auth], async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.id);
    
//     if (!job) {
//       return res.status(404).json({ message: 'Job not found' });
//     }

//     if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'recruiter') {
//       return res.status(403).json({ message: 'Not authorized' });
//     }

//     Object.assign(job, req.body);
//     job.updatedAt = Date.now();
//     await job.save();

//     res.json(job);
//   } catch (error) {
//     console.error('Update job error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // @route   DELETE /api/jobs/:id
// // @desc    Delete a job
// // @access  Private (Recruiter - Owner)
// router.delete('/:id', auth, async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.id);
    
//     if (!job) {
//       return res.status(404).json({ message: 'Job not found' });
//     }

//     if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'recruiter') {
//       return res.status(403).json({ message: 'Not authorized' });
//     }

//     await job.deleteOne();
//     res.json({ message: 'Job deleted successfully' });
//   } catch (error) {
//     console.error('Delete job error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;








// routes/job.js (UPDATED)
const express = require('express');
const { body, validationResult } = require('express-validator');
const Job = require('../models/Job');
const Application = require('../models/Application'); // 👈 NEW IMPORT
const auth = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/jobs
// @desc    Get all jobs with filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, location, level, search, page = 1, limit = 10 } = req.query;
    
    const query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    
    if (level) {
      query.level = level;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const jobs = await Job.find(query)
      .populate('postedBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Job.countDocuments(query);
    
    res.json({
      jobs,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/jobs/:id
// @desc    Get single job
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'name email');
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.json(job);
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/jobs/:id/apply 👈 NEW ROUTE FOR APPLICATION
// @desc    Apply for a job
// @access  Private (User)
router.post('/:id/apply', auth, async (req, res) => {
  try {
    const jobId = req.params.id;
    const applicantId = req.user._id;

    if (req.user.role !== 'user') {
      return res.status(403).json({ message: 'Only job seekers can apply for jobs' });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if the user has already applied
    const existingApplication = await Application.findOne({ job: jobId, applicant: applicantId });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    const application = new Application({
      job: jobId,
      applicant: applicantId
    });
    
    await application.save();

    res.status(201).json({ message: 'Application submitted successfully', application });
  } catch (error) {
    console.error('Apply job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// @route   POST /api/jobs
// @desc    Create a new job
// @access  Private (Recruiter)
router.post('/', [
  auth,
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('company').trim().notEmpty().withMessage('Company is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('level').notEmpty().withMessage('Level is required'),
  body('description').trim().notEmpty().withMessage('Description is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Only recruiters can post jobs' });
    }
    const jobData = {
      ...req.body,
      postedBy: req.user._id
    };
    const job = new Job(jobData);
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/jobs/:id
// @desc    Update a job
// @access  Private (Recruiter - Owner)
router.put('/:id', [auth], async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    Object.assign(job, req.body);
    job.updatedAt = Date.now();
    await job.save();
    res.json(job);
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/jobs/:id
// @desc    Delete a job
// @access  Private (Recruiter - Owner)
router.delete('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await job.deleteOne();
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;