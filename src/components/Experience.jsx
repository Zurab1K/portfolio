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
      className="relative py-24 md:py-32 px-6 overflow-hidden"
      style={{ backgroundColor: "rgb(var(--color-bg))" }}
    >
      <div className="absolute inset-0 bg-grid opacity-15" aria-hidden="true" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section heading */}
        <div className="mb-16">
          <span className="section-label">Experience</span>
          <h2
            className="mt-3 text-3xl md:text-4xl font-light tracking-tight"
            style={{ color: "rgb(var(--color-text-primary))" }}
          >
            Where I've worked
          </h2>
        </div>

        {/* Timeline */}
        <div
          ref={contentRef}
          className="relative pl-8 md:pl-10"
        >
          {/* Timeline rail */}
          <div
            className="pointer-events-none absolute top-0 bottom-0 w-px rounded-full overflow-hidden left-0"
            style={{ backgroundColor: "rgba(var(--color-border), 0.08)" }}
          >
            <div
              className="absolute left-0 top-0 w-full"
              style={{
                height: `${progress * 100}%`,
                backgroundColor: "rgb(var(--color-accent))",
                boxShadow: "0 0 20px rgba(var(--color-accent), 0.3)",
              }}
            />
          </div>

          <div className="flex flex-col gap-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <span
                  className="absolute top-6 -left-8 md:-left-10 h-2.5 w-2.5 rounded-full transition-all duration-500"
                  ref={(el) => { markerRefs.current[index] = el; }}
                  style={{
                    transform: "translateX(-50%)",
                    left: "0px",
                    backgroundColor: activeMarkers[index]
                      ? "rgb(var(--color-accent))"
                      : "rgba(var(--color-border), 0.15)",
                    boxShadow: activeMarkers[index]
                      ? "0 0 16px rgba(var(--color-accent), 0.5)"
                      : "none",
                  }}
                />

                {/* Card */}
                <article
                  className="experience-card group rounded-xl p-6 transition-all duration-500"
                  style={{
                    backgroundColor: activeMarkers[index]
                      ? "rgba(var(--color-bg-card), 0.8)"
                      : "transparent",
                    border: activeMarkers[index]
                      ? "1px solid rgba(var(--color-accent), 0.15)"
                      : "1px solid transparent",
                  }}
                >
                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex items-start gap-4 min-w-0">
                      {exp.logo ? (
                        <img
                          src={exp.logo}
                          alt={exp.org}
                          className="w-10 h-10 rounded-lg object-contain"
                          style={{
                            backgroundColor: "rgba(var(--color-bg-elevated), 1)",
                            border: "1px solid rgba(var(--color-border), 0.08)",
                          }}
                        />
                      ) : (
                        <div
                          className="w-10 h-10 rounded-lg"
                          style={{
                            backgroundColor: "rgba(var(--color-bg-elevated), 1)",
                            border: "1px solid rgba(var(--color-border), 0.08)",
                          }}
                        />
                      )}
                      <div className="min-w-0">
                        <h3
                          className="text-lg font-medium tracking-tight"
                          style={{ color: "rgb(var(--color-text-primary))" }}
                        >
                          {exp.title}
                        </h3>
                        <p className="text-sm mt-0.5" style={{ color: "rgb(var(--color-text-secondary))" }}>
                          {exp.org}
                        </p>
                      </div>
                    </div>

                    <span
                      className="font-mono text-xs tracking-wider shrink-0"
                      style={{ color: "rgb(var(--color-text-muted))" }}
                    >
                      {exp.time}
                    </span>
                  </div>

                  {/* Description */}
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed" style={{ color: "rgb(var(--color-text-secondary))" }}>
                    {exp.description.map((point, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full" style={{ backgroundColor: "rgb(var(--color-accent))" }} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Skills */}
                  {exp.skills?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.skills.map((skill, i) => (
                        <span
                          key={`${skill}-${i}`}
                          className="font-mono text-[11px] px-2.5 py-1 rounded-full tracking-wide"
                          style={{
                            backgroundColor: "rgba(var(--color-accent), 0.08)",
                            color: "rgb(var(--color-accent))",
                            border: "1px solid rgba(var(--color-accent), 0.12)",
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
