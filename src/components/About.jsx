import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 py-32 px-6 border-t border-neutral-200 dark:border-neutral-800"
    >
      {/* Section shade (top/bottom) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-neutral-900/5 dark:from-white/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-neutral-900/5 dark:from-white/10 to-transparent" />

      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-semibold mb-8"
        >
          About Me
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-lg md:text-xl leading-relaxed text-neutral-700 dark:text-neutral-300 text-justify"
        >
          I’m a sophomore at Stony Brook University studying Computer Science and Economics (AMS minor, CS Honors, University Scholars). I’m especially interested in AI and machine learning—lately focusing on how models reason and how to make that reasoning more reliable—and I enjoy building clean, thoughtful products that feel as good as they look. Outside of classes, I’m involved in research at Algoverse, I TA and tutor, and I help lead student orgs on campus.
        </motion.p>
      </div>
    </section>
  );
}
