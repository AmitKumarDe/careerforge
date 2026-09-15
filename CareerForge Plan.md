Haan. Amar planটা **randomly feature add করা না**—আমরা CareerForge-কে একটা real full-stack SaaS হিসেবে build করব, কিন্তু **একটা একটা layer complete করে** এগোবো।

আমাদের benchmark হবে তোমার uploaded reference project-এর overall feature/complexity, আর backend শেখার architecture/style হবে Hitesh Choudhary-এর Chai aur Code VideoTube backend pattern। Reference project-এ auth, MCQ/test, coding, resume, AI chat, notifications, analytics, admin ইত্যাদি আছে। 

## 🗺️ Overall Roadmap

```text
PHASE 0 — Project Foundation              ✅
        ↓
PHASE 1 — Authentication System           🔄
        ↓
PHASE 2 — User Profile & Dashboard
        ↓
PHASE 3 — Job Portal
        ↓
PHASE 4 — Resume Builder
        ↓
PHASE 5 — AI Resume / ATS
        ↓
PHASE 6 — Coding Arena
        ↓
PHASE 7 — Mock Assessment / MCQ
        ↓
PHASE 8 — AI Interview Coach
        ↓
PHASE 9 — Razorpay Subscription
        ↓
PHASE 10 — Recruiter Panel
        ↓
PHASE 11 — Notifications + Socket.IO
        ↓
PHASE 12 — Analytics
        ↓
PHASE 13 — Admin Panel
        ↓
PHASE 14 — Frontend Integration
        ↓
PHASE 15 — Testing + Security
        ↓
PHASE 16 — Deployment
```

তবে **Frontend পুরো শেষে** করব না। Backend-এর foundation/core API তৈরি করার সঙ্গে সঙ্গে relevant frontend screens integrate করব। এতে project dead-end হবে না।

---

# PHASE 0 — Foundation ✅

এটা আমরা already করেছি।

### Backend

```text
backend/
└── src/
    ├── controllers/
    ├── db/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── services/
    ├── validators/
    ├── utils/
    ├── app.js
    └── index.js
```

Completed:

* Node.js
* Express
* MongoDB Atlas
* Mongoose
* dotenv
* CORS
* Cookie Parser
* ES Modules
* Nodemon
* Error handling
* ApiError
* ApiResponse
* asyncHandler
* Zod validation

---

# PHASE 1 — Authentication 🔄

এটাই এখন চলছে।

আমরা Auth-কে একটু serious রাখব।

### Already done

```text
Register                       ✅
    ↓
Password hashing               ✅
    ↓
Login                          ✅
    ↓
bcrypt password verification   ✅
    ↓
Access Token                   ✅
Refresh Token                  ✅
    ↓
HTTP-only Cookies              ✅
    ↓
JWT Middleware                 ✅
    ↓
Protected /me                  ✅
```

### এখন বাকি

#### 1. Logout

```text
POST /api/auth/logout
```

* refresh token DB থেকে remove
* cookies clear

#### 2. Refresh Token

```text
POST /api/auth/refresh
```

Access token expire করলে refresh token দিয়ে নতুন access token।

#### 3. Change Password

```text
POST /api/auth/change-password
```

#### 4. Forgot Password

```text
POST /api/auth/forgot-password
```

#### 5. Reset Password

```text
POST /api/auth/reset-password
```

#### 6. Email Verification

```text
POST /api/auth/verify-email
POST /api/auth/resend-verification
```

Nodemailer use করব।

#### 7. Profile

```text
GET    /api/auth/me
PATCH  /api/auth/profile
```

এরপর Auth phase complete.

---

# PHASE 2 — User Profile + Dashboard

এখানে User model আরও mature হবে।

Profile:

```text
Name
Email
Profile image
Phone
Location
Bio
Skills
Education
Experience
Projects
Social links
Career preferences
```

তারপর dashboard।

Dashboard-এ দেখাব:

```text
Profile Completion
Resume ATS Score
Coding Score
Interview Score
Assessment Score
Saved Jobs
Applied Jobs
Upcoming Interviews
Recommended Jobs
Weak Skills
```

এখান থেকে CareerForge দেখতে শুরু করবে একটা **real product**-এর মতো।

---

# PHASE 3 — Job Portal

এটা একটা বড় module।

### Models

```text
Job
Application
SavedJob
```

### User side

```text
Browse Jobs
Search
Filter
Sort
Job Details
Save Job
Apply
Withdraw Application
```

