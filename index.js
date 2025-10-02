const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// 🔹 MongoDB Atlas Connection (direct string with username & password)
mongoose
  .connect("mongodb+srv://developerfrontend00_db_user:hYU9ZLKFVIYQFmZf@cluster0.uiesak7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => console.log("❌ MongoDB Error: " + err));

// Schema
const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

// Model
const Form = mongoose.model("Form", formSchema);

// API Route
app.post("/api/form", async (req, res) => {
  try {
    const newForm = new Form(req.body);
    await newForm.save();
    res.json({ success: true, message: "✅ Form data saved!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
