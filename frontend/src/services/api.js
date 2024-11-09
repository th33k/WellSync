import axios from "axios";

const API_URL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
};

export const workoutApi = {
  getWorkouts: () => api.get("/workouts"),
  createWorkout: (workout) => api.post("/workouts", workout),
  updateWorkout: (id, workout) => api.put(`/workouts/${id}`, workout),
  deleteWorkout: (id) => api.delete(`/workouts/${id}`),
};

export const goalApi = {
  getGoals: () => api.get("/goals"),
  createGoal: (goal) => api.post("/goals", goal),
  updateGoal: (id, goal) => api.put(`/goals/${id}`, goal),
  deleteGoal: (id) => api.delete(`/goals/${id}`),
};

export const nutritionApi = {
  getNutritionLogs: () => api.get("/nutrition"),
  createNutritionLog: (log) => api.post("/nutrition", log),
  updateNutritionLog: (id, log) => api.put(`/nutrition/${id}`, log),
};

export const challengeApi = {
  getChallenges: () => api.get("/challenges"),
  joinChallenge: (id) => api.post(`/challenges/${id}/join`),
  leaveChallenge: (id) => api.post(`/challenges/${id}/leave`),
};

