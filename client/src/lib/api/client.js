import axios from "axios";

// Base URL of the Express backend. Configure via VITE_API_URL in .env
// (defaults to same-origin /api, which works behind the dev proxy or a
// reverse proxy in production).
const baseURL = import.meta.env.VITE_API_URL || "/api";

// Vite bakes VITE_API_URL in at BUILD time, not at runtime — a .env file
// on your laptop has no effect on what Vercel builds. If this ever ships
// to production without VITE_API_URL set in the Vercel project's
// Environment Variables (pointing at the Render backend, e.g.
// https://your-service.onrender.com/api) and rebuilt, every API call
// silently falls back to same-origin "/api", which doesn't exist on
// Vercel's static host and fails as a network/CORS error, not a normal
// HTTP error. This warning only fires in the built production bundle so
// it's a fast way to confirm that's the cause from the browser console.
if (import.meta.env.PROD && !import.meta.env.VITE_API_URL) {
  console.warn(
    "[api] VITE_API_URL is not set in this production build — API calls will " +
      'target same-origin "/api", which is almost certainly wrong. Set ' +
      "VITE_API_URL in the Vercel project's Environment Variables to the " +
      "Render backend URL (…/api) and redeploy.",
  );
}

export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});
