import { useEffect, useRef, useState } from "react";
import Hero from "./Hero";
import About from "./About";

const clamp01 = (value) => Math.min(1, Math.max(0, value));
const HERO_SCROLL_MULTIPLIER = 1;
const ABOUT_SCROLL_MULTIPLIER = 1.6;

export default function CurtainReveal({ typingActive = true, revealActive = true }) {
  const containerRef = useRef(null);
  const [heroProgress, setHeroProgress] = useState(0);
  const [aboutProgress, setAboutProgress] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(() =>
    typeof window !== "undefined" ? window.innerHeight || 1 : 1
  );

  useEffect(() => {
    const updateViewport = () => {
      setViewportHeight(window.innerHeight || 1);
    };
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const heroDistance = viewportHeight * HERO_SCROLL_MULTIPLIER;
  const aboutDistance = viewportHeight * ABOUT_SCROLL_MULTIPLIER;
  const aboutAnchorHeight = aboutDistance + viewportHeight;

  useEffect(() => {
    if (!revealActive) {
      setHeroProgress(0);
      setAboutProgress(0);
      return undefined;
    }

    let ticking = false;
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const start = el.offsetTop;
      const raw = window.scrollY - start;
      const hero = clamp01(raw / heroDistance);
      const about = clamp01((raw - heroDistance) / aboutDistance);
      setHeroProgress(hero);
      setAboutProgress(about);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        handleScroll();
      });
    };

    handleScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [heroDistance, aboutDistance, revealActive]);

  const translateY = -heroProgress * viewportHeight;
  const containerHeight = viewportHeight + heroDistance + aboutDistance;

  return (
    <div
      ref={containerRef}
      className="relative bg-[rgb(20,20,20)]"
      style={{ height: containerHeight }}
    >
      <div
        id="about"
        aria-hidden="true"
        className="absolute left-0 right-0 pointer-events-none"
        style={{ top: heroDistance, height: aboutAnchorHeight }}
      />
      <div className="sticky top-0 h-screen grid">
        <div className="col-start-1 row-start-1 z-0">
          <About progress={aboutProgress} />
        </div>
        <div className="col-start-1 row-start-1 z-10 overflow-hidden">
          <div
            className="h-screen"
            style={{
              transform: `translate3d(0, ${translateY}px, 0)`,
              willChange: "transform",
            }}
          >
            <Hero typingActive={typingActive} />
          </div>
        </div>
      </div>
    </div>
  );
}
