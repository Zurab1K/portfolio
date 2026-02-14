export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "rgb(var(--color-bg))",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="max-w-3xl mx-auto px-6 py-8">
        <p
          className="text-xs"
          style={{ color: "rgb(var(--color-text-muted))" }}
        >
          Zurabi Kochiashvili &middot; 2026
        </p>
      </div>
    </footer>
  );
}
