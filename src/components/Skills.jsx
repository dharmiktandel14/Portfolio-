import { useEffect, useRef } from "react";
import Matter from "matter-js";
import { SiReact, SiJavascript, SiTailwindcss, SiNodedotjs, SiGit, SiHtml5, SiCss, SiExpress, SiMongodb, SiPython } from "react-icons/si";
import { SectionHeading } from "./Reveal.jsx";

const SKILLS = [
  { name: "React.js", Icon: SiReact }, { name: "JavaScript", Icon: SiJavascript },
  { name: "Tailwind CSS", Icon: SiTailwindcss }, { name: "Node.js", Icon: SiNodedotjs },
  { name: "Git", Icon: SiGit }, { name: "HTML5", Icon: SiHtml5 },
  { name: "CSS3", Icon: SiCss }, { name: "Express", Icon: SiExpress },
  { name: "MongoDB", Icon: SiMongodb }, { name: "Python", Icon: SiPython },
];

export default function Skills() {
  const box = useRef(null);
  const els = useRef([]);

  useEffect(() => {
    const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint, Events } = Matter;
    const el = box.current;
    let W = el.clientWidth, H = el.clientHeight;
    const engine = Engine.create();
    engine.gravity.y = 0.6;
    const runner = Runner.create();
    const R = W < 640 ? 38 : 52;

    const bubbles = SKILLS.map((_, i) => {
      const b = Bodies.circle(R + Math.random() * (W - 2 * R), -R * (i + 1), R, { restitution: 0.8, friction: 0.02, frictionAir: 0.01 });
      b.plugin = { r: R };
      return b;
    });

    const t = 200;
    const walls = () => [
      Bodies.rectangle(W / 2, H + t / 2, W * 2, t, { isStatic: true }),
      Bodies.rectangle(W / 2, -t * 3, W * 2, t, { isStatic: true }),
      Bodies.rectangle(-t / 2, H / 2, t, H * 6, { isStatic: true }),
      Bodies.rectangle(W + t / 2, H / 2, t, H * 6, { isStatic: true }),
    ];
    let wallBodies = walls();
    Composite.add(engine.world, [...bubbles, ...wallBodies]);

    const mouse = Mouse.create(el);
    // allow normal page scrolling over the canvas
    el.removeEventListener("wheel", mouse.mousewheel);
    el.removeEventListener("mousewheel", mouse.mousewheel);
    el.removeEventListener("DOMMouseScroll", mouse.mousewheel);
    const mc = MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2, render: { visible: false } } });
    Composite.add(engine.world, mc);

    Events.on(engine, "afterUpdate", () => {
      bubbles.forEach((b, i) => {
        const node = els.current[i];
        if (node) node.style.transform = `translate(${b.position.x - R}px, ${b.position.y - R}px) rotate(${b.angle}rad)`;
      });
    });

    // start only when visible
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? Runner.run(runner, engine) : Runner.stop(runner)), { threshold: 0.1 });
    io.observe(el);

    const onResize = () => {
      W = el.clientWidth; H = el.clientHeight;
      Composite.remove(engine.world, wallBodies);
      wallBodies = walls();
      Composite.add(engine.world, wallBodies);
    };
    window.addEventListener("resize", onResize);

    return () => {
      io.disconnect();
      window.removeEventListener("resize", onResize);
      Runner.stop(runner); Composite.clear(engine.world); Engine.clear(engine);
    };
  }, []);

  const size = typeof window !== "undefined" && window.innerWidth < 640 ? 76 : 104;

  return (
    <section id="skills" className="section">
      <SectionHeading kicker="02 — Tech Stack" title="Drag. Throw. Play." />
      <div ref={box} className="relative w-full h-[480px] sm:h-[560px] rounded-3xl glass overflow-hidden cursor-grab active:cursor-grabbing select-none" style={{ touchAction: "pan-y" }}>
        <p className="absolute top-4 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-zinc-500 pointer-events-none z-10">Grab a bubble</p>
        {SKILLS.map(({ name, Icon }, i) => (
          <div key={name} ref={(n) => (els.current[i] = n)}
            style={{ width: size, height: size, willChange: "transform", transform: "translate(-200px,-200px)" }}
            className="absolute top-0 left-0 rounded-full flex flex-col items-center justify-center gap-1 border border-zinc-400 dark:border-zinc-600 bg-white/80 dark:bg-black/70 backdrop-blur shadow-[0_0_20px_rgba(0,0,0,0.12)] dark:shadow-[0_0_20px_rgba(255,255,255,0.12)]">
            <Icon className="text-2xl sm:text-3xl" />
            <span className="text-[9px] sm:text-[11px] font-semibold tracking-tight">{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
