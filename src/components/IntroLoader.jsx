import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const EXIT_EASE = [0.33, 1, 0.68, 1];

export default function IntroLoader({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const completionRef = useRef(false);
  const timeoutRef = useRef();

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      if (!completionRef.current) {
        completionRef.current = true;
        setVisible(false);
        setTimeout(() => onComplete?.(), 500);
      }
    }, 1600);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [onComplete]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center select-none"
      style={{ backgroundColor: "rgb(var(--color-bg))" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: visible ? 1 : 0 }}
      exit={{ opacity: 0, transition: { duration: 0.4, ease: EXIT_EASE } }}
    >
      <motion.span
        className="signature-script text-5xl sm:text-6xl md:text-7xl"
        style={{ color: "rgb(var(--color-text-primary))" }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Zurabi
      </motion.span>
    </motion.div>
  );
}
