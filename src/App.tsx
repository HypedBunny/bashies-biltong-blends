import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "./pages/Index";

// Only the home page is needed on first load; the 404 page is fetched on demand.
const NotFound = lazy(() => import("./pages/NotFound"));

// The router is supplied by the entry point: BrowserRouter in the browser
// (src/main.tsx) and StaticRouter when prerendering (src/entry-server.tsx).
const App = () => (
  <>
    <Toaster />
    <Routes>
      <Route path="/" element={<Index />} />
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
