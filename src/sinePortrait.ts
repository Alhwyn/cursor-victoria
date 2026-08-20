/**
 * Official Cursor sine-wave portrait processor.
 * Ported from https://github.com/cursorcommunityled/sinewave-event-image
 * (`lib/process-sine-wave.ts`, `lib/effect-settings.ts`).
 */

export type EffectSettings = {
  foregroundColor: string;
  backgroundColor: string;
  lineFrequency: number;
  lineThickness: number;
  waveAmplitude: number;
  contourDepth: number;
  contrast: number;
  brightness: number;
};

export const DEFAULT_EFFECT_SETTINGS: EffectSettings = {
  foregroundColor: "#6b8cff",
  backgroundColor: "#e8ecf5",
  lineFrequency: 8,
  lineThickness: 2,
  waveAmplitude: 1.95,
  contourDepth: 0,
  contrast: 2.15,
  brightness: -6,
};

export const COLOR_PRESETS = [
  { fg: "#6b8cff", bg: "#e8ecf5", name: "Blue" },
  { fg: "#ff6b35", bg: "#ebe6e1", name: "Orange" },
  { fg: "#d4a574", bg: "#f3ede4", name: "Tan" },
  { fg: "#a78bfa", bg: "#efeaf5", name: "Purple" },
  { fg: "#4ade80", bg: "#e6f2ea", name: "Green" },
] as const;

export type ColorPresetName = (typeof COLOR_PRESETS)[number]["name"];

export function colorPreset(name: ColorPresetName) {
  const preset = COLOR_PRESETS.find(item => item.name === name);
  if (!preset) throw new Error(`Unknown color preset: ${name}`);
  return preset;
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: Number.parseInt(result[1] ?? "0", 16),
        g: Number.parseInt(result[2] ?? "0", 16),
        b: Number.parseInt(result[3] ?? "0", 16),
      }
    : { r: 0, g: 0, b: 0 };
}

function blurChannel(
  src: Float32Array,
  width: number,
  height: number,
  radius: number,
): Float32Array {
  if (radius <= 0) return src;

  const tmp = new Float32Array(width * height);
  const out = new Float32Array(width * height);
  const r = Math.floor(radius);
  const diam = r * 2 + 1;

  for (let y = 0; y < height; y++) {
    let sum = 0;
    for (let x = -r; x <= r; x++) {
      sum += src[y * width + Math.min(width - 1, Math.max(0, x))] ?? 0;
    }
    for (let x = 0; x < width; x++) {
      tmp[y * width + x] = sum / diam;
      const leave = src[y * width + Math.min(width - 1, Math.max(0, x - r))] ?? 0;
      const enter = src[y * width + Math.min(width - 1, x + r + 1)] ?? 0;
      sum += enter - leave;
    }
  }

  for (let x = 0; x < width; x++) {
    let sum = 0;
    for (let y = -r; y <= r; y++) {
      sum += tmp[Math.min(height - 1, Math.max(0, y)) * width + x] ?? 0;
    }
    for (let y = 0; y < height; y++) {
      out[y * width + x] = sum / diam;
      const leave = tmp[Math.min(height - 1, Math.max(0, y - r)) * width + x] ?? 0;
      const enter = tmp[Math.min(height - 1, y + r + 1) * width + x] ?? 0;
      sum += enter - leave;
    }
  }

  return out;
}

function sobelMagnitude(src: Float32Array, width: number, height: number): Float32Array {
  const out = new Float32Array(width * height);
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = y * width + x;
      const tl = src[i - width - 1] ?? 0;
      const tc = src[i - width] ?? 0;
      const tr = src[i - width + 1] ?? 0;
      const ml = src[i - 1] ?? 0;
      const mr = src[i + 1] ?? 0;
      const bl = src[i + width - 1] ?? 0;
      const bc = src[i + width] ?? 0;
      const br = src[i + width + 1] ?? 0;
      const gx = -tl + tr - 2 * ml + 2 * mr - bl + br;
      const gy = -tl - 2 * tc - tr + bl + 2 * bc + br;
      out[i] = Math.min(1, Math.hypot(gx, gy));
    }
  }
  return out;
}

