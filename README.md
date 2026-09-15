# CareerForge

CareerForge is a modern, comprehensive SaaS career preparation and recruitment acceleration platform. It provides end-to-end features including user authentication, resume building, AI ATS score checking, mock assessments, coding arena, and interview coaching.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, Redux Toolkit, Tailwind CSS, TypeScript
- **Backend**: Node.js, Express.js (ES Modules), MongoDB with Mongoose, Zod
- **Authentication**: JWT (Access & Refresh tokens with HTTP-only cookies), bcryptjs
- **Emails**: Resend API

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/AmitKumarDe/careerforge.git
cd careerforge
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Fill in your environment variables in .env
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local
# Verify NEXT_PUBLIC_API_URL in .env.local
npm run dev
```

---

## 🔐 Environment Variables

### Backend (`backend/.env.example`)
- `PORT` - Server port (e.g., `5000`)
- `NODE_ENV` - Environment mode (`development` / `production`)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `ACCESS_TOKEN_SECRET` / `ACCESS_TOKEN_EXPIRY` - Access token configuration
- `REFRESH_TOKEN_SECRET` / `REFRESH_TOKEN_EXPIRY` - Refresh token configuration
- `CORS_ORIGIN` - Frontend URL for CORS configuration
- `RESEND_API_KEY` / `RESEND_FROM_EMAIL` - Resend email service credentials

### Frontend (`frontend/.env.example`)
- `NEXT_PUBLIC_API_URL` - Backend API base URL (e.g., `http://localhost:5000/api`)

---

## 📄 License
ISC
