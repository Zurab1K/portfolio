import { useEffect, useRef, useState } from "react";
import experiences from "../data/experience";

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);

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
          const changed = next.length !== prev.length || next.some((val, idx) => val !== prev[idx]);
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
      className="relative py-24 md:py-32 px-6"
      style={{ backgroundColor: "rgb(var(--color-bg))" }}
    >
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-2xl md:text-3xl font-semibold tracking-tight mb-16"
          style={{ color: "rgb(var(--color-text-primary))" }}
        >
          Experience
        </h2>

        <div
          ref={contentRef}
          className="relative pl-6 md:pl-8"
        >
          {/* Timeline line */}
          <div
            className="absolute top-0 bottom-0 w-px left-0"
            style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
          >
            <div
              className="absolute left-0 top-0 w-full"
              style={{
                height: `${progress * 100}%`,
                backgroundColor: "rgb(var(--color-text-primary))",
                transition: "height 0.05s linear",
              }}
            />
          </div>

          <div className="flex flex-col gap-14">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                {/* Dot */}
                <span
                  className="absolute top-2 -left-6 md:-left-8 h-2 w-2 rounded-full transition-colors duration-300"
                  ref={(el) => { markerRefs.current[index] = el; }}
                  style={{
                    transform: "translateX(-50%)",
                    left: "0px",
                    backgroundColor: activeMarkers[index]
                      ? "rgb(var(--color-text-primary))"
                      : "rgba(255,255,255,0.1)",
                  }}
                />

                <div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                    <div>
                      <h3
                        className="text-base font-medium"
                        style={{ color: "rgb(var(--color-text-primary))" }}
                      >
                        {exp.title}
                      </h3>
                      <p className="text-sm" style={{ color: "rgb(var(--color-text-secondary))" }}>
                        {exp.org}
                      </p>
                    </div>
                    <span
                      className="text-xs shrink-0"
                      style={{ color: "rgb(var(--color-text-muted))" }}
                    >
                      {exp.time}
                    </span>
                  </div>

                  <ul className="space-y-1.5 text-sm leading-relaxed" style={{ color: "rgb(var(--color-text-secondary))" }}>
                    {exp.description.map((point, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="shrink-0 mt-2 w-1 h-1 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {exp.skills?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {exp.skills.map((skill, i) => (
                        <span
                          key={`${skill}-${i}`}
                          className="text-[11px] px-2 py-0.5 rounded"
                          style={{
                            backgroundColor: "rgba(255,255,255,0.05)",
                            color: "rgb(var(--color-text-secondary))",
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
