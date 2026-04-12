/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import { Analytics } from "@vercel/analytics/react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { getVercelAnalyticsProps } from "./vercel-analytics-props";

function start() {
  const root = createRoot(document.getElementById("root")!);
  root.render(
    <>
      <App />
      <Analytics {...getVercelAnalyticsProps()} />
    </>,
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}
