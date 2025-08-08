import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";

export default function App() {
  return (
    <div className="bg-white text-black">
      <Header />
      <Hero />
      <About />
      <Education />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
