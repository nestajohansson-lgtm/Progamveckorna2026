import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const API_KEY = process.env.GEMINI_KEY;

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + AIzaSyBp8aCPOrM3jchnnUZtJOdoAChTXKzWhpg,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userMessage }] }]
      })
    }
  );

  const data = await response.json();
  const aiReply = data.candidates[0].content.map(c => c.text).join("");
  res.json({ reply: aiReply });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

const response = await fetch("/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: text })
});
const data = await response.json();
addMessage(data.reply, "ai");

npm install pg