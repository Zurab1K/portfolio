import { motion } from "framer-motion";
import { useState } from "react";
import education from "../data/education.js";

export default function Education() {
  return (
    <section
      id="education"
      className="relative bg-[#fdfdfd] dark:bg-black text-neutral-900 dark:text-neutral-100 py-32 px-6 border-t border-neutral-200 dark:border-neutral-800"
    >
      {/* Section shade (top & bottom) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-neutral-900/5 dark:from-white/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-neutral-900/5 dark:from-white/10 to-transparent" />

      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-semibold text-center mb-16"
        >
          Education
        </motion.h2>

        <div className="space-y-10">
          {education.map((edu, index) => (
            <EducationCard key={index} edu={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationCard({ edu, index }) {
  const [expanded, setExpanded] = useState(false);

  const courseworkPreviewCount = 6; // how many to show before "Show more"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: "easeOut" }}
      className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={edu.logo}
              alt={edu.school}
              className="w-12 h-12 md:w-14 md:h-14 object-contain rounded-md ring-1 ring-neutral-200/70 dark:ring-neutral-700/70"
              loading="lazy"
              decoding="async"
            />
            <div>
              <h3 className="text-xl font-semibold leading-tight">
                {edu.school}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                {edu.degree}
              </p>
            </div>
          </div>
          <p className="shrink-0 text-sm text-neutral-500 dark:text-neutral-400">
            {edu.dates}
          </p>
        </div>

        {/* Honors as compact chips */}
        {Array.isArray(edu.honors) && edu.honors.length > 0 && (
          <div className="mt-5">
            <p className="text-[13px] uppercase tracking-wide text-neutral-500 dark:text-neutral-400 mb-2">
              Awards & Honors
            </p>
            <div className="flex flex-wrap gap-2">
              {edu.honors.map((h, i) => (
                <span
                  key={i}
                  className="inline-block text-sm px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Coursework with graceful collapse */}
        {Array.isArray(edu.coursework) && edu.coursework.length > 0 && (
          <div className="mt-6">
            <p className="text-[13px] uppercase tracking-wide text-neutral-500 dark:text-neutral-400 mb-2">
              Relevant Coursework
            </p>

            <div className="text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed">
              <CourseworkList
                items={edu.coursework}
                expanded={expanded}
                previewCount={courseworkPreviewCount}
              />
              {edu.coursework.length > courseworkPreviewCount && (
                <button
                  type="button"
                  onClick={() => setExpanded((s) => !s)}
                  className="mt-3 text-xs font-medium text-neutral-700 dark:text-neutral-300 underline underline-offset-4 hover:opacity-80 transition-opacity"
                  aria-expanded={expanded}
                >
                  {expanded ? "Show less" : "Show more"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function CourseworkList({ items, expanded, previewCount }) {
  const visible = expanded ? items : items.slice(0, previewCount);
  return (
    <div className="flex flex-wrap gap-2">
      {visible.map((c, i) => (
        <span
          key={i}
          className="inline-block px-2.5 py-1 rounded-md bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300"
        >
          {c}
        </span>
      ))}
    </div>
  );
}
