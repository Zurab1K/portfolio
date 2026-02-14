import { Mail, Linkedin, Github, ArrowUpRight } from "lucide-react";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    href: "mailto:zurabi.kochiashvili1@gmail.com",
    detail: "zurabi.kochiashvili1@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/zurabi-kochiashvili/",
    detail: "in/zurabi-kochiashvili",
    external: true,
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/Zurab1K",
    detail: "Zurab1K",
    external: true,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 px-6 overflow-hidden"
      style={{ backgroundColor: "rgb(var(--color-bg))" }}
    >
      <div className="absolute inset-0 bg-grid opacity-15" aria-hidden="true" />

      {/* Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 80%, rgba(var(--color-accent), 0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="mb-16">
          <span className="section-label">Contact</span>
          <h2
            className="mt-3 text-3xl md:text-4xl font-light tracking-tight"
            style={{ color: "rgb(var(--color-text-primary))" }}
          >
            Get in touch
          </h2>
          <p
            className="mt-4 max-w-xl text-base leading-relaxed"
            style={{ color: "rgb(var(--color-text-secondary))" }}
          >
            If you're interested in working together, have questions, or just want
            to say hi -- feel free to reach out. I'm always open to conversations.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {contactLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="group flex items-center justify-between py-5 transition-colors duration-300"
                style={{
                  borderBottom: "1px solid rgba(var(--color-border), 0.06)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderBottomColor = "rgba(var(--color-accent), 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderBottomColor = "rgba(var(--color-border), 0.06)";
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300"
                    style={{
                      backgroundColor: "rgba(var(--color-accent), 0.06)",
                      border: "1px solid rgba(var(--color-accent), 0.1)",
                    }}
                  >
                    <Icon
                      className="w-4 h-4 transition-colors duration-300"
                      style={{ color: "rgb(var(--color-accent))" }}
                    />
                  </div>
                  <div>
                    <span
                      className="text-sm font-medium tracking-wide block"
                      style={{ color: "rgb(var(--color-text-primary))" }}
                    >
                      {link.label}
                    </span>
                    <span
                      className="text-xs font-mono block mt-0.5"
                      style={{ color: "rgb(var(--color-text-muted))" }}
                    >
                      {link.detail}
                    </span>
                  </div>
                </div>

                <ArrowUpRight
                  className="w-4 h-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ color: "rgb(var(--color-text-muted))" }}
                />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
