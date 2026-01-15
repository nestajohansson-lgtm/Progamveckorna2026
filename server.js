// server.js
import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config(); // Load GEMINI_API_KEY from .env

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(express.static("public")); // Serve frontend files from 'public'

// POST endpoint for chat messages
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Check if message exists
    if (!userMessage || userMessage.trim() === "") {
      return res.status(400).json({ reply: "Meddelandet är tomt" });
    }

    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) {
      console.error("GEMINI_API_KEY is missing in .env");
      return res.status(500).json({ reply: "Server error: API key missing" });
    }

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMessage }] }]
        })
      }
    );

    if (!response.ok) {
      console.error("Gemini API returned error:", response.status, response.statusText);
      return res.status(500).json({ reply: "Fel vid AI-anrop" });
    }

    const data = await response.json();

    // Safely extract AI reply
    const aiReply = data.candidates?.[0]?.content
      .map(c => c.text)
      .join("") || "Inget svar från AI";

    res.json({ reply: aiReply });

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ reply: "Fel vid AI-anrop" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
