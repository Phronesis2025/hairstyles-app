import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.get("/health", (req, res) => {
  res.json({ status: "Server updated" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
