const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  goals: { type: String },
  mood: String,
  preferences: { workout: String, meditation: String },
  logs: [{ date: Date, activity: String }],
});

module.exports = mongoose.model("User", userSchema);
