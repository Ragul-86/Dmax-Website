import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import contactRoutes from "./routes/contact.routes.js";
import { contactRateLimiter } from "./middleware/rateLimiter.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";
import { sendTestEmail } from "./utils/mailer.js";

export function createApp() {
  const app = express();

  // Behind a reverse proxy (nginx, Render, Railway, etc.) in production
  app.set("trust proxy", 1);

  app.use(helmet());
  app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
  app.use(express.json({ limit: "100kb" }));
  app.use(express.urlencoded({ extended: true, limit: "100kb" }));

  // Trim trailing slashes on both sides so "https://foo.vercel.app/" (a
  // common copy-paste mistake in dashboard env vars) still matches the
  // browser's actual Origin header, which never has a trailing slash.
  const stripTrailingSlash = (s) => s.replace(/\/+$/, "");
  const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
    .split(",")
    .map((o) => stripTrailingSlash(o.trim()))
    .filter(Boolean);

  app.use(
    cors({
      origin(origin, callback) {
        // Allow non-browser tools (no origin) and configured origins.
        if (!origin || allowedOrigins.includes(stripTrailingSlash(origin))) {
          return callback(null, true);
        }
        console.warn(
          `[cors] Blocked request from origin "${origin}". Allowed origins: ${allowedOrigins.join(", ") || "(none configured)"}`,
        );
        return callback(new Error(`Origin ${origin} not allowed by CORS`));
      },
      credentials: true,
    }),
  );

  app.get("/api/health", (req, res) => {
    res.json({ ok: true, service: "dmax-server", time: new Date().toISOString() });
  });

  // Standalone email-delivery diagnostic — sends a real test email through
  // the exact same Resend path the contact form uses and reports back
  // whatever Resend actually said, success or failure. Never swallows an
  // error into a fake { success: true }; only reports success once Resend
  // has confirmed the message with a real message id.
  app.get("/api/test-email", async (req, res) => {
    const result = await sendTestEmail();
    if (result.ok) {
      return res.json({ success: true, messageId: result.id, response: result.response });
    }
    return res.status(502).json({
      success: false,
      status: result.status,
      error: result.error?.message || "Unknown error",
      response: result.response,
    });
  });

  app.use("/api/contact", contactRateLimiter, contactRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
