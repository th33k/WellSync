const express = require("express");
const router = express.Router();
const goalController = require("../controllers/goal.controller");
const auth = require("../middleware/auth");

router.post("/", auth, goalController.createGoal);
router.get("/", auth, goalController.getGoals);
router.put("/:id", auth, goalController.updateGoal);
router.delete("/:id", auth, goalController.deleteGoal);

module.exports = router;
