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
          className="mx-auto mb-8 w-64 h-64 md:w-72 md:h-72 rounded-2xl object-cover object-[50%_30%] shadow-xl ring-2 ring-neutral-800"
        />
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-normal tracking-tight leading-[1.2]"
          style={{ fontFamily: '"Sora", "Sora-Regular", sans-serif' }}
        >
          Hi, I'm Zurabi
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="mt-6 text-xl md:text-2xl"
          style={{ color: "rgb(108, 108, 108)", fontFamily: "'JetBrains Mono', monospace" }}
        >
          Web Developer | AI/ML Researcher
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6 }}
          className="mt-10 flex justify-center gap-4"
        >
          <a
            href="#projects"
            className="px-6 py-3 bg-[rgb(61,97,154)] text-white font-medium rounded-full hover:bg-[rgb(52,82,131)] transition"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-[rgb(61,97,154)] text-[rgb(61,97,154)] rounded-full hover:bg-[rgba(61,97,154,0.18)] transition font-medium"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
