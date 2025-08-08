import { motion } from "framer-motion";
import education from "../data/education.js";

export default function Education() {
  return (
    <section
      id="education"
      className="bg-[#fdfdfd] dark:bg-black text-neutral-900 dark:text-neutral-100 py-32 px-6 border-t border-neutral-200 dark:border-neutral-800"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-semibold text-center mb-16"
        >
          Education
        </motion.h2>

        {education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={edu.logo}
                alt={edu.school}
                className="w-12 h-12 object-contain"
              />
              <div>
                <h3 className="text-xl font-semibold">{edu.school}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{edu.degree}</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {edu.dates}
                </p>
              </div>
            </div>

            <p className="text-sm text-neutral-800 dark:text-neutral-200">
              <span className="font-semibold">Awards & Honors:</span>{" "}
              {edu.honors.join(", ")}
            </p>
            <p className="text-sm text-neutral-800 dark:text-neutral-200 mt-2">
              <span className="font-semibold">Relevant Coursework:</span>{" "}
              {edu.coursework.join(", ")}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
