// Import packages
const express = require("express");
const home = require("./routes/home"); // Ensure this points to the correct location

// Middlewares
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Routes
app.use("/home", home); // Prefix all routes in the home module with /home

// Connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
