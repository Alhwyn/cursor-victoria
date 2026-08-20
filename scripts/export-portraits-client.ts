import adamWhitcroft from "../src/assets/judges/adam-whitcroft.jpg";
import ericThomas from "../src/assets/judges/eric-thomas.jpg";
import marcusFarrell from "../src/assets/judges/marcus-farrell.jpg";
import simonStern from "../src/assets/judges/simon-stern.jpg";
import {
  DEFAULT_EFFECT_SETTINGS,
  colorPreset,
  renderOfficialSineImage,
  type ColorPresetName,
} from "../src/sinePortrait";

const jobs: { file: string; src: string; preset: ColorPresetName }[] = [
  { file: "simon-stern-sinwave.png", src: simonStern, preset: "Green" },
  { file: "eric-thomas-sinwave.png", src: ericThomas, preset: "Orange" },
  { file: "adam-whitcroft-sinwave.png", src: adamWhitcroft, preset: "Blue" },
  { file: "marcus-farrell-sinwave.png", src: marcusFarrell, preset: "Green" },
];

async function loadImage(src: string): Promise<HTMLImageElement> {
  const img = new Image();
  img.src = src;
  await img.decode();
  return img;
}

for (const job of jobs) {
  const colors = colorPreset(job.preset);
  const img = await loadImage(job.src);
  const canvas = document.createElement("canvas");
  renderOfficialSineImage(canvas, img, {
    ...DEFAULT_EFFECT_SETTINGS,
    foregroundColor: colors.fg,
    backgroundColor: colors.bg,
  });
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
document.body.textContent = "Exported official judge portraits.";
