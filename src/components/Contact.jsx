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
          <div className="max-w-2xl">
            <h2
              className="text-4xl md:text-5xl font-normal tracking-tight text-white"
              style={{ fontFamily: '"Roobert", "Sora", sans-serif' }}
            >
              Let's Connect
            </h2>
            <p
              className="mt-4 text-lg text-neutral-300"
              style={{ fontFamily: '"Sora", "Sora-Regular", sans-serif' }}
            >
              If you're interested in working together, have questions, or just want
              to say hi - feel free to reach out. I'm always open to conversations.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="mailto:zurabi.kochiashvili1@gmail.com"
                className="inline-flex items-center gap-2.5 rounded-full border border-neutral-800 bg-[rgb(25,25,25)] px-6 py-2.5 text-base text-neutral-200 transition-colors hover:border-[rgb(16,185,129)] hover:text-white"
                style={{ fontFamily: '"Sora", "Sora-Regular", sans-serif' }}
              >
                <Mail className="h-4 w-4" />
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/zurabi-kochiashvili/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-neutral-800 bg-[rgb(25,25,25)] px-6 py-2.5 text-base text-neutral-200 transition-colors hover:border-[rgb(16,185,129)] hover:text-white"
                style={{ fontFamily: '"Sora", "Sora-Regular", sans-serif' }}
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href="https://github.com/Zurab1K"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-neutral-800 bg-[rgb(25,25,25)] px-6 py-2.5 text-base text-neutral-200 transition-colors hover:border-[rgb(16,185,129)] hover:text-white"
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
