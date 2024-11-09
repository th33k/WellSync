const Workout = require("../models/Workout");
const AIService = require("../../services/AIServices");

exports.createWorkout = async (req, res) => {
  try {
    const aiService = new AIService();
    const workoutPlan = await aiService.generateWorkoutPlan(
      req.body.userProfile
    );

    const workout = new Workout({
      user: req.userData.userId,
      ...workoutPlan,
    });

    await workout.save();
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ message: "Error creating workout" });
  }
};

exports.getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.userData.userId }).sort({
      scheduledFor: -1,
    });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching workouts" });
  }
};

// Add the missing controller methods that your routes are expecting
exports.getWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOne({
      _id: req.params.id,
      user: req.userData.userId,
    });

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ message: "Error fetching workout" });
  }
};

exports.updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, user: req.userData.userId },
      req.body,
      { new: true }
    );

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ message: "Error updating workout" });
  }
};

exports.deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({
      _id: req.params.id,
      user: req.userData.userId,
    });

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.status(200).json({ message: "Workout deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting workout" });
  }
};
