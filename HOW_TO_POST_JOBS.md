# 📝 How to Post a Job - Simple Guide for Recruiters

## 🎯 Quick Overview

As a recruiter, you can post jobs that job seekers will see and apply to. Here's exactly how to do it!

---

## ✅ Step 1: Get a Recruiter Account

### **Easiest Way (For Testing):**
1. Open terminal
2. Go to backend folder: `cd backend`
3. Run: `npm run seed`
4. This creates a test recruiter:
   - **Email:** `recruiter@test.com`
   - **Password:** `password123`

### **Or Create Your Own:**
1. Sign up normally on the website
2. Then change your role in database to "recruiter" (see APP_EXPLANATION.md)

---

## ✅ Step 2: Log In

1. Go to: `http://localhost:3000`
2. Click "Login" button (top right)
3. Enter your recruiter email and password
4. Click "Continue"
5. You're now logged in as a recruiter!

---

## ✅ Step 3: Go to Recruiter Dashboard

**Two ways to get there:**

**Method 1:**
- Click "Recruiter Login" link in the header (top right)

**Method 2:**
- Type in browser: `http://localhost:3000/recruiter`

You'll see a page that says "Recruiter Dashboard" with your name!

---

## ✅ Step 4: Open Job Posting Form

1. On the Recruiter Dashboard, you'll see a button: **"+ Post New Job"**
2. Click it!
3. A form will appear below

---

## ✅ Step 5: Fill Out the Job Form

Fill in all the fields. Here's what each one means:

### **Required Fields (Must Fill):**

1. **Job Title** ⭐
   - What position are you hiring for?
   - Example: "Software Engineer", "Graphic Designer"

2. **Company Name** ⭐
   - Your company's name
   - Example: "Google", "My Tech Company"

3. **Location** ⭐
   - Where is this job located?
   - Example: "Bangalore", "New York", "Remote"

4. **Category** ⭐
   - Pick from dropdown:
     - Programming
     - Data Science
     - Designing
     - Networking
     - Management
     - Marketing
     - Cybersecurity

5. **Experience Level** ⭐
   - Pick from dropdown:
     - Entry Level
     - Intermediate Level
     - Senior Level

6. **Job Description** ⭐
   - Write about the job:
     - What will they do?
     - What are the responsibilities?
     - What are you looking for?
   - Example: "We are seeking a talented software engineer to join our development team. You will work on building web applications using React and Node.js..."

### **Optional Fields (Can Skip):**

7. **Requirements**
   - What skills or qualifications are needed?
   - Separate each requirement with a comma
   - Example: "3+ years experience, Python knowledge, Team player, Bachelor's degree"

8. **Salary Min**
   - Minimum salary (numbers only)
   - Example: `50000`

9. **Salary Max**
   - Maximum salary (numbers only)
   - Example: `100000`

10. **Currency**
    - Pick: USD, INR, or EUR

---

## ✅ Step 6: Submit the Job

1. Review all your information
2. Scroll down to the bottom of the form
3. Click the **"Post Job"** button
4. Wait a moment...
5. You'll see: **"Job posted successfully!"** ✅

---

## ✅ Step 7: See Your Posted Job

1. Scroll down on the dashboard
2. You'll see **"My Posted Jobs"** section
3. Your new job appears there!
4. You can see:
   - Job title
   - Company and location
   - Category and level
   - When you posted it
   - Delete button (to remove it)

---

## 🎉 That's It!

Your job is now:
- ✅ Saved in the database
- ✅ Visible to all job seekers on the homepage
- ✅ Searchable by title, location, category
- ✅ Available for job seekers to apply

---

## ✏️ How to Edit/Update a Job

1. Go to Recruiter Dashboard
2. Scroll to "My Posted Jobs"
3. Find the job you want to edit
4. Click **"Edit"** button (blue button next to Delete)
5. The form will open with all current job information filled in
6. Make your changes to any fields
7. Click **"Update Job"** button
8. You'll see: "Job updated successfully!" ✅
9. The job is now updated with your changes!

**Note:** You can click "Cancel" to close the form without saving changes.

---

## 🗑️ How to Delete a Job

1. Go to Recruiter Dashboard
2. Scroll to "My Posted Jobs"
3. Find the job you want to delete
4. Click **"Delete"** button (red button)
5. Confirm: Click "OK"
6. Job is removed!

---

## 📋 Example Job Posting

Here's what a complete job posting looks like:

```
Job Title: Software Engineer
Company: Tech Solutions Inc.
Location: Bangalore
Category: Programming
Level: Intermediate Level
Description: We are looking for a skilled software engineer to develop web applications. You will work with React, Node.js, and MongoDB. Great opportunity to work with an innovative team!
Requirements: 3+ years experience, JavaScript knowledge, React framework, Team player
Salary Min: 60000
Salary Max: 120000
Currency: USD
```

---

## ❓ Troubleshooting

**Problem:** "Only recruiters can post jobs"
- **Solution:** Make sure you're logged in with a recruiter account (role: "recruiter")

**Problem:** Can't see "Recruiter Login" link
- **Solution:** Make sure you're logged in, and your account has role: "recruiter"

**Problem:** Form won't submit
- **Solution:** Check that all required fields (marked with ⭐) are filled

**Problem:** Job doesn't appear after posting
- **Solution:** Refresh the page, or check "My Posted Jobs" section

---

## 🎯 Summary

1. **Log in** as recruiter
2. **Go to** Recruiter Dashboard (`/recruiter`)
3. **Click** "+ Post New Job"
4. **Fill** the form
5. **Click** "Post Job"
6. **Done!** Job is live! 🎉

---

Need help? Check `APP_EXPLANATION.md` for more details!