Application lifecycle:

```text
Applied
   ↓
Under Review
   ↓
Shortlisted
   ↓
Interview
   ↓
Selected
```

অথবা:

```text
Rejected
```

### Recruiter side

পরের phase-এ recruiter panel দিয়ে এগুলো manage করব।

---

# PHASE 4 — Resume Builder

এখানে শুধু form না—একটা proper resume system বানাবো।

Sections:

```text
Personal Information
Summary
Education
Experience
Skills
Projects
Achievements
Certifications
Languages
```

### Features

* Multiple resumes
* Resume draft
* Resume preview
* Templates
* Edit
* Duplicate
* Delete
* Download PDF

এখানে frontend-এ proper resume editor তৈরি হবে।

---

# PHASE 5 — AI Resume + ATS

এখানে Gemini integrate করব।

User resume দিলে:

```text
Resume
   ↓
AI Analysis
   ↓
ATS Score
   ↓
Strengths
Weaknesses
Missing Skills
Suggestions
```

আর AI rewriting:

```text
"Worked on website"

        ↓ AI

"Developed and optimized responsive web applications..."
```

Job description-এর সঙ্গে resume match:

```text
Resume
+
Job Description
        ↓
AI
        ↓
Match Score
Missing Keywords
Skill Gaps
Suggestions
```

---

# PHASE 6 — Coding Arena

এটা CareerForge-এর বড় differentiator হবে।

### Models

```text
CodingProblem
TestCase
Submission
```

Difficulty:

```text
Easy
Medium
Hard
```

User:

```text
Problem
   ↓
Monaco Editor
   ↓
Run
   ↓
Test Cases
   ↓
Submit
   ↓
Judge
   ↓
Result
```

Result:

```text
Accepted
Wrong Answer
Time Limit
Runtime Error
Compilation Error
```

এখানে **production Express server-এ arbitrary code execute করব না**। Judge0/sandboxed execution service ব্যবহার করব।

---

# PHASE 7 — Mock Assessment

Reference project-এর testing/MCQ complexity ধরব, কিন্তু CareerForge-এর নিজস্ব structure থাকবে।

Question types:

```text
MCQ
Multiple Select
Scenario Based
Coding
```

Features:

* Test instructions
* Timer
* Question navigation
* Mark for review
* Auto submit
* Score calculation
* Skill-wise result
* Correct/incorrect analysis
* History

তারপর:

```text
Your Score
Percentile
Rank
Skill Breakdown
Weak Areas
```

---

# PHASE 8 — AI Interview Coach

এটা খুব important module।

User choose করবে:

```text
Role:
Frontend Developer

Experience:
2 years

Difficulty:
Medium

Interview Type:
Technical
```

তারপর AI:

```text
Question
   ↓
User Answer
   ↓
AI Evaluation
```

Evaluation:

```text
Technical Accuracy
Communication
Depth
Clarity
Confidence
```

শেষে:

```text
Overall Score
Strengths
Weak Areas
Recommended Topics
```

Interview history-ও থাকবে।

---

# PHASE 9 — Razorpay Subscription

এখানে CareerForge commercial SaaS-এর মতো হবে।

Plans:

```text
FREE
PRO
PREMIUM
CAREER PRO
```

Payment flow:

```text
Choose Plan
    ↓
Create Razorpay Order
    ↓
Razorpay Checkout
    ↓
Payment
    ↓
Signature Verification
    ↓
Webhook
    ↓
Subscription Active
```

Models:

```text
Subscription
Payment
```

Premium API:

```text
authenticate
     ↓
checkSubscription
     ↓
premium feature
```

যেমন:

```text
Free user
→ limited AI interviews

Pro user
→ more AI interviews
→ advanced ATS
→ premium assessments
```

---

# PHASE 10 — Recruiter Panel

এখানে role-based access properly কাজে লাগবে।

```text
USER
RECRUITER
ADMIN
```

Recruiter dashboard:

```text
My Jobs
Applicants
Shortlisted
Interviews
Selected Candidates
```

Recruiter:

```text
Create Job
Edit Job
Delete Job
View Applicants
Shortlist
Reject
Schedule Interview
```

Candidate profile-এ দেখতে পারবে:

```text
Resume
Skills
Assessment Score
Coding Score
Interview Score
```

---

# PHASE 11 — Real-time Notifications

Socket.IO ব্যবহার করব।

