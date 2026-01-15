// server.js
import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config(); // Load API key from .env

const app = express();
app.use(express.json());

// Endpoint for chat requests
app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;
        const API_KEY = process.env.GEMINI_API_KEY;

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

        const data = await response.json();
        const aiReply = data.candidates?.[0]?.content.map(c => c.text).join("") || "Inget svar från AI";

        res.json({ reply: aiReply });

    } catch (err) {
        console.error(err);
        res.status(500).json({ reply: "Fel vid AI-anrop" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
