import { motion } from "framer-motion";
import experiences from "../data/experience";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative bg-[#fdfdfd] dark:bg-black text-neutral-900 dark:text-neutral-100 py-32 px-6 border-t border-neutral-200 dark:border-neutral-800"
    >
      {/* Section shade (top/bottom) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-neutral-900/5 dark:from-white/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-neutral-900/5 dark:from-white/10 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-semibold text-center mb-20"
        >
          Experience
        </motion.h2>

        <div className="relative">
          {/* Midline (medium screens and up only) */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-neutral-300 dark:bg-neutral-700" />

          <div className="flex flex-col gap-16">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`relative w-full md:w-[48%] ${
                    isLeft ? "md:mr-auto md:pl-12" : "md:ml-auto md:pr-12"
                  }`}
                >
                  <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={exp.logo}
                        alt={exp.org}
                        className="w-12 h-12 object-contain rounded-md"
                      />
                      <div>
                        <h3 className="text-lg font-semibold">{exp.title}</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-300">{exp.org}</p>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">{exp.time}</p>
                      </div>
                    </div>

                    <div className="space-y-2 text-neutral-700 dark:text-neutral-300 text-[15px] leading-relaxed text-justify">
                      {exp.description.map((point, i) => (
                        <p key={i}>{point}</p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
