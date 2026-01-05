import { Mail, Linkedin, Github } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative bg-[#0a0a0a] text-neutral-100 py-32 px-6 border-t border-neutral-800"
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-semibold mb-16 text-white"
        >
          Let’s Connect
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-lg md:text-xl text-neutral-300 mb-10"
        >
          If you’re interested in working together, have questions, or just want to say hi — feel free to reach out. I’m always open to conversations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <a
            href="mailto:zurabi.kochiashvili1@gmail.com"
            className="flex items-center gap-2 px-5 py-3 border border-white/25 rounded-full hover:border-white transition text-white"
          >
            <Mail className="w-5 h-5" />
            <span>Email</span>
          </a>

          <a
            href="https://www.linkedin.com/in/zurabi-kochiashvili/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 border border-white/25 rounded-full hover:border-white transition text-white"
          >
            <Linkedin className="w-5 h-5" />
            <span>LinkedIn</span>
          </a>

          <a
            href="https://github.com/Zurab1K"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 border border-white/25 rounded-full hover:border-white transition text-white"
          >
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
