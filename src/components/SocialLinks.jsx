import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { PROFILE } from "../config.js";

const items = [
  { Icon: FaGithub, label: "GitHub", href: PROFILE.github },
  { Icon: FaLinkedinIn, label: "LinkedIn", href: PROFILE.linkedin },
  { Icon: FaInstagram, label: "Instagram", href: PROFILE.instagram },
];

export default function SocialLinks({ size = "w-11 h-11", className = "" }) {
  return (
    <div className={`flex gap-3 ${className}`}>
      {items.map(({ Icon, label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className={`${size} glass glow rounded-full grid place-items-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:scale-110 transition-all`}
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}
