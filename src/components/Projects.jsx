import { Github, ExternalLink, Award } from "lucide-react";
import projects from "../data/projects.js";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-24 md:py-32 px-6"
      style={{ backgroundColor: "rgb(var(--color-bg))" }}
    >
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-2xl md:text-3xl font-semibold tracking-tight mb-16"
          style={{ color: "rgb(var(--color-text-primary))" }}
        >
          Projects
        </h2>

        <div className="flex flex-col gap-16">
          {projects.map((proj, index) => {
            const hasLiveLink = proj.link && proj.link !== "#";
            const hasGithub = Boolean(proj.github);
            const hasAward = Boolean(proj.award);
            const hasTags = proj.tags && proj.tags.length > 0;
            const imageFitClass = proj.imageFit === "contain" ? "object-contain" : "object-cover";

            return (
              <article key={index} className="group">
                {/* Image */}
                <div className="relative overflow-hidden rounded-lg mb-5 aspect-video"
                  style={{ backgroundColor: "rgb(var(--color-bg-elevated))" }}
                >
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className={`h-full w-full ${imageFitClass} transition-transform duration-500 group-hover:scale-[1.02]`}
                    style={{ objectPosition: proj.imagePosition || "center center" }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3
                      className="text-lg font-medium"
                      style={{ color: "rgb(var(--color-text-primary))" }}
                    >
                      {proj.title}
                    </h3>
                    <div className="flex items-center gap-3">
                      {hasGithub && (
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors duration-150"
                          style={{ color: "rgb(var(--color-text-muted))" }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = "rgb(var(--color-text-primary))"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = "rgb(var(--color-text-muted))"; }}
                          aria-label={`${proj.title} source code`}
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      {hasLiveLink && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors duration-150"
                          style={{ color: "rgb(var(--color-text-muted))" }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = "rgb(var(--color-text-primary))"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = "rgb(var(--color-text-muted))"; }}
                          aria-label={`${proj.title} live site`}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {hasAward && (
                    <div className="flex items-center gap-1.5 mb-2">
                      <Award className="w-3.5 h-3.5" style={{ color: "rgb(250, 204, 21)" }} />
                      <span
                        className="text-xs"
                        style={{ color: "rgb(250, 204, 21)" }}
                      >
                        {proj.award}
                      </span>
                    </div>
                  )}

                  <p
                    className="text-sm leading-relaxed mb-3"
                    style={{ color: "rgb(var(--color-text-secondary))" }}
                  >
                    {proj.description}
                  </p>

                  {hasTags && (
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2 py-0.5 rounded"
                          style={{
                            backgroundColor: "rgba(255,255,255,0.05)",
                            color: "rgb(var(--color-text-secondary))",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
