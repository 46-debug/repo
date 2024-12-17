const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/formDatabase")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit process on connection failure
  });


// Define Schema and Model
const formSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  availableDates: Date,
  images: [String],
});

const FormData = mongoose.model("FormData", formSchema);

// API Route to handle form submission
app.post("/api/form", async (req, res) => {
  try {
    const { title, description, price, availableDates, images } = req.body;
    const newForm = new FormData({ title, description, price, availableDates, images });
    await newForm.save();
    res.status(201).json({ message: "Form data saved successfully" });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
