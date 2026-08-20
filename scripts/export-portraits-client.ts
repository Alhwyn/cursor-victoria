import marcusFarrell from "../src/assets/judges/marcus-farrell.jpg";
import {
  DEFAULT_EFFECT_SETTINGS,
  renderSinePortrait,
  type EffectSettings,
} from "../src/sinePortrait";

const jobs = [
  {
    file: "marcus-farrell-sinwave.png",
    src: marcusFarrell,
    photoFit: "center 28%",
    zoom: 1.2,
    settings: {
      ...DEFAULT_EFFECT_SETTINGS,
      invert: true,
      brightness: -4,
      contrast: 1.85,
      foregroundColor: "#4ade80",
      backgroundColor: "#e6f2ea",
    } satisfies EffectSettings,
  },
];

async function loadImage(src: string): Promise<HTMLImageElement> {
  const img = new Image();
  img.src = src;
  await img.decode();
  return img;
}

for (const job of jobs) {
  const img = await loadImage(job.src);
  const canvas = document.createElement("canvas");
  renderSinePortrait(canvas, img, job.settings, job.photoFit, job.zoom);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(value => (value ? resolve(value) : reject(new Error("toBlob failed"))), "image/png");
  });
  await fetch("/save", {
    method: "POST",
    headers: { "x-filename": job.file },
    body: blob,
  });
}
await fetch("/done", { method: "POST" });
document.body.textContent = "Exported Marcus portrait.";
