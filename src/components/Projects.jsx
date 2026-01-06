import { Github, ExternalLink } from "lucide-react";
import projects from "../data/projects.js";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative bg-[#0a0a0a] text-neutral-100 py-32 px-6 border-t border-neutral-800"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-semibold text-center mb-16 text-white"
          style={{ fontFamily: '"Sora", "Sora-Regular", sans-serif' }}
        >
          Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((proj, index) => (
            <a
              key={index}
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-[#111111] shadow-[0_0_18px_rgba(255,255,255,0.14)]"
            >
              <img
                src={proj.image}
                alt={proj.title}
                className="w-full h-52 object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="p-6">
                <h3 className="text-xl font-medium mb-2 text-white">{proj.title}</h3>
                <p className="text-neutral-300 mb-4">
                  {proj.description}
                </p>

                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex flex-wrap gap-2 text-sm text-neutral-400">
                    {proj.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-neutral-800 text-neutral-200 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 text-neutral-400">
                    {proj.github && (
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="hover:text-white transition-colors"
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
                        className="hover:text-white transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