Example:

```text
Recruiter shortlisted you
        ↓
Real-time notification
```

Other notifications:

```text
Application status changed
Interview scheduled
Job recommendation
AI report ready
Payment successful
```

Notification model থাকবে যাতে notification history-ও থাকে।

---

# PHASE 12 — Analytics

User analytics:

```text
Coding Performance
Interview Performance
Assessment Performance
Resume Score
Skill Progress
```

Charts:

```text
Score over time
Skill distribution
Assessment performance
Coding difficulty performance
```

Recharts ব্যবহার করব।

### Admin analytics

```text
Total Users
Total Recruiters
Total Jobs
Applications
Subscriptions
Revenue
AI Usage
Conversion Rate
```

---

# PHASE 13 — Admin Panel

Admin পুরো platform control করবে।

```text
Users
Recruiters
Jobs
Applications
Questions
Coding Problems
Payments
Subscriptions
Reports
```

Admin actions:

```text
Block User
Unblock User
Manage Jobs
Manage Questions
Manage Coding Problems
View Payments
View Revenue
```

Role middleware:

```text
verifyJWT
     ↓
requireRole("ADMIN")
     ↓
Admin API
```

---

# PHASE 14 — Frontend Integration

এখানে Next.js frontend পুরো product-এর সঙ্গে connect হবে।

Structure roughly:

```text
frontend/
├── app/
│   ├── login
│   ├── register
│   ├── dashboard
│   ├── jobs
│   ├── resume
│   ├── coding
│   ├── assessments
│   ├── interview
│   ├── pricing
│   ├── recruiter
│   └── admin
│
├── components/
├── redux/
├── services/
├── hooks/
├── types/
└── lib/
```

Redux ব্যবহার করব:

```text
authSlice
userSlice
jobSlice
resumeSlice
assessmentSlice
codingSlice
interviewSlice
notificationSlice
subscriptionSlice
```

Axios API layer থাকবে।

React Hook Form + Zod validation থাকবে।

---

# PHASE 15 — Testing + Security

এটা skip করব না।

### Backend testing

Test:

```text
Register
Login
Logout
Refresh
Protected routes
Role permissions
Jobs
Applications
Payments
```

### Security

* Password hashing
* HTTP-only cookies
* JWT validation
* Role authorization
* Input validation
* Rate limiting
* CORS
* Secure headers
* File upload validation
* Payment signature verification
* Webhook verification
* API error handling

---

# PHASE 16 — Deployment

সবশেষে:

```text
Next.js
   ↓
Vercel

Express
   ↓
Render / Railway

MongoDB
   ↓
MongoDB Atlas

Images
   ↓
Cloudinary
```

External services:

```text
Gemini
Razorpay
Judge0
Nodemailer
Cloudinary
```

তারপর:

```text
Production environment
Environment variables
CORS
Cookies
HTTPS
Database
Deployment testing
```

---

# 🧩 আমরা কীভাবে প্রতিটা module বানাব?

সবচেয়ে important অংশ এটা।

আমি চাই না তুমি শুধু code copy-paste করো।

প্রতিটা backend feature এই pattern-এ হবে:

```text
1. Model
      ↓
2. Validator
      ↓
3. Service
      ↓
4. Controller
      ↓
5. Route
      ↓
6. Middleware
      ↓
7. Postman Test
      ↓
8. Frontend API
      ↓
9. Frontend UI
      ↓
10. Final Test
```

যেমন এখন Auth:

```text
User Model             ✅
Register Validator     ✅
Register Service       ✅
Register Controller    ✅
Register Route         ✅
                     ↓
Login Validator        ✅
Login Service          ✅
Login Controller       ✅
Login Route            ✅
                     ↓
JWT                    ✅
Cookies                ✅
Auth Middleware        ✅
/me                    ✅
                     ↓
Logout                 ← NOW
Refresh Token          ← NEXT
```

### তাই এখন আমাদের immediate sequence:

```text
Logout
  ↓
Refresh Token
  ↓
Change Password
  ↓
Forgot Password
  ↓
Reset Password
  ↓
Email Verification
  ↓
Profile Update
  ↓
Auth Phase Complete
```

তারপর **Job Portal** শুরু করব।

এভাবে করলে CareerForge শুধু একটা tutorial project হবে না; তোমার reference-এর মতো **substantial full-stack product**, কিন্তু নিজের architecture/UI/business logic-সহ হবে। 
