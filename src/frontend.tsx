/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import { Analytics } from "@vercel/analytics/react";
import { ConvexProvider } from "convex/react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { convex } from "./convex";

function start() {
  const root = createRoot(document.getElementById("root")!);
  root.render(
    <ConvexProvider client={convex}>
      <App />
      <Analytics
        mode="production"
        scriptSrc="https://cdn.vercel-insights.com/v1/script.js"
      />
    </ConvexProvider>,
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}
