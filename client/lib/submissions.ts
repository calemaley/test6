export type InquiryType = "service" | "consultation" | "general";
export type SubmissionStatus = "new" | "reviewed" | "unreviewed" | "pending" | string;

type NormalizedType = InquiryType | "other";

export interface Submission {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  type: string;
  normalizedType: NormalizedType;
  service: string | null;
  message: string;
  status: SubmissionStatus;
  createdAt: string;
  reviewed: boolean;
}

const AUTH_KEY = "jbranky:admin:token";
const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000").replace(/\/$/, "");

interface ApiRequest {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  type: string;
  service: string | null;
  message: string;
  status: SubmissionStatus;
  created_at: string;
}

interface FetchOptions extends RequestInit {
  auth?: boolean;
  expectJson?: boolean;
}

function getToken() {
  try {
    return localStorage.getItem(AUTH_KEY) || null;
  } catch {
    return null;
  }
}

function setToken(token: string | null) {
  try {
    if (token) localStorage.setItem(AUTH_KEY, token);
    else localStorage.removeItem(AUTH_KEY);
  } catch {}
}

async function apiFetch<T = unknown>(path: string, opts: FetchOptions = {}): Promise<T> {
  const { auth = true, expectJson = true, headers, ...init } = opts;
  const url = `${API_BASE}${path}`;
  const reqHeaders = new Headers(headers ?? {});

  if (auth) {
    const token = getToken();
    if (token) {
      reqHeaders.set("Authorization", `Token ${token}`);
    }
  }

  if (init.body && !reqHeaders.has("Content-Type")) {
    reqHeaders.set("Content-Type", "application/json");
  }

  const res = await fetch(url, { ...init, headers: reqHeaders });

  if (!res.ok) {
    let detail = res.statusText;
    try {
      const data = await res.json();
      detail = typeof data === "string" ? data : data.detail ?? JSON.stringify(data);
    } catch {}
    throw new Error(detail || `Request failed (${res.status})`);
  }

  if (!expectJson || res.status === 204) {
    return undefined as T;
  }

  return (await res.json()) as T;
}

function normalizeType(type: string | null | undefined): NormalizedType {
  if (!type) return "other";
  const lower = type.toLowerCase();
  if (lower.includes("service") || lower === "service") return "service";
  if (lower.includes("consult") || lower === "consultation") return "consultation";
  if (lower.includes("general")) return "general";
  return (lower as NormalizedType) ?? "other";
}

function mapSubmission(item: ApiRequest): Submission {
  const normalizedType = normalizeType(item.type);
  const reviewed = item.status === "reviewed";
  return {
    id: item.id,
    name: item.name,
    email: item.email,
    phone: item.phone,
    type: item.type,
    normalizedType,
    service: item.service,
    message: item.message,
    status: item.status,
    createdAt: item.created_at,
    reviewed,
  };
}

export function isAuthed() {
  return Boolean(getToken());
}

export async function login(username: string, password: string) {
  const data = await apiFetch<{ auth_token: string }>("/auth/token/login/", {
    method: "POST",
    auth: false,
    body: JSON.stringify({ username, password }),
  });
  setToken(data.auth_token);
  return true;
}

export async function logout() {
  try {
    await apiFetch("/auth/token/logout/", { method: "POST", expectJson: false });
  } catch {
    // ignore logout failures but still clear token
  }
  setToken(null);
}

export async function fetchCurrentUser() {
  return apiFetch("/auth/users/me/", { method: "GET" });
}

export interface CreateSubmissionPayload {
  name: string;
  email: string;
  phone?: string | null;
  type: string;
  service?: string | null;
  message: string;
  status?: SubmissionStatus;
}

export async function saveSubmission(payload: CreateSubmissionPayload) {
  const body = {
    ...payload,
    phone: payload.phone ?? "",
    service: payload.service ?? "",
    status: payload.status ?? "new",
  };
  await apiFetch<ApiRequest>("/api/requests/", {
    method: "POST",
    body: JSON.stringify(body),
    auth: false,
  });
}

export async function getSubmissions(): Promise<Submission[]> {
  const data = await apiFetch<ApiRequest[]>("/api/requests/", { method: "GET" });
  return data.map(mapSubmission);
}

export async function updateSubmissionStatus(id: number, status: SubmissionStatus) {
  const data = await apiFetch<ApiRequest>(`/api/requests/${id}/`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  return mapSubmission(data);
}

export function clearAuth() {
  setToken(null);
}
