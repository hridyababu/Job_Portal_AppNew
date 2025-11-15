# Quick Start Guide

## Prerequisites
- Node.js installed (v14+)
- MongoDB running (local or Atlas)

## Step 1: Setup Backend

```bash
cd backend
npm install
```

Create `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/jobportal
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development
```

## Step 2: Seed Database (Optional)

```bash
npm run seed
```

This creates sample jobs and a test recruiter account:
- Email: recruiter@test.com
- Password: password123

## Step 3: Start Backend

```bash
npm run dev
```

Backend runs on: http://localhost:5000

## Step 4: Setup Frontend

Open a new terminal:

```bash
cd frontend
npm install
```

## Step 5: Start Frontend

```bash
npm start
```

Frontend runs on: http://localhost:3000

## That's it! 🎉

Your job portal is now running. Open http://localhost:3000 in your browser.

## Test Accounts

After seeding:
- **Recruiter:** recruiter@test.com / password123
- **Regular User:** Create one via Sign Up

