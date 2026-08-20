/** Cover-crop a portrait, then paint a newsprint-style halftone. */

function luminance(r: number, g: number, b: number): number {
  return (r * 0.299 + g * 0.587 + b * 0.114) / 255;
}

function sample(
  buffer: Float32Array,
  width: number,
  height: number,
  x: number,
  y: number,
): number {
  const x0 = Math.min(width - 1, Math.max(0, x));
  const y0 = Math.min(height - 1, Math.max(0, y));
  const xi = Math.floor(x0);
  const yi = Math.floor(y0);
  const x1 = Math.min(width - 1, xi + 1);
  const y1 = Math.min(height - 1, yi + 1);
  const fx = x0 - xi;
  const fy = y0 - yi;
  const v00 = buffer[yi * width + xi] ?? 0;
  const v10 = buffer[yi * width + x1] ?? 0;
  const v01 = buffer[y1 * width + xi] ?? 0;
  const v11 = buffer[y1 * width + x1] ?? 0;
  return (
    v00 * (1 - fx) * (1 - fy) +
    v10 * fx * (1 - fy) +
    v01 * (1 - fx) * fy +
    v11 * fx * fy
  );
}

function axisPosition(token: string | undefined): number {
  if (!token || token === "center") return 0.5;
  if (token === "left" || token === "top") return 0;
  if (token === "right" || token === "bottom") return 1;
  if (token.endsWith("%")) return Number.parseFloat(token) / 100;
  return 0.5;
}

function parseObjectPosition(position: string): { x: number; y: number } {
  const [first, second] = position.trim().split(/\s+/);
  return {
    x: axisPosition(first),
    y: axisPosition(second ?? first),
  };
}

export function renderHalftonePortrait(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  objectPosition = "center center",
): void {
  const cssWidth = Math.max(1, canvas.clientWidth);
  const cssHeight = Math.max(1, canvas.clientHeight);
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const width = Math.round(cssWidth * dpr);
  const height = Math.round(cssHeight * dpr);
  canvas.width = width;
  canvas.height = height;

  const probe = document.createElement("canvas");
  probe.width = width;
  probe.height = height;
  const probeCtx = probe.getContext("2d", { willReadFrequently: true });
  const ctx = canvas.getContext("2d");
  if (!probeCtx || !ctx) return;

  const srcW = img.naturalWidth || img.width;
  const srcH = img.naturalHeight || img.height;
  if (srcW < 1 || srcH < 1) return;

  const scale = Math.max(width / srcW, height / srcH);
  const drawW = srcW * scale;
  const drawH = srcH * scale;
  const origin = parseObjectPosition(objectPosition);
  const dx = (width - drawW) * origin.x;
  const dy = (height - drawH) * origin.y;

  probeCtx.imageSmoothingEnabled = true;
  probeCtx.imageSmoothingQuality = "high";
  probeCtx.drawImage(img, dx, dy, drawW, drawH);
  const pixels = probeCtx.getImageData(0, 0, width, height).data;

  const raw = new Float32Array(width * height);
  let lo = 1;
  let hi = 0;
  for (let i = 0; i < width * height; i += 1) {
    const idx = i * 4;
    const gray = luminance(
      pixels[idx] ?? 0,
      pixels[idx + 1] ?? 0,
      pixels[idx + 2] ?? 0,
    );
    raw[i] = gray;
    if (gray < lo) lo = gray;
    if (gray > hi) hi = gray;
  }

  const range = Math.max(0.22, hi - lo);
  const tone = new Float32Array(width * height);
  for (let i = 0; i < width * height; i += 1) {
    const stretched = ((raw[i] ?? 0) - lo) / range;
    tone[i] = Math.min(1, Math.max(0, (stretched - 0.5) * 1.45 + 0.5));
  }

  ctx.fillStyle = "#edece8";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#14120b";

  const spacing = Math.max(2.4, 3.15 * dpr);
  const maxR = spacing * 0.52;

  for (let y = spacing * 0.5; y < height; y += spacing) {
    const offset = (Math.round(y / spacing) % 2) * (spacing * 0.5);
    for (let x = spacing * 0.5 + offset; x < width; x += spacing) {
      const brightness = sample(tone, width, height, x, y);
      const darkness = 1 - brightness;
      const shaped = darkness * darkness * (3 - 2 * darkness);
      const radius = maxR * Math.pow(shaped, 0.92);
      if (radius < 0.22) continue;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
