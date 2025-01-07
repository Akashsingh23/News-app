require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 5000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "./public")));

app.use(cors());

// API endpoint for fetching news
app.get("/news", async (req, res) => {
    try {
        const query = req.query.q;
        const apiKey = process.env.API_KEY; // Access API key from .env
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;

        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        console.error("Proxy server error:", error);
        res.status(500).json({ error: "Failed to fetch news" });
    }
});

// Handle all other routes by serving the index.html file
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});