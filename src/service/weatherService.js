import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API;

export const getByCity = async (city) => {
    if (!API_KEY) throw new Error("falta la api key de openWeather")

  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
  try {
    const clima = await axios.get(baseUrl);
    return clima.data;
  } catch (error) {
    throw new Error("algo malo ha pasado "+error.message);
  }
};

