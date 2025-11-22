# 📚 Job Portal App - Complete Explanation

## 🗄️ Database Information

### Database Name
**`jobportal`** - This is the MongoDB database name where all your data is stored.

### Collections (Tables) in the Database

MongoDB stores data in collections (similar to tables in SQL). Your app has **3 main collections**:

1. **`users`** - Stores all user accounts
2. **`jobs`** - Stores all job postings
3. **`applications`** - Stores all job applications

---
up with email → enter a different email ID.

## 👥 Collection 1: USERS

**What it stores:**
- User account information (name, email, password)
- User role (either "user" or "recruiter")
- Account creation date
- Google OAuth ID (if they signed in with Google)

**Fields:**
- `name` - User's full name
- `email` - User's email address (unique, no duplicates)
- `password` - Encrypted password (for security)
- `role` - Either "user" (job seeker) or "recruiter" (job poster)
- `googleId` - If they logged in with Google
- `createdAt` - When account was created

**Example:**
```
{
  name: "John Doe",
  email: "john@example.com",
  role: "user",
  createdAt: "2024-01-15"
}
```

---

## 💼 Collection 2: JOBS

**What it stores:**
- All job postings available on the portal
- Job details like title, company, location, description
- Who posted the job (recruiter's ID)

**Fields:**
- `title` - Job title (e.g., "Software Engineer")
- `company` - Company name (e.g., "Google")
- `location` - Job location (e.g., "Bangalore")
- `category` - Job category (Programming, Data Science, etc.)
- `level` - Experience level (Entry, Intermediate, Senior)
- `description` - Full job description
- `requirements` - List of required skills
- `salary` - Salary range (min, max, currency)
- `postedBy` - **ID of the recruiter who posted this job** (links to users collection)
- `createdAt` - When job was posted
- `updatedAt` - When job was last updated

**Example:**
```
{
  title: "Cloud Engineer",
  company: "Google",
  location: "Hyderabad",
  category: "Programming",
  level: "Intermediate Level",
  description: "Join our technology team...",
  postedBy: "507f1f77bcf86cd799439011",  // Recruiter's user ID
  createdAt: "2024-01-20"
}
```

---

## 📝 Collection 3: APPLICATIONS

**What it stores:**
- All job applications submitted by job seekers
- Links which user applied to which job
- Application status (Pending, Reviewed, Rejected)

**Fields:**
- `job` - **ID of the job** (links to jobs collection)
- `applicant` - **ID of the user who applied** (links to users collection)
- `appliedAt` - When application was submitted
- `status` - Current status: "Pending", "Reviewed", or "Rejected"

**Example:**
```
{
  job: "507f1f77bcf86cd799439022",      // Job ID
  applicant: "507f1f77bcf86cd799439033", // User ID (job seeker)
  appliedAt: "2024-01-25",
  status: "Pending"
}
```

**Important:** A user can only apply to the same job once (enforced by unique index).

---

## 🔐 How User Roles Work

### 1. **Regular User (Job Seeker)**
- Role: `"user"`
- Can do:
  - ✅ Browse jobs
  - ✅ Search and filter jobs
  - ✅ Apply for jobs
  - ❌ Cannot post jobs
  - ❌ Cannot update jobs

### 2. **Recruiter**
- Role: `"recruiter"`
- Can do:
  - ✅ Browse jobs
  - ✅ **Post new jobs**
  - ✅ **Update their own jobs**
  - ✅ **Delete their own jobs**
  - ❌ Cannot apply for jobs

---

## 🚀 How the App Works - Step by Step

### **Step 1: User Registration/Login**

1. User visits the website
2. Clicks "Login" or "Sign Up"
3. Creates account with email/password OR logs in with Google
4. Account is saved in **`users`** collection
5. User gets a JWT token (like a temporary ID card) to stay logged in

**Where data goes:** `users` collection

---

### **Step 2: Recruiter Posts a Job**

**Simple Step-by-Step Guide:**

1. **Create a Recruiter Account**
   
   **Option A: Sign Up as Recruiter (Recommended)**
   - Go to the website
   - Click "Sign Up"
   - Fill in your name, email, and password
   - After signing up, you need to change your role to "recruiter" in the database (see below)
   
   **Option B: Use Seed Script (Easiest for Testing)**
   - Run the seed script: `cd backend && npm run seed`
   - This creates a test recruiter account:
     - Email: `recruiter@test.com`
     - Password: `password123`
   - Log in with these credentials
   
   **Option C: Manually Change Role in Database**
   - Sign up normally as a regular user
   - Open MongoDB (or use MongoDB Compass)
   - Find your user in the `users` collection
   - Change the `role` field from `"user"` to `"recruiter"`
   - Save the changes
   
   **After creating recruiter account:**
   - Log in with your recruiter credentials
   - You should see "Recruiter Login" link in the header

2. **Go to Recruiter Dashboard**
   - After logging in, click "Recruiter Login" link in the header
   - OR go directly to: `http://localhost:3000/recruiter`
   - You'll see the Recruiter Dashboard page

3. **Click "Post New Job" Button**
   - On the dashboard, you'll see a big button that says "+ Post New Job"
   - Click it to open the job posting form

4. **Fill Out the Job Form**
   You need to fill in these fields (marked with * are required):
   
   - **Job Title*** - What position are you hiring for?
     - Example: "Software Engineer", "Graphic Designer", "Marketing Manager"
   
   - **Company Name*** - Your company name
     - Example: "Google", "Microsoft", "My Company"
   
   - **Location*** - Where is the job located?
     - Example: "Bangalore", "New York", "Remote"
   
   - **Category*** - What type of job is it?
     - Choose from: Programming, Data Science, Designing, Networking, Management, Marketing, Cybersecurity
   
   - **Experience Level*** - What experience level needed?
     - Choose from: Entry Level, Intermediate Level, Senior Level
   
   - **Job Description*** - Describe the job
     - Write about what the job involves, responsibilities, what you're looking for
     - Example: "We are looking for a talented software engineer to join our team..."
   
   - **Requirements** (Optional) - What skills/qualifications needed?
     - Enter requirements separated by commas
     - Example: "3+ years experience, Python knowledge, Team player"
   
   - **Salary** (Optional) - Salary range
     - Min Salary: e.g., 50000
     - Max Salary: e.g., 100000
     - Currency: USD, INR, or EUR

5. **Click "Post Job" Button**
   - Review all your information
   - Click the "Post Job" button at the bottom
   - Wait for confirmation message

6. **Job is Posted!**
   - You'll see a success message: "Job posted successfully!"
   - The job appears in "My Posted Jobs" section
   - The job is now visible to all job seekers on the homepage
   - The job is saved in **`jobs`** collection in database
   - Your user ID is automatically saved in the `postedBy` field

**What Happens Behind the Scenes:**
- System checks: "Is this user a recruiter?" ✅
- System saves all the job information
- System automatically links the job to your recruiter account
- Job becomes visible to everyone browsing jobs

**Where data goes:** `jobs` collection  
**Who can do this:** Only users with `role: "recruiter"`

**To View Your Posted Jobs:**
- Scroll down on the Recruiter Dashboard
- You'll see "My Posted Jobs" section
- All jobs you posted are listed there
- You can delete any job you posted by clicking "Delete" button

---

### **Step 3: Job Seeker Browses Jobs**

1. Job seeker (regular user) visits homepage
2. Sees list of all jobs from **`jobs`** collection
3. Can search by:
   - Job title/keywords
   - Location
   - Category
   - Experience level
4. Results are filtered and displayed

**Data source:** `jobs` collection

---

### **Step 4: Job Seeker Applies for a Job**

1. Job seeker finds a job they like
2. Clicks "Apply now" button
3. System checks:
   - ✅ Is user logged in?
   - ✅ Is user a job seeker (not recruiter)?
   - ✅ Has user already applied? (prevents duplicate applications)
4. If all checks pass:
   - Creates new record in **`applications`** collection
   - Links the job ID and applicant ID
   - Sets status to "Pending"
5. User sees "Application submitted successfully!"

**Where data goes:** `applications` collection  
**Who can do this:** Only users with `role: "user"`

---

### **Step 5: Recruiter Updates/Deletes Job**

**How to Update a Job:**

1. Recruiter logs in and goes to Recruiter Dashboard
2. Scrolls to "My Posted Jobs" section
3. Finds the job they want to edit
4. Clicks **"Edit"** button (blue button)
5. Form opens with all current job information pre-filled
6. Makes changes to any fields (title, description, salary, etc.)
7. Clicks **"Update Job"** button
8. System saves changes and updates `updatedAt` field
9. Job is updated in **`jobs`** collection

**How to Delete a Job:**

1. Recruiter logs in and goes to Recruiter Dashboard
2. Scrolls to "My Posted Jobs" section
3. Finds the job they want to delete
4. Clicks **"Delete"** button (red button)
5. Confirms deletion
6. Job is removed from **`jobs`** collection

**Security:**
- System checks: Only the recruiter who posted the job can update/delete it
- Other recruiters cannot edit/delete jobs they didn't post

**Where data goes:** `jobs` collection (updated or deleted)  
**Who can do this:** Only the recruiter who posted the job

---

## 📍 Where Applicant Details Are Stored

**Applicant details are stored in TWO places:**

### 1. **User Information** → `users` collection
- Name, email, account details
- This is the user's profile information

### 2. **Application Information** → `applications` collection
- Which job they applied for (`job` field)
- When they applied (`appliedAt` field)
- Application status (`status` field)
- Links to their user ID (`applicant` field)

**How they connect:**
- `applications.applicant` → links to → `users._id`
- `applications.job` → links to → `jobs._id`

**Example Flow:**
```
User "John Doe" (ID: 123) applies to "Software Engineer" job (ID: 456)

applications collection:
{
  applicant: 123,  ← Points to John's user account
  job: 456,        ← Points to Software Engineer job
  status: "Pending"
}
```

---

## 🎯 Summary - Who Does What?

| Action | Who Can Do It | Where Data Goes |
|--------|--------------|-----------------|
| **Sign Up / Login** | Anyone | `users` collection |
| **Browse Jobs** | Anyone (logged in or not) | Reads from `jobs` collection |
| **Apply for Job** | Only `role: "user"` | `applications` collection |
| **Post New Job** | Only `role: "recruiter"` | `jobs` collection |
| **Update Job** | Only the recruiter who posted it | `jobs` collection (updates) |
| **Delete Job** | Only the recruiter who posted it | `jobs` collection (deletes) |

---

## 🔗 How Collections Connect

```
users (Recruiter)
  ↓ (postedBy)
jobs
  ↓ (job field)
applications
  ↑ (applicant field)
users (Job Seeker)
```

**Real Example:**
1. **Recruiter** (User ID: 100) posts a job → Creates record in `jobs` with `postedBy: 100`
2. **Job Seeker** (User ID: 200) applies → Creates record in `applications` with:
   - `job: <job_id>` (the job from step 1)
   - `applicant: 200` (the job seeker)
3. To see who applied: Look in `applications` where `job: <job_id>`
4. To see applicant details: Use `applicant: 200` to find user in `users` collection

---

## 🛡️ Security Features

1. **Password Encryption:** All passwords are hashed (encrypted) before saving
2. **JWT Tokens:** Users get secure tokens to stay logged in
3. **Role-Based Access:** System checks user role before allowing actions
4. **Ownership Check:** Recruiters can only edit/delete their own jobs
5. **Duplicate Prevention:** Users can't apply to the same job twice

---

## 📊 Database Structure Summary

```
Database: jobportal
├── Collection: users
│   ├── Regular users (job seekers)
│   └── Recruiters (job posters)
│
├── Collection: jobs
│   ├── All job postings
│   └── Each job has postedBy → links to users
│
└── Collection: applications
    ├── All job applications
    ├── Each application has:
    │   ├── job → links to jobs
    │   └── applicant → links to users
    └── Status tracking (Pending/Reviewed/Rejected)
```

---

This is how your Job Portal app works! 🎉

