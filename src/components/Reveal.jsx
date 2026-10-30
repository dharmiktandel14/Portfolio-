import { motion } from "framer-motion";

export const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
export const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

export function Reveal({ children, className = "", ...rest }) {
  return (
    <motion.div variants={item} className={className} {...rest}>{children}</motion.div>
  );
}

export function SectionHeading({ kicker, title }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="mb-14">
      <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 mb-3">{kicker}</p>
      <h2 className="text-4xl sm:text-6xl font-black tracking-tighter">{title}</h2>
    </motion.div>
  );
}
