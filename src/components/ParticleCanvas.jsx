import { useEffect, useRef } from "react";

export default function ParticleCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const mouse = { x: -9999, y: -9999, down: false };
    let w, h, raf, particles = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const r = canvas.parentElement.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(140, Math.floor((w * h) / 11000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 1.6 + 0.6,
      }));
    };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      const p = e.touches ? e.touches[0] : e;
      mouse.x = p.clientX - r.left; mouse.y = p.clientY - r.top;
    };
    const onLeave = () => { mouse.x = mouse.y = -9999; };
    const onDown = () => (mouse.down = true);
    const onUp = () => (mouse.down = false);

    const frame = () => {
      const dark = document.documentElement.classList.contains("dark");
      const rgb = dark ? "255,255,255" : "0,0,0";
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < 160 && d > 0) {
          // repel by default, attract while the mouse is pressed
          const f = ((160 - d) / 160) * 0.6 * (mouse.down ? -1 : 1);
          p.vx += (dx / d) * f; p.vy += (dy / d) * f;
        }
        p.vx *= 0.985; p.vy *= 0.985;
        // keep a gentle drift
        if (Math.abs(p.vx) < 0.15) p.vx += (Math.random() - 0.5) * 0.02;
        if (Math.abs(p.vy) < 0.15) p.vy += (Math.random() - 0.5) * 0.02;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        p.x = Math.max(0, Math.min(w, p.x)); p.y = Math.max(0, Math.min(h, p.y));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},0.55)`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            ctx.strokeStyle = `rgba(${rgb},${0.18 * (1 - d / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        // connect to cursor
        const a = particles[i];
        const d = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (d < 180) {
          ctx.strokeStyle = `rgba(${rgb},${0.35 * (1 - d / 180)})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
      raf = requestAnimationFrame(frame);
    };

    resize();
    frame();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    canvas.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0" aria-hidden="true" />;
}
