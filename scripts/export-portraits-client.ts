import adamWhitcroft from "../src/assets/judges/adam-whitcroft.jpg";
import ericThomas from "../src/assets/judges/eric-thomas.jpg";
import marcusFarrell from "../src/assets/judges/marcus-farrell.jpg";
import simonStern from "../src/assets/judges/simon-stern.jpg";
import {
  DEFAULT_EFFECT_SETTINGS,
  renderSinePortrait,
  type EffectSettings,
} from "../src/sinePortrait";

const jobs = [
  {
    file: "simon-stern-sinwave.png",
    src: simonStern,
    photoFit: "center 22%",
    settings: {
      ...DEFAULT_EFFECT_SETTINGS,
      foregroundColor: "#ff6b35",
      backgroundColor: "#ebe6e1",
    } satisfies EffectSettings,
  },
  {
    file: "eric-thomas-sinwave.png",
    src: ericThomas,
    photoFit: "center 20%",
    settings: {
      ...DEFAULT_EFFECT_SETTINGS,
      foregroundColor: "#4ade80",
      backgroundColor: "#e6f2ea",
    } satisfies EffectSettings,
  },
  {
    file: "adam-whitcroft-sinwave.png",
    src: adamWhitcroft,
    photoFit: "center 28%",
    settings: {
      ...DEFAULT_EFFECT_SETTINGS,
      foregroundColor: "#a78bfa",
      backgroundColor: "#efeaf5",
    } satisfies EffectSettings,
  },
  {
    file: "marcus-farrell-sinwave.png",
    src: marcusFarrell,
    photoFit: "center 30%",
    settings: {
      ...DEFAULT_EFFECT_SETTINGS,
      foregroundColor: "#12b5a7",
      backgroundColor: "#e6f4f3",
    } satisfies EffectSettings,
  },
];

async function loadImage(src: string): Promise<HTMLImageElement> {
  const img = new Image();
  img.src = src;
  await img.decode();
  return img;
}

async function exportOne(job: (typeof jobs)[number]): Promise<void> {
  const img = await loadImage(job.src);
  const canvas = document.createElement("canvas");
  renderSinePortrait(canvas, img, job.settings, job.photoFit);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(value => (value ? resolve(value) : reject(new Error("toBlob failed"))), "image/png");
  });
  await fetch("/save", {
    method: "POST",
    headers: { "x-filename": job.file },
    body: blob,
  });
}

for (const job of jobs) {
  await exportOne(job);
}
await fetch("/done", { method: "POST" });
document.body.textContent = "Exported 4 portraits.";
