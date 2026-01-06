import { useMemo } from "react";

const aboutText =
  "I’m a sophomore at Stony Brook University pursuing a B.S. in Computer Science with a second major in Economics. I’m especially interested in AI, Machine Learning, and Finance, and I’m excited to explore opportunities to expand my skills and gain experience.";

const clamp01 = (value) => Math.min(1, Math.max(0, value));

export default function About({ progress = 0 }) {
  const words = useMemo(() => aboutText.split(" "), []);
  const normalized = clamp01(progress);
  const totalProgress = normalized * words.length;
  const activeIndex = Math.min(words.length - 1, Math.floor(totalProgress));
  const activeFraction = totalProgress - activeIndex;
  const baseOpacity = 0.2;

  return (
    <section className="relative h-screen w-full bg-gradient-to-b from-[#f7f7f3] to-[#ecebe5] text-neutral-900 border-t border-neutral-200 overflow-hidden">
      <div className="sticky top-0 h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto text-center space-y-8 md:space-y-10">
          <h2
            className="text-4xl md:text-5xl font-normal tracking-tight text-neutral-900"
            style={{ fontFamily: '"Roobert", "Sora", sans-serif' }}
          >
            About Me
          </h2>

          <p
            className="text-3xl md:text-4xl leading-[1.45] font-normal text-center"
            style={{ fontFamily: '"Roobert", "Sora", sans-serif' }}
          >
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
                  style={{ color: `rgba(10, 10, 10, ${opacity.toFixed(3)})` }}
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
