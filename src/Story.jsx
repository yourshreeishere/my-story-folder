import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
  ArrowUpRight, Sun, Eye, Wind, Zap, Snowflake, ChevronDown, Target, ChevronRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ─── Zone Data ────────────────────────────────────────────────────────────────
const CARDS = [
  {
    icon: Sun,
    title: "0m: The Sunlit Surface",
    body: "The Epipelagic Zone. Home to 90% of marine life. This is the only layer where photosynthesis occurs, fueling the entire ocean's food chain.",
    section: "exploration",
  },
  {
    icon: Eye,
    title: "200m: The Twilight Realm",
    body: "The Mesopelagic Zone. Light fades to a faint blue. Here, the 'Great Migration' happens nightly as billions of creatures rise to feed.",
    section: "exploration",
  },
  {
    icon: Wind,
    title: "1,000m: The Oxygen Minimum",
    body: "The Bathypelagic Entrance. Oxygen levels drop. Creatures here have evolved massive gills and slow metabolisms to survive the 'Dead Zone'.",
    section: "exploration",
  },
  {
    icon: Zap,
    title: "1,500m: The Midnight Zone",
    body: "The Bathypelagic Core. Constant near-freezing temperatures. The only light here is biological—flashes of cyan used for hunting.",
    section: "exploration",
  },
  {
    icon: Snowflake,
    title: "4,000m: The Abyssal Plain",
    body: "The Abyssopelagic Zone. A silent desert of 'Marine Snow'—organic debris falling from the surface that sustains life in the crushing dark.",
    section: "insight",
  },
  {
    icon: ChevronDown,
    title: "6,000m: The Hadal Trenches",
    body: "The Hadal Zone. Named after Hades. These V-shaped canyons are deeper than Everest is tall. Only highly specialized snailfish remain.",
    section: "insight",
  },
  {
    icon: Target,
    title: "11,000m: Challenger Deep",
    body: "The absolute bottom. Pressure reaches 15,750 PSI—equivalent to having an elephant stand on your thumb. Ultimate, crushing solitude.",
    section: "insight",
  },
];

// ─── Phantom Silhouettes ──────────────────────────────────────────────────────
const PHANTOMS = [
  {
    id: "p1",
    path: "M0,25 C15,-5 55,-5 80,25 C105,55 110,80 80,72 C55,65 25,65 0,72 C-30,80 -15,55 0,25Z",
    viewBox: "-35 -15 150 105",
    width: 280, top: "8%", left: "3%",
    delay: 0, duration: 16, drift: 40, blur: 10, opacity: 0.18,
    color: "rgba(34,211,238,0.85)",
  },
  {
    id: "p2",
    path: "M30,0 C48,12 52,35 42,58 C37,70 26,76 22,94 L24,94 C28,76 36,64 38,52 C50,72 42,84 40,94 L43,94 C46,80 53,62 42,52 C56,35 62,12 30,0Z",
    viewBox: "0 0 65 98",
    width: 100, top: "30%", left: "85%",
    delay: 4, duration: 20, drift: 45, blur: 8, opacity: 0.16,
    color: "rgba(99,179,237,0.9)",
  },
  {
    id: "p3",
    path: "M50,0 C85,0 110,22 110,46 C110,64 88,70 50,70 C12,70 -10,64 -10,46 C-10,22 15,0 50,0Z M20,70 Q16,95 12,115 M35,70 Q34,96 33,118 M50,70 Q50,97 50,120 M65,70 Q66,96 67,118 M80,70 Q84,95 88,115",
    viewBox: "-15 0 130 125",
    width: 190, top: "52%", left: "15%",
    delay: 8, duration: 28, drift: 30, blur: 14, opacity: 0.14,
    color: "rgba(167,139,250,0.85)",
  },
  {
    id: "p4",
    path: "M12,34 C0,22 6,4 24,8 C30,1 48,-1 54,12 C66,6 84,18 78,34 C90,42 84,60 66,57 C60,72 36,72 24,60 C4,66 -2,48 12,34Z M54,6 Q60,-8 65,-20",
    viewBox: "-5 -25 100 105",
    width: 155, top: "70%", left: "68%",
    delay: 12, duration: 22, drift: 50, blur: 10, opacity: 0.13,
    color: "rgba(34,211,238,0.8)",
  },
  {
    id: "p5",
    path: "M0,0 L12,4 L0,8Z M18,10 L30,13 L18,16Z M6,18 L18,22 L6,26Z M22,28 L34,31 L22,34Z M2,36 L14,40 L2,44Z",
    viewBox: "-2 -2 40 50",
    width: 90, top: "42%", left: "50%",
    delay: 6, duration: 13, drift: 60, blur: 6, opacity: 0.15,
    color: "rgba(103,232,249,0.9)",
  },
];

