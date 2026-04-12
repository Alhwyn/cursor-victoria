/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import { Analytics } from "@vercel/analytics/react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

function start() {
  const root = createRoot(document.getElementById("root")!);
  root.render(
    <>
      <App />
      <Analytics
        mode="production"
        scriptSrc="https://cdn.vercel-insights.com/v1/script.js"
      />
    </>,
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}
