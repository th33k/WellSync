const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  exercises: [
    {
      name: String,
      sets: Number,
      reps: Number,
      weight: Number,
      duration: Number,
      notes: String,
    },
  ],
  duration: Number,
  intensity: String,
  completed: {
    type: Boolean,
    default: false,
  },
  scheduledFor: Date,
  completedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Workout", workoutSchema);
