import adamWhitcroft from "../src/assets/judges/adam-whitcroft.jpg";
import {
  DEFAULT_EFFECT_SETTINGS,
  renderSinePortrait,
  type EffectSettings,
} from "../src/sinePortrait";

const jobs = [
  {
    file: "adam-whitcroft-sinwave.png",
    src: adamWhitcroft,
    photoFit: "center 18%",
    zoom: 1.35,
    settings: {
      ...DEFAULT_EFFECT_SETTINGS,
      brightness: 2,
      contrast: 1.85,
      foregroundColor: "#6b8cff",
      backgroundColor: "#e8ecf5",
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
document.body.textContent = "Exported Adam portrait.";
