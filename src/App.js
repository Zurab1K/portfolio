import { useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
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
      const timer = setTimeout(() => setContentReady(true), 120);
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  return (
    <LayoutGroup>
      <div className="relative text-white" style={{ backgroundColor: "rgb(32, 32, 32)" }}>
        <AnimatePresence>
          {showIntro && (
            <IntroLoader key="intro-loader" onComplete={() => setShowIntro(false)} />
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: contentReady ? 1 : 0, y: contentReady ? 0 : 18 }}
          transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
          className={contentReady ? "" : "pointer-events-none"}
        >
          <Header introActive={showIntro} />
          <Hero />
          <About />
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