// ─── Parallax Snow Layers ─────────────────────────────────────────────────────
const SNOW_LAYERS = [
  {
    id: "snow-far",
    size: "300px 300px", opacity: 0.12, speed: 0.08,
    particles: `
      radial-gradient(1px 1px at 30px 50px,#fff,transparent),
      radial-gradient(1px 1px at 80px 120px,#fff,transparent),
      radial-gradient(1px 1px at 150px 60px,#fff,transparent),
      radial-gradient(1px 1px at 200px 200px,#fff,transparent),
      radial-gradient(1px 1px at 250px 90px,#fff,transparent),
      radial-gradient(1px 1px at 60px 250px,#fff,transparent)
    `,
  },
  {
    id: "snow-mid",
    size: "220px 220px", opacity: 0.20, speed: 0.18,
    particles: `
      radial-gradient(1.5px 1.5px at 25px 40px,#bae6fd,transparent),
      radial-gradient(1.5px 1.5px at 75px 110px,#bae6fd,transparent),
      radial-gradient(1.5px 1.5px at 170px 160px,#bae6fd,transparent),
      radial-gradient(2px 2px at 100px 140px,#bae6fd,transparent),
      radial-gradient(1px 1px at 50px 190px,#bae6fd,transparent)
    `,
  },
  {
    id: "snow-near",
    size: "160px 160px", opacity: 0.30, speed: 0.32,
    particles: `
      radial-gradient(2px 2px at 20px 30px,#e0f2fe,transparent),
      radial-gradient(2.5px 2.5px at 55px 90px,#e0f2fe,transparent),
      radial-gradient(3px 3px at 135px 130px,#e0f2fe,transparent),
      radial-gradient(2.5px 2.5px at 15px 120px,#e0f2fe,transparent),
      radial-gradient(2px 2px at 145px 70px,#e0f2fe,transparent)
    `,
  },
];

// ─── Snow Layer ───────────────────────────────────────────────────────────────
function SnowLayer({ layer, scrollY }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: layer.particles,
        backgroundRepeat: "repeat",
        backgroundSize: layer.size,
        opacity: layer.opacity,
        transform: `translate3d(0,${scrollY * layer.speed}px,0)`,
        willChange: "transform",
      }}
    />
  );
}

