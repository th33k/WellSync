import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { workoutApi, goalApi } from "../services/api";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { Skeleton } from "./ui/skeleton";
import {
  Target,
  Calendar,
  TrendingUp,
  Activity,
  AlertCircle,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const StatCard = ({ title, value, icon: Icon, gradient }) => (
  <Card className={`bg-gradient-to-r ${gradient}`}>
    <CardContent className="p-6">
      <div className="flex items-center justify-between text-white">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <h2 className="text-3xl font-bold">{value}</h2>
        </div>
        <Icon className="h-8 w-8" />
      </div>
    </CardContent>
  </Card>
);

const SkeletonCard = () => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-16" />
        </div>
        <Skeleton className="h-8 w-8 rounded" />
      </div>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    completedWorkouts: 0,
    activeGoals: 0,
    streak: 0,
  });

  // Fetch dashboard data with error handling
  useEffect(() => {
    const controller = new AbortController();

    const fetchDashboardData = async () => {
      try {
        setError(null);
        const [workoutsRes, goalsRes] = await Promise.all([
          workoutApi.getWorkouts(),
          goalApi.getGoals(),
        ]);

        setWorkouts(workoutsRes.data);
        setGoals(goalsRes.data);

        // Calculate stats
        const completedWorkouts = workoutsRes.data.filter(
          (w) => w.completed
        ).length;
        const activeGoals = goalsRes.data.filter((g) => !g.completed).length;
        const streak = calculateStreak(workoutsRes.data);

        setStats({
          completedWorkouts,
          activeGoals,
          streak,
        });
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load dashboard data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    return () => controller.abort();
  }, []);

  // Memoized streak calculation
  const calculateStreak = useMemo(
    () => (workouts) => {
      const sortedWorkouts = workouts
        .filter((w) => w.completed)
        .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));

      let streak = 0;
      let currentDate = new Date();

      for (let workout of sortedWorkouts) {
        const workoutDate = new Date(workout.completedAt);
        const diffDays = Math.floor(
          (currentDate - workoutDate) / (1000 * 60 * 60 * 24)
        );

        if (diffDays <= 1) {
          streak++;
          currentDate = workoutDate;
        } else {
          break;
        }
      }

      return streak;
    },
    []
  );

  // Memoized chart data
  const chartData = useMemo(() => {
    return workouts
      .filter((w) => w.completed)
      .slice(-7)
      .map((w) => ({
        date: new Date(w.completedAt).toLocaleDateString(),
        duration: w.duration,
        intensity:
          w.intensity === "high" ? 3 : w.intensity === "medium" ? 2 : 1,
      }));
  }, [workouts]);

  if (error) {
    return (
      <Alert variant="destructive" className="m-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <StatCard
              title="Workout Streak"
              value={`${stats.streak} days`}
              icon={Activity}
              gradient="from-blue-500 to-blue-600"
            />
            <StatCard
              title="Completed Workouts"
              value={stats.completedWorkouts}
              icon={TrendingUp}
              gradient="from-purple-500 to-purple-600"
            />
            <StatCard
              title="Active Goals"
              value={stats.activeGoals}
              icon={Target}
              gradient="from-green-500 to-green-600"
            />
          </>
        )}
      </div>

      {/* Upcoming Workouts & Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Workouts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {workouts
                  .filter((w) => !w.completed)
                  .slice(0, 3)
                  .map((workout, index) => (
                    <div
                      key={workout._id || index}
                      className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{workout.type}</span>
                        <span className="text-sm text-gray-500">
                          {new Date(workout.scheduledFor).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Duration: {workout.duration} mins
                      </div>
                    </div>
                  ))}
                {workouts.filter((w) => !w.completed).length === 0 && (
                  <p className="text-gray-500 text-center py-4">
                    No upcoming workouts
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Active Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {goals
                  .filter((g) => !g.completed)
                  .slice(0, 3)
                  .map((goal, index) => (
                    <div
                      key={goal._id || index}
                      className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{goal.name}</span>
                        <span className="text-sm text-blue-500">
                          {goal.progress}% Complete
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all duration-300"
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                {goals.filter((g) => !g.completed).length === 0 && (
                  <p className="text-gray-500 text-center py-4">
                    No active goals
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Progress Charts */}
      <Card>
        <CardHeader>
          <CardTitle>Workout Progress</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-[300px] w-full" />
          ) : (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" name="Duration" />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    name="Intensity"
                    domain={[0, 3]}
                    ticks={[1, 2, 3]}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="duration"
                    fill="#3b82f6"
                    name="Duration (mins)"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="intensity"
                    fill="#8b5cf6"
                    name="Intensity Level"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
