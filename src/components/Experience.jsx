import { useEffect, useRef, useState } from "react";
import experiences from "../data/experience";

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);
const ACCENT_RGB = "16, 185, 129";
const ACCENT = `rgb(${ACCENT_RGB})`;
const CARD_FONT = { fontFamily: '"Roobert", "Sora", sans-serif' };

export default function Experience() {
  const contentRef = useRef(null);
  const markerRefs = useRef([]);
  const [progress, setProgress] = useState(0);
  const [markerOffsets, setMarkerOffsets] = useState([]);
  const [activeMarkers, setActiveMarkers] = useState(() => experiences.map(() => false));

  useEffect(() => {
    const handleScroll = () => {
      const contentEl = contentRef.current;
      if (!contentEl) return;

      const viewportHeight = window.innerHeight || 1;
      const { height, top } = contentEl.getBoundingClientRect();
      const contentTop = top + window.scrollY;
      const viewportAnchor = window.scrollY + viewportHeight * 0.5;
      const rawProgress = (viewportAnchor - contentTop) / Math.max(height, 1);
      const nextProgress = clamp(rawProgress);
      const fillPixels = clamp(nextProgress * height, 0, height);
      setProgress(nextProgress);

      if (markerOffsets.length) {
        const next = markerOffsets.map((offset) => fillPixels >= offset - 2);
        setActiveMarkers((prev) => {
          const changed =
            next.length !== prev.length || next.some((val, idx) => val !== prev[idx]);
          return changed ? next : prev;
        });
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [markerOffsets]);

  useEffect(() => {
    const computeOffsets = () => {
      const container = contentRef.current;
      if (!container) return;

      const containerTop = container.getBoundingClientRect().top + window.scrollY;
      const offsets = markerRefs.current.map((node) => {
        if (!node) return 0;
        const rect = node.getBoundingClientRect();
        return rect.top + window.scrollY - containerTop + rect.height / 2;
      });
      setMarkerOffsets(offsets);
    };

    computeOffsets();
    window.addEventListener("resize", computeOffsets);
    return () => window.removeEventListener("resize", computeOffsets);
  }, []);

  return (
    <section
      id="experience"
      className="relative bg-[rgb(20,20,20)] text-neutral-100 py-32 px-6 border-t border-neutral-800 overflow-hidden"
      style={{ "--experience-progress": progress.toFixed(4) }}
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2
            className="text-4xl md:text-5xl font-normal tracking-tight text-white text-center"
            style={{ fontFamily: '"Roobert", "Sora", sans-serif' }}
          >
            <span
              className="inline-block rounded-2xl px-8 py-2"
              style={{
                backgroundColor: "rgba(16, 185, 129, 0.35)",
                color: "#ffffff",
                textShadow:
                  "0 0 8px rgba(16, 185, 129, 0.55), 0 0 18px rgba(16, 185, 129, 0.45), 0 0 36px rgba(16, 185, 129, 0.35)",
              }}
            >
              Experience
            </span>
          </h2>
        </div>
        <div
          ref={contentRef}
          className="relative max-w-4xl mx-auto mt-10"
          style={{
            "--timeline-x": "clamp(-18px, -5vw, -40px)", // keep rail visible on all breakpoints
            "--marker-left": "calc(var(--timeline-x) - 7px)",
          }}
        >
          <div
            className="pointer-events-none absolute top-0 bottom-0 w-[2px] bg-neutral-800 rounded-full overflow-hidden z-10"
            style={{ left: "var(--timeline-x)" }}
          >
            <div
              className="absolute left-0 top-0 w-full"
              style={{
                height: `${progress * 100}%`,
                backgroundColor: ACCENT,
                boxShadow: `0 0 24px rgba(${ACCENT_RGB}, 0.45)`,
              }}
            />
          </div>

          <div className="relative z-20 flex flex-col gap-10 sm:gap-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                <span
                  className={`absolute top-8 h-3.5 w-3.5 rounded-full border transition-all duration-300 z-20 ${
                    activeMarkers[index] ? "" : "bg-neutral-800 border-neutral-700"
                  }`}
                  ref={(el) => {
                    markerRefs.current[index] = el;
                  }}
                  style={{
                    left: "var(--marker-left)",
                    backgroundColor: activeMarkers[index] ? ACCENT : undefined,
                    borderColor: activeMarkers[index]
                      ? `rgba(${ACCENT_RGB}, 0.85)`
                      : undefined,
                    boxShadow: activeMarkers[index]
                      ? `0 0 18px rgba(${ACCENT_RGB}, 0.55)`
                      : undefined,
                  }}
                />

                <article
                  className={`experience-card relative bg-[rgb(25,25,25)] border border-neutral-800/80 rounded-2xl p-6 sm:p-7 shadow-[0_25px_80px_-40px_rgba(0,0,0,0.75)] transition-all duration-500 ${
                    activeMarkers[index] ? "is-active" : ""
                  }`}
                  style={
                    activeMarkers[index]
                      ? {
                          ...CARD_FONT,
                          borderColor: ACCENT,
                          boxShadow: `0 25px 80px -40px rgba(0,0,0,0.75), 0 0 24px rgba(${ACCENT_RGB}, 0.35)`,
                          transform: "perspective(1200px) translateY(-8px) rotateX(0deg)",
                        }
                      : {
                          ...CARD_FONT,
                          transform: `perspective(1200px) rotateX(${index % 2 === 0 ? -1.5 : 1.5}deg)`,
                        }
                  }
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
                      <div className="flex items-start gap-4 min-w-0">
                      {exp.logo ? (
                        <img
                          src={exp.logo}
                          alt={exp.org}
                          className="w-12 h-12 object-contain rounded-md bg-[rgb(15,15,15)] border border-neutral-800"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-md bg-[rgb(15,15,15)] border border-neutral-800" />
                      )}
                      <div className="min-w-0">
                        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
                          {exp.title}
                        </h3>
                        <p className="text-sm text-neutral-300 mt-1">{exp.org}</p>
                      </div>
                    </div>
                    <div className="sm:text-right">
                      <span className="inline-flex items-center rounded-full border border-neutral-700/70 bg-[rgb(20,20,20)] px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-neutral-400">
                        {exp.time}
                      </span>
                    </div>
                  </div>

                  <div className="h-px bg-gradient-to-r from-neutral-700 via-neutral-600/70 to-transparent" />
                  <ul className="space-y-2 text-neutral-300 text-[15px] leading-relaxed list-disc pl-5 marker:text-neutral-500">
                    {exp.description.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
