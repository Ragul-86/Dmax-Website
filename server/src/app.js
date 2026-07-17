import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import contactRoutes from "./routes/contact.routes.js";
import { contactRateLimiter } from "./middleware/rateLimiter.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";

export function createApp() {
  const app = express();

  // Behind a reverse proxy (nginx, Render, Railway, etc.) in production
  app.set("trust proxy", 1);

  app.use(helmet());
  app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
  app.use(express.json({ limit: "100kb" }));
  app.use(express.urlencoded({ extended: true, limit: "100kb" }));

  const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);

  app.use(
    cors({
      origin(origin, callback) {
        // Allow non-browser tools (no origin) and configured origins.
        if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error(`Origin ${origin} not allowed by CORS`));
      },
      credentials: true,
    }),
  );

  app.get("/api/health", (req, res) => {
    res.json({ ok: true, service: "dmax-server", time: new Date().toISOString() });
  });

  app.use("/api/contact", contactRateLimiter, contactRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
