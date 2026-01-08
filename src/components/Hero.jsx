import { useEffect, useState } from "react";
import { scrollToId } from "../utils/scrollToTop";

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
      className="h-screen w-full bg-[rgb(15,15,15)] flex items-center justify-center text-white relative overflow-hidden"
    >
      <div className="max-w-4xl px-6 z-10 text-center">
        <img
          src="/profile.jpeg"
          alt="Zurabi Kochiashvili headshot"
          loading="eager"
          className="mx-auto mb-8 w-64 h-64 md:w-72 md:h-72 rounded-2xl object-cover object-[50%_30%] shadow-[0_0_50px_rgba(16,185,129,0.35),0_0_80px_rgba(16,185,129,0.2),0_24px_60px_-24px_rgba(0,0,0,0.8)]"
        />

        <h1
          className="typewriter-text text-5xl md:text-6xl font-normal tracking-tight leading-[1.2]"
          aria-label={TYPING_TEXT}
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

        <p
          className="mt-6 text-xl md:text-2xl"
          style={{ color: "rgb(108, 108, 108)", fontFamily: "'JetBrains Mono', monospace" }}
        >
          Web Developer | AI/ML Researcher
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <a
            href="#projects"
            onClick={(event) => handleHeroNav(event, "projects")}
            className="px-8 py-3 bg-[rgb(16,185,129)] text-white font-normal rounded-full hover:bg-[rgb(13,148,103)] transition"
            style={{ fontFamily: '"Sora", "Sora-Regular", sans-serif' }}
          >
            View Projects
          </a>
          <a
            href="#contact"
            onClick={(event) => handleHeroNav(event, "contact")}
            className="px-8 py-3 border border-[rgb(16,185,129)] text-[rgb(16,185,129)] rounded-full hover:bg-[rgba(16,185,129,0.18)] transition font-normal"
            style={{ fontFamily: '"Sora", "Sora-Regular", sans-serif' }}
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
