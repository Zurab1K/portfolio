import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { scrollToId, scrollToTop } from "../utils/scrollToTop";

const links = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Header({ introActive = false }) {
  const [active, setActive] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const manualTargetRef = useRef(null);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;
      const match = links.find((l) => l.id === hash);
      if (match) setActive(match.id);
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionConfig = [{ id: "hero", name: null }, ...links];
    let ticking = false;
    const updateActive = () => {
      const targetY = window.scrollY + window.innerHeight * 0.35;
      const manualTarget = manualTargetRef.current;
      if (manualTarget) {
        const targetEl = document.getElementById(manualTarget);
        if (!targetEl) {
          manualTargetRef.current = null;
        } else {
          const top = targetEl.offsetTop;
          const bottom = top + targetEl.offsetHeight;
          if (targetY >= top && targetY < bottom) {
            manualTargetRef.current = null;
            setActive(manualTarget);
            ticking = false;
            return;
          }
          setActive(manualTarget);
          ticking = false;
          return;
        }
      }
      let next = null;
      for (const section of sectionConfig) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (targetY >= top && targetY < bottom) {
          next = section.id;
          break;
        }
      }
      setActive(next);
      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleNavClick = (event, id) => {
    if (event?.preventDefault) {
      event.preventDefault();
    }
    manualTargetRef.current = id;
    setActive(id);
    scrollToId(id);
    setMobileOpen(false);
    if (window.history?.pushState) {
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{
        opacity: introActive ? 0 : 1,
        transition: "opacity 500ms ease, background-color 300ms ease, backdrop-filter 300ms ease",
        backgroundColor: scrolled ? "rgba(var(--color-bg), 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px) saturate(1.4)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px) saturate(1.4)" : "none",
        borderBottom: scrolled ? "1px solid rgba(var(--color-border), var(--color-border-opacity))" : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo / Name */}
        <motion.button
          type="button"
          onClick={scrollToTop}
          className="font-mono text-sm font-medium tracking-wider transition-colors"
          style={{ color: "rgb(var(--color-text-primary))" }}
          layoutId="signature-name"
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "rgb(var(--color-accent))";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgb(var(--color-text-primary))";
          }}
        >
          ZK
        </motion.button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(event) => handleNavClick(event, link.id)}
                className="relative px-4 py-2 text-[13px] font-mono tracking-wide transition-colors duration-200"
                style={{
                  color: isActive
                    ? "rgb(var(--color-accent))"
                    : "rgb(var(--color-text-secondary))",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = "rgb(var(--color-text-primary))";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = "rgb(var(--color-text-secondary))";
                }}
              >
                <span className="font-mono" style={{ color: "rgb(var(--color-accent))", marginRight: "4px", fontSize: "11px" }}>
                  {'//'}
                </span>
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-4 right-4 h-px"
                    style={{ backgroundColor: "rgb(var(--color-accent))" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((p) => !p)}
          className="md:hidden transition-colors"
          style={{ color: "rgb(var(--color-text-secondary))" }}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            className="md:hidden border-t"
            style={{
              backgroundColor: "rgba(var(--color-bg), 0.95)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              borderColor: "rgba(var(--color-border), var(--color-border-opacity))",
            }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {links.map((link) => {
                const isActive = active === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(event) => handleNavClick(event, link.id)}
                    className="py-3 font-mono text-sm tracking-wide transition-colors"
                    style={{
                      color: isActive
                        ? "rgb(var(--color-accent))"
                        : "rgb(var(--color-text-secondary))",
                    }}
                  >
                    <span style={{ color: "rgb(var(--color-accent))", marginRight: "8px" }}>{'>'}</span>
                    {link.label}
                  </a>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
