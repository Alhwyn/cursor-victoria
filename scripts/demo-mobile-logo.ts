#!/usr/bin/env bun
/**
 * Opens the app in a mobile-sized Chromium viewport, waits for the hero logo
 * video to play once, and saves a screenshot (for verifying the SVG ↔ video
 * handoff on narrow screens).
 *
 * Requires: `bun add -d playwright` then `bunx playwright install chromium`
 */

import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(fileURLToPath(new URL("..", import.meta.url)));

function pickEphemeralPort(): number {
  return 40_000 + Math.floor(Math.random() * 20_000);
}

async function waitForHttpOk(url: string, timeoutMs: number): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  let lastErr: unknown;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(1500) });
      if (res.ok) return;
    } catch (e) {
      lastErr = e;
    }
    await Bun.sleep(80);
  }
  throw new Error(`Server did not respond in time at ${url}: ${String(lastErr)}`);
}

async function startServer(): Promise<{ url: string; kill: () => void }> {
  const port = pickEphemeralPort();
  const url = `http://127.0.0.1:${port}/`;

  const proc = Bun.spawn(["bun", "src/index.ts"], {
    cwd: root,
    env: { ...process.env, NODE_ENV: "production", PORT: String(port) },
    stdout: "inherit",
    stderr: "inherit",
  });

  await waitForHttpOk(url, 25_000);

  return {
    url,
    kill: () => {
      proc.kill("SIGTERM");
    },
  };
}

async function main() {
  let mod: typeof import("playwright");
  try {
    mod = await import("playwright");
  } catch {
    console.error(
      "Playwright is not installed. Run:\n  bun add -d playwright\n  bunx playwright install chromium",
    );
    process.exit(1);
  }

  const { chromium } = mod;
  const { url, kill } = await startServer();

  const outDir = path.join(root, "artifacts");
  await mkdir(outDir, { recursive: true });
  const shotPath = path.join(outDir, "mobile-logo-demo.png");

  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });

    await page.waitForSelector("video", { state: "attached", timeout: 30_000 });
    await page.evaluate(() => {
      const v = document.querySelector("video");
      if (v) {
        v.muted = true;
        void v.play();
      }
    });

    await page.waitForFunction(
      () => {
        const v = document.querySelector("video");
        return v && !v.paused && v.currentTime > 0.05;
      },
      { timeout: 30_000 },
    );

    await page.waitForTimeout(400);
    await page.screenshot({ path: shotPath, fullPage: false });
    console.log(`Mobile viewport screenshot: ${shotPath}`);
  } finally {
    await browser.close().catch(() => {});
    kill();
  }
}

await main();
