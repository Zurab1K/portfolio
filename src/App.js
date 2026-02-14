import { useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import Header from "./components/Header";
import CurtainReveal from "./components/CurtainReveal";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import IntroLoader from "./components/IntroLoader";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    if (!showIntro) {
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
      const timer = setTimeout(() => setContentReady(true), 120);
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  return (
    <LayoutGroup>
      <div className="relative" style={{ backgroundColor: "rgb(var(--color-bg))", color: "rgb(var(--color-text-primary))" }}>
        <AnimatePresence>
          {showIntro && (
            <IntroLoader key="intro-loader" onComplete={() => setShowIntro(false)} />
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: contentReady ? 1 : 0 }}
          transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
          className={contentReady ? "" : "pointer-events-none"}
        >
          <Header introActive={showIntro} />
          <CurtainReveal typingActive={contentReady} revealActive={contentReady} />
          <Experience />
          <Projects />
          <Contact />
          <Footer />
          <ScrollToTopButton />
        </motion.div>
      </div>
    </LayoutGroup>
  );
}
