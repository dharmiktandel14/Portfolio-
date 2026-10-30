import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiClock, FiCode } from "react-icons/fi";
import SocialLinks from "./SocialLinks.jsx";
import { SectionHeading, stagger, Reveal } from "./Reveal.jsx";
import { PROFILE } from "../config.js";

function LiveClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const pad = (n) => String(n).padStart(2, "0");
  const offsetMin = -now.getTimezoneOffset();
  const sign = offsetMin >= 0 ? "+" : "-";
  const off = `UTC${sign}${pad(Math.floor(Math.abs(offsetMin) / 60))}:${pad(Math.abs(offsetMin) % 60)}`;
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-500"><FiClock /> Local Time</div>
      <div className="my-6">
        <div className="text-5xl sm:text-6xl font-black tabular-nums tracking-tight">
          {pad(now.getHours())}<span className="animate-pulse">:</span>{pad(now.getMinutes())}
          <span className="text-2xl text-zinc-500 ml-2">{pad(now.getSeconds())}</span>
        </div>
        <p className="mt-2 text-sm text-zinc-500">{now.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })}</p>
      </div>
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="px-3 py-1 rounded-full border border-current">{off}</span>
        <span className="px-3 py-1 rounded-full border border-zinc-400 dark:border-zinc-600 text-zinc-500">{tz}</span>
        <span className="px-3 py-1 rounded-full border border-zinc-400 dark:border-zinc-600 text-zinc-500">UTC {pad(now.getUTCHours())}:{pad(now.getUTCMinutes())}</span>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="section">
      <SectionHeading kicker="01 — About" title="Identity & Bento" />
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[minmax(220px,auto)]">

        {/* Card 1 - Identity (tall) */}
        <Reveal className="md:row-span-2 glass glow rounded-3xl p-6 flex flex-col">
          <div className="relative flex-1 min-h-[280px] rounded-2xl p-[2px] bg-gradient-to-br from-black/60 via-transparent to-black/60 dark:from-white dark:via-white/10 dark:to-white shadow-[0_0_30px_rgba(0,0,0,0.2)] dark:shadow-[0_0_40px_rgba(255,255,255,0.25)]">
            <div className="w-full h-full rounded-2xl bg-zinc-200 dark:bg-graphite grid place-items-center overflow-hidden">
              {/* Replace with: <img src="/portrait.jpg" className="w-full h-full object-cover" /> */}
              <span className="text-8xl font-black tracking-tighter opacity-80">{PROFILE.initials}</span>
            </div>
          </div>
          <h3 className="mt-5 text-xl font-bold">{PROFILE.name}</h3>
          <p className="text-sm text-zinc-500 flex items-center gap-1.5 mt-1"><FiMapPin /> {PROFILE.location}</p>
        </Reveal>

        {/* Bio (wide) */}
        <Reveal className="md:col-span-2 glass glow rounded-3xl p-8 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-500 mb-4"><FiCode /> Who I am</div>
          <p className="text-xl sm:text-2xl font-light leading-relaxed">
            I'm <span className="font-bold">{PROFILE.name}</span> — a developer who loves turning ideas into fast, accessible and beautiful web experiences, from pixel-perfect interfaces to scalable back-ends.
          </p>
        </Reveal>

        {/* Card 2 - Live time */}
        <Reveal className="glass glow rounded-3xl p-6"><LiveClock /></Reveal>

        {/* Card 3 - Social */}
        <Reveal className="glass glow rounded-3xl p-6 flex flex-col justify-between">
          <p className="text-xs uppercase tracking-widest text-zinc-500">Find me online</p>
          <SocialLinks size="w-14 h-14 text-xl" className="my-4" />
          <p className="text-sm text-zinc-500">Open for collaborations & opportunities.</p>
        </Reveal>
      </motion.div>
    </section>
  );
}
