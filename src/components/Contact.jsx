import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiCheck, FiLoader } from "react-icons/fi";
import { SectionHeading } from "./Reveal.jsx";

const validators = {
  name: (v) => (v.trim().length < 2 ? "Please enter your name (min 2 characters)." : ""),
  email: (v) => (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "Please enter a valid email address." : ""),
  subject: (v) => (v.trim().length < 3 ? "Subject must be at least 3 characters." : ""),
  message: (v) => (v.trim().length < 10 ? "Message must be at least 10 characters." : ""),
};
const FIELDS = [
  { key: "name", label: "Name", type: "text" },
  { key: "email", label: "Email", type: "email" },
  { key: "subject", label: "Subject", type: "text" },
  { key: "message", label: "Message", type: "textarea" },
];

export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success

  const validateField = (k, v) => setErrors((e) => ({ ...e, [k]: validators[k](v) }));
  const onChange = (k) => (e) => {
    setValues((s) => ({ ...s, [k]: e.target.value }));
    setTouched((t) => ({ ...t, [k]: true }));
    validateField(k, e.target.value); // real-time validation
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const all = Object.fromEntries(Object.keys(validators).map((k) => [k, validators[k](values[k])]));
    setErrors(all);
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.values(all).some(Boolean)) return;
    setStatus("loading");
    // TODO: connect to your backend / EmailJS / Formspree here
    setTimeout(() => {
      setStatus("success");
      setValues({ name: "", email: "", subject: "", message: "" });
      setTouched({});
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  const base = "w-full bg-transparent rounded-xl px-4 py-3 outline-none border transition focus:border-black dark:focus:border-white";

  return (
    <section id="contact" className="section">
      <SectionHeading kicker="03 — Contact" title="Get In Touch" />
      <motion.form onSubmit={onSubmit} noValidate initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="glass rounded-3xl p-6 sm:p-10 max-w-3xl mx-auto grid gap-5 sm:grid-cols-2">
        {FIELDS.map(({ key, label, type }) => {
          const err = touched[key] && errors[key];
          const ok = touched[key] && !errors[key];
          const cls = `${base} ${err ? "border-red-500/70" : ok ? "border-zinc-500" : "border-zinc-300 dark:border-stroke"}`;
          return (
            <div key={key} className={type === "textarea" || key === "subject" ? "sm:col-span-2" : ""}>
              <label htmlFor={key} className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">{label}</label>
              {type === "textarea" ? (
                <textarea id={key} rows={5} value={values[key]} onChange={onChange(key)} onBlur={() => { setTouched((t) => ({ ...t, [key]: true })); validateField(key, values[key]); }} className={cls} />
              ) : (
                <input id={key} type={type} value={values[key]} onChange={onChange(key)} onBlur={() => { setTouched((t) => ({ ...t, [key]: true })); validateField(key, values[key]); }} className={cls} />
              )}
              <AnimatePresence>
                {err && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-xs text-red-500 mt-1.5">{errors[key]}</motion.p>}
              </AnimatePresence>
            </div>
          );
        })}

        <motion.button type="submit" disabled={status !== "idle"} whileTap={{ scale: 0.97 }}
          className="sm:col-span-2 py-4 rounded-full font-semibold bg-black text-white dark:bg-white dark:text-black flex items-center justify-center gap-2 hover:opacity-85 transition disabled:cursor-not-allowed glow">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={status} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2">
              {status === "idle" && (<><FiSend /> Send Message</>)}
              {status === "loading" && (<><FiLoader className="animate-spin" /> Sending...</>)}
              {status === "success" && (<><FiCheck /> Message Sent!</>)}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </motion.form>
    </section>
  );
}
