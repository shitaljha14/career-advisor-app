import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const router = express.Router();

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

router.post("/", async (req, res) => {
  try {
    const { skills } = req.body;

    if (!skills || !Array.isArray(skills)) {
      return res.status(400).json({ error: "Invalid input format" });
    }

    const prompt = `
You are an expert AI career advisor.
Given these skills: ${skills.join(", ")},
suggest exactly 3 suitable career paths for the user.

Respond **only** in this JSON format:
[
  { "title": "Career title", "description": "2-line short description" },
  { "title": "Career title", "description": "2-line short description" },
  { "title": "Career title", "description": "2-line short description" }
]
No extra text, markdown, or explanations.
`;

    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173", // required for free-tier
        "X-Title": "AI Career Advisor",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct:free",
        messages: [
          { role: "system", content: "You are a helpful AI career guidance assistant." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 400,
      }),
    });

    const data = await response.json();
    console.log("📩 Full API response:", JSON.stringify(data, null, 2));

    const text = data?.choices?.[0]?.message?.content?.trim() || "";
    console.log("🧠 Raw AI output:", text);

    let careers = [];
    try {
      const match = text.match(/\[[\s\S]*\]/);
      if (match) {
        careers = JSON.parse(match[0]);
      } else {
        careers = [{ title: "Parsing Error", description: text }];
      }
    } catch (err) {
      console.error("⚠️ JSON parse error:", err);
      careers = [{ title: "Parsing Error", description: text }];
    }

    res.json(careers);
  } catch (error) {
    console.error("❌ OpenRouter API Error:", error);
    res.status(500).json({ error: "Something went wrong with the AI model." });
  }
});

export default router;
