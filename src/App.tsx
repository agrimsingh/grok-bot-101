import { useCallback, useEffect, useState } from "react";
import { NOTES } from "./notes";
import { SLIDES } from "./slides";

const LAST = SLIDES.length - 1;
const STAGE_W = 1440;
const STAGE_H = 810;
const READER_QUERY = "(max-width: 899px)";

function slideFromHash(): number {
  const n = Number(window.location.hash.replace("#", ""));
  if (!Number.isInteger(n) || n < 1 || n > SLIDES.length) {
    return 0;
  }
  return n - 1;
}

function useReaderMode(): boolean {
  const [reader, setReader] = useState(() => window.matchMedia(READER_QUERY).matches);

  useEffect(() => {
    const media = window.matchMedia(READER_QUERY);
    const sync = () => setReader(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return reader;
}

function setHash(index: number) {
  const next = `#${index + 1}`;
  if (window.location.hash !== next) {
    window.history.replaceState(null, "", next);
  }
}

function toggleFullscreen() {
  if (document.fullscreenElement) {
    void document.exitFullscreen();
  } else {
    void document.documentElement.requestFullscreen();
  }
}

function scrollToSlide(index: number, behavior: ScrollBehavior) {
  document.getElementById(`slide-${index + 1}`)?.scrollIntoView({ behavior, block: "start" });
}

export function App() {
  const reader = useReaderMode();
  const [index, setIndex] = useState(slideFromHash);
  const [notes, setNotes] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (reader) {
      return;
    }
    const fit = () => {
      const w = window.innerWidth - 40;
      const h = window.innerHeight - 90;
      setScale(Math.min(w / STAGE_W, h / STAGE_H, 1.25));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [reader]);

  const go = useCallback(
    (next: number, behavior: ScrollBehavior = "smooth") => {
      const clamped = Math.max(0, Math.min(LAST, next));
      setIndex(clamped);
      setHash(clamped);
      if (reader) {
        scrollToSlide(clamped, behavior);
      }
    },
    [reader],
  );

  useEffect(() => {
    const onHash = () => {
      const next = slideFromHash();
      setIndex(next);
      if (reader) {
        scrollToSlide(next, "auto");
      }
    };
    window.addEventListener("hashchange", onHash);
    if (!window.location.hash) {
      window.history.replaceState(null, "", "#1");
    } else if (reader) {
      const target = slideFromHash();
      const frame = window.requestAnimationFrame(() => {
        scrollToSlide(target, "auto");
      });
      const retry = window.setTimeout(() => {
        scrollToSlide(target, "auto");
      }, 80);
      return () => {
        window.cancelAnimationFrame(frame);
        window.clearTimeout(retry);
        window.removeEventListener("hashchange", onHash);
      };
    }
    return () => window.removeEventListener("hashchange", onHash);
  }, [reader]);

  useEffect(() => {
    if (!reader) {
      return;
    }
    const sections = [...document.querySelectorAll<HTMLElement>(".reader-slide")];
    if (sections.length === 0) {
      return;
    }
    const syncFromScroll = () => {
      const marker = 72;
      let current = 0;
      for (let i = 0; i < sections.length; i++) {
        const rect = sections[i]?.getBoundingClientRect();
        if (rect && rect.top <= marker && rect.bottom > marker) {
          current = i;
          break;
        }
      }
      setIndex(current);
      setHash(current);
    };
    const observer = new IntersectionObserver(syncFromScroll, {
      root: null,
      rootMargin: "0px",
      threshold: [0, 0.15, 0.35, 0.55, 0.75, 1],
    });
    for (const section of sections) {
      observer.observe(section);
    }
    return () => observer.disconnect();
  }, [reader]);

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
        toggleFullscreen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index]);

  const note = NOTES[index];
  const notesPanel = (
    <aside className="notes" hidden={!notes}>
      <header>Notes</header>
      {note ? <p>{note}</p> : <p className="empty">No notes for this slide.</p>}
    </aside>
  );

  if (reader) {
    return (
      <div className={`deck reader${notes ? " notes-open" : ""}`}>
        <header className="reader-bar">
          <button type="button" className="reader-nav" disabled={index === 0} onClick={() => go(index - 1)}>
            Previous
          </button>
          <div className="reader-meta">
            <strong>Grok Bot 101</strong>
            <span>
              {index + 1} / {SLIDES.length}
            </span>
          </div>
          <button type="button" className="reader-nav" disabled={index === LAST} onClick={() => go(index + 1)}>
            Next
          </button>
        </header>
        <div className="reader-stream">
          {SLIDES.map((Slide, i) => (
            <section key={i} id={`slide-${i + 1}`} className="reader-slide">
              <Slide />
            </section>
          ))}
        </div>
        {notesPanel}
      </div>
    );
  }

  const Slide = SLIDES[index];
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
          <button type="button" className="key-chip" onClick={() => go(index - 1)}>
            ← Prev
          </button>
          <button type="button" className="key-chip" onClick={() => go(index + 1)}>
            → Next
          </button>
          <button type="button" className="key-chip" onClick={() => setNotes((open) => !open)}>
            N Notes
          </button>
          <button type="button" className="key-chip" onClick={toggleFullscreen}>
            F Fullscreen
          </button>
        </span>
        <ol className="dots">
          {SLIDES.map((_, i) => (
            <li key={i}>
              <button
                type="button"
                tabIndex={i === index ? 0 : -1}
                aria-label={`Slide ${i + 1}`}
                aria-current={i === index}
                onClick={() => go(i)}
              />
            </li>
          ))}
        </ol>
        <span className="count">
          {index + 1} / {SLIDES.length}
        </span>
      </footer>
      {notesPanel}
    </div>
  );
}
