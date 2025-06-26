const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 4000;
const TRIPADVISOR_API_KEY = "";
const weather_API_KEY = "";

app.use(cors());

app.get("/search", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "Missing search query" });

  try {
    const response = await axios.get(
      "https://api.content.tripadvisor.com/api/v1/location/search",
      {
        params: {
          key: TRIPADVISOR_API_KEY,
          language: "en",
          searchQuery: query,
          category: "attractions",
        },
        headers: {
          accept: "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "TripAdvisor API fetch failed" });
  }
});

app.get("/detail", async (req, res) => {
  const location_id = req.query.location_id;

  if (!location_id)
    return res.status(400).json({ error: "Missing location_id" });

  try {
    const response = await axios.get(
      `https://api.content.tripadvisor.com/api/v1/location/${location_id}/details`,
      {
        headers: {
          accept: "application/json",
        },
        params: {
          key: TRIPADVISOR_API_KEY,
          language: "en",
          currency: "HKD",
          category: "attractions",
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "TripAdvisor API fetch failed" });
  }
});

app.get("/weather", async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res.status(400).json({ error: "Missing coordinates" });
  }

  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat,
          lon,
          appid: weather_API_KEY,
          units: "metric",
        },
      }
    );

    const data = response.data;
    res.json({
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      condition: data.weather[0].main,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      icon: data.weather[0].main.toLowerCase(),
      location: `${data.name}, ${data.sys.country}`,
    });
  } catch (error) {
    console.error("OpenWeather error:", error.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
