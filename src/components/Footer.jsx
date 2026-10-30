import { FiMapPin, FiMail } from "react-icons/fi";
import SocialLinks from "./SocialLinks.jsx";
import { NAV, PROFILE } from "../config.js";

export default function Footer() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <footer className="border-t border-zinc-300 dark:border-stroke mt-10">
      <div className="mx-auto max-w-7xl 3xl:max-w-[1600px] px-5 sm:px-8 lg:px-12 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <h3 className="text-3xl font-black tracking-tighter">PORTFOLIO</h3>
          <p className="mt-3 text-sm text-zinc-500 max-w-xs">{PROFILE.tagline}</p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest text-zinc-500 mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {NAV.map(({ id, label }) => (
              <li key={id}><button onClick={() => go(id)} className="opacity-70 hover:opacity-100 hover:translate-x-1 transition">{label}</button></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest text-zinc-500 mb-4">Connect</h4>
          <SocialLinks />
          <p className="mt-5 text-sm text-zinc-500 flex items-center gap-2"><FiMapPin /> {PROFILE.location}</p>
          <p className="mt-2 text-sm text-zinc-500 flex items-center gap-2"><FiMail /> {PROFILE.email}</p>
        </div>
      </div>
      <div className="border-t border-zinc-300 dark:border-stroke py-6 text-center text-xs text-zinc-500">
        © PORTFOLIO by Tandel Dharmik. All rights reserved.
      </div>
    </footer>
  );
}
