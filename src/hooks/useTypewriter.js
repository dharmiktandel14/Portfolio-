import { useEffect, useState } from "react";

export default function useTypewriter(words, speed = 80, pause = 1400) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    let delay = deleting ? speed / 2 : speed;
    if (!deleting && text === word) delay = pause;
    const t = setTimeout(() => {
      if (!deleting && text === word) return setDeleting(true);
      if (deleting && text === "") { setDeleting(false); return setI((n) => n + 1); }
      setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, i, words, speed, pause]);

  return text;
}
