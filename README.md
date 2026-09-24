# NovaPulse - Full-Stack Authentication & Login System

An original, modern full-stack web application demonstrating secure client-server authentication integration using **React (Vite)** on the frontend and **Node.js (Express)** on the backend.

---

## 🌟 Highlights & Features

- **Unique Brand Identity**: "NovaPulse" – Developer & Cloud intelligence platform.
- **Frontend Validation**:
  - Empty field checks.
  - Regex-based work email validation (`name@domain.com`).
  - Password minimum length verification (≥ 6 characters).
  - Real-time inline error hints and touched-state validation.
- **Modern Interactive UI**:
  - Password visibility toggle (Eye / EyeOff).
  - 1-Click **Quick Demo Accounts** for instant testing without manual typing.
  - Live API status indicator pill (Online / Offline detection).
  - Loading spinner and disabled states during authentication request.
- **Backend Authentication (Express.js)**:
  - `POST /api/auth/login` endpoint with credential verification.
  - Returns mock Bearer Token and sanitized user payload.
  - Detailed error messages and HTTP status codes (200, 400, 401).
- **Dummy Dashboard Redirect**:
  - On successful login, displays personalized dashboard with user stats, avatar, role badge, session token, and working logout action.

---

## 🚀 How to Run the Project

### 1. Start the Backend Server (Port 5001)
```bash
cd backend
npm install
npm start
```

### 2. Start the Frontend Dev Server (Port 5173)
```bash
cd frontend
npm install
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## 🔑 Available Test Accounts

| Account Name | Email | Password | Role |
| :--- | :--- | :--- | :--- |
| **Alex Dev** | `alex.dev@novapulse.io` | `Password123!` | Senior Cloud Architect |
| **Elena Rostova** | `elena.lead@novapulse.io` | `SuperNova2026#` | Product Director |
| **Marcus Vance** | `marcus@novapulse.io` | `MockPassword2026` | Full Stack Engineer |

*(Or click any of the 1-click Quick Demo Account cards directly on the login screen)*
