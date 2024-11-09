import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import {
  Brain,
  Activity,
  Heart,
  Sun,
  MessageCircle,
  Zap,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState({
    name: "Alex",
    mood: "energetic",
    fitnessLevel: "intermediate",
    streak: 7,
    nextWorkout: null,
    nextMeditation: null,
    aiRecommendations: null,
  });

  const [motivation, setMotivation] = useState("");
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [meditationSession, setMeditationSession] = useState(null);

  useEffect(() => {
    fetchAIRecommendations();
  }, []);

  const fetchAIRecommendations = async () => {
    const mockData = {
      motivation:
        "Based on your consistent progress, you're building incredible momentum! Your dedication to morning workouts is paying off - keep this energy going! 💪",
      workout: {
        type: "Strength Training",
        focus: "Upper Body",
        exercises: [
          {
            name: "Push-ups",
            sets: 3,
            reps: "12-15",
            intensity: "Progressive",
          },
          { name: "Dumbbell Rows", sets: 3, reps: "10-12", weight: "Moderate" },
          {
            name: "Shoulder Press",
            sets: 3,
            reps: "10-12",
            intensity: "Challenging",
          },
        ],
      },
      meditation: {
        type: "Energy Boost",
        duration: 15,
        focus: "Mental Clarity",
      },
    };

    setMotivation(mockData.motivation);
    setWorkoutPlan(mockData.workout);
    setMeditationSession(mockData.meditation);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <Card className="bg-gradient-to-r from-blue-500 to-purple-500">
        <CardContent className="p-6">
          <div className="flex items-start justify-between text-white">
            <div>
              <h2 className="text-2xl font-bold mb-2">AI Coach Insights</h2>
              <p className="text-sm opacity-90">{motivation}</p>
            </div>
            <Brain className="h-8 w-8" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              AI-Generated Workout
            </CardTitle>
          </CardHeader>
          <CardContent>
            {workoutPlan && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">{workoutPlan.type}</h3>
                  <span className="text-sm text-blue-500">
                    Focus: {workoutPlan.focus}
                  </span>
                </div>
                <div className="space-y-3">
                  {workoutPlan.exercises.map((exercise, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{exercise.name}</span>
                        <span className="text-sm text-gray-500">
                          {exercise.sets} sets × {exercise.reps}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Intensity: {exercise.intensity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI-Generated Meditation
            </CardTitle>
          </CardHeader>
          <CardContent>
            {meditationSession && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">
                    {meditationSession.type}
                  </h3>
                  <span className="text-sm text-purple-500">
                    {meditationSession.duration} mins
                  </span>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Sun className="h-4 w-4 text-orange-500" />
                    <span className="font-medium">Focus Area</span>
                  </div>
                  <p className="text-gray-600">{meditationSession.focus}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI Wellness Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={[
                  { day: "Mon", energy: 80, mood: 75, focus: 85 },
                  { day: "Tue", energy: 85, mood: 80, focus: 82 },
                  { day: "Wed", energy: 75, mood: 85, focus: 78 },
                  { day: "Thu", energy: 90, mood: 88, focus: 88 },
                  { day: "Fri", energy: 85, mood: 90, focus: 85 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="energy"
                  stroke="#3b82f6"
                  name="Energy Level"
                />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="#8b5cf6"
                  name="Mood"
                />
                <Line
                  type="monotone"
                  dataKey="focus"
                  stroke="#10b981"
                  name="Focus"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="h-5 w-5 text-red-500" />
              <h3 className="font-semibold">Recovery Tip</h3>
            </div>
            <p className="text-sm text-gray-600">
              Based on your sleep patterns, consider a light stretching session
              today.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="h-5 w-5 text-blue-500" />
              <h3 className="font-semibold">Progress Insight</h3>
            </div>
            <p className="text-sm text-gray-600">
              Your strength is up 12% this month. Time to increase weights!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <MessageCircle className="h-5 w-5 text-purple-500" />
              <h3 className="font-semibold">Mindfulness Note</h3>
            </div>
            <p className="text-sm text-gray-600">
              Morning meditations are showing positive impact on your focus.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
