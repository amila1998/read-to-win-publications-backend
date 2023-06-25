require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || process.env.DEV_PORT;

// Import database connection
require("./database/connection");

// Middleware
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Set trust proxy for secure cookies
app.set("trust proxy", 1);

// Routes
app.get("/", (req, res) => {
  res.send("Read to win publications backend server");
});

// HTTP request logger
app.listen(PORT, () => {
  console.log(`Server is starting at ${PORT}`);
});