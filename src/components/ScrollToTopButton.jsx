import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { scrollToTop } from "../utils/scrollToTop";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 p-2.5 rounded-lg transition-all duration-300"
      style={{
        backgroundColor: "rgba(var(--color-bg-card), 0.9)",
        border: "1px solid rgba(var(--color-border), 0.08)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        color: "rgb(var(--color-text-secondary))",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(var(--color-accent), 0.2)";
        e.currentTarget.style.color = "rgb(var(--color-accent))";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(var(--color-border), 0.08)";
        e.currentTarget.style.color = "rgb(var(--color-text-secondary))";
      }}
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-4 h-4" />
    </button>
  );
}
