# 💼 SkillSwap – Freelance Micro-Task Platform

**SkillSwap** is a secure, responsive, and full-stack freelance marketplace that connects clients and freelancers for efficient micro-task management. The platform features role-based dashboards, secure authentication, server-side filtering, and Stripe-powered payment processing to provide a seamless user experience.

---

## 🚀 Live Demo

🌐 **Live Website:** https://skillswap-client-beryl-three.vercel.app/

📂 **GitHub Repository:** https://github.com/atik783505/skillswap

<img width="900" height="450" alt="skillswap" src="https://github.com/user-attachments/assets/e3935d56-04f7-4cc3-bef0-5d08d11450a0" />


## 📖 Project Overview

SkillSwap is a peer-to-peer freelance platform where clients can post micro-tasks, freelancers can submit proposals and complete work, and administrators can manage the overall platform. The project demonstrates modern full-stack development concepts including Role-Based Access Control (RBAC), secure authentication, server-side pagination, advanced filtering, and online payment integration.

---

## 🛠 Technologies Used

### Frontend

- Next.js (App Router)
- React.js
- Tailwind CSS
- HeroUI
- Better Auth

### Backend

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Token)
- Stripe API

---

## ✨ Core Features

### 👥 Multi-Role Dashboard (RBAC)

- **Client Dashboard** – Create and manage tasks, review proposals, hire freelancers, and monitor spending.
- **Freelancer Dashboard** – Browse tasks, submit proposals, manage active work, submit completed work, and track earnings.
- **Admin Dashboard** – Manage users, remove inappropriate tasks, monitor transactions, and oversee platform activities.

### 🔍 Server-Side Pagination & Filtering

- Efficient server-side pagination with a maximum of **9 tasks per request**.
- Search tasks by title and filter by category.
- Automatically resets pagination when search or filters change.

### 🔐 Secure Authentication & Authorization

- Email/Password authentication.
- Google OAuth login using Better Auth.
- JWT-based authorization with secure HTTPOnly cookies.
- Protected routes and middleware validation.

### 💳 Stripe Payment Integration

- Secure Stripe Checkout implementation.
- Backend payment verification.
- Automatically updates task status after successful payment.

### 📱 Responsive User Interface

- Fully responsive across desktop, tablet, and mobile devices.
- Modern UI built with HeroUI and Tailwind CSS.

---

## 📦 Dependencies

### Frontend

- next
- react
- react-dom
- @heroui/react
- better-auth
- tailwindcss

### Backend

- express
- mongodb
- jsonwebtoken
- stripe
- cors
- dotenv
- cookie-parser

---

## 💻 Run the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/atik783505/skillswap.git
```

### 2. Navigate to the project folder

```bash
cd skillswap
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` (client) and `.env` (server) file.

Example:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### 5. Start the development server

```bash
npm run dev
```

### 6. Open your browser

```
http://localhost:3000
```

---

## 🔗 Resources

- 🌐 Live Website: https://skillswap-client-beryl-three.vercel.app/
- 📂 GitHub Repository: https://github.com/atik783505/skillswap
- ⚛️ Next.js: https://nextjs.org/
- 🎨 Tailwind CSS: https://tailwindcss.com/
- 🌼 HeroUI: https://www.heroui.com/
- 🔐 Better Auth: https://www.better-auth.com/
- 🍃 MongoDB: https://www.mongodb.com/
- 💳 Stripe: https://stripe.com/

---

## 👨‍💻 Author

**Atikur Rahman**
