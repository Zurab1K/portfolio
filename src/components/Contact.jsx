import { Mail, Linkedin, Github } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative bg-[#0a0a0a] text-neutral-100 py-32 px-6 border-t border-neutral-800"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2
          className="text-4xl md:text-5xl font-normal tracking-tight mb-16 text-white"
          style={{ fontFamily: '"Roobert", "Sora", sans-serif' }}
        >
          Let’s Connect
        </h2>

        <p className="text-lg md:text-xl text-neutral-300 mb-10">
          If you’re interested in working together, have questions, or just want to say hi — feel free to reach out. I’m always open to conversations.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <a
            href="mailto:zurabi.kochiashvili1@gmail.com"
            className="flex items-center gap-2 px-5 py-3 border border-white text-white rounded-full hover:bg-white/10 transition"
          >
            <Mail className="w-5 h-5" />
            <span>Email</span>
          </a>

          <a
            href="https://www.linkedin.com/in/zurabi-kochiashvili/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 border border-white text-white rounded-full hover:bg-white/10 transition"
          >
            <Linkedin className="w-5 h-5" />
            <span>LinkedIn</span>
          </a>

          <a
            href="https://github.com/Zurab1K"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 border border-white text-white rounded-full hover:bg-white/10 transition"
          >
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}
