export type InquiryType = "service" | "consultation" | "general";

export interface Submission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  type: InquiryType;
  service?: string;
  message: string;
  createdAt: number;
  reviewed?: boolean;
}

const STORAGE_KEY = "jbranky:submissions";
const AUTH_KEY = "jbranky:admin:auth";

export function saveSubmission(s: Omit<Submission, "id" | "createdAt" | "reviewed">) {
  const all = getSubmissions();
  const item: Submission = {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    reviewed: false,
    ...s,
  };
  all.unshift(item);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function getSubmissions(): Submission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Submission[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function setReviewed(id: string, reviewed: boolean) {
  const all = getSubmissions();
  const idx = all.findIndex((x) => x.id === id);
  if (idx >= 0) {
    all[idx].reviewed = reviewed;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  }
}

export function clearSubmissions() {
  localStorage.removeItem(STORAGE_KEY);
}

export function summary() {
  const all = getSubmissions();
  const totals = {
    total: all.length,
    service: all.filter((s) => s.type === "service").length,
    consultation: all.filter((s) => s.type === "consultation").length,
    general: all.filter((s) => s.type === "general").length,
    reviewed: all.filter((s) => s.reviewed).length,
    unreviewed: all.filter((s) => !s.reviewed).length,
  };
  return { totals, all };
}

export function isAuthed() {
  return localStorage.getItem(AUTH_KEY) === "1";
}

export function login(username: string, password: string) {
  const ok = username === "JBRANKY" && password === "admin@123";
  if (ok) localStorage.setItem(AUTH_KEY, "1");
  return ok;
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}
