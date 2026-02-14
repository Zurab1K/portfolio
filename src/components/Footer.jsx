export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "rgb(var(--color-bg))",
        borderTop: "1px solid rgba(var(--color-border), 0.06)",
      }}
    >
      <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p
          className="font-mono text-xs tracking-wider"
          style={{ color: "rgb(var(--color-text-muted))" }}
        >
          &copy; 2026 Zurabi Kochiashvili
        </p>
        <p
          className="font-mono text-xs tracking-wider"
          style={{ color: "rgba(var(--color-text-muted), 0.5)" }}
        >
          Designed & built with care
        </p>
      </div>
    </footer>
  );
}
