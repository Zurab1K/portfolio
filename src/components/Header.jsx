import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const links = ["About", "Education", "Experience", "Projects", "Contact"];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // underline animation utility (hover only)
  const underlineClass =
    "relative inline-block py-1 transition-colors " +
    "after:content-[''] after:absolute after:left-0 after:bottom-0 " +
    "after:h-[2px] after:w-full after:bg-current " +
    "after:transition-transform after:duration-300 after:origin-left " +
    "after:scale-x-0 hover:after:scale-x-100";

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand (links to hero) */}
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white"
        >
          <a href="#hero" className="hover:opacity-80 transition">
            Zurabi Kochiashvili
          </a>
        </motion.h1>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8 items-center text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`${underlineClass} hover:text-black dark:hover:text-white`}
            >
              {link}
            </a>
          ))}
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
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown (no backdrop, page can scroll) */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="fixed inset-x-0 top-16 md:hidden bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-800 shadow-lg"
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <ul className="px-6 py-4 flex flex-col items-center text-center gap-2">
              {links.map((link) => (
                <li key={link} className="w-full">
                  <a
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className={`${underlineClass} block w-full py-3 text-base text-neutral-900 dark:text-neutral-100 hover:text-black dark:hover:text-white`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
