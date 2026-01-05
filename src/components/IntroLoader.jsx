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
    const duration = 3600;
    const start = performance.now();
    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (now) => {
      const normalized = Math.min(1, (now - start) / duration);
      const eased = easeInOutCubic(normalized);

      if (normalized < 1) {
        setProgress(eased);

        const nowTick = now;
        if (nowTick - lastTickRef.current >= 140) {
          lastTickRef.current = nowTick;
          const raw = eased * 100;
          let sampled = 0;
          if (raw < 10) {
            sampled = Math.round(raw); // 0–9, single steps
          } else if (raw < 30) {
            sampled = Math.round(raw / 2) * 2; // 10–29, 2-point jumps
          } else if (raw < 60) {
            sampled = Math.round(raw / 5) * 5; // 30–59, 5-point jumps
          } else if (raw < 85) {
            sampled = Math.round(raw / 8) * 8; // 60–84, 8-point jumps
          } else if (raw < 96) {
            sampled = Math.round(raw / 12) * 12; // 85–95, 12-point jumps
          } else {
            sampled = 100; // snap quickly near the end
          }
          sampled = Math.min(100, Math.max(0, sampled));
          setDisplayValue(sampled);
        }

        rafRef.current = requestAnimationFrame(step);
      } else if (!completionRef.current) {
        setProgress(1);
        setDisplayValue(100);
        completionRef.current = true;
        timeoutRef.current = setTimeout(() => onComplete?.(), 420);
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [onComplete]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const fillPercent = Math.min(105, Math.max(0, progress * 105 + 3));
  const isComplete = displayValue >= 96;
  const formattedNumber = displayValue.toString();
  const gradient = `linear-gradient(0deg, #ffffff 0%, #ffffff ${fillPercent}%, rgba(255,255,255,0) ${fillPercent +
    2}%, rgba(255,255,255,0) 100%)`;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black text-white flex items-center justify-center select-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(6px)", transition: { duration: 0.7, ease: EXIT_EASE } }}
    >
      <div
        className="absolute top-6 right-8 text-xl sm:text-2xl font-semibold tracking-[0.18em] text-white/80"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {formattedNumber}
      </div>

      <div className="relative flex items-center gap-3 sm:gap-6 px-6">
        <span className="hidden sm:block h-px w-20 sm:w-28 bg-white/20" />
        <div className="relative leading-none">
          <div className="signature-script text-5xl sm:text-6xl md:text-7xl" style={{ color: "rgba(255,255,255,0.16)" }}>
            Zurabi Kochiashvili
          </div>
          <div
            aria-hidden="true"
            className="signature-script signature-fill absolute inset-0 text-5xl sm:text-6xl md:text-7xl"
            style={{
              backgroundImage: gradient,
              WebkitBackgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
            }}
          >
            Zurabi Kochiashvili
          </div>
          <div
            aria-hidden="true"
            className="signature-script signature-fill absolute inset-0 text-5xl sm:text-6xl md:text-7xl"
            style={{
              color: "#ffffff",
              opacity: isComplete ? 1 : 0,
              transition: "opacity 220ms ease-out",
            }}
          >
            Zurabi Kochiashvili
          </div>
        </div>
        <span className="hidden sm:block h-px w-20 sm:w-28 bg-white/20" />
      </div>
    </motion.div>
  );
}
