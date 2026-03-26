import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
  ArrowUpRight, Sun, Eye, Wind, Zap, Snowflake, ChevronDown, Target, ChevronRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ─── Narrative Phases ─────────────────────────────────────────────────────────
// Each phase has a depth range and a military-transmission script.
const PHASES = [
  {
    id: "surface",
    minDepth: 0,
    maxDepth: 199,
    label: "PHASE 01 // SURFACE",
    transmission: "SYSTEM CHECK: Vessel stabilized. Operator — the water surrounding us didn't start here. 4 billion years ago, Earth was a desert. Every drop of this ocean was hand-delivered by a barrage of ice-comets from deep space. You are diving into an alien's gift.",
  },
  {
    id: "twilight",
    minDepth: 200,
    maxDepth: 999,
    label: "PHASE 02 // TWILIGHT ZONE",
    transmission: "SONAR SWEEP ACTIVE. We are passing over the Mid-Ocean Ridge — the planet's longest mountain range. It wraps the Earth like a scar, 65,000km long, yet 90% of humanity will never see its peaks. We are officially off the map.",
  },
  {
    id: "midnight",
    minDepth: 1000,
    maxDepth: 3999,
    label: "PHASE 03 // MIDNIGHT ZONE",
    transmission: "WARNING: Sudden turbulence detected. We've hit the Denmark Strait Cataract. Ahead — an underwater waterfall dropping 3,500 meters into the dark. It moves more water than a thousand Niagaras, and it is completely silent. The ocean is falling into itself.",
  },
  {
    id: "abyssal",
    minDepth: 4000,
    maxDepth: 5999,
    label: "PHASE 04 // ABYSSAL PLAIN",
    transmission: "VISUAL SENSORS FOCUSED. Scanning a Brine Pool on the seabed. A lake inside an ocean — water so salty it has a surface you could skip a stone across. Those are skeletons at the edges, preserved for decades in a toxic underwater desert. Do not breach the hull.",
  },
  {
    id: "hadal",
    minDepth: 6000,
    maxDepth: 10999,
    label: "PHASE 05 // HADAL ZONE",
    transmission: "CRITICAL STATUS: Pressure at 15,000 PSI. The weight of 50 jumbo jets presses against your viewport. We are passing through a Mesoscale Eddy — a whirlpool whose mathematics mirror a Black Hole. Information cannot escape. Water cannot mix. We are in a void.",
  },
  {
    id: "challenger",
    minDepth: 11000,
    maxDepth: Infinity,
    label: "PHASE 06 // CHALLENGER DEEP",
    transmission: "MISSION COMPLETE. We have reached the bottom. We have better maps of the Moon than this spot. Beneath your feet lies Ringwoodite — a blue rock holding three times more water than the surface oceans. We didn't dive into the sea. We found the source.",
  },
];

// ─── Zone Cards ───────────────────────────────────────────────────────────────
const CARDS = [
  { icon: Sun,         title: "0m: The Sunlit Surface",    body: "The Epipelagic Zone. Home to 90% of marine life. The only layer where photosynthesis occurs, fueling the entire ocean's food chain.", section: "exploration" },
  { icon: Eye,         title: "200m: The Twilight Realm",  body: "The Mesopelagic Zone. Light fades to a faint blue. The 'Great Migration' happens nightly as billions of creatures rise to feed.", section: "exploration" },
  { icon: Wind,        title: "1,000m: The Oxygen Minimum",body: "The Bathypelagic Entrance. Oxygen levels drop. Creatures here evolved massive gills and slow metabolisms to survive the Dead Zone.", section: "exploration" },
  { icon: Zap,         title: "1,500m: The Midnight Zone", body: "The Bathypelagic Core. Constant near-freezing temperatures. The only light here is biological — flashes of cyan used for hunting.", section: "exploration" },
  { icon: Snowflake,   title: "4,000m: The Abyssal Plain", body: "The Abyssopelagic Zone. A silent desert of 'Marine Snow' — organic debris falling from the surface that sustains life in the crushing dark.", section: "insight" },
  { icon: ChevronDown, title: "6,000m: The Hadal Trenches",body: "The Hadal Zone. Named after Hades. These V-shaped canyons are deeper than Everest is tall. Only highly specialized snailfish remain.", section: "insight" },
  { icon: Target,      title: "11,000m: Challenger Deep",  body: "The absolute bottom. Pressure reaches 15,750 PSI — equivalent to having 50 jumbo jets press against your viewport. Ultimate, crushing solitude.", section: "insight" },
];

