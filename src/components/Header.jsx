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
    const handleScroll = () => setScrolled(window.scrollY > 50);
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
    if (event?.preventDefault) event.preventDefault();
    manualTargetRef.current = id;
    setActive(id);
    scrollToId(id);
    setMobileOpen(false);
    if (window.history?.pushState) window.history.pushState(null, "", `#${id}`);
  };

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{
        opacity: introActive ? 0 : 1,
        transition: "opacity 400ms ease, background-color 300ms ease, backdrop-filter 300ms ease",
        backgroundColor: scrolled ? "rgba(12, 12, 12, 0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-14">
        <button
          type="button"
          onClick={scrollToTop}
          className="text-sm font-medium tracking-tight"
          style={{ color: "rgb(var(--color-text-primary))" }}
        >
          Zurabi K.
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(event) => handleNavClick(event, link.id)}
                className="relative text-[13px] tracking-wide transition-colors duration-150"
                style={{
                  color: isActive ? "rgb(var(--color-text-primary))" : "rgb(var(--color-text-secondary))",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = "rgb(var(--color-text-primary))";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = "rgb(var(--color-text-secondary))";
                }}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-dot"
                    className="absolute -bottom-1 left-1/2 w-1 h-1 rounded-full -translate-x-1/2"
                    style={{ backgroundColor: "rgb(var(--color-text-primary))" }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        <button
          onClick={() => setMobileOpen((p) => !p)}
          className="md:hidden"
          style={{ color: "rgb(var(--color-text-secondary))" }}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            className="md:hidden"
            style={{
              backgroundColor: "rgba(12, 12, 12, 0.97)",
              borderTop: "1px solid rgba(255,255,255,0.05)",
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
                    className="py-3 text-sm transition-colors"
                    style={{
                      color: isActive ? "rgb(var(--color-text-primary))" : "rgb(var(--color-text-secondary))",
                    }}
                  >
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
