import { useMemo } from "react";

const aboutText =
  "I'm a sophomore at Stony Brook University pursuing a B.S. in Computer Science with a second major in Economics. I'm especially interested in AI, Machine Learning, and Finance, and I'm excited to explore opportunities to expand my skills and gain experience.";

const clamp01 = (value) => Math.min(1, Math.max(0, value));

export default function About({ progress = 0 }) {
  const words = useMemo(() => aboutText.split(" "), []);
  const normalized = clamp01(progress);
  const totalProgress = normalized * words.length;
  const activeIndex = Math.min(words.length - 1, Math.floor(totalProgress));
  const activeFraction = totalProgress - activeIndex;
  const baseOpacity = 0.15;

  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: "rgb(var(--color-bg))" }}
    >
      <div className="absolute inset-0 bg-grid opacity-20" aria-hidden="true" />

      {/* Accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 40% 40% at 30% 50%, rgba(var(--color-accent), 0.04) 0%, transparent 70%)",
        }}
      />

      <div className="sticky top-0 h-screen flex items-center justify-center px-6">
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <span className="section-label">About Me</span>

          <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed tracking-tight">
            {words.map((word, index) => {
              let fill = 0;
              if (normalized >= 1 || index < activeIndex) {
                fill = 1;
              } else if (index === activeIndex) {
                fill = clamp01(activeFraction);
              }

              const opacity = baseOpacity + (1 - baseOpacity) * fill;

              return (
                <span
                  key={`${word}-${index}`}
                  className="inline-block transition-colors duration-200"
                  style={{
                    color: `rgba(var(--color-text-primary), ${opacity.toFixed(3)})`,
                  }}
                >
                  {word}
                  {index < words.length - 1 ? "\u00a0" : ""}
                </span>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
