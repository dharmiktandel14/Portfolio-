import { useRef } from "react";
import { motion } from "framer-motion";
import ParticleCanvas from "./ParticleCanvas.jsx";
import SocialLinks from "./SocialLinks.jsx";
import useTypewriter from "../hooks/useTypewriter.js";
import { PROFILE } from "../config.js";

const WORDS = ["Full-Stack Developer", "React Specialist", "UI/UX Enthusiast", "Problem Solver"];
const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Hero() {
  const text = useTypewriter(WORDS);
  const titleRef = useRef(null);

  // interactive gradient overlay following the cursor
  const onMove = (e) => {
    const r = titleRef.current.getBoundingClientRect();
    titleRef.current.style.setProperty("--x", `${e.clientX - r.left}px`);
    titleRef.current.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <section id="home" className="relative min-h-screen grid place-items-center overflow-hidden">
      <ParticleCanvas />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white dark:from-black to-transparent pointer-events-none" />

      <div className="relative z-10 px-5 text-center max-w-5xl pt-16">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block px-4 py-1.5 mb-6 text-xs tracking-[0.3em] uppercase glass rounded-full">
          Welcome to my PORTFOLIO
        </motion.p>

        <motion.h1
          ref={titleRef}
          onMouseMove={onMove}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.05] bg-clip-text text-transparent
                     bg-[radial-gradient(circle_220px_at_var(--x,50%)_var(--y,50%),#71717a,#000_70%)]
                     dark:bg-[radial-gradient(circle_220px_at_var(--x,50%)_var(--y,50%),#a1a1aa,#fff_70%)]"
        >
          {PROFILE.name}
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-6 text-xl sm:text-3xl font-light h-10">
          <span className="font-semibold">{text}</span>
          <span className="inline-block w-[2px] h-6 sm:h-8 ml-1 align-middle bg-current animate-pulse" />
        </motion.p>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }} className="mt-4 text-sm sm:text-base text-zinc-500 max-w-2xl mx-auto">
          {PROFILE.tagline}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-10 flex flex-wrap gap-4 justify-center">
          <button onClick={() => go("projects")} className="liquid px-8 py-3.5 rounded-full border-2 border-current font-semibold text-black dark:text-white group">
            <span className="group-hover:text-white dark:group-hover:text-black">View Projects</span>
          </button>
          <button onClick={() => go("contact")} className="px-8 py-3.5 rounded-full bg-black text-white dark:bg-white dark:text-black font-semibold hover:scale-105 transition glow">
            Get In Touch
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-10 flex justify-center">
          <SocialLinks />
        </motion.div>
      </div>
    </section>
  );
}
