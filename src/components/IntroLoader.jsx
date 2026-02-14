import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const EXIT_EASE = [0.33, 1, 0.68, 1];

export default function IntroLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [displayValue, setDisplayValue] = useState(0);
  const completionRef = useRef(false);
  const rafRef = useRef();
  const timeoutRef = useRef();
  const lastTickRef = useRef(performance.now());

  useEffect(() => {
    const duration = 2800;
    const start = performance.now();
    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (now) => {
      const normalized = Math.min(1, (now - start) / duration);
      const eased = easeInOutCubic(normalized);

      if (normalized < 1) {
        setProgress(eased);

        if (now - lastTickRef.current >= 100) {
          lastTickRef.current = now;
          setDisplayValue(Math.min(100, Math.round(eased * 100)));
        }

        rafRef.current = requestAnimationFrame(step);
      } else if (!completionRef.current) {
        setProgress(1);
        setDisplayValue(100);
        completionRef.current = true;
        timeoutRef.current = setTimeout(() => onComplete?.(), 350);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [onComplete]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const formattedNumber = displayValue.toString().padStart(3, "0");

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center select-none"
      style={{ backgroundColor: "rgb(var(--color-bg))" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(8px)", transition: { duration: 0.6, ease: EXIT_EASE } }}
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-30" aria-hidden="true" />

      <div className="relative flex flex-col items-center gap-8">
        {/* Name */}
        <div className="relative">
          <span
            className="signature-script text-5xl sm:text-6xl md:text-7xl"
            style={{
              color: "rgba(var(--color-text-primary), 0.9)",
              filter: `drop-shadow(0 0 ${30 * progress}px rgba(var(--color-accent), ${0.15 * progress}))`,
            }}
          >
            Zurabi Kochiashvili
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-48 flex flex-col items-center gap-3">
          <div
            className="w-full h-px rounded-full overflow-hidden"
            style={{ backgroundColor: "rgba(var(--color-border), 0.1)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{
                width: `${progress * 100}%`,
                backgroundColor: "rgb(var(--color-accent))",
                boxShadow: `0 0 16px rgba(var(--color-accent), 0.4)`,
              }}
            />
          </div>
          <span
            className="font-mono text-xs tracking-[0.3em]"
            style={{
              color: "rgb(var(--color-text-muted))",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {formattedNumber}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
