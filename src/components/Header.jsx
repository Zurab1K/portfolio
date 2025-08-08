import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext"; // ✅ Import theme hook

const links = ["About", "Education", "Experience", "Projects", "Contact"];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme(); // ✅ Access current theme and toggler

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white"
        >
          Zurabi Kochiashvili
        </motion.h1>

        <nav className="hidden md:flex gap-8 items-center text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="hover:text-black dark:hover:text-white transition"
            >
              {link}
            </a>
          ))}
          {/* 🌗 Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="ml-4 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>

        {/* ☰ Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="text-neutral-700 dark:text-neutral-300"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="text-neutral-700 dark:text-neutral-300"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 📱 Mobile Dropdown Menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-800 shadow-md"
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white transition"
              >
                {link}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}
