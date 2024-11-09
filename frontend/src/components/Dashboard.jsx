import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    const fetchRecommendation = async () => {
      const response = await axios.post("/api/recommendation", {
        goals: "fitness",
        mood: "energized",
      });
      setRecommendation(response.data);
    };
    fetchRecommendation();
  }, []);

  return (
    <div className="dashboard">
      <h1>Welcome to WellSync</h1>
      {recommendation && (
        <div>
          <h2>Today&aposs Workout</h2>
          <p>{recommendation.workout}</p>
          <h2>Meditation</h2>
          <p>{recommendation.meditation}</p>
          <h2>Meal</h2>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
