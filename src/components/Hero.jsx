import { useEffect, useState } from "react";
import { scrollToId } from "../utils/scrollToTop";
import { ArrowDown } from "lucide-react";

const TYPING_TEXT = "Hi, I'm Zurabi";

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
    }, 90);

    return () => window.clearInterval(intervalId);
  }, [typingActive]);

  const handleHeroNav = (event, id) => {
    if (event?.preventDefault) {
      event.preventDefault();
    }
    scrollToId(id);
    if (window.history?.pushState) {
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <section
      id="hero"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-grid noise-overlay"
      style={{ backgroundColor: "rgb(var(--color-bg))" }}
    >
      {/* Subtle radial glow behind the hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 45%, rgba(var(--color-accent), 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl px-6 text-center">
        {/* Profile image with refined border */}
        <div className="mx-auto mb-10 relative w-32 h-32 md:w-40 md:h-40">
          <div
            className="absolute -inset-[2px] rounded-full opacity-60"
            style={{
              background: "linear-gradient(135deg, rgb(var(--color-accent)), transparent 60%)",
            }}
          />
          <img
            src="/profile.jpeg"
            alt="Zurabi Kochiashvili headshot"
            loading="eager"
            className="relative w-full h-full rounded-full object-cover object-[50%_30%]"
            style={{
              border: "2px solid rgb(var(--color-bg))",
            }}
          />
        </div>

        {/* Typing headline */}
        <h1
          className="typewriter-text text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight"
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

        {/* Subtitle */}
        <p className="mt-5 font-mono text-sm md:text-base tracking-wide" style={{ color: "rgb(var(--color-accent))" }}>
          Web Developer &middot; AI/ML Researcher
        </p>

        {/* Brief intro */}
        <p
          className="mt-6 max-w-xl mx-auto text-base md:text-lg leading-relaxed"
          style={{ color: "rgb(var(--color-text-secondary))" }}
        >
          Sophomore at Stony Brook University. Building things at the
          intersection of software engineering and artificial intelligence.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex justify-center gap-4">
          <a
            href="#projects"
            onClick={(event) => handleHeroNav(event, "projects")}
            className="group px-7 py-3 text-sm font-medium tracking-wide rounded-full transition-all duration-300"
            style={{
              backgroundColor: "rgb(var(--color-accent))",
              color: "rgb(var(--color-bg))",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 30px rgba(var(--color-accent), 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            View Projects
          </a>
          <a
            href="#contact"
            onClick={(event) => handleHeroNav(event, "contact")}
            className="px-7 py-3 text-sm font-medium tracking-wide rounded-full transition-all duration-300"
            style={{
              border: "1px solid rgba(var(--color-accent), 0.3)",
              color: "rgb(var(--color-accent))",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgb(var(--color-accent))";
              e.currentTarget.style.backgroundColor = "rgba(var(--color-accent), 0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(var(--color-accent), 0.3)";
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            Get in Touch
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={(e) => handleHeroNav(e, "about")}
            className="animate-bounce"
            style={{ color: "rgb(var(--color-text-muted))" }}
            aria-label="Scroll to about section"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
