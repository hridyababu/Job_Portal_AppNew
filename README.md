<<<<<<< HEAD
# my_first
this is my first repository (for course mern stack)
# Job Portal Application

A full-stack job portal application built with React, Node.js, Express.js, and MongoDB.

## Features

- 🔐 User Authentication (Login/Signup) with JWT
- 🔵 Google OAuth Integration
- 🔍 Job Search and Filtering
- 📋 Job Listings with Categories and Locations
- 👤 User Roles (User/Recruiter)
- 📱 Responsive Design
- 🎨 Modern UI/UX

## Tech Stack

### Frontend
- React 18
- React Router
- Axios
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Passport.js (Google OAuth)
- bcryptjs

## Project Structure

```
JOB_PORTAL_APPC/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Job.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── jobs.js
│   │   └── categories.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── seed.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── utils/
│   │   └── App.js
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/jobportal
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development
SESSION_SECRET=your_random_session_secret_here
FRONTEND_URL=http://localhost:3000

# Google OAuth (Optional - see GOOGLE_OAUTH_SETUP.md)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

**Note:** For Google OAuth to work, you need to set up Google OAuth credentials. See `GOOGLE_OAUTH_SETUP.md` for detailed instructions.

4. Start MongoDB (if running locally):
```bash
# Make sure MongoDB is running on your system
```

5. Seed the database (optional):
```bash
node seed.js
```

6. Start the backend server:
```bash
npm run dev
# or
npm start
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory (optional):
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Jobs
- `GET /api/jobs` - Get all jobs (with filters)
- `GET /api/jobs/:id` - Get single job
- `POST /api/jobs` - Create a new job (Protected - Recruiter only)
- `PUT /api/jobs/:id` - Update a job (Protected - Recruiter only)
- `DELETE /api/jobs/:id` - Delete a job (Protected - Recruiter only)

### Categories
- `GET /api/categories` - Get all job categories
- `GET /api/categories/locations` - Get all locations

## Default Credentials

After running the seed script:
- **Recruiter Email:** recruiter@test.com
- **Password:** password123

## Features Overview

### Home Page
- Hero section with job search
- Trusted companies section
- Job listings with filters
- Category and location filters
- Pagination

### Authentication
- Login/Signup modal
- JWT token-based authentication
- Protected routes
- User session management

### Job Listings
- Filter by category
- Filter by location
- Search functionality
- Pagination
- Responsive grid layout

## Development

### Backend Development
- Uses nodemon for auto-restart during development
- Environment variables for configuration
- MongoDB connection with Mongoose

### Frontend Development
- React development server with hot reload
- Context API for state management
- Axios for API calls
- Responsive CSS design

## Production Build

### Frontend
```bash
cd frontend
npm run build
```

The build folder will contain the production-ready files.

## License

This project is open source and available for educational purposes.

## Support

For issues or questions, please create an issue in the repository.

 86ae5e6 (first commit for job_portal_app)
