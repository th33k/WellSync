const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["workout", "meditation", "nutrition"],
    required: true,
  },
  target: {
    type: mongoose.Schema.Mixed,
    required: true,
  },
  progress: {
    type: Number,
    default: 0,
  },
  deadline: Date,
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Goal", goalSchema);