// ─── Glitch Hook ──────────────────────────────────────────────────────────────
function useGlitch(value, depth) {
  const [display, setDisplay] = useState(String(value));
  const timerRef = useRef(null);

  useEffect(() => {
    setDisplay(String(value));
    if (depth < 6000) return;

    const NOISE = "01█▓▒░╳⚠∅";
    const scheduleGlitch = () => {
      const f = Math.min((depth - 6000) / 5000, 1);
      const wait = (1000 + (1 - f) * 3000) + Math.random() * (2000 + (1 - f) * 3000);
      timerRef.current = setTimeout(() => {
        let count = 0;
        const len = 8 + Math.floor(Math.random() * 6);
        const flicker = setInterval(() => {
          setDisplay(
            Array.from({ length: String(value).length + 3 }, () =>
              NOISE[Math.floor(Math.random() * NOISE.length)]
            ).join("")
          );
          if (++count >= len) {
            clearInterval(flicker);
            setDisplay(String(value));
            scheduleGlitch();
          }
        }, 50);
      }, wait);
    };
    scheduleGlitch();
    return () => clearTimeout(timerRef.current);
  }, [value, depth]);

  return display;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Story() {
  const rootRef        = useRef(null);
  const heroRef        = useRef(null);
  const introRef       = useRef(null);
  const explorationRef = useRef(null);
  const insightRef     = useRef(null);
  const conclusionRef  = useRef(null);

  const [depth, setDepth]               = useState(0);
  const [scrollY, setScrollY]           = useState(0);
  const [diveInitiated, setDiveInitiated] = useState(false);

  const psi     = Math.round(depth * 0.44);
  const temp    = depth === 0 ? 28 : Math.max(2, 28 - depth * 0.0025);
  const isHadal = depth >= 6000;

  const depthDisplay = useGlitch(depth.toLocaleString(), depth);
  const psiDisplay   = useGlitch(psi, depth);

  // ── Section labels for nav / judges ────────────────────────────────────
  const NAV_SECTIONS = [
    { label: "Hero",        ref: heroRef },
    { label: "Introduction",ref: introRef },
    { label: "Exploration", ref: explorationRef },
    { label: "Insight",     ref: insightRef },
    { label: "Conclusion",  ref: conclusionRef },
  ];

  // ── Feature 1: Dive Shake + ScrollTo ───────────────────────────────────
  const handleDive = useCallback(() => {
    if (diveInitiated) return;
    setDiveInitiated(true);
    const root = rootRef.current;
    if (!root) return;

    const tl = gsap.timeline({
      onComplete: () =>
        gsap.to(window, {
          duration: 2.4,
          scrollTo: { y: ".zone-card-0", offsetY: 80 },
          ease: "power3.inOut",
        }),
    });
    tl.to(root, { x: -4,  y:  2, duration: 0.04, ease: "none" })
      .to(root, { x:  5,  y: -3, duration: 0.04, ease: "none" })
      .to(root, { x: -7,  y:  4, duration: 0.04, ease: "none" })
      .to(root, { x:  9,  y: -5, duration: 0.04, ease: "none" })
      .to(root, { x: -14, y:  7, duration: 0.05, ease: "none" })
      .to(root, { x:  14, y: -7, duration: 0.05, ease: "none" })
      .to(root, { x: -12, y:  6, duration: 0.05, ease: "none" })
      .to(root, { x:  12, y: -6, duration: 0.05, ease: "none" })
      .to(root, { x: -10, y:  5, duration: 0.05, ease: "none" })
      .to(root, { x:  10, y: -5, duration: 0.05, ease: "none" })
      .to(root, { x:  -6, y:  3, duration: 0.06, ease: "none" })
      .to(root, { x:   6, y: -3, duration: 0.06, ease: "none" })
      .to(root, { x:  -3, y:  1, duration: 0.06, ease: "none" })
      .to(root, { x:   3, y: -1, duration: 0.06, ease: "none" })
      .to(root, { x:   0, y:  0, duration: 0.3,  ease: "elastic.out(1,0.2)" });
  }, [diveInitiated]);

  // ── GSAP Context ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {

      // Background darkening across full scroll height
      gsap.to(rootRef.current, {
        backgroundColor: "#000000",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // Section reveal animations
      gsap.utils.toArray("[data-story-in]").forEach((el) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0, filter: "blur(10px)" },
          {
            y: 0, opacity: 1, filter: "blur(0px)",
            duration: 1, ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%", end: "top 60%",
              scrub: 1,
              toggleActions: "play reverse restart reset",
            },
          }
        );
      });

      // Exit blur — cards dissolve past top
      gsap.utils.toArray(".zone-card").forEach((card) => {
        gsap.to(card, {
          opacity: 0, filter: "blur(10px)", y: -40, ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 8%", end: "top -25%",
            scrub: 1.2,
          },
        });
      });

      // Magnetic hover
      gsap.utils.toArray(".story-card").forEach((card) => {
        card.addEventListener("mouseenter", () =>
          gsap.to(card, { y: -8, scale: 1.01, duration: 0.4, ease: "power2.out" })
        );
        card.addEventListener("mouseleave", () =>
          gsap.to(card, { y: 0, scale: 1, duration: 0.4, ease: "power2.out" })
        );
      });

      // Sonar pulse
      gsap.to(".sonar-ping", {
        scale: 4, opacity: 0, duration: 4, repeat: -1, ease: "expo.out",
      });

      // Scanner line
      gsap.to(".scanner-line", {
        y: "100vh", duration: 4.5, repeat: -1, ease: "none",
      });

      // Phantom drift — 4 independent tweens each
      PHANTOMS.forEach((ph) => {
        const el = document.querySelector(`#phantom-${ph.id}`);
        if (!el) return;
        gsap.to(el, { x: ph.drift, duration: ph.duration * 0.55, repeat: -1, yoyo: true, ease: "sine.inOut", delay: ph.delay });
        gsap.to(el, { y: ph.drift * 0.6, duration: ph.duration * 0.82, repeat: -1, yoyo: true, ease: "sine.inOut", delay: ph.delay + 2 });
        gsap.to(el, { opacity: ph.opacity * 3.5, duration: ph.duration * 0.35, repeat: -1, yoyo: true, ease: "sine.inOut", delay: ph.delay + 1 });
        gsap.to(el, { scale: 1.08, duration: ph.duration * 0.45, repeat: -1, yoyo: true, ease: "sine.inOut", delay: ph.delay + 3 });
      });

      // Hero section: title dramatic reveal
      gsap.fromTo(".hero-title",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.6, ease: "expo.out", delay: 0.3 }
      );
      gsap.fromTo(".hero-sub",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.7 }
      );
      gsap.fromTo(".hero-btn",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "expo.out", delay: 1.1 }
      );

      // Intro section: stats counter
      gsap.utils.toArray(".stat-num").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
          }
        );
      });

    }, rootRef);

    // Scroll tracker
    const handleScroll = () => {
      const section = rootRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const pct = Math.min(Math.max((rect.top * -1) / (rect.height - window.innerHeight), 0), 1);
      setDepth(Math.floor(pct * 11000));
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <div ref={rootRef} id="story" className="relative bg-[#001d2d] overflow-hidden">

      {/* ── Global: Three-Layer Parallax Snow ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {SNOW_LAYERS.map((layer) => (
          <SnowLayer key={layer.id} layer={layer} scrollY={scrollY} />
        ))}
      </div>

      {/* ── Global: Phantom Silhouettes ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {PHANTOMS.map((ph) => (
          <div
            key={ph.id}
            id={`phantom-${ph.id}`}
            style={{
              position: "absolute",
              top: ph.top, left: ph.left, width: ph.width,
              opacity: ph.opacity,
              filter: `blur(${ph.blur}px) drop-shadow(0 0 14px ${ph.color})`,
              willChange: "transform, opacity",
              transform: "translate3d(0,0,0)",
            }}
          >
            <svg viewBox={ph.viewBox} xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <path d={ph.path} fill={ph.color} />
            </svg>
          </div>
        ))}
      </div>

      {/* ── Global: Scanner Line ── */}
      <div
        className="scanner-line fixed top-0 left-0 w-full pointer-events-none z-40"
        aria-hidden="true"
      >
        <div style={{
          height: "2px",
          background: "linear-gradient(90deg,transparent 0%,rgba(34,211,238,0) 4%,rgba(34,211,238,0.85) 20%,rgba(34,211,238,1) 50%,rgba(34,211,238,0.85) 80%,rgba(34,211,238,0) 96%,transparent 100%)",
          boxShadow: "0 0 18px 5px rgba(34,211,238,0.55),0 0 50px 10px rgba(34,211,238,0.15)",
        }} />
        <div style={{ height: "70px", background: "linear-gradient(180deg,rgba(34,211,238,0.09) 0%,transparent 100%)", marginTop: "-2px" }} />
      </div>

      {/* ── Global: Desktop HUD ── */}
      <div className={`fixed bottom-10 right-10 z-50 font-mono bg-black/80 backdrop-blur-xl p-6 rounded-2xl border hidden md:block transition-all duration-500 ${
        isHadal ? "border-red-500/50 shadow-[0_0_40px_rgba(239,68,68,0.3)] text-red-400" : "border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.2)] text-cyan-400"
      }`}>
        <div className={`text-[10px] uppercase tracking-[0.3em] mb-2 ${isHadal ? "text-red-500/70" : "text-cyan-500/60"}`}>
          {isHadal ? "⚠ Critical Depth" : "Live Telemetry"}
        </div>
        <div className={`text-4xl font-black tracking-tighter tabular-nums ${isHadal ? "text-red-400 drop-shadow-[0_0_14px_rgba(239,68,68,0.9)]" : "text-cyan-400"}`}>
          {depthDisplay}m
        </div>
        <div className={`h-px w-full my-3 ${isHadal ? "bg-red-500/20" : "bg-cyan-500/20"}`} />
        <div className="w-full h-1.5 rounded-full bg-white/10 mb-3 overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-300 ${isHadal ? "bg-red-400 shadow-[0_0_12px_rgba(239,68,68,0.9)]" : "bg-cyan-400"}`}
            style={{ width: `${(depth / 11000) * 100}%` }} />
        </div>
        <div className="flex justify-between text-[10px] font-bold mb-1">
          <span className="opacity-50 uppercase">Pressure:</span>
          <span className={isHadal ? "text-red-300" : "text-white"}>{psiDisplay} PSI</span>
        </div>
        <div className="flex justify-between text-[10px] font-bold">
          <span className="opacity-50 uppercase">Temp:</span>
          <span className="text-white">{temp.toFixed(1)}°C</span>
        </div>
        {isHadal && (
          <div className="mt-3 flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-red-400 animate-pulse">
            <span className="size-1.5 rounded-full bg-red-400 inline-block" />
            Hull Integrity: Warning
          </div>
        )}
      </div>

      {/* ── Global: Mobile HUD (inline, visible only on small screens) ── */}
      <div className={`fixed bottom-4 left-4 right-4 z-50 md:hidden font-mono bg-black/90 backdrop-blur-xl px-4 py-3 rounded-xl border transition-all duration-500 ${
        isHadal ? "border-red-500/50" : "border-cyan-500/40"
      }`}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[8px] uppercase tracking-widest text-cyan-500/60 mb-0.5">Depth</div>
            <div className={`text-xl font-black tabular-nums tracking-tighter ${isHadal ? "text-red-400" : "text-cyan-400"}`}>
              {depthDisplay}m
            </div>
          </div>
          <div className="flex-1">
            <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${isHadal ? "bg-red-400" : "bg-cyan-400"}`}
                style={{ width: `${(depth / 11000) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-1 text-[8px] text-zinc-500 font-mono">
              <span>0m</span><span>11,000m</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[8px] uppercase tracking-widest text-cyan-500/60 mb-0.5">PSI</div>
            <div className={`text-sm font-black tabular-nums ${isHadal ? "text-red-400" : "text-white"}`}>
              {psiDisplay}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[8px] uppercase tracking-widest text-cyan-500/60 mb-0.5">Temp</div>
            <div className="text-sm font-black text-white tabular-nums">{temp.toFixed(0)}°C</div>
          </div>
        </div>
        {isHadal && (
          <div className="mt-2 text-[8px] font-black uppercase tracking-widest text-red-400 animate-pulse text-center">
            ⚠ Hadal Zone — Hull Integrity Warning
          </div>
        )}
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
          Full-viewport title screen. Dive button lives here.
      ════════════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        id="section-hero"
        aria-label="Hero"
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 z-10"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-cyan-300 mb-8">
          <div className="relative size-2">
            <div className="sonar-ping absolute inset-0 rounded-full bg-cyan-400" />
            <div className="relative size-2 rounded-full bg-cyan-400" />
          </div>
          Live Telemetry Active
        </div>

        <h1 className="hero-title text-6xl sm:text-8xl lg:text-[10rem] font-black tracking-tighter text-white leading-[0.85] uppercase mb-8">
          The<br /><span className="text-cyan-400">Abyss</span><br />Awaits.
        </h1>

        <p className="hero-sub max-w-lg text-lg text-zinc-400 leading-relaxed mb-12">
          A descent to 11,000 metres. Where light ends, pressure crushes, and life finds a way.
        </p>

        <div className="hero-btn flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={handleDive}
            disabled={diveInitiated}
            className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-xl border px-8 py-4 text-sm font-black uppercase tracking-widest transition-all duration-300 ${
              diveInitiated
                ? "border-cyan-500/20 bg-cyan-500/5 text-cyan-500/40 cursor-not-allowed"
                : "border-cyan-400/60 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-white hover:shadow-[0_0_32px_rgba(34,211,238,0.45)] active:scale-95"
            }`}
          >
            {!diveInitiated && (
              <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent" />
            )}
            <span className={`size-2 rounded-full ${diveInitiated ? "bg-cyan-500/30" : "bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]"}`} />
            {diveInitiated ? "Descending…" : "Initiate Dive Sequence"}
          </button>
          <a
            href="#section-intro"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-cyan-400 transition-colors font-bold uppercase tracking-widest"
          >
            Learn more <ChevronRight className="size-4" />
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600">
          <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Scroll to descend</span>
          <div className="w-px h-12 bg-gradient-to-b from-cyan-500/40 to-transparent" />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 2 — INTRODUCTION
          Science context: what the deep sea is, why it matters.
      ════════════════════════════════════════════════════════════════════ */}
      <section
        ref={introRef}
        id="section-intro"
        aria-label="Introduction"
        className="relative z-10 py-32 px-6"
      >
        <div className="mx-auto max-w-6xl">
          <div data-story-in className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-6">
            Section 02 — Introduction
          </div>

          <h2 data-story-in className="text-4xl sm:text-6xl font-black tracking-tighter text-white uppercase leading-[0.9] mb-12 max-w-2xl">
            The Last<br /><span className="text-cyan-400">Frontier</span><br />On Earth.
          </h2>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { num: "95%", label: "Ocean unexplored" },
              { num: "11km", label: "Max depth recorded" },
              { num: "1,100", label: "Atmospheres of pressure" },
              { num: "~2°C", label: "Hadal temperature" },
            ].map((s) => (
              <div key={s.label} data-story-in className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-sm">
                <div className="stat-num text-3xl font-black text-cyan-400 tracking-tighter mb-1">{s.num}</div>
                <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div data-story-in className="rounded-[2rem] border border-white/5 bg-white/5 p-8 backdrop-blur-2xl ring-1 ring-white/10">
              <div className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-6">Mission Parameters</div>
              <ul className="space-y-5">
                {[
                  { t: "Structural Adaptation", c: "bg-cyan-500" },
                  { t: "Atmospheric Density",   c: "bg-blue-600" },
                  { t: "Bioluminescent Signals", c: "bg-indigo-600" },
                  { t: "Hadal Pressure Systems", c: "bg-violet-600" },
                ].map((item) => (
                  <li key={item.t} className="flex items-center gap-4 text-xs font-bold text-white uppercase tracking-widest">
                    <span className={`size-1.5 rounded-full ${item.c} shadow-[0_0_10px_rgba(255,255,255,0.5)]`} />
                    {item.t}
                  </li>
                ))}
              </ul>
            </div>
            <div data-story-in className="rounded-[2rem] border border-white/5 bg-white/5 p-8 backdrop-blur-2xl ring-1 ring-white/10 flex flex-col justify-center">
              <p className="text-lg text-zinc-400 leading-relaxed">
                As the light fades, the biology changes. You are entering a world where bone dissolves and bioluminescence is the only currency of communication.
              </p>
              <p className="mt-4 text-sm text-zinc-600 leading-relaxed">
                Below 200m, photosynthesis ceases. Below 1,000m, permanent darkness reigns. Every creature here has evolved solutions to problems no surface organism has ever faced.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 3 — EXPLORATION
          Upper ocean zones (0m – 1,500m). Sticky column + zone cards.
      ════════════════════════════════════════════════════════════════════ */}
      <section
        ref={explorationRef}
        id="section-exploration"
        aria-label="Exploration"
        className="relative z-10 py-24 px-6"
      >
        <div className="mx-auto max-w-6xl">
          <div data-story-in className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-4">
            Section 03 — Exploration
          </div>
          <h2 data-story-in className="text-3xl sm:text-5xl font-black tracking-tighter text-white uppercase mb-16">
            Descent <span className="text-cyan-400">Begins</span>
          </h2>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            {/* Sticky left */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 lg:h-fit">
              <div data-story-in className="rounded-[2rem] border border-white/5 bg-white/5 p-8 backdrop-blur-2xl ring-1 ring-white/10">
                <div className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-4">Zone Status</div>
                <div className="text-5xl font-black text-cyan-400 tracking-tighter tabular-nums mb-2">{depth.toLocaleString()}m</div>
                <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-6">Current depth</div>
                <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full bg-cyan-400 transition-all duration-300"
                    style={{ width: `${(depth / 11000) * 100}%` }} />
                </div>
                <p className="mt-8 text-sm text-zinc-400 leading-relaxed">
                  The upper ocean is deceptively familiar. Yet below 200m the world transforms irreversibly — pressure climbs, light vanishes, and evolution produces solutions you won't find anywhere on the surface.
                </p>
              </div>
            </div>

            {/* Exploration zone cards: 0m–1500m */}
            <div className="lg:col-span-7">
              <div className="grid gap-6 sm:grid-cols-2">
                {CARDS.filter((c) => c.section === "exploration").map((c, index) => {
                  const Icon = c.icon;
                  return (
                    <div
                      key={c.title}
                      data-story-in
                      className={`story-card zone-card zone-card-${index} group relative rounded-3xl border border-white/10 bg-zinc-900/40 p-6 backdrop-blur-sm transition-all hover:border-cyan-500/40`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="grid size-12 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10 group-hover:bg-cyan-500/10 group-hover:ring-cyan-400/30 transition-all">
                          <Icon className="size-6 text-white/80 group-hover:text-cyan-400" />
                        </div>
                        <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Zone 0{index + 1}</div>
                      </div>
                      <div className="mt-6 text-lg font-bold text-white transition-colors group-hover:text-cyan-400">{c.title}</div>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{c.body}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 4 — INSIGHT
          Deep zones (4,000m–11,000m). Hadal data + glitch HUD detail.
      ════════════════════════════════════════════════════════════════════ */}
      <section
        ref={insightRef}
        id="section-insight"
        aria-label="Insight"
        className="relative z-10 py-24 px-6"
      >
        <div className="mx-auto max-w-6xl">
          <div data-story-in className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-4">
            Section 04 — Insight
          </div>
          <h2 data-story-in className="text-3xl sm:text-5xl font-black tracking-tighter text-white uppercase mb-4">
            The <span className="text-red-400">Hadal</span> Zone
          </h2>
          <p data-story-in className="text-zinc-400 mb-16 max-w-xl leading-relaxed">
            Below 6,000m the rules change. Pressure exceeds 600 atmospheres. Telemetry systems begin to fail. Hull integrity becomes the primary concern.
          </p>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5 lg:sticky lg:top-24 lg:h-fit">
              {/* Insight panel: pressure science */}
              <div data-story-in className="rounded-[2rem] border border-red-500/20 bg-red-500/5 p-8 backdrop-blur-2xl ring-1 ring-red-500/10">
                <div className="text-[10px] font-black text-red-400 uppercase tracking-[0.4em] mb-6">Pressure Data</div>
                <div className="space-y-4">
                  {[
                    { label: "Depth",    val: `${depth.toLocaleString()}m`, warn: isHadal },
                    { label: "Pressure", val: `${psi.toLocaleString()} PSI`, warn: isHadal },
                    { label: "Temp",     val: `${temp.toFixed(1)}°C`, warn: false },
                    { label: "Status",   val: isHadal ? "CRITICAL" : "Nominal", warn: isHadal },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between items-center border-b border-white/5 pb-3">
                      <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">{row.label}</span>
                      <span className={`font-mono font-black text-sm ${row.warn ? "text-red-400" : "text-white"}`}>{row.val}</span>
                    </div>
                  ))}
                </div>
                {isHadal && (
                  <div className="mt-6 text-[9px] font-black uppercase tracking-widest text-red-400 animate-pulse flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-red-400 inline-block" />
                    Hull Integrity Warning — Extreme Depth
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-6">
                {CARDS.filter((c) => c.section === "insight").map((c, index) => {
                  const Icon = c.icon;
                  const globalIndex = CARDS.findIndex((card) => card.title === c.title);
                  return (
                    <div
                      key={c.title}
                      data-story-in
                      className={`story-card zone-card zone-card-${globalIndex} group relative rounded-3xl border border-white/10 bg-zinc-900/40 p-6 backdrop-blur-sm transition-all hover:border-red-500/30`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="grid size-12 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10 group-hover:bg-red-500/10 group-hover:ring-red-400/30 transition-all">
                          <Icon className="size-6 text-white/80 group-hover:text-red-400" />
                        </div>
                        <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Zone 0{globalIndex + 1}</div>
                      </div>
                      <div className="mt-6 text-2xl font-bold text-white transition-colors group-hover:text-red-400">{c.title}</div>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{c.body}</p>
                      <div className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-r from-red-500/10 to-transparent blur-xl" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 5 — CONCLUSION
          Mission complete. Ascend prompt. Archive footer.
      ════════════════════════════════════════════════════════════════════ */}
      <section
        ref={conclusionRef}
        id="section-conclusion"
        aria-label="Conclusion"
        className="relative z-10 py-32 px-6 min-h-[60vh] flex flex-col items-center justify-center"
      >
        <div className="mx-auto max-w-4xl w-full">
          <div data-story-in className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-6 text-center">
            Section 05 — Conclusion
          </div>

          <div data-story-in className="rounded-3xl border border-cyan-500/30 bg-black/80 overflow-hidden mb-12">
            <div className="relative p-10 sm:p-16 text-center">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.12),transparent_70%)]" />
              <h2 className="relative text-4xl sm:text-6xl font-black tracking-tighter text-white uppercase mb-6">
                Mission<br /><span className="text-cyan-400">Complete.</span>
              </h2>
              <p className="relative text-zinc-400 max-w-md mx-auto leading-relaxed mb-10">
                Data collection complete. You have traversed 11,000 metres of ocean, from the sunlit surface to the crushing silence of Challenger Deep. The mysteries of the Hadal zone remain largely unexplored.
              </p>
              <a
                href="#section-hero"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-10 py-5 text-sm font-bold text-black transition-all hover:bg-cyan-400 hover:scale-105 active:scale-95"
              >
                Restart Expedition <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>

          {/* Archive footer — no operator branding */}
          <div data-story-in className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-zinc-700 uppercase tracking-widest border-t border-white/5 pt-8">
            <div className="flex items-center gap-6">
              <span>Mission Log v2.4</span>
              <span>Deep Sea Archive</span>
            </div>
            <div className="flex items-center gap-6">
              <span>11,000m Classified</span>
              <span>© {new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
