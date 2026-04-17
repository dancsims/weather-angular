require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/weather", async (req, res) => {
  const { lat, lon, zip, city, units } = req.query;
  const apiKey = process.env.OPENWEATHER_API_KEY;
  let url = "";

  if (lat && lon) {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units || "metric"}`;
  } else if (zip) {
    url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=${units || "metric"}`;
  } else if (city) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units || "metric"}`;
  } else {
    return res.status(400).json({ error: "Missing location parameters" });
  }

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.get("/api/forecast", async (req, res) => {
  const { lat, lon, zip, city, units } = req.query;
  const apiKey = process.env.OPENWEATHER_API_KEY;
  let url = "";

  if (lat && lon) {
    url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units || "metric"}`;
  } else if (zip) {
    url = `https://api.openweathermap.org/data/2.5/forecast?zip=${zip}&appid=${apiKey}&units=${units || "metric"}`;
  } else if (city) {
    url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units || "metric"}`;
  } else {
    return res.status(400).json({ error: "Missing location parameters" });
  }

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch forecast data" });
  }
});

// GEO endpoints
app.get("/api/geo/city", async (req, res) => {
  const { q, limit } = req.query;
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!q) return res.status(400).json({ error: "Missing city query" });
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(q)}&limit=${limit || 1}&appid=${apiKey}`;
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch city geo data" });
  }
});

app.get("/api/geo/zip", async (req, res) => {
  const { zip } = req.query;
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!zip) return res.status(400).json({ error: "Missing zip query" });
  const url = `https://api.openweathermap.org/geo/1.0/zip?zip=${encodeURIComponent(zip)}&appid=${apiKey}`;
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch zip geo data" });
  }
});

app.get("/api/geo/reverse", async (req, res) => {
  const { lat, lon, limit } = req.query;
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!lat || !lon)
    return res.status(400).json({ error: "Missing lat or lon" });
  const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit || 1}&appid=${apiKey}`;
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reverse geo data" });
  }
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
