import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-[#0a0a0a] text-neutral-100 py-32 px-6 border-t border-neutral-800"
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-semibold mb-16 text-white"
        >
          About Me
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-lg md:text-xl leading-relaxed text-neutral-300 text-justify"
        >
          I’m a sophomore at Stony Brook University pursuing a B.S. in Computer Science with a second major in Economics. I’m especially interested in AI, Machine Learning, and Finance, and I’m excited to explore opportunities to expand my skills and gain experience.
        </motion.p>
      </div>
    </section>
  );
}
