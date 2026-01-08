import { Github, ExternalLink } from "lucide-react";
import projects from "../data/projects.js";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative bg-[rgb(20,20,20)] text-neutral-100 py-32 px-6 border-t border-neutral-800 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "rgb(20, 20, 20)" }}
      />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2
            className="text-4xl md:text-5xl font-normal tracking-tight text-white text-center"
            style={{ fontFamily: '"Roobert", "Sora", sans-serif' }}
          >
            <span
              className="inline-block rounded-2xl px-8 py-2"
              style={{
                backgroundColor: "rgba(16, 185, 129, 0.35)",
                color: "#ffffff",
                textShadow:
                  "0 0 8px rgba(16, 185, 129, 0.55), 0 0 18px rgba(16, 185, 129, 0.45), 0 0 36px rgba(16, 185, 129, 0.35)",
              }}
            >
              Projects
            </span>
          </h2>
        </div>

        <div className="flex flex-col gap-10 max-w-5xl mx-auto">
          {projects.map((proj, index) => {
            const hasTags = proj.tags && proj.tags.length > 0;
            const hasLiveLink = proj.link && proj.link !== "#";
            const hasGithub = Boolean(proj.github);
            return (
              <article
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-neutral-800/80 bg-[rgb(25,25,25)] shadow-[0_30px_90px_-45px_rgba(0,0,0,0.85)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(420px 240px at 12% 18%, rgba(16, 185, 129, 0.16), transparent 60%)",
                  }}
                />
                <div className="relative z-10 flex flex-col md:flex-row">
                  <div className="relative flex-1 min-h-[220px] md:min-h-[280px] overflow-hidden">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                      decoding="async"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-black/10"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 ring-1 ring-inset ring-white/10"
                    />
                  </div>
                  <div
                    className="flex-1 p-6 sm:p-8"
                    style={{ fontFamily: '"Sora", "Sora-Regular", sans-serif' }}
                  >
                    <h3 className="mt-3 text-2xl font-semibold text-white">
                      {proj.title}
                    </h3>
                    <p className="mt-4 text-neutral-300 leading-relaxed">
                      {proj.description}
                    </p>
                    {hasTags ? (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {proj.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full border border-neutral-700/70 bg-[rgb(20,20,20)] text-[11px] uppercase tracking-[0.2em] text-neutral-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <div className="mt-6 flex flex-wrap gap-3">
                      {hasLiveLink ? (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-[rgb(20,20,20)] px-4 py-2 text-sm text-neutral-200 transition-colors hover:border-[rgb(16,185,129)] hover:text-white"
                        >
                          <span>View Live</span>
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      ) : (
                        <span className="inline-flex items-center rounded-full border border-neutral-700/70 bg-[rgb(20,20,20)] px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-neutral-500">
                          In progress
                        </span>
                      )}
                      {hasGithub ? (
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-[rgb(20,20,20)] px-4 py-2 text-sm text-neutral-200 transition-colors hover:border-[rgb(16,185,129)] hover:text-white"
                        >
                          <span>Source</span>
                          <Github className="h-4 w-4" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
