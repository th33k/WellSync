const Workout = require("../models/Workout");
const AIService = require("../services/AIService");

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
