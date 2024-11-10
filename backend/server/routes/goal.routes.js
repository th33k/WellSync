// server/routes/goal.routes.js
const express = require("express");
const router = express.Router();
const goalController = require("../controllers/goal.controllers");
const auth = require("../middleware/auth");

// Basic CRUD routes
router.post("/", auth, goalController.createGoal);
router.get("/", auth, goalController.getGoals);
router.get("/:id", auth, goalController.getGoal); // Add this if you want to get a single goal
router.put("/:id", auth, goalController.updateGoal);
router.delete("/:id", auth, goalController.deleteGoal);

// Additional useful routes (optional)
router.put("/:id/progress", auth, goalController.updateProgress); // For updating just the progress
router.put("/:id/status", auth, goalController.updateStatus); // For updating just the status

module.exports = router;
