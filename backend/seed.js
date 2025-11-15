const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Job = require('./models/Job');

dotenv.config();

const jobs = [
  {
    title: 'Cloud Engineer',
    company: 'Google',
    location: 'Hyderabad',
    category: 'Programming',
    level: 'Intermediate Level',
    description: 'Join our technology team as a Cloud Engineer, where you will be responsible for designing and managing our cloud infrastructure. You will collaborate with cross-functional teams to deploy scalable solutions and ensure optimal performance.',
    requirements: ['AWS/Azure certification', '3+ years experience', 'Kubernetes knowledge']
  },
  {
    title: 'Network Security Engineer',
    company: 'Google',
    location: 'Bangalore',
    category: 'Cybersecurity',
    level: 'Senior Level',
    description: 'We are seeking a Network Security Engineer to protect our organization\'s IT infrastructure. You will design and implement security measures to safeguard our network systems and data from potential threats.',
    requirements: ['CISSP certification', '5+ years experience', 'Firewall expertise']
  },
  {
    title: 'Software Tester',
    company: 'Google',
    location: 'Chennai',
    category: 'Programming',
    level: 'Intermediate Level',
    description: 'As a Software Tester, you will play a critical role in ensuring the quality and reliability of our software applications. You will design test cases, execute test plans, and collaborate with development teams.',
    requirements: ['QA experience', 'Automation testing', 'Agile methodology']
  },
  {
    title: 'Graphic Designer',
    company: 'Google',
    location: 'Chennai',
    category: 'Designing',
    level: 'Intermediate Level',
    description: 'Join our creative team as a Graphic Designer, where you will be responsible for creating visually appealing graphics and layouts that enhance our brand identity and user experience.',
    requirements: ['Adobe Creative Suite', 'Portfolio required', '2+ years experience']
  },
  {
    title: 'Content Marketing Manager',
    company: 'Google',
    location: 'Mumbai',
    category: 'Marketing',
    level: 'Senior Level',
    description: 'We are looking for a Content Marketing Manager to lead our content strategy and execution. In this role, you will develop compelling content that engages our audience and drives business growth.',
    requirements: ['Content strategy experience', 'SEO knowledge', 'Analytics proficiency']
  },
  {
    title: 'Human Resources Specialist',
    company: 'Google',
    location: 'Washington',
    category: 'Management',
    level: 'Intermediate Level',
    description: 'As a Human Resources Specialist, you will support various HR functions, including recruitment, employee relations, and compliance. You will play a key role in fostering a positive work environment.',
    requirements: ['HR certification preferred', 'Recruitment experience', 'Communication skills']
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jobportal', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Create a recruiter user
    const recruiter = await User.findOne({ email: 'recruiter@test.com' });
    let recruiterId;

    if (!recruiter) {
      const newRecruiter = new User({
        name: 'Test Recruiter',
        email: 'recruiter@test.com',
        password: 'password123',
        role: 'recruiter'
      });
      await newRecruiter.save();
      recruiterId = newRecruiter._id;
      console.log('Created recruiter user');
    } else {
      recruiterId = recruiter._id;
      console.log('Using existing recruiter user');
    }

    // Clear existing jobs
    await Job.deleteMany({});
    console.log('Cleared existing jobs');

    // Add jobs
    const jobsWithRecruiter = jobs.map(job => ({
      ...job,
      postedBy: recruiterId
    }));

    await Job.insertMany(jobsWithRecruiter);
    console.log(`Seeded ${jobs.length} jobs`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();

