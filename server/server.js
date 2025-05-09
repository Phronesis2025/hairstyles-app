import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/health", (req, res) => {
  res.json({ status: "Server deployed" });
});

// For local development
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

// Export for Vercel serverless function
export default app;
