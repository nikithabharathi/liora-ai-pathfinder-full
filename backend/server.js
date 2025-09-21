// backend/server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// CORS setup for local + deployed frontend
const allowedOrigins = [
  /^http:\/\/localhost:(\d{4,5})$/,
  /^http:\/\/127\.0\.0\.1:(\d{4,5})$/,
  "https://lioraaipathfinder.netlify.app/" // <-- replace with your deployed frontend URL
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow server-to-server or Postman
      const ok = allowedOrigins.some((re) =>
        typeof re === "string" ? re === origin : re.test(origin)
      );
      callback(ok ? null : new Error("CORS not allowed"), ok);
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());
app.use(express.json());

// Hugging Face Together inference client
const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

// Model
const SELECTED_MODEL = "meta-llama/Meta-Llama-3-70B-Instruct:together";
console.log("Using HF model:", SELECTED_MODEL);

// Chat completion endpoint
app.post("/api/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    console.log("/api/generate called", {
      promptPreview: String(prompt).slice(0, 80),
      promptLength: String(prompt).length,
    });

    try {
      const completion = await client.chat.completions.create(
        {
          model: SELECTED_MODEL,
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 256,
        },
        { timeout: 60000 }
      );

      const reply =
        completion?.choices?.[0]?.message?.content?.trim?.() ?? "";
      if (!reply) console.warn("Router returned no choices or empty content");
      return res.json({ reply });
    } catch (primaryError) {
      console.error("Primary chat completion failed", {
        message: primaryError.message,
        status: primaryError?.status,
        data: primaryError?.response?.data,
      });
      return res
        .status(500)
        .json({ error: "Failed to generate response", details: primaryError.message });
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  const isTokenSet = Boolean(process.env.HF_TOKEN);
  res.json({
    status: "ok",
    port: PORT,
    hfToken: isTokenSet ? "set" : "missing",
    model: SELECTED_MODEL,
  });
});

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Backend is running",
    endpoints: {
      health: "/health",
      generate: { path: "/api/generate", method: "POST", body: { prompt: "your text prompt" } },
    },
  });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
