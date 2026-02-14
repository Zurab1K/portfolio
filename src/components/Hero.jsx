import { useEffect, useState } from "react";
import { scrollToId } from "../utils/scrollToTop";
import { ArrowDown } from "lucide-react";

const TYPING_TEXT = "Zurabi Kochiashvili";

export default function Hero({ typingActive = true }) {
  const [typedText, setTypedText] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    if (!typingActive) {
      setTypedText("");
      setTypingDone(false);
      return undefined;
    }

    let index = 0;
    setTypedText("");
    setTypingDone(false);
    const intervalId = window.setInterval(() => {
      index += 1;
      setTypedText(TYPING_TEXT.slice(0, index));
      if (index >= TYPING_TEXT.length) {
        window.clearInterval(intervalId);
        setTypingDone(true);
      }
    }, 80);

    return () => window.clearInterval(intervalId);
  }, [typingActive]);

  const handleHeroNav = (event, id) => {
    if (event?.preventDefault) event.preventDefault();
    scrollToId(id);
    if (window.history?.pushState) window.history.pushState(null, "", `#${id}`);
  };

  return (
    <section
      id="hero"
      className="relative h-screen w-full flex items-center overflow-hidden"
      style={{ backgroundColor: "rgb(var(--color-bg))" }}
    >
      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full">
        {/* Small intro line */}
        <p
          className="text-sm mb-4"
          style={{ color: "rgb(var(--color-text-secondary))" }}
        >
          Hey, I'm
        </p>

        {/* Name with typing effect */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-none"
          aria-label={TYPING_TEXT}
          style={{ color: "rgb(var(--color-text-primary))" }}
        >
          <span>{typedText}</span>
          <span
            className="typewriter-cursor"
            aria-hidden="true"
            data-typing-done={typingDone}
          >
            |
          </span>
        </h1>

        {/* Role line */}
        <p
          className="mt-4 text-lg sm:text-xl md:text-2xl font-light"
          style={{ color: "rgb(var(--color-text-secondary))" }}
        >
          Developer & AI/ML Researcher
        </p>

        {/* Brief description */}
        <p
          className="mt-6 max-w-lg text-base leading-relaxed"
          style={{ color: "rgb(var(--color-text-muted))" }}
        >
          Sophomore at Stony Brook University studying CS & Economics.
          I build things at the intersection of software and artificial intelligence.
        </p>

        {/* Links row */}
        <div className="mt-10 flex items-center gap-6">
          <a
            href="#projects"
            onClick={(event) => handleHeroNav(event, "projects")}
            className="text-sm font-medium underline underline-offset-4 decoration-1 transition-colors duration-150"
            style={{
              color: "rgb(var(--color-text-primary))",
              textDecorationColor: "rgba(var(--color-text-muted), 0.5)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textDecorationColor = "rgb(var(--color-text-primary))";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textDecorationColor = "rgba(var(--color-text-muted), 0.5)";
            }}
          >
            See my work
          </a>
          <a
            href="#contact"
            onClick={(event) => handleHeroNav(event, "contact")}
            className="text-sm transition-colors duration-150"
            style={{ color: "rgb(var(--color-text-muted))" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "rgb(var(--color-text-primary))";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgb(var(--color-text-muted))";
            }}
          >
            Get in touch
          </a>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-6">
          <button
            onClick={(e) => handleHeroNav(e, "about")}
            className="animate-bounce"
            style={{ color: "rgb(var(--color-text-muted))" }}
            aria-label="Scroll down"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
