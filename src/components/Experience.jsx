import { useEffect, useRef, useState } from "react";
import experiences from "../data/experience";

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);
const ACCENT = "rgb(61, 97, 154)";

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
      const viewportBottom = window.scrollY + viewportHeight;
      const startOffset = viewportHeight * 0.25; // start filling once the section is a bit into view
      const start = contentTop + startOffset;
      const end = contentTop + height;

      const rawProgress = (viewportBottom - start) / Math.max(end - start, 1);
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
      className="relative bg-[#0a0a0a] text-neutral-100 py-32 px-6 border-t border-neutral-800"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-semibold text-center mb-12 md:mb-16 text-white"
          style={{ fontFamily: '"Sora", "Sora-Regular", sans-serif' }}
        >
          Experience
        </h2>

        <div
          ref={contentRef}
          className="relative max-w-3xl mx-auto mt-12"
          style={{
            "--timeline-x": "clamp(-18px, -5vw, -40px)", // keep rail visible on all breakpoints
            "--marker-left": "calc(var(--timeline-x) - 7px)",
          }}
        >
          <div
            className="pointer-events-none absolute top-0 bottom-0 w-[2px] bg-neutral-800 rounded-full overflow-hidden"
            style={{ left: "var(--timeline-x)" }}
          >
            <div
              className="absolute left-0 top-0 w-full"
              style={{
                height: `${progress * 100}%`,
                backgroundColor: ACCENT,
                boxShadow: "0 0 24px rgba(61, 97, 154, 0.45)",
              }}
            />
          </div>

          <div className="flex flex-col gap-10 sm:gap-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                <span
                  className={`absolute top-8 h-3.5 w-3.5 rounded-full border transition-all duration-300 ${
                    activeMarkers[index]
                      ? "shadow-[0_0_18px_rgba(61,97,154,0.55)]"
                      : "bg-neutral-800 border-neutral-700"
                  }`}
                  ref={(el) => {
                    markerRefs.current[index] = el;
                  }}
                  style={{
                    left: "var(--marker-left)",
                    backgroundColor: activeMarkers[index] ? ACCENT : undefined,
                    borderColor: activeMarkers[index] ? "rgba(61, 97, 154, 0.85)" : undefined,
                  }}
                />

                <article
                  className="relative bg-[#0f0f10] border border-neutral-800/80 rounded-2xl p-6 sm:p-7 shadow-[0_25px_80px_-40px_rgba(0,0,0,0.75)]"
                  style={
                    activeMarkers[index]
                      ? {
                          borderColor: ACCENT,
                          boxShadow:
                            "0 25px 80px -40px rgba(0,0,0,0.75), 0 0 24px rgba(61,97,154,0.35)",
                        }
                      : undefined
                  }
                >
                  <div className="flex items-center gap-4 mb-5">
                    {exp.logo ? (
                      <img
                        src={exp.logo}
                        alt={exp.org}
                        className="w-12 h-12 object-contain rounded-md bg-neutral-900/80 border border-neutral-800"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-md bg-neutral-900/80 border border-neutral-800" />
                    )}
                    <div>
                      <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                      <p className="text-sm text-neutral-300">{exp.org}</p>
                      <p className="text-xs sm:text-sm text-neutral-500">{exp.time}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-neutral-300 text-[15px] leading-relaxed">
                    {exp.description.map((point, i) => (
                      <p key={i}>{point}</p>
                    ))}
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
