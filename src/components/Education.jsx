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

        <div className="space-y-8 md:space-y-10">
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
  const courseworkPreviewCount = 6;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}                      // ← removed blur
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
      className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="p-5 sm:p-6 md:p-8">
        {/* Header: stacks on mobile, row on larger screens */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <img
              src={edu.logo}
              alt={edu.school}
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain rounded-md ring-1 ring-neutral-200/70 dark:ring-neutral-700/70"
              loading="lazy"
              decoding="async"
            />
            <div className="text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-semibold leading-tight">
                {edu.school}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
                {edu.degree}
              </p>
            </div>
          </div>

          {/* Date moves below on mobile, right-aligned on larger screens */}
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 sm:text-right">
            {edu.dates}
          </p>
        </div>

        {/* Honors as compact chips */}
        {Array.isArray(edu.honors) && edu.honors.length > 0 && (
          <div className="mt-4 sm:mt-5">
            <p className="text-[12px] sm:text-[13px] uppercase tracking-wide text-neutral-500 dark:text-neutral-400 mb-2">
              Awards & Honors
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {edu.honors.map((h, i) => (
                <span
                  key={i}
                  className="inline-block text-xs sm:text-sm px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Coursework with graceful collapse */}
        {Array.isArray(edu.coursework) && edu.coursework.length > 0 && (
          <div className="mt-5 sm:mt-6">
            <p className="text-[12px] sm:text-[13px] uppercase tracking-wide text-neutral-500 dark:text-neutral-400 mb-2">
              Relevant Coursework
            </p>

            <div className="text-neutral-800 dark:text-neutral-200 leading-relaxed">
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
    <div className="flex flex-wrap gap-1.5 sm:gap-2">
      {visible.map((c, i) => (
        <span
          key={i}
          className="inline-block text-xs sm:text-sm px-2.5 py-1 rounded-md bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300"
        >
          {c}
        </span>
      ))}
    </div>
  );
}
