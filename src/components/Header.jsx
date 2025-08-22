import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const links = ["About", "Education", "Experience", "Projects", "Contact"];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero"); // track current section
  const { theme, toggleTheme } = useTheme();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Scrollspy: underline current section while scrolling
  useEffect(() => {
    const ids = ["hero", "about", "education", "experience", "projects", "contact"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        // Make it "active" when ~35% of a section is in view
        root: null,
        rootMargin: "-30% 0px -35% 0px",
        threshold: 0,
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id) => {
    setActiveSection(id);
    setOpen(false);
  };

  // Utility to build the animated underline class
  const underlineClass = (isActive) =>
    [
      "relative inline-block py-1 transition-colors",
      // underline (after pseudo-element)
      "after:content-[''] after:absolute after:left-0 after:bottom-0",
      "after:h-[2px] after:w-full after:bg-current",
      "after:transition-transform after:duration-300 after:origin-left",
      // start hidden, reveal on hover; if active, keep it shown
      isActive ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
    ].join(" ");

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Name → links to hero */}
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white"
        >
          <a
            href="#hero"
            onClick={() => handleNavClick("hero")}
            className="hover:opacity-80 transition"
          >
            Zurabi Kochiashvili
          </a>
        </motion.h1>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8 items-center text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {links.map((link) => {
            const id = link.toLowerCase();
            const isActive = activeSection === id;
            return (
              <a
                key={link}
                href={`#${id}`}
                onClick={() => handleNavClick(id)}
                className={`${underlineClass(isActive)} ${
                  isActive ? "text-neutral-900 dark:text-neutral-100" : ""
                } hover:text-black dark:hover:text-white`}
              >
                {link}
              </a>
            );
          })}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="ml-2 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="text-neutral-700 dark:text-neutral-300"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setOpen((s) => !s)}
            className="text-neutral-700 dark:text-neutral-300"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle Menu"
          >
            {open ? <Menu className="hidden" /> : <Menu className="w-6 h-6" />}
            {open ? <X className="w-6 h-6" /> : null}
          </button>
        </div>
      </div>

      {/* Mobile dropdown (full‑width, below header) */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.button
              type="button"
              aria-label="Close Menu"
              onClick={() => setOpen(false)}
              className="fixed inset-0 top-16 bg-black/30 dark:bg-black/50 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Panel */}
            <motion.nav
              id="mobile-menu"
              className="fixed inset-x-0 top-16 md:hidden bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-800 shadow-lg"
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="px-6 py-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    Menu
                  </span>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 -mr-2 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                    aria-label="Close Menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <ul className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800 rounded-xl overflow-hidden">
                  {links.map((link) => {
                    const id = link.toLowerCase();
                    const isActive = activeSection === id;
                    return (
                      <li key={link}>
                        <a
                          href={`#${id}`}
                          onClick={() => handleNavClick(id)}
                          className={`block w-full text-base py-3.5 px-3 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition ${underlineClass(
                            isActive
                          )}`}
                        >
                          {link}
                        </a>
                      </li>
                    );
                  })}
                </ul>

                {/* Bottom row: theme toggle (big target) */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-neutral-600 dark:text-neutral-300">
                    Appearance
                  </span>
                  <button
                    onClick={toggleTheme}
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 text-sm text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
                    aria-label="Toggle Theme"
                  >
                    {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                    {theme === "dark" ? "Light" : "Dark"}
                  </button>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
