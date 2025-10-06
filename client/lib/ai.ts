export type AiMessage = { role: "system" | "user" | "assistant"; content: string };

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return (await res.json()) as T;
}

export async function chatWithAI(messages: AiMessage[], options?: { model?: string; provider?: "openrouter" | "groq" | "openai" }) {
  const res = await fetch("/api/ai/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, ...options }),
  });
  return handle<{ content: string }>(res);
}
