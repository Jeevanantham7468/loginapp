import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { MOCK_USERS } from "./mockData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS for all origins in development and production
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Body parser
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    service: "NovaPulse Auth Gateway",
    timestamp: new Date().toISOString(),
  });
});

// POST: Login endpoint
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  // Basic validation on backend
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: "Missing credentials",
      message: "Please provide both email and password.",
    });
  }

  // Find user by email (case-insensitive)
  const normalizedEmail = email.trim().toLowerCase();
  const user = MOCK_USERS.find(
    (u) => u.email.toLowerCase() === normalizedEmail
  );

  if (!user) {
    return res.status(401).json({
      success: false,
      error: "User not found",
      message: "No account registered with this email address.",
    });
  }

  // Check password
  if (user.password !== password) {
    return res.status(401).json({
      success: false,
      error: "Invalid password",
      message: "The password you entered is incorrect. Please try again.",
    });
  }

  // Successful login response
  const mockToken = `np_live_${Buffer.from(`${user.id}:${Date.now()}`).toString("base64")}`;
  
  // Return user without sensitive credentials
  const { password: _, ...safeUser } = user;

  return res.status(200).json({
    success: true,
    message: "Authentication successful. Welcome back!",
    token: mockToken,
    user: safeUser,
  });
});

// GET: Demo credentials helper endpoint
app.get("/api/auth/demo-users", (req, res) => {
  const demoUsers = MOCK_USERS.map((u) => ({
    name: u.name,
    email: u.email,
    password: u.password,
    role: u.role,
    tier: u.tier,
  }));
  res.json({ success: true, users: demoUsers });
});

// Serve static frontend assets if built in production
const frontendDist = path.join(__dirname, "../frontend/dist");
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}

// Start Express server
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(` 🚀 NovaPulse Auth Server is running!`);
  console.log(` 📍 Local URL: http://localhost:${PORT}`);
  console.log(` 🔒 Health check: http://localhost:${PORT}/api/health`);
  console.log(`=========================================`);
});
