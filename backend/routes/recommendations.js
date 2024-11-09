const axios = require("axios");

const fetchRecommendation = async () => {
  try {
    const response = await axios.post(
      "https://api.gemini.com/v1/get_recommendation",
      {
        goals: "fitness",
        mood: "energized",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching recommendation:", error);
  }
};

fetchRecommendation();
