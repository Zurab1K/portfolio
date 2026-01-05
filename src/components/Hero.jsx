import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="h-screen w-full bg-[#0a0a0a] flex items-center justify-center text-white relative overflow-hidden"
    >
      <div className="max-w-4xl px-6 z-10 text-center">
        <motion.img
          src="/profile.jpeg"
          alt="Zurabi Kochiashvili headshot"
          loading="eager"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="mx-auto mb-6 w-36 h-36 md:w-44 md:h-44 rounded-full object-cover shadow-xl ring-1 ring-neutral-200/70 dark:ring-neutral-700/70"
        />
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.2]"
        >
          Zurabi Kochiashvili
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="mt-6 text-xl md:text-2xl text-neutral-200"
        >
          CS Honors & Economics @ SBU • University Scholar
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6 }}
          className="mt-10 flex justify-center gap-4"
        >
          <a
            href="#projects"
            className="px-6 py-3 bg-white text-black rounded-full hover:bg-neutral-200 transition"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-white/60 text-white rounded-full hover:bg-white/10 transition"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
