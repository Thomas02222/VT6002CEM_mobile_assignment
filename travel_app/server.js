const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 4000;
const TRIPADVISOR_API_KEY = "1A96520AB2A54B51800370F864EACA66";

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
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "TripAdvisor API fetch failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
