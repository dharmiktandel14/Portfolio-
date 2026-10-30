import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { NAV, PROFILE } from "../config.js";

export default function Navbar({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const goTo = (id) => {
    setOpen(false);
    if (pathname !== "/") {
      navigate("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const y = window.scrollY + 140;
      NAV.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) setActive(id);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? "glass border-x-0 border-t-0" : ""}`}>
        <nav className="mx-auto max-w-7xl 3xl:max-w-[1600px] px-5 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
          <button onClick={() => goTo("home")} className="text-xl font-black tracking-tighter w-10 h-10 grid place-items-center rounded-lg border border-current hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition" aria-label={PROFILE.name}>
            {PROFILE.initials}
          </button>

          <ul className="hidden md:flex items-center gap-1">
            {NAV.map(({ id, label }) => (
              <li key={id} className="relative">
                <button onClick={() => goTo(id)} className={`px-4 py-2 text-sm font-medium transition-opacity ${active === id ? "opacity-100" : "opacity-50 hover:opacity-100"}`}>
                  {label}
                </button>
                {active === id && <motion.span layoutId="nav-underline" className="absolute left-4 right-4 -bottom-0.5 h-px bg-current" />}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} aria-label="Toggle theme" className="w-10 h-10 grid place-items-center rounded-full glass glow hover:scale-110 transition">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={theme} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  {theme === "dark" ? <FiSun /> : <FiMoon />}
                </motion.span>
              </AnimatePresence>
            </button>
            <button onClick={() => setOpen(true)} aria-label="Open menu" className="md:hidden w-10 h-10 grid place-items-center rounded-full glass">
              <FiMenu />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.aside
              className="fixed top-0 right-0 bottom-0 z-[56] w-[80%] max-w-sm bg-white dark:bg-black border-l border-zinc-300 dark:border-stroke p-8 flex flex-col"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 260 }}
            >
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="self-end w-10 h-10 grid place-items-center rounded-full glass"><FiX /></button>
              <ul className="mt-10 flex flex-col gap-2">
                {NAV.map(({ id, label }, i) => (
                  <motion.li key={id} initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.08 * i + 0.1 }}>
                    <button onClick={() => goTo(id)} className={`text-4xl font-black tracking-tight py-2 ${active === id ? "" : "opacity-40"}`}>{label}</button>
                  </motion.li>
                ))}
              </ul>
              <p className="mt-auto text-xs text-zinc-500">© {new Date().getFullYear()} {PROFILE.name}</p>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
