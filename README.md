# SkillSwap — Freelance Micro-Task Platform

SkillSwap is a secure, responsive peer-to-peer freelance marketplace designed for rapid micro-task management[cite: 1]. It allows clients to post small tasks, enables freelancers to submit proposals and deliver work, and provides admins with comprehensive platform moderation[cite: 1].

---
## 🔗 Live Website Link

Explore the active application ecosystem here: 
👉 **[SkillSwap Live Deployment Link](https://skillswap-client-beryl-three.vercel.app/)**

---

## 🚀 Project Purpose

The primary objective of **SkillSwap** is to build an active repository for collaborative networking where quick online micro-tasks can be outsourced efficiently without massive agency fees[cite: 1]. Technically, this full-stack application serves to demonstrate robust Role-Based Access Control (RBAC), advanced server-side data filtration, and production-ready payment flow integrations[cite: 1].

---

## ✨ Key Features

### 1. Multi-Tenant Role Dashboards (RBAC)
* **Client Dashboard:** Post and manage tasks, review applications/proposals, accept bidders, and track spending metrics[cite: 1].
* **Freelancer Dashboard:** Browse open micro-tasks, submit job proposals, track active projects, submit work links, and view earnings breakdown[cite: 1].
* **Admin Dashboard:** Access global platform metrics, manage user accounts (block/unblock), delete guideline-breaching tasks, and review transaction history[cite: 1].

### 2. High-Performance Server-Side Pagination & Filters
* **Strict Query Limits:** Default database operations are restricted to fetch a maximum count of **9 task documents** per single query loop to reduce load[cite: 1].
* **Dynamic Query Preservation:** Text title searches and category options are tightly bound with pagination controllers to prevent losing active search terms[cite: 1].
* **Auto-Reset Mechanism:** Changing any search keywords or switching dropdown filters instantly resets active pagination views back to **Page 1**[cite: 1].

### 3. Secure Multi-Layered Authentication
* **BetterAuth Framework:** Handles identity management via standard Email/Password forms and Google OAuth registration flows[cite: 1].
* **JWT & Middleware Safeguards:** Generates encrypted JSON Web Tokens (JWT) bound to secure **HTTPOnly cookies** to prevent token leakage and protect dashboard routes[cite: 1].

### 4. Stripe Checkout Integration
* Integrated Stripe payment pipeline executing server checkout functions and backend session verification before shifting task tracking statuses to "In Progress"[cite: 1].

---

## 📦 Core NPM Packages Used

### Frontend Ecosystem
* `next` — App Router optimization architecture and dynamic route parameter handling[cite: 1].
* `react` & `react-dom` — View rendering foundation implementing non-blocking transitions[cite: 1].
* `@heroui/react` — Contemporary design framework powering fully responsive pagination structures[cite: 1].
* `better-auth` — Identity management orchestrating session bindings[cite: 1].
* `tailwindcss` — Utility-first styling architecture managing dark grids and fluid layouts[cite: 1].

### Backend Ecosystem
* `express` — Fast Node.js application routing container managing structural API requests[cite: 1].
* `mongodb` — Native MongoDB driver powering optimized data pipeline aggregations (`skip`, `limit`, `countDocuments`)[cite: 1].
* `jsonwebtoken` — Encapsulates identity tokens within cryptographically secure cookie payloads[cite: 1].
* `stripe` — Orchestrates secure backend transaction checkouts and session verifications[cite: 1].

