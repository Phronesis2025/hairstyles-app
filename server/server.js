import express from "express";

const app = express();
const port = 5000;

app.get("/test", (req, res) => {
  res.send("Test route updated");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
