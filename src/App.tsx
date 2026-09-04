import { useCallback, useEffect, useState } from "react";
import { NOTES } from "./notes";
import { SLIDES } from "./slides";

const LAST = SLIDES.length - 1;
const STAGE_W = 1440;
const STAGE_H = 810;

function slideFromHash(): number {
  const n = Number(window.location.hash.replace("#", ""));
  if (!Number.isInteger(n) || n < 1 || n > SLIDES.length) {
    return 0;
  }
  return n - 1;
}

export function App() {
  const [index, setIndex] = useState(slideFromHash);
  const [notes, setNotes] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const fit = () => {
      const w = window.innerWidth - 40;
      const h = window.innerHeight - 90;
      setScale(Math.min(w / STAGE_W, h / STAGE_H, 1.25));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const go = useCallback((next: number) => {
    const clamped = Math.max(0, Math.min(LAST, next));
    setIndex(clamped);
    window.history.replaceState(null, "", `#${clamped + 1}`);
  }, []);

  useEffect(() => {
    const onHash = () => setIndex(slideFromHash());
    window.addEventListener("hashchange", onHash);
    if (!window.location.hash) {
      window.history.replaceState(null, "", "#1");
    }
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }
      const target = event.target as HTMLElement | null;
      if (target && target.closest("input, textarea")) {
        return;
      }
      const key = event.key;
      if (key === "ArrowRight" || key === " " || key === "PageDown") {
        event.preventDefault();
        go(index + 1);
        return;
      }
      if (key === "ArrowLeft" || key === "PageUp") {
        event.preventDefault();
        go(index - 1);
        return;
      }
      if (key === "Home") {
        event.preventDefault();
        go(0);
        return;
      }
      if (key === "End") {
        event.preventDefault();
        go(LAST);
        return;
      }
      if (key === "n" || key === "N") {
        event.preventDefault();
        setNotes((open) => !open);
        return;
      }
      if (key === "f" || key === "F") {
        event.preventDefault();
        if (document.fullscreenElement) {
          void document.exitFullscreen();
        } else {
          void document.documentElement.requestFullscreen();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index]);

  const Slide = SLIDES[index];
  const note = NOTES[index];

  if (!Slide) {
    return null;
  }

  return (
    <div className={`deck${notes ? " notes-open" : ""}`}>
      <div
        className="stage-wrap"
        onClick={(event) => {
          const target = event.target as HTMLElement;
          if (target.closest("button, input, textarea, a")) {
            return;
          }
          const x = event.clientX / window.innerWidth;
          if (x < 0.12) go(index - 1);
          if (x > 0.88) go(index + 1);
        }}
      >
        <div className="stage-box" style={{ width: STAGE_W * scale, height: STAGE_H * scale }}>
          <div className="stage" style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${scale})` }}>
            <Slide />
          </div>
        </div>
      </div>
      <footer className="chrome">
        <span className="keys">
          <kbd>←</kbd>
          <kbd>→</kbd>
          <kbd>N</kbd>
          <kbd>F</kbd>
        </span>
        <ol className="dots">
          {SLIDES.map((_, i) => (
            <li key={i}>
              <button type="button" aria-label={`Slide ${i + 1}`} aria-current={i === index} onClick={() => go(i)} />
            </li>
          ))}
        </ol>
        <span className="count">
          {index + 1} / {SLIDES.length}
        </span>
      </footer>
      <aside className="notes" hidden={!notes}>
        <header>Notes</header>
        {note ? <p>{note}</p> : <p className="empty">No notes for this slide.</p>}
      </aside>
    </div>
  );
}
