import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import useTheme from "./hooks/useTheme.js";

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Contact />
    </>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-8xl font-black">404</h1>
      <p className="text-zinc-500">This page doesn't exist.</p>
      <Link to="/" className="px-6 py-3 rounded-full border border-current hover:opacity-70">Back home</Link>
    </div>
  );
}

export default function App() {
  const [theme, toggleTheme] = useTheme();
  return (
    <div className="noise min-h-screen overflow-x-hidden">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
