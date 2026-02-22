// It loads expressjs module into the index.js
import express from "express";
// Initializes new instance of express application
const app = express();

app.get("/", (req, res) => {
  res.send("Multi stage docker build");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
