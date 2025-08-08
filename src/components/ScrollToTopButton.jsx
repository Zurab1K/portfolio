import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-md hover:scale-110 transition-transform"
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-5 h-5 text-neutral-800 dark:text-neutral-100" />
    </button>
  );
}
