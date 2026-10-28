import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "./pages/Index";
// Imported directly, not lazily: scripts/prerender.mjs renders it to HTML at build time.
import Reviews from "./pages/Reviews";

// The 404 page is not prerendered, so it is fetched on demand.
const NotFound = lazy(() => import("./pages/NotFound"));

// The router is supplied by the entry point: BrowserRouter in the browser
// (src/main.tsx) and StaticRouter when prerendering (src/entry-server.tsx).
const App = () => (
  <>
    <Toaster />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/reviews" element={<Reviews />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route
        path="*"
        element={
          <Suspense fallback={null}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  </>
);

export default App;
