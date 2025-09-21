import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

const SELECTED_MODEL = "meta-llama/Meta-Llama-3-70B-Instruct:together";

export async function handler(event, context) {
  try {
    if (!event.body) {
      return { statusCode: 400, body: JSON.stringify({ error: "No request body" }) };
    }

    const { prompt } = JSON.parse(event.body);

    if (!prompt) {
      return { statusCode: 400, body: JSON.stringify({ error: "Prompt is required" }) };
    }

    const completion = await client.chat.completions.create({
      model: SELECTED_MODEL,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 256,
    });

    const reply = completion?.choices?.[0]?.message?.content?.trim?.() || "";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    console.error("AI Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to generate response", details: err.message }),
    };
  }
}
