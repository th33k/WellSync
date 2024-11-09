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
    console.error("Create goal error:", error); // For debugging
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
    console.error("Get goals error:", error); // For debugging
    res.status(500).json({ message: "Error fetching goals" });
  }
};

exports.getGoal = async (req, res) => {
  try {
    const goal = await Goal.findOne({
      _id: req.params.id,
      user: req.userData.userId,
    });

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    res.status(200).json(goal);
  } catch (error) {
    console.error("Get single goal error:", error); // For debugging
    res.status(500).json({ message: "Error fetching goal" });
  }
};

exports.updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, user: req.userData.userId },
      req.body,
      { new: true }
    );

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    res.status(200).json(goal);
  } catch (error) {
    console.error("Update goal error:", error); // For debugging
    res.status(500).json({ message: "Error updating goal" });
  }
};

exports.deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findOneAndDelete({
      _id: req.params.id,
      user: req.userData.userId,
    });

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    res.status(200).json({ message: "Goal deleted successfully" });
  } catch (error) {
    console.error("Delete goal error:", error); // For debugging
    res.status(500).json({ message: "Error deleting goal" });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, user: req.userData.userId },
      { progress: req.body.progress },
      { new: true }
    );

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    res.status(200).json(goal);
  } catch (error) {
    console.error("Update progress error:", error); // For debugging
    res.status(500).json({ message: "Error updating goal progress" });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, user: req.userData.userId },
      { status: req.body.status },
      { new: true }
    );

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    res.status(200).json(goal);
  } catch (error) {
    console.error("Update status error:", error); // For debugging
    res.status(500).json({ message: "Error updating goal status" });
  }
};
