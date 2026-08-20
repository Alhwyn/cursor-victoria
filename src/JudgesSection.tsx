import { useEffect, useRef } from "react";
import { renderHalftonePortrait } from "./halftonePortrait";
import { judges, judgesHeading, type Judge } from "./judges";

function JudgeCopy({
  judge,
  className = "",
}: {
  judge: Judge;
  className?: string;
}) {
  return (
    <a
      href={judge.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`judges-copy ${className}`.trim()}
    >
      <span className="judges-copy-name">{judge.name}</span>
      <span className="judges-copy-role">{judge.role}</span>
      <span className="judges-copy-handle">{judge.handle}</span>
    </a>
  );
}

function JudgePhoto({
  judge,
  className = "",
}: {
  judge: Judge;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;

    const paint = () => {
      if (!img.naturalWidth) return;
      renderHalftonePortrait(canvas, img, judge.photoFit);
    };

    const onLoad = () => paint();
    if (img.complete) paint();
    else img.addEventListener("load", onLoad);

    const observer = new ResizeObserver(paint);
    observer.observe(canvas);

    return () => {
      img.removeEventListener("load", onLoad);
      observer.disconnect();
    };
  }, [judge.photo, judge.photoFit]);

  return (
    <a
      href={judge.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`judges-photo ${className}`.trim()}
      aria-label={`${judge.name}, ${judge.role} ${judge.handle}`}
    >
      <img
        ref={imgRef}
        src={judge.photo}
        alt=""
        className="judges-photo-source"
        style={{ objectPosition: judge.photoFit }}
        width={400}
        height={400}
        loading="lazy"
        decoding="async"
      />
      <canvas ref={canvasRef} className="judges-photo-canvas" aria-hidden />
    </a>
  );
}

const boardSlots = [
  { copy: "judges-place-a-copy", photo: "judges-place-a-photo" },
  { copy: "judges-place-b-copy", photo: "judges-place-b-photo" },
  { copy: "judges-place-c-copy", photo: "judges-place-c-photo" },
  { copy: "judges-place-d-copy", photo: "judges-place-d-photo" },
] as const;

export function JudgesSection() {
  return (
    <section id="judges" className="page-shell scroll-mt-8 mt-32 md:mt-64" aria-labelledby="judges-heading">
      <h2 id="judges-heading" className="sr-only">
        {judgesHeading}
      </h2>
      <p className="judges-mobile-label">{judgesHeading}</p>

      <div className="judges-board">
        {judges.map((judge, index) => {
          const slot = boardSlots[index];
          if (!slot) return null;
          return (
            <span key={judge.slug} className="contents">
              <JudgeCopy judge={judge} className={slot.copy} />
              <JudgePhoto judge={judge} className={slot.photo} />
            </span>
          );
        })}
        <div className="judges-lines" aria-hidden />
      </div>

      <ul className="judges-mobile">
        {judges.map(judge => (
          <li key={judge.slug}>
            <JudgePhoto judge={judge} />
            <JudgeCopy judge={judge} />
          </li>
        ))}
      </ul>
    </section>
  );
}
