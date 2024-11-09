// services/AIService.js
import { GoogleGenerativeAI } from "@google/generative-ai";

class AIService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }

  async generateWorkoutPlan(userProfile) {
    const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Create a personalized workout plan for a user with the following profile:
      - Fitness Level: ${userProfile.fitnessLevel}
      - Goals: ${userProfile.goals.join(", ")}
      - Available Equipment: ${userProfile.equipment.join(", ")}
      - Time Available: ${userProfile.timeAvailable} minutes
      - Injuries/Limitations: ${userProfile.limitations.join(", ")}
      
      Format the response as a JSON object with the following structure:
      {
        "warmup": [{"exercise": "", "duration": "", "intensity": ""}],
        "mainWorkout": [{"exercise": "", "sets": "", "reps": "", "rest": ""}],
        "cooldown": [{"exercise": "", "duration": ""}],
        "totalDuration": "",
        "difficultyLevel": "",
        "notes": []
      }`;

    const result = await model.generateContent(prompt);
    return this.parseWorkoutResponse(result.response.text());
  }

  async generateMeditationSession(userProfile, mood) {
    const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Create a meditation session for a ${userProfile.meditationLevel} level user who is feeling ${mood}.
      Include guidance for breathing, focus points, and mindfulness techniques.
      
      Format the response as a JSON object with the following structure:
      {
        "duration": "",
        "phases": [{"name": "", "duration": "", "instruction": ""}],
        "breathingPattern": {"inhale": "", "hold": "", "exhale": ""},
        "focusPoints": [],
        "guidanceLevel": ""
      }`;

    const result = await model.generateContent(prompt);
    return this.parseMeditationResponse(result.response.text());
  }

  async generateInsights(metrics) {
    const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Analyze the following fitness metrics and provide insights:
      ${JSON.stringify(metrics, null, 2)}
      
      Format the response as a JSON object with the following structure:
      {
        "observations": [],
        "trends": [],
        "recommendations": [],
        "areas_for_improvement": []
      }`;

    const result = await model.generateContent(prompt);
    return this.parseInsights(result.response.text());
  }

  #parseWorkoutResponse(response) {
    try {
      return JSON.parse(response);
    } catch (error) {
      console.error("Error parsing workout response:", error);
      return this.#createDefaultWorkoutPlan();
    }
  }

  #parseMeditationResponse(response) {
    try {
      return JSON.parse(response);
    } catch (error) {
      console.error("Error parsing meditation response:", error);
      return this.#createDefaultMeditationSession();
    }
  }

  #parseInsights(response) {
    try {
      return JSON.parse(response);
    } catch (error) {
      console.error("Error parsing insights:", error);
      return this.#createDefaultInsights();
    }
  }

  #createDefaultWorkoutPlan() {
    return {
      warmup: [
        {
          exercise: "Light stretching",
          duration: "5 minutes",
          intensity: "low",
        },
      ],
      mainWorkout: [
        {
          exercise: "Bodyweight exercises",
          sets: "3",
          reps: "10",
          rest: "60 seconds",
        },
      ],
      cooldown: [{ exercise: "Walking", duration: "5 minutes" }],
      totalDuration: "30 minutes",
      difficultyLevel: "moderate",
      notes: [
        "Please consult with a healthcare provider before starting any new exercise routine",
      ],
    };
  }

  #createDefaultMeditationSession() {
    return {
      duration: "10 minutes",
      phases: [
        {
          name: "Breathing focus",
          duration: "5 minutes",
          instruction: "Focus on your breath",
        },
      ],
      breathingPattern: {
        inhale: "4 counts",
        hold: "4 counts",
        exhale: "4 counts",
      },
      focusPoints: ["Breath awareness"],
      guidanceLevel: "beginner",
    };
  }

  #createDefaultInsights() {
    return {
      observations: ["Insufficient data for detailed analysis"],
      trends: ["No trends identified"],
      recommendations: ["Continue regular exercise routine"],
      areas_for_improvement: ["Data collection consistency"],
    };
  }
}

// utils/WorkoutUtils.js
class WorkoutUtils {
  static calculateIntensity(workout) {
    const intensityScores = {
      low: 1,
      moderate: 2,
      high: 3,
    };

    const exerciseScores = workout.mainWorkout.map((exercise) => {
      const volumeScore =
        (parseInt(exercise.sets) * parseInt(exercise.reps)) / 10;
      const restScore = 60 / parseInt(exercise.rest.split(" ")[0]);
      return (volumeScore + restScore) / 2;
    });

    const avgScore =
      exerciseScores.reduce((a, b) => a + b, 0) / exerciseScores.length;
    return avgScore <= 1.5 ? "low" : avgScore <= 2.5 ? "moderate" : "high";
  }

  static generateRecoveryPlan(workout, userProfile) {
    const intensity = this.calculateIntensity(workout);

    return {
      recommendedRestDays:
        intensity === "high" ? 2 : intensity === "moderate" ? 1 : 0,
      stretchingRoutine: this.generateStretches(workout),
      nutritionTips: this.generateNutritionAdvice(intensity, userProfile),
      recoveryActivities: this.suggestRecoveryActivities(intensity),
    };
  }

  static generateStretches(workout) {
    const standardStretches = {
      upper: ["Arm circles", "Shoulder rolls", "Neck rotations"],
      lower: ["Leg swings", "Ankle rotations", "Calf stretches"],
      full: ["Child's pose", "Cat-cow stretch", "Downward dog"],
    };

    return {
      warmup: standardStretches.full,
      cooldown: [...standardStretches.upper, ...standardStretches.lower],
    };
  }

  static generateNutritionAdvice(intensity, userProfile) {
    const baseCalories = userProfile.weight * 15;
    const intensityMultiplier =
      intensity === "high" ? 1.2 : intensity === "moderate" ? 1.1 : 1;

    return {
      recommendedCalories: Math.round(baseCalories * intensityMultiplier),
      proteinTarget: Math.round(userProfile.weight * 2),
      hydrationTarget: Math.round(userProfile.weight * 0.03),
    };
  }

  static suggestRecoveryActivities(intensity) {
    const activities = {
      high: ["Light walking", "Gentle yoga", "Swimming"],
      moderate: ["Dynamic stretching", "Light cardio", "Mobility work"],
      low: ["Normal daily activities", "Light stretching"],
    };

    return activities[intensity] || activities.moderate;
  }
}

export { AIService, WorkoutUtils };
