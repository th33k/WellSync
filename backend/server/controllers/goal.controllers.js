const Goal = require("../models/Goal");

exports.createGoal = async (req, res) => {
  try {
    const goal = new Goal({
      user: req.userData.userId,
      ...req.body,
    });

    await goal.save();
    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ message: "Error creating goal" });
  }
};

exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.userData.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching goals" });
  }
};
