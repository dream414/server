require("dotenv").config();  // 👈 سب سے اوپر ہونا ضروری ہے

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// 🔹 MongoDB Atlas Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.log("❌ MongoDB Error showed: " + err));

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
    res.json({ success: true, message: "✅ Form data saved !" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
