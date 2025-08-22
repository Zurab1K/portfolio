import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import projects from "../data/projects.js";

export default function Projects() {
  return (
    <section
      id="projects"
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
          className="text-4xl md:text-5xl font-semibold text-center mb-16"
        >
          Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((proj, index) => (
            <motion.a
              key={index}
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="block rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
            >
              <img
                src={proj.image}
                alt={proj.title}
                className="w-full h-52 object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="p-6">
                <h3 className="text-xl font-medium mb-2">{proj.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  {proj.description}
                </p>

                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex flex-wrap gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                    {proj.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 text-neutral-500 dark:text-neutral-400">
                    {proj.github && (
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="hover:text-black dark:hover:text-white transition-colors"
                        title="GitHub"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="hover:text-black dark:hover:text-white transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