// ─── Phantoms ─────────────────────────────────────────────────────────────────
const PHANTOMS = [
  { id:"p1", path:"M0,25 C15,-5 55,-5 80,25 C105,55 110,80 80,72 C55,65 25,65 0,72 C-30,80 -15,55 0,25Z", viewBox:"-35 -15 150 105", width:280, top:"8%",  left:"3%",  delay:0,  duration:16, drift:40, blur:10, opacity:0.18, color:"rgba(34,211,238,0.85)" },
  { id:"p2", path:"M30,0 C48,12 52,35 42,58 C37,70 26,76 22,94 L24,94 C28,76 36,64 38,52 C50,72 42,84 40,94 L43,94 C46,80 53,62 42,52 C56,35 62,12 30,0Z", viewBox:"0 0 65 98", width:100, top:"30%", left:"85%", delay:4,  duration:20, drift:45, blur:8,  opacity:0.16, color:"rgba(99,179,237,0.9)" },
  { id:"p3", path:"M50,0 C85,0 110,22 110,46 C110,64 88,70 50,70 C12,70 -10,64 -10,46 C-10,22 15,0 50,0Z M20,70 Q16,95 12,115 M35,70 Q34,96 33,118 M50,70 Q50,97 50,120 M65,70 Q66,96 67,118 M80,70 Q84,95 88,115", viewBox:"-15 0 130 125", width:190, top:"52%", left:"15%", delay:8,  duration:28, drift:30, blur:14, opacity:0.14, color:"rgba(167,139,250,0.85)" },
  { id:"p4", path:"M12,34 C0,22 6,4 24,8 C30,1 48,-1 54,12 C66,6 84,18 78,34 C90,42 84,60 66,57 C60,72 36,72 24,60 C4,66 -2,48 12,34Z M54,6 Q60,-8 65,-20", viewBox:"-5 -25 100 105", width:155, top:"70%", left:"68%", delay:12, duration:22, drift:50, blur:10, opacity:0.13, color:"rgba(34,211,238,0.8)" },
  { id:"p5", path:"M0,0 L12,4 L0,8Z M18,10 L30,13 L18,16Z M6,18 L18,22 L6,26Z M22,28 L34,31 L22,34Z M2,36 L14,40 L2,44Z", viewBox:"-2 -2 40 50", width:90, top:"42%", left:"50%", delay:6, duration:13, drift:60, blur:6, opacity:0.15, color:"rgba(103,232,249,0.9)" },
];

// ─── Snow Layers ──────────────────────────────────────────────────────────────
const SNOW_LAYERS = [
  { id:"snow-far",  size:"300px 300px", opacity:0.12, speed:0.08, particles:"radial-gradient(1px 1px at 30px 50px,#fff,transparent),radial-gradient(1px 1px at 80px 120px,#fff,transparent),radial-gradient(1px 1px at 150px 60px,#fff,transparent),radial-gradient(1px 1px at 200px 200px,#fff,transparent),radial-gradient(1px 1px at 250px 90px,#fff,transparent),radial-gradient(1px 1px at 60px 250px,#fff,transparent)" },
  { id:"snow-mid",  size:"220px 220px", opacity:0.20, speed:0.18, particles:"radial-gradient(1.5px 1.5px at 25px 40px,#bae6fd,transparent),radial-gradient(1.5px 1.5px at 75px 110px,#bae6fd,transparent),radial-gradient(1.5px 1.5px at 170px 160px,#bae6fd,transparent),radial-gradient(2px 2px at 100px 140px,#bae6fd,transparent),radial-gradient(1px 1px at 50px 190px,#bae6fd,transparent)" },
  { id:"snow-near", size:"160px 160px", opacity:0.30, speed:0.32, particles:"radial-gradient(2px 2px at 20px 30px,#e0f2fe,transparent),radial-gradient(2.5px 2.5px at 55px 90px,#e0f2fe,transparent),radial-gradient(3px 3px at 135px 130px,#e0f2fe,transparent),radial-gradient(2.5px 2.5px at 15px 120px,#e0f2fe,transparent),radial-gradient(2px 2px at 145px 70px,#e0f2fe,transparent)" },
];

// ─── Snow Layer Component ─────────────────────────────────────────────────────
function SnowLayer({ layer, scrollY, speedMultiplier = 1 }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: layer.particles,
        backgroundRepeat: "repeat",
        backgroundSize: layer.size,
        opacity: layer.opacity,
        transform: `translate3d(0,${scrollY * layer.speed * speedMultiplier}px,0)`,
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
    const schedule = () => {
      const f = Math.min((depth - 6000) / 5000, 1);
      const wait = (1000 + (1 - f) * 3000) + Math.random() * (2000 + (1 - f) * 3000);
      timerRef.current = setTimeout(() => {
        let count = 0;
        const len = 8 + Math.floor(Math.random() * 6);
        const iv = setInterval(() => {
          setDisplay(Array.from({ length: String(value).length + 3 }, () => NOISE[Math.floor(Math.random() * NOISE.length)]).join(""));
          if (++count >= len) { clearInterval(iv); setDisplay(String(value)); schedule(); }
        }, 50);
      }, wait);
    };
    schedule();
    return () => clearTimeout(timerRef.current);
  }, [value, depth]);
  return display;
}

// ─── Typewriter Hook ──────────────────────────────────────────────────────────
// Types out a string character by character. Restarts whenever `text` changes.
function useTypewriter(text, speed = 28) {
  const [displayed, setDisplayed] = useState("");
  const timerRef = useRef(null);
  useEffect(() => {
    setDisplayed("");
    clearInterval(timerRef.current);
    let i = 0;
    // Short delay before each new transmission starts (feels like data loading)
    const startDelay = setTimeout(() => {
      timerRef.current = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(timerRef.current);
      }, speed);
    }, 400);
    return () => { clearTimeout(startDelay); clearInterval(timerRef.current); };
  }, [text, speed]);
  return displayed;
}

