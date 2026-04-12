import type { AnalyticsProps } from "@vercel/analytics/react";

/**
 * Vercel Web Analytics: use the CDN script (resilient intake) and, when built on
 * Vercel, absolute intake URLs pointing at the deployment origin.
 *
 * Relative `/_vercel/insights/*` requests otherwise go to the browser's current host
 * (e.g. a custom domain or CDN) where those routes may not exist, so the dashboard
 * stays empty despite traffic.
 *
 * `process.env.VERCEL_ANALYTICS_ORIGIN` is injected in `build.ts` from `VERCEL_URL`.
 */
export function getVercelAnalyticsProps(): AnalyticsProps {
  const origin =
    typeof process !== "undefined" && process.env.VERCEL_ANALYTICS_ORIGIN
      ? process.env.VERCEL_ANALYTICS_ORIGIN.replace(/\/$/, "")
      : "";

  const base: AnalyticsProps = {
    mode: "production",
    scriptSrc: "https://cdn.vercel-insights.com/v1/script.js",
  };

  if (!origin) return base;

  return {
    ...base,
    viewEndpoint: `${origin}/_vercel/insights/view`,
    eventEndpoint: `${origin}/_vercel/insights/event`,
    sessionEndpoint: `${origin}/_vercel/insights/session`,
  };
}
