import type { RequestHandler } from "express";
import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

const DATA_DIR = path.resolve(process.cwd(), "server", "data");
const DATA_FILE = path.join(DATA_DIR, "chatbot-sessions.json");

type ChatSender = "visitor" | "bot" | "system";

export interface ChatbotMessage {
  id: string;
  sender: ChatSender;
  content: string;
  createdAt: string;
  intent?: string | null;
}

export interface ChatbotSessionRecord {
  id: string;
  visitorName: string;
  visitorEmail: string;
  visitorPhone: string;
  createdAt: string;
  updatedAt: string;
  originPath?: string;
  metadata: {
    tutorialCompleted: boolean;
    leadCaptured: boolean;
  };
  lastIntent?: string | null;
  messages: ChatbotMessage[];
}

async function ensureDataFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify([]));
  }
}

async function readSessions(): Promise<ChatbotSessionRecord[]> {
  await ensureDataFile();
  const payload = await fs.readFile(DATA_FILE, "utf-8");
  try {
    const parsed = JSON.parse(payload) as ChatbotSessionRecord[];
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

async function writeSessions(sessions: ChatbotSessionRecord[]) {
  await ensureDataFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(sessions, null, 2));
}

export const listChatbotSessions: RequestHandler = async (_req, res) => {
  const sessions = await readSessions();
  const sorted = sessions.sort((a, b) =>
    a.updatedAt < b.updatedAt ? 1 : a.updatedAt > b.updatedAt ? -1 : 0,
  );
  res.json(sorted);
};

export const createChatbotSession: RequestHandler = async (req, res) => {
  const { visitorName, visitorEmail, visitorPhone, originPath, metadata } =
    req.body ?? {};
  if (!visitorName || !visitorEmail || !visitorPhone) {
    res.status(400).json({ detail: "Missing visitor details" });
    return;
  }

  const now = new Date().toISOString();
  const session: ChatbotSessionRecord = {
    id: randomUUID(),
    visitorName: String(visitorName).trim(),
    visitorEmail: String(visitorEmail).trim(),
    visitorPhone: String(visitorPhone).trim(),
    createdAt: now,
    updatedAt: now,
    originPath: originPath ? String(originPath) : undefined,
    metadata: {
      tutorialCompleted: Boolean(metadata?.tutorialCompleted ?? false),
      leadCaptured: true,
    },
    lastIntent: null,
    messages: [],
  };

  const sessions = await readSessions();
  sessions.push(session);
  await writeSessions(sessions);

  res.status(201).json(session);
};

export const appendChatbotMessage: RequestHandler = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ detail: "Missing session id" });
    return;
  }

  const { sender, content, intent } = req.body ?? {};
  if (!sender || !content) {
    res.status(400).json({ detail: "Missing message payload" });
    return;
  }

  const sessions = await readSessions();
  const session = sessions.find((item) => item.id === id);
  if (!session) {
    res.status(404).json({ detail: "Session not found" });
    return;
  }

  const message: ChatbotMessage = {
    id: randomUUID(),
    sender,
    content: String(content),
    createdAt: new Date().toISOString(),
    intent: intent ?? null,
  };

  session.messages.push(message);
  session.updatedAt = message.createdAt;
  if (intent) session.lastIntent = intent;

  await writeSessions(sessions);
  res.status(201).json(message);
};

export const updateChatbotSession: RequestHandler = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ detail: "Missing session id" });
    return;
  }

  const sessions = await readSessions();
  const session = sessions.find((item) => item.id === id);
  if (!session) {
    res.status(404).json({ detail: "Session not found" });
    return;
  }

  const { metadata, lastIntent, visitorEmail, visitorName, visitorPhone } =
    req.body ?? {};

  if (metadata) {
    session.metadata = {
      ...session.metadata,
      tutorialCompleted:
        metadata.tutorialCompleted ?? session.metadata.tutorialCompleted,
      leadCaptured: metadata.leadCaptured ?? session.metadata.leadCaptured,
    };
  }

  if (typeof lastIntent === "string" || lastIntent === null) {
    session.lastIntent = lastIntent;
  }

  if (typeof visitorName === "string") session.visitorName = visitorName;
  if (typeof visitorEmail === "string") session.visitorEmail = visitorEmail;
  if (typeof visitorPhone === "string") session.visitorPhone = visitorPhone;

  session.updatedAt = new Date().toISOString();
  await writeSessions(sessions);

  res.json(session);
};
