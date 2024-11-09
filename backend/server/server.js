require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

//const authRoutes = require("./routes/auth.routes");
const workoutRoutes = require("./routes/workout.routes");
//const meditationRoutes = require("./routes/meditation.routes");
const goalRoutes = require("./routes/goal.routes");
//const nutritionRoutes = require("./routes/nutrition.routes");
//const challengeRoutes = require("./routes/challenge.routes");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Database connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
//app.use("/api/auth", authRoutes);
app.use("/api/workouts", workoutRoutes);
//app.use("/api/meditations", meditationRoutes);
app.use("/api/goals", goalRoutes);
//app.use("/api/nutrition", nutritionRoutes);
//app.use("/api/challenges", challengeRoutes);
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
