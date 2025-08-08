import { Mail, Linkedin, Github } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 py-32 px-6 border-t border-neutral-200 dark:border-neutral-800"
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-semibold mb-10"
        >
          Let’s Connect
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 mb-10"
        >
          If you're interested in working together, have questions, or just want to say hi —
          feel free to reach out. I'm always open to conversations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <a
            href="mailto:zurabi.kochiashvili1@gmail.com"
            className="flex items-center gap-2 px-5 py-3 border border-neutral-300 dark:border-neutral-600 rounded-full hover:border-black dark:hover:border-white transition text-neutral-800 dark:text-neutral-200"
          >
            <Mail className="w-5 h-5" />
            
          </a>

          <a
            href="https://www.linkedin.com/in/zurabi-kochiashvili/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 border border-neutral-300 dark:border-neutral-600 rounded-full hover:border-black dark:hover:border-white transition text-neutral-800 dark:text-neutral-200"
          >
            <Linkedin className="w-5 h-5" />
            
          </a>

          <a
            href="https://github.com/Zurab1K"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 border border-neutral-300 dark:border-neutral-600 rounded-full hover:border-black dark:hover:border-white transition text-neutral-800 dark:text-neutral-200"
          >
            <Github className="w-5 h-5" />
            
          </a>
        </motion.div>
      </div>
    </section>
  );
}
