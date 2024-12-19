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
mongoose.connect("mongodb://127.0.0.1:27017/formDatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
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

const paxSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: Number,
  travelers: Number,
  location: String,
  startDate: String,
  price: Number,
});

const FormData = mongoose.model("FormData", formSchema);

const paxData = mongoose.model("paxData", paxSchema);

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

app.post("/api/paxInfo", async (req, res) => {
  try {
    const { name, email, number, travelers, location, startDate, price } = req.body;
    const newpaxInfo = new paxData({ name, email, number, travelers, location, startDate, price });
    await newpaxInfo.save();
    res.status(201).json({ message: "Form data saved successfully" });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// API Route to get all form data
app.get("/api/form", async (req, res) => {
  try {
    const data = await FormData.find(); // Use the correct model
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching form data:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/form/:id", async (req, res) => {
  try {
    const data = await FormData.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
