import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { scrollToTop } from "../utils/scrollToTop";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 400);
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 p-2 rounded transition-colors duration-150"
      style={{
        backgroundColor: "rgba(255,255,255,0.05)",
        color: "rgb(var(--color-text-muted))",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
        e.currentTarget.style.color = "rgb(var(--color-text-primary))";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
        e.currentTarget.style.color = "rgb(var(--color-text-muted))";
      }}
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-4 h-4" />
    </button>
  );
}
