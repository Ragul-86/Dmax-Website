import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles.css";

// Let the app own scroll position entirely (ScrollToTop.jsx + Lenis) instead
// of letting the browser also restore a remembered scroll offset on
// refresh. Without this, a hard refresh on a page scrolled down can
// restore that old scroll position natively before React even mounts —
// then, as images/fonts finish loading and the document's height settles,
// the browser can nudge that restored position again to compensate,
// which is exactly what produced a visible "background jumps after load"
// glitch on the Hero's scroll-linked parallax layers.
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
