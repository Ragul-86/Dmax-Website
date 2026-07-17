import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/lib/theme";
import { SmoothScroll } from "@/components/dmax/SmoothScroll";
import { ScrollToTop } from "@/components/dmax/ScrollToTop";
import { IntroOverlay } from "@/components/dmax/IntroOverlay";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Home ships eagerly — it's the primary landing route and should paint
// with zero Suspense delay. Every other route is code-split into its own
// chunk so first-time visitors only download what the homepage needs.
import Home from "@/pages/Home";
const About = lazy(() => import("@/pages/About"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const ResultsPage = lazy(() => import("@/pages/ResultsPage"));
const ProcessPage = lazy(() => import("@/pages/ProcessPage"));
const Services = lazy(() => import("@/pages/Services"));
const FaqPage = lazy(() => import("@/pages/FaqPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <SmoothScroll />
        <ScrollToTop />
        <IntroOverlay />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
