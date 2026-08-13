type Tone = {
  background: string;
  foreground: string;
};

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const value = hex.replace("#", "");
  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  };
}

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

/** Cover-crop `img` into a portrait canvas, then paint Compile-style wavy lines. */
export function renderSinePortrait(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  tone: Tone,
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
  const scale = Math.max(width / srcW, height / srcH);
  const drawW = srcW * scale;
  const drawH = srcH * scale;
  const dx = (width - drawW) / 2;
  const dy = (height - drawH) / 2 - drawH * 0.04;

  probeCtx.imageSmoothingEnabled = true;
  probeCtx.imageSmoothingQuality = "high";
  probeCtx.drawImage(img, dx, dy, drawW, drawH);
  const pixels = probeCtx.getImageData(0, 0, width, height).data;

  const amp = new Float32Array(width * height);
  for (let i = 0; i < width * height; i += 1) {
    const idx = i * 4;
    const gray = luminance(
      pixels[idx] ?? 0,
      pixels[idx + 1] ?? 0,
      pixels[idx + 2] ?? 0,
    );
    const contrast = Math.min(1, Math.max(0, (gray - 0.5) * 2.1 + 0.42));
    amp[i] = contrast;
  }

  const bg = hexToRgb(tone.background);
  const fg = hexToRgb(tone.foreground);
  ctx.fillStyle = `rgb(${bg.r},${bg.g},${bg.b})`;
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = `rgb(${fg.r},${fg.g},${fg.b})`;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const spacing = Math.max(2, 2.15 * dpr);
  const period = 4.8 * dpr;
  const wave = (Math.PI * 2) / period;
  const maxAmp = spacing * 1.75;
  ctx.lineWidth = Math.max(0.65, spacing * 0.34);

  for (let baseY = -spacing; baseY < height + spacing; baseY += spacing) {
    ctx.beginPath();
    let started = false;
    for (let x = 0; x <= width; x += 1) {
      const brightness = sample(amp, width, height, x, baseY);
      const darkness = 1 - brightness;
      const shaped = darkness * darkness * (3 - 2 * darkness);
      const amplitude = 0.35 * dpr + maxAmp * Math.pow(shaped, 1.35);
      const py = baseY + Math.sin(x * wave) * amplitude;
      if (!started) {
        ctx.moveTo(x, py);
        started = true;
      } else {
        ctx.lineTo(x, py);
      }
    }
    ctx.stroke();
  }
}
