import adamWhitcroft from "../src/assets/judges/adam-whitcroft.jpg";
import { DEFAULT_EFFECT_SETTINGS, renderOfficialSineImage } from "../src/sinePortrait";

async function loadImage(src: string): Promise<HTMLImageElement> {
  const img = new Image();
  img.src = src;
  await img.decode();
  return img;
}

const img = await loadImage(adamWhitcroft);
const canvas = document.createElement("canvas");
renderOfficialSineImage(canvas, img, {
  ...DEFAULT_EFFECT_SETTINGS,
  foregroundColor: "#6b8cff",
  backgroundColor: "#e8ecf5",
});
const blob = await new Promise<Blob>((resolve, reject) => {
  canvas.toBlob(value => (value ? resolve(value) : reject(new Error("toBlob failed"))), "image/png");
});
await fetch("/save", {
  method: "POST",
  headers: { "x-filename": "adam-whitcroft-sinwave.png" },
  body: blob,
});
await fetch("/done", { method: "POST" });
document.body.textContent = "Exported official Blue Adam portrait.";
