import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.js";
import uploadRouter from "./routes/upload.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for requests from the frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "authorization"], // Include both cases for safety
    credentials: true, // Allow credentials if needed (e.g., cookies)
  })
);

// Explicitly handle preflight OPTIONS requests
app.options(
  "*",
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "authorization"],
    credentials: true,
  })
);

// Middleware to parse JSON bodies (needed for POST requests like logout)
app.use(express.json());

// Temporary root route (added in Step 2.1)
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Hairstyle Visualization API" });
});

// Health check route (from Phase 1)
app.get("/health", (req, res) => {
  res.json({ status: "Server running" });
});

// Authentication routes
app.use("/api/auth", authRouter);

// Upload route
app.use("/api", uploadRouter);

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
