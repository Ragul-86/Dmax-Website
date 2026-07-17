import axios from "axios";

// Base URL of the Express backend. Configure via VITE_API_URL in .env
// (defaults to same-origin /api, which works behind the dev proxy or a
// reverse proxy in production).
const baseURL = import.meta.env.VITE_API_URL || "/api";

export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});
