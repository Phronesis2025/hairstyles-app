import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