function sampleBilinear(
  buffer: Float32Array,
  width: number,
  height: number,
  x: number,
  y: number,
): number {
  const xClamped = Math.min(width - 1, Math.max(0, x));
  const yClamped = Math.min(height - 1, Math.max(0, y));
  const x0 = Math.floor(xClamped);
  const y0 = Math.floor(yClamped);
  const x1 = Math.min(width - 1, x0 + 1);
  const y1 = Math.min(height - 1, y0 + 1);
  const fx = xClamped - x0;
  const fy = yClamped - y0;

  const v00 = buffer[y0 * width + x0] ?? 0;
  const v10 = buffer[y0 * width + x1] ?? 0;
  const v01 = buffer[y1 * width + x0] ?? 0;
  const v11 = buffer[y1 * width + x1] ?? 0;

  return (
    v00 * (1 - fx) * (1 - fy) +
    v10 * fx * (1 - fy) +
    v01 * (1 - fx) * fy +
    v11 * fx * fy
  );
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  if (edge0 === edge1) return x < edge0 ? 0 : 1;
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function parseObjectPosition(fit = "center"): { x: number; y: number } {
  const keyword = (token: string): number | undefined => {
    if (token === "center") return 0.5;
    if (token === "left" || token === "top") return 0;
    if (token === "right" || token === "bottom") return 1;
    if (token.endsWith("%")) return Number.parseFloat(token) / 100;
    return undefined;
  };

  const parts = fit.trim().split(/\s+/);
  return {
    x: (parts[0] ? keyword(parts[0]) : undefined) ?? 0.5,
    y: (parts[1] ? keyword(parts[1]) : undefined) ?? 0.5,
  };
}

type PreparedSineWave = {
  width: number;
  height: number;
  ampMap: Float32Array;
  contourMap: Float32Array;
  settings: EffectSettings;
};

const WORKING_HEIGHT = 1200;
const WORKING_WIDTH = Math.round((WORKING_HEIGHT * 3) / 4);

function coverDraw(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number,
  photoFit: string,
  zoom = 1,
): void {
  const srcW = img.naturalWidth || img.width;
  const srcH = img.naturalHeight || img.height;
  const scale = Math.max(width / srcW, height / srcH) * Math.max(1, zoom);
  const drawW = srcW * scale;
  const drawH = srcH * scale;
  const origin = parseObjectPosition(photoFit);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(
    img,
    (width - drawW) * origin.x,
    (height - drawH) * origin.y,
    drawW,
    drawH,
  );
}

function prepareSineWave(
  img: HTMLImageElement,
  settings: EffectSettings,
  photoFit: string,
  zoom = 1,
): PreparedSineWave {
  const width = WORKING_WIDTH;
  const height = WORKING_HEIGHT;
  const probe = document.createElement("canvas");
  probe.width = width;
  probe.height = height;
  const probeCtx = probe.getContext("2d", { willReadFrequently: true });
  if (!probeCtx) throw new Error("Canvas 2D context unavailable");

  coverDraw(probeCtx, img, width, height, photoFit, zoom);
  const data = probeCtx.getImageData(0, 0, width, height).data;

  const grayscale = new Float32Array(width * height);
  for (let i = 0; i < width * height; i++) {
    const idx = i * 4;
    let gray =
      ((data[idx] ?? 0) * 0.299 +
        (data[idx + 1] ?? 0) * 0.587 +
        (data[idx + 2] ?? 0) * 0.114) /
      255;
    gray = (gray - 0.5) * settings.contrast + 0.5 + settings.brightness / 100;
    grayscale[i] = Math.max(0, Math.min(1, gray));
  }

  const soft = blurChannel(grayscale, width, height, 1);
  const sharpened = new Float32Array(width * height);
  const amount = 1.85;
  for (let i = 0; i < grayscale.length; i++) {
    sharpened[i] = Math.max(
      0,
      Math.min(1, (grayscale[i] ?? 0) + ((grayscale[i] ?? 0) - (soft[i] ?? 0)) * amount),
    );
  }

  const edges = sobelMagnitude(sharpened, width, height);
  const edgeBoost = 0.1;
  for (let i = 0; i < sharpened.length; i++) {
    sharpened[i] = Math.max(0, Math.min(1, (sharpened[i] ?? 0) - (edges[i] ?? 0) * edgeBoost));
  }

  const lineSpacing = Math.max(2, settings.lineThickness);
  return {
    width,
    height,
    ampMap: sharpened,
    contourMap: blurChannel(sharpened, width, height, Math.max(2, Math.round(lineSpacing * 1.6))),
    settings,
  };
}

function renderSineWaveFrame(
  ctx: CanvasRenderingContext2D,
  prepared: PreparedSineWave,
  scanProgress: number,
): void {
  const { width, height, ampMap, contourMap, settings } = prepared;
  const progress = Math.min(1, Math.max(0, scanProgress));

  const bg = hexToRgb(settings.backgroundColor);
  const fg = hexToRgb(settings.foregroundColor);

  ctx.fillStyle = `rgb(${bg.r},${bg.g},${bg.b})`;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = `rgb(${fg.r},${fg.g},${fg.b})`;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const lineSpacing = Math.max(2, settings.lineThickness);
  const period = Math.max(3.2, 7.2 - settings.lineFrequency * 0.38);
  const waveFrequency = (Math.PI * 2) / period;
  const maxAmplitude = settings.waveAmplitude * lineSpacing * 1.15;
  const contourDepth = settings.contourDepth * lineSpacing * 0.4;
  const baseRipple = Math.max(0.14, lineSpacing * 0.07);
  ctx.lineWidth = Math.max(0.45, lineSpacing * 0.2);

  const feather = Math.max(lineSpacing * 4, height * 0.05);
  const yPad = maxAmplitude + contourDepth + baseRipple;
  const scanY = -feather + progress * (height + yPad + feather * 2);

  for (let baseY = -yPad; baseY < height + yPad; baseY += lineSpacing) {
    const effectMix =
      progress <= 0 ? 0 : 1 - smoothstep(scanY - feather, scanY + feather, baseY);

    ctx.beginPath();
    let started = false;

    for (let x = 0; x <= width; x += 1) {
      const brightness = sampleBilinear(ampMap, width, height, x, baseY);
      const darkness = 1 - brightness;
      const shaped = Math.pow(smoothstep(0.08, 0.97, darkness), 1.55);
      const signalAmp = (maxAmplitude - baseRipple) * shaped * effectMix;
      const amplitude = baseRipple + signalAmp;

      let contour = 0;
      if (contourDepth > 0 && effectMix > 0) {
        const smooth = sampleBilinear(contourMap, width, height, x, baseY);
        contour = (0.5 - smooth) * contourDepth * effectMix;
      }

      const py = baseY + contour + Math.sin(x * waveFrequency) * amplitude;
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

/** Cover-crop to 3:4, then paint the official sine-wave effect at working resolution. */
export function renderSinePortrait(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  settings: EffectSettings,
  photoFit = "center",
  zoom = 1,
): void {
  const prepared = prepareSineWave(img, settings, photoFit, zoom);
  canvas.width = prepared.width;
  canvas.height = prepared.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  renderSineWaveFrame(ctx, prepared, 1);
}
