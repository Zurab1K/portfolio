import { Mail, Linkedin, Github } from "lucide-react";

const contactLinks = [
  {
    icon: Mail,
    label: "zurabi.kochiashvili1@gmail.com",
    href: "mailto:zurabi.kochiashvili1@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/zurabi-kochiashvili/",
    external: true,
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/Zurab1K",
    external: true,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 px-6"
      style={{ backgroundColor: "rgb(var(--color-bg))" }}
    >
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-2xl md:text-3xl font-semibold tracking-tight mb-4"
          style={{ color: "rgb(var(--color-text-primary))" }}
        >
          Get in touch
        </h2>
        <p
          className="text-sm leading-relaxed mb-10 max-w-md"
          style={{ color: "rgb(var(--color-text-secondary))" }}
        >
          I'm always open to new conversations -- whether it's about a project,
          research, or just to say hi.
        </p>

        <div className="flex flex-col gap-3">
          {contactLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center gap-3 text-sm transition-colors duration-150 w-fit"
                style={{ color: "rgb(var(--color-text-secondary))" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "rgb(var(--color-text-primary))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgb(var(--color-text-secondary))";
                }}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{link.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
