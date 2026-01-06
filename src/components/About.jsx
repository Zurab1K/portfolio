export default function About() {
  return (
    <section
      id="about"
      className="relative bg-[#0a0a0a] text-neutral-100 py-32 px-6 border-t border-neutral-800"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2
          className="text-4xl md:text-5xl font-semibold mb-16 text-white"
          style={{ fontFamily: '"Sora", "Sora-Regular", sans-serif' }}
        >
          About Me
        </h2>

        <p className="text-lg md:text-xl leading-relaxed text-neutral-300 text-justify">
          I’m a sophomore at Stony Brook University pursuing a B.S. in Computer Science with a second major in Economics. I’m especially interested in AI, Machine Learning, and Finance, and I’m excited to explore opportunities to expand my skills and gain experience.
        </p>
      </div>
    </section>
  );
}
