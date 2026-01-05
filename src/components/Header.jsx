import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = ["About", "Education", "Experience", "Projects", "Contact"];

export default function Header({ introActive = false }) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        const match = links.find((l) => l.toLowerCase() === hash.toLowerCase());
        if (match) setActive(match);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  useEffect(() => {
    const sectionConfig = [
      { id: "hero", name: null },
      { id: "about", name: "About" },
      { id: "education", name: "Education" },
      { id: "experience", name: "Experience" },
      { id: "projects", name: "Projects" },
      { id: "contact", name: "Contact" },
    ];
    const ratios = {};
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios[entry.target.id] = entry.intersectionRatio;
        });
        const heroRatio = ratios.hero || 0;
        if (heroRatio >= 0.35) {
          setActive(null);
          return;
        }
        const best = sectionConfig
          .filter((s) => s.id !== "hero")
          .map((s) => ({ ...s, ratio: ratios[s.id] || 0 }))
          .sort((a, b) => b.ratio - a.ratio)[0];
        if (best && best.ratio > 0.15) {
          setActive(best.name);
        }
      },
      { threshold: [0.1, 0.25, 0.35, 0.5, 0.75] }
    );
    sectionConfig.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const itemClass =
    "relative inline-flex items-center justify-center px-5 sm:px-6 py-2.5 text-base font-medium tracking-tight transition-colors duration-300 ease-in-out";

  return (
    <header className="fixed inset-x-0 top-4 z-50 pointer-events-none">
      <div className="relative w-full flex items-center justify-center px-4 sm:px-6" style={{ height: "64px" }}>
        <motion.a
          href="#hero"
          className="pointer-events-auto absolute inset-y-0 left-4 sm:left-6 flex items-center signature-script text-2xl sm:text-3xl leading-none text-white/90 hover:text-white transition-colors"
          style={{ opacity: introActive ? 0 : 1, transition: "opacity 500ms ease" }}
          layoutId="signature-name"
        >
          Zurabi Kochiashvili
        </motion.a>
        <nav className="pointer-events-auto">
          <motion.div
            className="relative flex items-center gap-2 rounded-full overflow-hidden"
            style={{
              padding: "6px 8px",
              background: "rgba(229,229,229,0.45)",
              boxShadow: "0 10px 28px rgba(0,0,0,0.12)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              borderRadius: "9999px",
            }}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {links.map((link) => {
              const isActive = active === link;
              return (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setActive(link)}
                  className={`${itemClass} ${isActive ? "text-black" : "text-black"}`}
                  style={{ minWidth: 110, fontFamily: '"Helvetica Now", sans-serif' }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full"
                      transition={{ type: "spring", stiffness: 240, damping: 26 }}
                      style={{
                        backgroundColor: "rgba(245,245,245,0.92)",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.12)",
                      }}
                    />
                  )}
                  <span className="relative">{link}</span>
                </a>
              );
            })}
          </motion.div>
        </nav>
      </div>
    </header>
  );
}
