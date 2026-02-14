import { Github, ExternalLink, Award } from "lucide-react";
import projects from "../data/projects.js";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-24 md:py-32 px-6 overflow-hidden"
      style={{ backgroundColor: "rgb(var(--color-bg))" }}
    >
      <div className="absolute inset-0 bg-grid opacity-15" aria-hidden="true" />

      {/* Accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 40% 30% at 70% 30%, rgba(var(--color-accent), 0.03) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section heading */}
        <div className="mb-16">
          <span className="section-label">Projects</span>
          <h2
            className="mt-3 text-3xl md:text-4xl font-light tracking-tight"
            style={{ color: "rgb(var(--color-text-primary))" }}
          >
            Things I've built
          </h2>
        </div>

        <div className="flex flex-col gap-8">
          {projects.map((proj, index) => {
            const hasLiveLink = proj.link && proj.link !== "#";
            const hasGithub = Boolean(proj.github);
            const hasAward = Boolean(proj.award);
            const hasTags = proj.tags && proj.tags.length > 0;
            const imageFitClass = proj.imageFit === "contain" ? "object-contain" : "object-cover";

            return (
              <article
                key={index}
                className="group relative overflow-hidden rounded-xl transition-all duration-500"
                style={{
                  backgroundColor: "rgba(var(--color-bg-card), 0.6)",
                  border: "1px solid rgba(var(--color-border), 0.06)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(var(--color-accent), 0.15)";
                  e.currentTarget.style.backgroundColor = "rgba(var(--color-bg-card), 0.9)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(var(--color-border), 0.06)";
                  e.currentTarget.style.backgroundColor = "rgba(var(--color-bg-card), 0.6)";
                }}
              >
                {/* Hover glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(400px 200px at 10% 15%, rgba(var(--color-accent), 0.07), transparent 60%)",
                  }}
                />

                <div className="relative z-10 flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="relative w-full overflow-hidden aspect-video md:w-[44%] md:shrink-0 md:self-stretch">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className={`h-full w-full ${imageFitClass} transition-transform duration-700 group-hover:scale-[1.03]`}
                      style={{ objectPosition: proj.imagePosition || "center center" }}
                      loading="lazy"
                      decoding="async"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(to right, rgba(var(--color-bg-card), 0.3), transparent 40%, rgba(var(--color-bg-card), 0.1))",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                    <h3
                      className="text-xl md:text-2xl font-medium tracking-tight"
                      style={{ color: "rgb(var(--color-text-primary))" }}
                    >
                      {proj.title}
                    </h3>

                    {hasAward && (
                      <div className="mt-2 flex items-center gap-2">
                        <Award className="w-3.5 h-3.5" style={{ color: "rgb(251, 191, 36)" }} />
                        <span
                          className="text-xs font-medium tracking-wide"
                          style={{ color: "rgb(251, 191, 36)" }}
                        >
                          {proj.award}
                        </span>
                      </div>
                    )}

                    <p
                      className="mt-3 text-sm leading-relaxed"
                      style={{ color: "rgb(var(--color-text-secondary))" }}
                    >
                      {proj.description}
                    </p>

                    {hasTags && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {proj.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="font-mono text-[11px] px-2.5 py-1 rounded-full tracking-wide"
                            style={{
                              backgroundColor: "rgba(var(--color-accent), 0.08)",
                              color: "rgb(var(--color-accent))",
                              border: "1px solid rgba(var(--color-accent), 0.12)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-5 flex gap-3">
                      {hasLiveLink && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-mono tracking-wide transition-colors duration-200"
                          style={{ color: "rgb(var(--color-text-secondary))" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "rgb(var(--color-accent))";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "rgb(var(--color-text-secondary))";
                          }}
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>Live</span>
                        </a>
                      )}
                      {hasGithub && (
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-mono tracking-wide transition-colors duration-200"
                          style={{ color: "rgb(var(--color-text-secondary))" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "rgb(var(--color-accent))";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "rgb(var(--color-text-secondary))";
                          }}
                        >
                          <Github className="h-4 w-4" />
                          <span>Source</span>
                        </a>
                      )}
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