// ─── Get Current Phase ────────────────────────────────────────────────────────
function getPhase(depth) {
  return PHASES.find((p) => depth >= p.minDepth && depth <= p.maxDepth) || PHASES[0];
}

// ─── Sonar Ripple Component ───────────────────────────────────────────────────
// Renders expanding rings from cursor position on card hover.
function SonarRipple({ x, y, active }) {
  if (!active) return null;
  return (
    <div
      className="pointer-events-none absolute"
      style={{ left: x, top: y, transform: "translate(-50%,-50%)", zIndex: 20 }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border border-cyan-400/60"
          style={{
            width: 8,
            height: 8,
            marginLeft: -4,
            marginTop: -4,
            animation: `sonar-ripple 1.4s ease-out ${i * 0.35}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Story() {
  const rootRef        = useRef(null);
  const bgFilterRef    = useRef(null);  // the div we apply CSS filters to
  const godRayRef      = useRef(null);
  const vignetteRef    = useRef(null);
  const bottomFlashRef = useRef(null);

  const [depth, setDepth]               = useState(0);
  const [scrollY, setScrollY]           = useState(0);
  const [diveInitiated, setDiveInitiated] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(PHASES[0]);
  const [atBottom, setAtBottom]         = useState(false);
  // Sonar ripple state per card index
  const [ripples, setRipples] = useState({});
  // Hadal shiver active
  const isHadal    = depth >= 6000;
  const isBottom   = depth >= 11000;
  const psi        = Math.round(depth * 0.44);
  const temp       = depth === 0 ? 28 : Math.max(2, 28 - depth * 0.0025);
  const depthDisplay = useGlitch(depth.toLocaleString(), depth);
  const psiDisplay   = useGlitch(psi, depth);

  // Transmission text
  const transmission = useTypewriter(currentPhase.transmission, 26);

  // Snow speed multiplier (ramps up in Hadal zone for sediment rush effect)
  const snowSpeedMult = isHadal ? 1 + Math.min((depth - 6000) / 5000, 1) * 3 : 1;

  // ── Dive Shake ─────────────────────────────────────────────────────────
  const handleDive = useCallback(() => {
    if (diveInitiated) return;
    setDiveInitiated(true);
    const root = rootRef.current;
    if (!root) return;
    const tl = gsap.timeline({
      onComplete: () => gsap.to(window, { duration: 2.4, scrollTo: { y: ".zone-card-0", offsetY: 80 }, ease: "power3.inOut" }),
    });
    tl.to(root, { x:-4,  y:2,   duration:0.04, ease:"none" })
      .to(root, { x:5,   y:-3,  duration:0.04, ease:"none" })
      .to(root, { x:-7,  y:4,   duration:0.04, ease:"none" })
      .to(root, { x:9,   y:-5,  duration:0.04, ease:"none" })
      .to(root, { x:-14, y:7,   duration:0.05, ease:"none" })
      .to(root, { x:14,  y:-7,  duration:0.05, ease:"none" })
      .to(root, { x:-12, y:6,   duration:0.05, ease:"none" })
      .to(root, { x:12,  y:-6,  duration:0.05, ease:"none" })
      .to(root, { x:-10, y:5,   duration:0.05, ease:"none" })
      .to(root, { x:10,  y:-5,  duration:0.05, ease:"none" })
      .to(root, { x:-6,  y:3,   duration:0.06, ease:"none" })
      .to(root, { x:6,   y:-3,  duration:0.06, ease:"none" })
      .to(root, { x:0,   y:0,   duration:0.3,  ease:"elastic.out(1,0.2)" });
  }, [diveInitiated]);

  // ── Bottom Impact: one-shot violent shake + chromatic + vignette ────────
  const bottomTriggered = useRef(false);
  useEffect(() => {
    if (!isBottom || bottomTriggered.current) return;
    bottomTriggered.current = true;
    setAtBottom(true);

    const root = rootRef.current;
    const tl = gsap.timeline();
    // Violent single slam
    tl.to(root, { x:-20, y:14,  duration:0.04, ease:"none" })
      .to(root, { x:22,  y:-16, duration:0.04, ease:"none" })
      .to(root, { x:-18, y:12,  duration:0.04, ease:"none" })
      .to(root, { x:20,  y:-14, duration:0.04, ease:"none" })
      .to(root, { x:-14, y:10,  duration:0.05, ease:"none" })
      .to(root, { x:14,  y:-10, duration:0.05, ease:"none" })
      .to(root, { x:-8,  y:5,   duration:0.06, ease:"none" })
      .to(root, { x:8,   y:-5,  duration:0.06, ease:"none" })
      .to(root, { x:0,   y:0,   duration:0.5,  ease:"elastic.out(1,0.15)" });

    // Blue vignette flicker in
    if (vignetteRef.current) {
      gsap.to(vignetteRef.current, { opacity: 1, duration: 0.3 });
      gsap.to(vignetteRef.current, { opacity: 0.55, duration: 1.8, delay: 0.3, ease: "sine.inOut", repeat: 3, yoyo: true });
    }
  }, [isBottom]);

  // ── GSAP Context ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      // Background color darkens through scroll
      gsap.to(rootRef.current, {
        backgroundColor: "#000000",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom bottom", scrub: true },
      });

      // God ray animation at top
      if (godRayRef.current) {
        gsap.to(godRayRef.current, { opacity: 0, scrollTrigger: { trigger: rootRef.current, start: "top top", end: "30% top", scrub: true } });
      }

      // Section reveals
      gsap.utils.toArray("[data-story-in]").forEach((el) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0, filter: "blur(10px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 90%", end: "top 60%", scrub: 1, toggleActions: "play reverse restart reset" } }
        );
      });

      // Card exit blur
      gsap.utils.toArray(".zone-card").forEach((card) => {
        gsap.to(card, { opacity: 0, filter: "blur(10px)", y: -40, ease: "none",
          scrollTrigger: { trigger: card, start: "top 8%", end: "top -25%", scrub: 1.2 } });
      });

      // Magnetic hover
      gsap.utils.toArray(".story-card").forEach((card) => {
        card.addEventListener("mouseenter", () => gsap.to(card, { y: -8, scale: 1.01, duration: 0.4, ease: "power2.out" }));
        card.addEventListener("mouseleave", () => gsap.to(card, { y: 0, scale: 1, duration: 0.4, ease: "power2.out" }));
      });

      // Sonar pulse
      gsap.to(".sonar-ping", { scale: 4, opacity: 0, duration: 4, repeat: -1, ease: "expo.out" });

      // Scanner line
      gsap.to(".scanner-line", { y: "100vh", duration: 4.5, repeat: -1, ease: "none" });

      // Phantom drift
      PHANTOMS.forEach((ph) => {
        const el = document.querySelector(`#phantom-${ph.id}`);
        if (!el) return;
        gsap.to(el, { x: ph.drift,          duration: ph.duration * 0.55, repeat:-1, yoyo:true, ease:"sine.inOut", delay: ph.delay });
        gsap.to(el, { y: ph.drift * 0.6,    duration: ph.duration * 0.82, repeat:-1, yoyo:true, ease:"sine.inOut", delay: ph.delay + 2 });
        gsap.to(el, { opacity: ph.opacity * 3.5, duration: ph.duration * 0.35, repeat:-1, yoyo:true, ease:"sine.inOut", delay: ph.delay + 1 });
        gsap.to(el, { scale: 1.08,          duration: ph.duration * 0.45, repeat:-1, yoyo:true, ease:"sine.inOut", delay: ph.delay + 3 });
      });

      // Hero entrance
      gsap.fromTo(".hero-title", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.6, ease: "expo.out", delay: 0.3 });
      gsap.fromTo(".hero-sub",   { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.7 });
      gsap.fromTo(".hero-btn",   { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0, ease: "expo.out", delay: 1.1 });

      // Stats reveal
      gsap.utils.toArray(".stat-num").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" } }
        );
      });

    }, rootRef);

    // ── Scroll tracker ──────────────────────────────────────────────────
    const handleScroll = () => {
      const section = rootRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const pct = Math.min(Math.max((rect.top * -1) / (rect.height - window.innerHeight), 0), 1);
      const d = Math.floor(pct * 11000);
      setDepth(d);
      setScrollY(window.scrollY);

      // Phase transition
      const phase = getPhase(d);
      setCurrentPhase((prev) => (prev.id !== phase.id ? phase : prev));

      // Dynamic CSS filter on background (blur + darken as we descend)
      if (bgFilterRef.current) {
        const blurAmount    = Math.min(d / 11000 * 6, 6);        // 0 → 6px
        const brightnessVal = Math.max(1 - d / 11000 * 0.55, 0.45); // 1 → 0.45
        const saturateVal   = Math.max(1 - d / 11000 * 0.5, 0.5);
        bgFilterRef.current.style.filter = `blur(${blurAmount}px) brightness(${brightnessVal}) saturate(${saturateVal})`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => { ctx.revert(); window.removeEventListener("scroll", handleScroll); };
  }, []);

  // ── Hadal pressure shiver ───────────────────────────────────────────────
  // Subtle continuous random micro-nudge on UI elements when in Hadal zone
  useEffect(() => {
    if (!isHadal) return;
    const els = document.querySelectorAll(".pressure-shiver");
    const intervals = Array.from(els).map((el) => {
      return setInterval(() => {
        const intensity = Math.min((depth - 6000) / 5000, 1) * 1.8;
        gsap.to(el, {
          x: (Math.random() - 0.5) * intensity,
          y: (Math.random() - 0.5) * intensity,
          duration: 0.08,
          ease: "none",
          overwrite: "auto",
        });
      }, 120);
    });
    return () => intervals.forEach(clearInterval);
  }, [isHadal, depth]);

  // ── Sonar ripple handlers ───────────────────────────────────────────────
  const handleCardMouseMove = useCallback((e, idx) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipples((prev) => ({ ...prev, [idx]: { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true } }));
  }, []);
  const handleCardMouseLeave = useCallback((idx) => {
    setRipples((prev) => ({ ...prev, [idx]: { ...prev[idx], active: false } }));
  }, []);

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div ref={rootRef} id="story" className="relative bg-[#001d2d] overflow-hidden">

      {/* ── Ringwoodite blue vignette (reveals at 11,000m) ── */}
      <div
        ref={vignetteRef}
        className="fixed inset-0 pointer-events-none z-30 opacity-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(30,80,180,0.55) 70%, rgba(10,30,120,0.85) 100%)",
          mixBlendMode: "screen",
        }}
        aria-hidden="true"
      />

      {/* ── Chromatic aberration overlay (permanent CSS class at bottom) ── */}
      {isBottom && (
        <div className="fixed inset-0 pointer-events-none z-31 chroma-aberration" aria-hidden="true" />
      )}

      {/* ── Dynamic background filter wrapper ── */}
      <div
        ref={bgFilterRef}
        className="fixed inset-0 pointer-events-none z-0 transition-none"
        aria-hidden="true"
      >
        {/* God rays at surface */}
        <div
          ref={godRayRef}
          className="god-rays absolute inset-0"
          aria-hidden="true"
        />

        {/* Parallax snow (speed ramps up in Hadal) */}
        <div className="absolute inset-0 overflow-hidden">
          {SNOW_LAYERS.map((layer) => (
            <SnowLayer key={layer.id} layer={layer} scrollY={scrollY} speedMultiplier={snowSpeedMult} />
          ))}
        </div>
      </div>

      {/* ── Phantom silhouettes ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-1" aria-hidden="true">
        {PHANTOMS.map((ph) => (
          <div key={ph.id} id={`phantom-${ph.id}`}
            style={{ position:"absolute", top:ph.top, left:ph.left, width:ph.width, opacity:ph.opacity,
              filter:`blur(${ph.blur}px) drop-shadow(0 0 14px ${ph.color})`,
              willChange:"transform,opacity", transform:"translate3d(0,0,0)" }}
          >
            <svg viewBox={ph.viewBox} xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <path d={ph.path} fill={ph.color} />
            </svg>
          </div>
        ))}
      </div>

      {/* ── Scanner line ── */}
      <div className="scanner-line fixed top-0 left-0 w-full pointer-events-none z-40" aria-hidden="true">
        <div style={{ height:"2px", background:"linear-gradient(90deg,transparent 0%,rgba(34,211,238,0) 4%,rgba(34,211,238,0.85) 20%,rgba(34,211,238,1) 50%,rgba(34,211,238,0.85) 80%,rgba(34,211,238,0) 96%,transparent 100%)", boxShadow:"0 0 18px 5px rgba(34,211,238,0.55),0 0 50px 10px rgba(34,211,238,0.15)" }} />
        <div style={{ height:"70px", background:"linear-gradient(180deg,rgba(34,211,238,0.09) 0%,transparent 100%)", marginTop:"-2px" }} />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          DESKTOP HUD — Transmission + Telemetry
      ══════════════════════════════════════════════════════════════════════ */}
      <div className={`fixed bottom-6 right-6 z-50 font-mono bg-black/90 backdrop-blur-xl rounded-2xl border hidden md:flex flex-col transition-all duration-700 ${
        isBottom  ? "border-blue-400/60 shadow-[0_0_50px_rgba(59,130,246,0.4)] w-[340px]"
        : isHadal ? "border-red-500/50 shadow-[0_0_40px_rgba(239,68,68,0.3)] w-[320px]"
                  : "border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.2)] w-[300px]"
      }`}>

        {/* ── Transmission Log (top portion) ── */}
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center justify-between mb-3">
            <span className={`text-[9px] font-black uppercase tracking-[0.35em] ${isBottom ? "text-blue-400" : isHadal ? "text-red-400/80" : "text-cyan-500/70"}`}>
              {currentPhase.label}
            </span>
            <span className="text-[8px] text-zinc-600 font-mono">ENCRYPTED</span>
          </div>
          {/* Typewriter transmission text */}
          <p className={`text-[10px] leading-relaxed font-mono min-h-[80px] ${isBottom ? "text-blue-200" : isHadal ? "text-red-200/80" : "text-cyan-100/80"}`}>
            {transmission}
            <span className="ml-0.5 animate-pulse">▌</span>
          </p>
        </div>

        {/* ── Telemetry (bottom portion) ── */}
        <div className="p-5">
          <div className={`text-[9px] uppercase tracking-[0.3em] mb-2 ${isBottom ? "text-blue-400/70" : isHadal ? "text-red-500/70" : "text-cyan-500/60"}`}>
            Live Telemetry
          </div>
          <div className={`text-3xl font-black tracking-tighter tabular-nums pressure-shiver ${
            isBottom ? "text-blue-300 drop-shadow-[0_0_20px_rgba(147,197,253,0.9)]"
            : isHadal ? "text-red-400 drop-shadow-[0_0_14px_rgba(239,68,68,0.9)]"
                      : "text-cyan-400"
          } ${isBottom ? "chroma-text" : ""}`}>
            {depthDisplay}m
          </div>
          <div className={`h-px w-full my-2.5 ${isBottom ? "bg-blue-500/20" : isHadal ? "bg-red-500/20" : "bg-cyan-500/20"}`} />
          <div className="w-full h-1.5 rounded-full bg-white/10 mb-3 overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-300 ${
              isBottom ? "bg-blue-400 shadow-[0_0_14px_rgba(147,197,253,0.9)]"
              : isHadal ? "bg-red-400 shadow-[0_0_12px_rgba(239,68,68,0.9)]"
                        : "bg-cyan-400"
            }`} style={{ width:`${(depth / 11000) * 100}%` }} />
          </div>
          <div className="flex justify-between text-[10px] font-bold mb-1">
            <span className="opacity-40 uppercase">Pressure:</span>
            <span className={`pressure-shiver ${isBottom ? "text-blue-300" : isHadal ? "text-red-300" : "text-white"}`}>{psiDisplay} PSI</span>
          </div>
          <div className="flex justify-between text-[10px] font-bold">
            <span className="opacity-40 uppercase">Temp:</span>
            <span className="text-white">{temp.toFixed(1)}°C</span>
          </div>
          {isHadal && !isBottom && (
            <div className="mt-3 flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-red-400 animate-pulse pressure-shiver">
              <span className="size-1.5 rounded-full bg-red-400 inline-block" />
              Hull Integrity: Warning
            </div>
          )}
          {isBottom && (
            <div className="mt-3 flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-blue-300">
              <span className="size-1.5 rounded-full bg-blue-400 inline-block animate-ping" />
              Ringwoodite Detected — Source Found
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile HUD ── */}
      <div className={`fixed bottom-4 left-4 right-4 z-50 md:hidden font-mono bg-black/90 backdrop-blur-xl px-4 py-3 rounded-xl border transition-all duration-500 ${
        isBottom ? "border-blue-400/50" : isHadal ? "border-red-500/50" : "border-cyan-500/40"
      }`}>
        {/* Mobile transmission — abbreviated */}
        <div className={`text-[8px] mb-2 font-mono leading-relaxed ${isBottom ? "text-blue-300" : isHadal ? "text-red-300" : "text-cyan-300"}`}>
          <span className="text-zinc-600 mr-1">{currentPhase.label} //</span>
          {transmission.slice(0, 80)}{transmission.length > 80 ? "…" : ""}
        </div>
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[8px] uppercase tracking-widest text-cyan-500/60 mb-0.5">Depth</div>
            <div className={`text-xl font-black tabular-nums tracking-tighter ${isBottom ? "text-blue-300" : isHadal ? "text-red-400" : "text-cyan-400"}`}>{depthDisplay}m</div>
          </div>
          <div className="flex-1">
            <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-300 ${isBottom ? "bg-blue-400" : isHadal ? "bg-red-400" : "bg-cyan-400"}`}
                style={{ width:`${(depth / 11000) * 100}%` }} />
            </div>
            <div className="flex justify-between mt-1 text-[8px] text-zinc-600"><span>0m</span><span>11,000m</span></div>
          </div>
          <div className="text-right">
            <div className="text-[8px] uppercase tracking-widest text-cyan-500/60 mb-0.5">PSI</div>
            <div className={`text-sm font-black tabular-nums ${isBottom ? "text-blue-300" : isHadal ? "text-red-400" : "text-white"}`}>{psiDisplay}</div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="section-hero" aria-label="Hero"
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 z-10">
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
          <button onClick={handleDive} disabled={diveInitiated}
            className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-xl border px-8 py-4 text-sm font-black uppercase tracking-widest transition-all duration-300 ${
              diveInitiated
                ? "border-cyan-500/20 bg-cyan-500/5 text-cyan-500/40 cursor-not-allowed"
                : "border-cyan-400/60 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-white hover:shadow-[0_0_32px_rgba(34,211,238,0.45)] active:scale-95"
            }`}>
            {!diveInitiated && <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent" />}
            <span className={`size-2 rounded-full ${diveInitiated ? "bg-cyan-500/30" : "bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]"}`} />
            {diveInitiated ? "Descending…" : "Initiate Dive Sequence"}
          </button>
          <a href="#section-intro" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-cyan-400 transition-colors font-bold uppercase tracking-widest">
            Learn more <ChevronRight className="size-4" />
          </a>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600">
          <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Scroll to descend</span>
          <div className="w-px h-12 bg-gradient-to-b from-cyan-500/40 to-transparent" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 2 — INTRODUCTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="section-intro" aria-label="Introduction" className="relative z-10 py-32 px-6">
        <div className="mx-auto max-w-6xl">
          <div data-story-in className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-6">Section 02 — Introduction</div>
          <h2 data-story-in className="text-4xl sm:text-6xl font-black tracking-tighter text-white uppercase leading-[0.9] mb-12 max-w-2xl">
            The Last<br /><span className="text-cyan-400">Frontier</span><br />On Earth.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { num:"95%",  label:"Ocean unexplored" },
              { num:"11km", label:"Max depth recorded" },
              { num:"1,100",label:"Atmospheres of pressure" },
              { num:"~2°C", label:"Hadal temperature" },
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
                  { t:"Structural Adaptation",  c:"bg-cyan-500" },
                  { t:"Atmospheric Density",    c:"bg-blue-600" },
                  { t:"Bioluminescent Signals", c:"bg-indigo-600" },
                  { t:"Hadal Pressure Systems", c:"bg-violet-600" },
                ].map((item) => (
                  <li key={item.t} className="flex items-center gap-4 text-xs font-bold text-white uppercase tracking-widest">
                    <span className={`size-1.5 rounded-full ${item.c} shadow-[0_0_10px_rgba(255,255,255,0.5)]`} />
                    {item.t}
                  </li>
                ))}
              </ul>
            </div>
            <div data-story-in className="rounded-[2rem] border border-white/5 bg-white/5 p-8 backdrop-blur-2xl ring-1 ring-white/10 flex flex-col justify-center">
              <p className="text-lg text-zinc-400 leading-relaxed">As the light fades, the biology changes. You are entering a world where bone dissolves and bioluminescence is the only currency of communication.</p>
              <p className="mt-4 text-sm text-zinc-600 leading-relaxed">Below 200m photosynthesis ceases. Below 1,000m permanent darkness reigns. Every creature here has evolved solutions to problems no surface organism has ever faced.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 3 — EXPLORATION (0m–1,500m)
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="section-exploration" aria-label="Exploration" className="relative z-10 py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div data-story-in className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-4">Section 03 — Exploration</div>
          <h2 data-story-in className="text-3xl sm:text-5xl font-black tracking-tighter text-white uppercase mb-16">Descent <span className="text-cyan-400">Begins</span></h2>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5 lg:sticky lg:top-24 lg:h-fit">
              <div data-story-in className="rounded-[2rem] border border-white/5 bg-white/5 p-8 backdrop-blur-2xl ring-1 ring-white/10">
                <div className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-4">Zone Status</div>
                <div className="text-5xl font-black text-cyan-400 tracking-tighter tabular-nums mb-2">{depth.toLocaleString()}m</div>
                <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-6">Current depth</div>
                <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full bg-cyan-400 transition-all duration-300" style={{ width:`${(depth / 11000) * 100}%` }} />
                </div>
                <p className="mt-8 text-sm text-zinc-400 leading-relaxed">The upper ocean is deceptively familiar. Yet below 200m the world transforms irreversibly — pressure climbs, light vanishes, and evolution produces solutions you won't find anywhere on the surface.</p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="grid gap-6 sm:grid-cols-2">
                {CARDS.filter((c) => c.section === "exploration").map((c, index) => {
                  const Icon = c.icon;
                  const ripple = ripples[index] || {};
                  return (
                    <div key={c.title} data-story-in
                      className={`story-card zone-card zone-card-${index} group relative rounded-3xl border border-white/10 bg-zinc-900/40 p-6 backdrop-blur-sm transition-all hover:border-cyan-500/40 overflow-hidden`}
                      onMouseMove={(e) => handleCardMouseMove(e, index)}
                      onMouseLeave={() => handleCardMouseLeave(index)}
                    >
                      <SonarRipple x={ripple.x} y={ripple.y} active={ripple.active} />
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

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 4 — INSIGHT (4,000m–11,000m)
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="section-insight" aria-label="Insight" className="relative z-10 py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div data-story-in className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-4">Section 04 — Insight</div>
          <h2 data-story-in className="text-3xl sm:text-5xl font-black tracking-tighter text-white uppercase mb-4">
            The <span className="text-red-400">Hadal</span> Zone
          </h2>
          <p data-story-in className="text-zinc-400 mb-16 max-w-xl leading-relaxed">Below 6,000m the rules change. Pressure exceeds 600 atmospheres. Telemetry systems begin to fail. Hull integrity becomes the primary concern.</p>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5 lg:sticky lg:top-24 lg:h-fit">
              <div data-story-in className="rounded-[2rem] border border-red-500/20 bg-red-500/5 p-8 backdrop-blur-2xl ring-1 ring-red-500/10">
                <div className="text-[10px] font-black text-red-400 uppercase tracking-[0.4em] mb-6">Pressure Data</div>
                <div className="space-y-4">
                  {[
                    { label:"Depth",    val:`${depth.toLocaleString()}m`,   warn:isHadal },
                    { label:"Pressure", val:`${psi.toLocaleString()} PSI`,  warn:isHadal },
                    { label:"Temp",     val:`${temp.toFixed(1)}°C`,         warn:false },
                    { label:"Status",   val:isBottom ? "RINGWOODITE" : isHadal ? "CRITICAL" : "Nominal", warn:isHadal },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between items-center border-b border-white/5 pb-3">
                      <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">{row.label}</span>
                      <span className={`font-mono font-black text-sm pressure-shiver ${isBottom && row.label === "Status" ? "text-blue-300" : row.warn ? "text-red-400" : "text-white"}`}>{row.val}</span>
                    </div>
                  ))}
                </div>
                {isHadal && !isBottom && (
                  <div className="mt-6 text-[9px] font-black uppercase tracking-widest text-red-400 animate-pulse flex items-center gap-2 pressure-shiver">
                    <span className="size-1.5 rounded-full bg-red-400 inline-block" />
                    Hull Integrity Warning — Extreme Depth
                  </div>
                )}
                {isBottom && (
                  <div className="mt-6 text-[9px] font-black uppercase tracking-widest text-blue-300 flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-blue-400 inline-block animate-ping" />
                    Source Located — Ringwoodite Confirmed
                  </div>
                )}
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="grid gap-6">
                {CARDS.filter((c) => c.section === "insight").map((c, index) => {
                  const Icon = c.icon;
                  const globalIndex = CARDS.findIndex((card) => card.title === c.title);
                  const rippleIdx   = 100 + index;
                  const ripple      = ripples[rippleIdx] || {};
                  return (
                    <div key={c.title} data-story-in
                      className={`story-card zone-card zone-card-${globalIndex} group relative rounded-3xl border border-white/10 bg-zinc-900/40 p-6 backdrop-blur-sm transition-all hover:border-red-500/30 overflow-hidden`}
                      onMouseMove={(e) => handleCardMouseMove(e, rippleIdx)}
                      onMouseLeave={() => handleCardMouseLeave(rippleIdx)}
                    >
                      <SonarRipple x={ripple.x} y={ripple.y} active={ripple.active} />
                      <div className="flex items-center justify-between">
                        <div className="grid size-12 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10 group-hover:bg-red-500/10 group-hover:ring-red-400/30 transition-all">
                          <Icon className="size-6 text-white/80 group-hover:text-red-400" />
                        </div>
                        <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Zone 0{globalIndex + 1}</div>
                      </div>
                      <div className={`mt-6 text-2xl font-bold text-white transition-colors group-hover:text-red-400 ${isBottom ? "chroma-text" : ""}`}>{c.title}</div>
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

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 5 — CONCLUSION (The Ringwoodite Revelation)
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="section-conclusion" aria-label="Conclusion"
        className="relative z-10 py-32 px-6 min-h-[60vh] flex flex-col items-center justify-center">
        <div className="mx-auto max-w-4xl w-full">
          <div data-story-in className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-6 text-center">
            Section 05 — Conclusion
          </div>
          <div data-story-in className={`rounded-3xl border overflow-hidden mb-12 transition-all duration-700 ${
            isBottom
              ? "border-blue-400/50 shadow-[0_0_80px_rgba(59,130,246,0.35)] bg-gradient-to-b from-blue-950/80 to-black/90"
              : "border-cyan-500/30 bg-black/80"
          }`}>
            <div className="relative p-10 sm:p-16 text-center">
              <div className={`pointer-events-none absolute inset-0 transition-all duration-1000 ${
                isBottom
                  ? "bg-[radial-gradient(ellipse_at_50%_50%,rgba(59,130,246,0.25),transparent_60%)]"
                  : "bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.12),transparent_70%)]"
              }`} />
              {/* Ringwoodite crystalline texture hint */}
              {isBottom && (
                <div className="pointer-events-none absolute inset-0 opacity-10 ringwoodite-crystal" aria-hidden="true" />
              )}
              <h2 className={`relative text-4xl sm:text-6xl font-black tracking-tighter uppercase mb-6 transition-all duration-700 ${
                isBottom ? "text-blue-200 chroma-text" : "text-white"
              }`}>
                {isBottom ? "Source\nFound." : "Mission"}<br />
                <span className={isBottom ? "text-blue-400" : "text-cyan-400"}>
                  {isBottom ? "." : "Complete."}
                </span>
              </h2>
              <p className={`relative max-w-md mx-auto leading-relaxed mb-4 ${isBottom ? "text-blue-200/80" : "text-zinc-400"}`}>
                {isBottom
                  ? "We have reached the bottom. Beneath your feet lies Ringwoodite — a blue rock holding three times more water than the surface oceans."
                  : "Data collection complete. You have traversed 11,000 metres of ocean, from the sunlit surface to the crushing silence of Challenger Deep."}
              </p>
              {isBottom && (
                <p className="relative text-sm text-blue-300/60 max-w-sm mx-auto leading-relaxed mb-8">
                  We didn't just dive into the sea. We discovered that the Earth is a hollow shell filled with the unknown.
                </p>
              )}
              <a href="#section-hero"
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-10 py-5 text-sm font-bold transition-all hover:scale-105 active:scale-95 ${
                  isBottom
                    ? "bg-blue-500 text-white hover:bg-blue-400 shadow-[0_0_24px_rgba(59,130,246,0.5)]"
                    : "bg-cyan-500 text-black hover:bg-cyan-400"
                }`}>
                Restart Expedition <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>

          {/* Archive footer */}
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
