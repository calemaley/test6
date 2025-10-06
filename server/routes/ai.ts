import type { RequestHandler } from "express";

const DEFAULTS = {
  openai: {
    endpoint: "https://api.openai.com/v1/chat/completions",
    model: "gpt-3.5-turbo",
  },
  groq: {
    endpoint: "https://api.groq.com/openai/v1/chat/completions",
    model: "llama-3.1-8b-instant",
  },
  openrouter: {
    endpoint: "https://openrouter.ai/api/v1/chat/completions",
    model: "openrouter/auto",
  },
} as const;

function pickProvider(explicit?: string | null) {
  const preferred = explicit?.toLowerCase();
  if (preferred === "openai" && process.env.OPENAI_API_KEY)
    return "openai" as const;
  if (preferred === "groq" && process.env.GROQ_API_KEY) return "groq" as const;
  if (preferred === "openrouter" && process.env.OPENROUTER_API_KEY)
    return "openrouter" as const;
  if (process.env.GROQ_API_KEY) return "groq" as const;
  if (process.env.OPENROUTER_API_KEY) return "openrouter" as const;
  if (process.env.OPENAI_API_KEY) return "openai" as const;
  return null;
}

export const chatCompletion: RequestHandler = async (req, res) => {
  try {
    const { messages, model, provider } = req.body ?? {};
    if (!Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ detail: "messages must be a non-empty array" });
      return;
    }

    const chosen = pickProvider(typeof provider === "string" ? provider : null);
    if (!chosen) {
      res
        .status(501)
        .json({
          detail:
            "No AI provider configured. Set GROQ_API_KEY, OPENROUTER_API_KEY, or OPENAI_API_KEY in environment.",
        });
      return;
    }

    const key =
      chosen === "groq"
        ? process.env.GROQ_API_KEY
        : chosen === "openrouter"
          ? process.env.OPENROUTER_API_KEY
          : process.env.OPENAI_API_KEY;

    const endpoint = DEFAULTS[chosen].endpoint;
    const selectedModel =
      typeof model === "string" && model.trim().length > 0
        ? model
        : DEFAULTS[chosen].model;

    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
        ...(chosen === "openrouter"
          ? {
              "HTTP-Referer": "https://builder.io",
              "X-Title": "Fusion Starter",
            }
          : {}),
      },
      body: JSON.stringify({
        model: selectedModel,
        messages,
        temperature: 0.2,
      }),
    });

    if (!upstream.ok) {
      const text = await upstream.text();
      res.status(upstream.status).json({ detail: text.slice(0, 2000) });
      return;
    }

    const data = await upstream.json();
    const content = data?.choices?.[0]?.message?.content ?? "";
    res.json({ content });
  } catch (error) {
    console.error("AI chat error", error);
    res.status(500).json({ detail: "AI chat failed" });
  }
};
