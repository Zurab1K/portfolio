import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { id: "about", label: "About Me" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Header({ introActive = false }) {
  const [active, setActive] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const manualRef = useRef(0);
  const isAboutActive = active === "about";

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
    const sectionConfig = [{ id: "hero", name: null }, ...links];

    let ticking = false;
    const updateActive = () => {
      const now = performance.now();
      if (now - manualRef.current < 900) {
        ticking = false;
        return;
      }
      const targetY = window.scrollY + window.innerHeight * 0.35;
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

  const handleActivate = (id) => {
    manualRef.current = performance.now();
    setActive(id);
  };

  const itemClass =
    "relative inline-flex items-center justify-center px-4 sm:px-5 py-2.5 text-sm sm:text-base font-medium tracking-tight transition-colors duration-300 ease-in-out";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed inset-x-0 top-4 z-50 pointer-events-none">
      <div
        className="relative w-full flex items-center justify-between gap-3 px-4 sm:px-6"
        style={{ height: "64px" }}
      >
        <motion.button
          type="button"
          onClick={scrollToTop}
          className={`pointer-events-auto flex-shrink-0 signature-script text-2xl sm:text-3xl leading-none transition-colors z-10 ${
            isAboutActive ? "text-neutral-900 hover:text-black" : "text-white/90 hover:text-white"
          }`}
          style={{ opacity: introActive ? 0 : 1, transition: "opacity 500ms ease" }}
          layoutId="signature-name"
        >
          Zurabi Kochiashvili
        </motion.button>

        {/* Nav for large screens (centered) */}
        <div className="hidden lg:flex pointer-events-auto absolute inset-0 justify-center items-center">
          <NavPill
            links={links}
            active={active}
            setActive={handleActivate}
            itemClass={itemClass}
            minWidth={96}
          />
        </div>

        <button
          onClick={() => setMobileOpen((p) => !p)}
          className={`pointer-events-auto flex lg:hidden items-center transition-colors ${
            isAboutActive ? "text-neutral-900 hover:text-black" : "text-white/90 hover:text-white"
          }`}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {mobileOpen && (
          <motion.nav
            className="pointer-events-auto lg:hidden absolute top-full mt-3 right-4 sm:right-6 z-50"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
          >
            <MobileMenu
              links={links}
              active={active}
              setActive={handleActivate}
              itemClass={itemClass}
            />
          </motion.nav>
        )}
      </div>
    </header>
  );
}

function NavPill({ links, active, setActive, itemClass, minWidth }) {
  return (
    <motion.div
      layout
      className="relative flex items-center gap-1.5 sm:gap-2 rounded-full overflow-hidden no-scrollbar overflow-x-auto"
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
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {links.map((link) => {
        const isActive = active === link.id;
        return (
          <motion.a
            layout
            key={link.id}
            href={`#${link.id}`}
            onClick={() => setActive(link.id)}
            className={`${itemClass} ${isActive ? "text-black" : "text-black"}`}
            style={{ minWidth, fontFamily: '"Helvetica Now", sans-serif' }}
            data-minwidth="nav-item"
          >
            {isActive && (
              <motion.span
                layoutId="nav-active"
                className="absolute inset-0 rounded-full"
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                style={{
                  backgroundColor: "rgba(245,245,245,0.92)",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.12)",
                }}
              />
            )}
            <span className="relative">{link.label}</span>
          </motion.a>
        );
      })}
    </motion.div>
  );
}

function MobileMenu({ links, active, setActive, itemClass }) {
  return (
    <motion.div
      layout
      className="flex flex-col gap-2 rounded-2xl overflow-hidden"
      style={{
        padding: "6px 8px",
        background: "rgba(229,229,229,0.45)",
        boxShadow: "0 10px 28px rgba(0,0,0,0.12)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderRadius: "18px",
        minWidth: "140px",
        alignItems: "stretch",
      }}
    >
      {links.map((link) => {
        const isActive = active === link.id;
        return (
          <motion.a
            key={link.id}
            layout
            href={`#${link.id}`}
            onClick={() => setActive(link.id)}
            className={`${itemClass} w-full justify-center ${isActive ? "text-black" : "text-black"}`}
            style={{
              minWidth: "100%",
              fontFamily: '"Helvetica Now", sans-serif',
              borderRadius: "9999px",
              padding: "9px 12px",
              backgroundColor: isActive ? "rgba(245,245,245,0.95)" : "transparent",
              boxShadow: isActive ? "0 2px 5px rgba(0,0,0,0.12)" : "none",
            }}
          >
            <span className="relative">{link.label}</span>
          </motion.a>
        );
      })}
    </motion.div>
  );
}
