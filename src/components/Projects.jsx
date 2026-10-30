import { motion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { SectionHeading, stagger, Reveal } from "./Reveal.jsx";

const PROJECTS = [1, 2, 3].map((n) => ({
  id: n,
  title: `Project Title 0${n}`,
  description: "An upcoming innovative full-stack web application featuring modern user interface architecture, robust back-end APIs and seamless user experience.",
  tags: ["React.js", "Tailwind CSS", "Node.js"],
  demo: "[YOUR_DEMO_LINK]",
  repo: "[YOUR_REPO_LINK]",
}));

export default function Projects() {
  return (
    <section id="projects" className="section">
      <SectionHeading kicker="02 — Work" title="Selected Projects" />
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((p) => (
          <Reveal key={p.id}>
            <motion.article whileHover={{ y: -8, scale: 1.02 }} className="glass glow rounded-3xl overflow-hidden h-full flex flex-col">
              {/* Thumbnail — replace with <img /> later */}
              <div className="relative aspect-video bg-zinc-200 dark:bg-graphite overflow-hidden grid place-items-center">
                <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "repeating-linear-gradient(45deg, currentColor 0 1px, transparent 1px 14px)", color: "#71717a" }} />
                <span className="relative text-7xl font-black tracking-tighter opacity-30">0{p.id}</span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-zinc-500 leading-relaxed flex-1">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs px-3 py-1 rounded-full border border-zinc-400 dark:border-zinc-600">{t}</span>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <a href={p.demo} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm font-semibold hover:opacity-80 transition">
                    <FiExternalLink /> Demo
                  </a>
                  <a href={p.repo} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full border border-current text-sm font-semibold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition">
                    <FiGithub /> GitHub
                  </a>
                </div>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </motion.div>
    </section>
  );
}
