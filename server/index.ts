import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const proxyTarget =
    process.env.ADMIN_PROXY_TARGET ?? process.env.API_PROXY_TARGET ?? null;

  app.use("/admin-api", async (req, res) => {
    if (!proxyTarget) {
      res.status(500).json({ detail: "Admin API proxy target not configured" });
      return;
    }

    try {
      const upstreamPath = req.originalUrl.replace(/^\/admin-api/, "") || "/";
      const targetUrl = new URL(upstreamPath, proxyTarget);

      const headers = new Headers();
      Object.entries(req.headers).forEach(([key, value]) => {
        if (!value) return;
        const lower = key.toLowerCase();
        if (["host", "content-length", "connection"].includes(lower)) return;
        if (Array.isArray(value)) headers.set(key, value.join(","));
        else headers.set(key, value);
      });

      const serviceToken = process.env.ADMIN_PROXY_TOKEN?.trim();
      const needsServiceToken = upstreamPath.startsWith("/api/requests");
      if (serviceToken && needsServiceToken && !headers.has("Authorization")) {
        const headerValue = serviceToken.startsWith("Token ")
          ? serviceToken
          : `Token ${serviceToken}`;
        headers.set("Authorization", headerValue);
      }

      let body: RequestInit["body"];
      const method = req.method?.toUpperCase() ?? "GET";
      if (!["GET", "HEAD"].includes(method)) {
        if (req.is("application/json") && req.body && typeof req.body === "object") {
          body = JSON.stringify(req.body);
          if (!headers.has("Content-Type")) {
            headers.set("Content-Type", "application/json");
          }
        } else if (typeof req.body === "string") {
          body = req.body;
        }
      }

      const upstreamResponse = await fetch(targetUrl, {
        method,
        headers,
        body,
      });

      res.status(upstreamResponse.status);
      upstreamResponse.headers.forEach((value, key) => {
        if (key.toLowerCase() === "set-cookie") {
          res.append("set-cookie", value);
          return;
        }
        if (key.toLowerCase() === "transfer-encoding") return;
        res.setHeader(key, value);
      });

      if (upstreamResponse.status === 204) {
        res.end();
        return;
      }

      const buffer = Buffer.from(await upstreamResponse.arrayBuffer());
      res.send(buffer);
    } catch (error) {
      console.error("Admin API proxy error", error);
      res.status(502).json({ detail: "Failed to reach admin backend" });
    }
  });

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  return app;
}
