import axios from "axios";

const API_KEY = import.meta.env.VITE_GROQ_API;
const baseUrl = "https://api.groq.com/openai/v1/chat/completions";

export const consultarGroq = async (message) => {
  if (!API_KEY) {
    throw new Error("Error: falta la api key");
  }

  try {
    const response = await axios.post(
      baseUrl,
      {
        model: "gemma2-9b-it",
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return (
      response.data.choices?.[0]?.message?.content ||
      "sin respuesta valida de la API"
    );
  } catch (error) {
    if (error.response) {
      throw new Error(
        `Error: ${error.response.status} - ${JSON.stringify(
          error.response.data
        )}`
      );
    } else {
      throw new Error("error de red o de la API: " + error.message);
    }
  }
};
