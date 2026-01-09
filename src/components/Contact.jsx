import { Mail, Linkedin, Github } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative bg-[rgb(20,20,20)] text-neutral-100 py-32 px-6 border-t border-neutral-800 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "rgb(20, 20, 20)" }}
      />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center gap-12">
          <div className="max-w-5xl">
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
                Let's Connect
              </span>
            </h2>
            <p
              className="mt-10 md:mt-12 text-xl md:text-2xl leading-relaxed text-neutral-300"
              style={{ fontFamily: '"Sora", "Sora-Regular", sans-serif' }}
            >
              If you're interested in working together, have questions, or just want
              to say hi - feel free to reach out. I'm always open to conversations.
            </p>
            <div className="mt-10 md:mt-12 flex flex-wrap justify-center gap-4">
              <a
                href="mailto:zurabi.kochiashvili1@gmail.com"
                className="inline-flex items-center gap-2.5 rounded-full bg-[rgba(8,90,64,0.85)] px-8 py-3 text-white transition hover:bg-[rgba(12,140,98,0.95)] font-normal"
                style={{ fontFamily: '"Sora", "Sora-Regular", sans-serif' }}
              >
                <Mail className="h-4 w-4" />
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/zurabi-kochiashvili/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-[rgba(8,90,64,0.85)] px-8 py-3 text-white transition hover:bg-[rgba(12,140,98,0.95)] font-normal"
                style={{ fontFamily: '"Sora", "Sora-Regular", sans-serif' }}
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href="https://github.com/Zurab1K"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-[rgba(8,90,64,0.85)] px-8 py-3 text-white transition hover:bg-[rgba(12,140,98,0.95)] font-normal"
                style={{ fontFamily: '"Sora", "Sora-Regular", sans-serif' }}
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
