import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Sun, Eye, Wind, Zap, Snowflake, ChevronDown, Target, Dot } from "lucide-react";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    icon: Sun,
    title: "0m: The Sunlit Surface",
    body: "The Epipelagic Zone. Home to 90% of marine life. This is the only layer where photosynthesis occurs, fueling the entire ocean's food chain.",
  },
  {
    icon: Eye,
    title: "200m: The Twilight Realm",
    body: "The Mesopelagic Zone. Light fades to a faint blue. Here, the 'Great Migration' happens nightly as billions of creatures rise to feed.",
  },
  {
    icon: Wind,
    title: "1,000m: The Oxygen Minimum",
    body: "The Bathypelagic Entrance. Oxygen levels drop. Creatures here have evolved massive gills and slow metabolisms to survive the 'Dead Zone'.",
  },
  {
    icon: Zap,
    title: "1,500m: The Midnight Zone",
    body: "The Bathypelagic Core. Constant near-freezing temperatures. The only light here is biological—flashes of cyan used for hunting.",
  },
  {
    icon: Snowflake,
    title: "4,000m: The Abyssal Plain",
    body: "The Abyssopelagic Zone. A silent desert of 'Marine Snow'—organic debris falling from the surface that sustains life in the crushing dark.",
  },
  {
    icon: ChevronDown,
    title: "6,000m: The Hadal Trenches",
    body: "The Hadal Zone. Named after Hades. These V-shaped canyons are deeper than Everest is tall. Only highly specialized snailfish remain.",
  },
  {
    icon: Target,
    title: "11,000m: Challenger Deep",
    body: "The absolute bottom. Pressure reaches 15,750 PSI—equivalent to having an elephant stand on your thumb. Ultimate, crushing solitude.",
  },
];

export default function Story() {
  const rootRef = useRef(null);
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    if (!rootRef.current) return;

    let ctx = gsap.context(() => {
      // 1. DYNAMIC BACKGROUND SHIFT (Ocean Darkening)
      gsap.to(rootRef.current, {
        backgroundColor: "#000000",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // 2. REVEAL ANIMATIONS
      const animatedElements = gsap.utils.toArray("[data-story-in]");
      animatedElements.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0, filter: "blur(10px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 60%",
              scrub: 1,
              toggleActions: "play reverse restart reset",
            },
          }
        );
      });

      // 3. MAGNETIC & GLOW HOVER
      const cards = gsap.utils.toArray(".story-card");
      cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -8, scale: 1.01, duration: 0.4, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, scale: 1, duration: 0.4, ease: "power2.out" });
        });
      });

      // 4. SONAR PULSE EFFECT
      gsap.to(".sonar-ping", {
        scale: 4,
        opacity: 0,
        duration: 4,
        repeat: -1,
        ease: "expo.out"
      });

    }, rootRef);

    // 5. DEPTH TRACKER LOGIC
    const handleScroll = () => {
      const section = rootRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrollPercent = Math.min(Math.max((rect.top * -1) / (rect.height - window.innerHeight), 0), 1);
      setDepth(Math.floor(scrollPercent * 11000));
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section 
      ref={rootRef} 
      id="story" 
      className="relative py-24 bg-[#001d2d] transition-colors duration-1000 overflow-hidden"
    >
      {/* Background Ambience Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="ocean-particles" /> 
      </div>

      {/* FIXED HUD: Depth & Pressure Meter */}
      <div className="fixed bottom-10 right-10 z-50 font-mono text-cyan-400 bg-black/80 backdrop-blur-xl p-6 rounded-2xl border border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.2)] hidden md:block">
        <div className="text-[10px] uppercase tracking-[0.3em] text-cyan-500/60 mb-2">Internal Pressure</div>
        <div className="text-4xl font-black tracking-tighter tabular-nums">{depth.toLocaleString()}m</div>
        <div className="h-px w-full bg-cyan-500/20 my-3" />
        <div className="flex justify-between items-center text-[10px] font-bold">
           <span className="opacity-50 uppercase">Load:</span>
           <span className="text-white">{(depth * 0.44).toFixed(0)} PSI</span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Column: Expedition Narrative */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 lg:h-fit">
            <div data-story-in className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-cyan-300">
              <div className="relative size-2">
                <div className="sonar-ping absolute inset-0 rounded-full bg-cyan-400" />
                <div className="relative size-2 rounded-full bg-cyan-400" />
              </div>
              Live Telemetry
            </div>

            <h2 data-story-in className="mt-8 text-5xl font-black tracking-tighter text-white sm:text-7xl leading-[0.9] uppercase">
              The <span className="text-cyan-400">Abyss</span> <br/> Awaits.
            </h2>

            <p data-story-in className="mt-8 text-lg leading-relaxed text-zinc-400 font-medium">
              As the light fades, the biology changes. You are entering a world where bone dissolves and bioluminescence is the only currency.
            </p>

            <div data-story-in className="mt-12 rounded-[2rem] border border-white/5 bg-white/5 p-8 backdrop-blur-2xl ring-1 ring-white/10">
              <div className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em]">Field Observations</div>
              <ul className="mt-8 space-y-6">
                {[
                  { t: "Structural Adaptation", c: "bg-cyan-500" },
                  { t: "Atmospheric Density", c: "bg-blue-600" },
                  { t: "Bioluminescent Signals", c: "bg-indigo-600" }
                ].map((item) => (
                  <li key={item.t} className="flex items-center gap-4 text-xs font-bold text-white uppercase tracking-widest">
                    <span className={`size-1.5 rounded-full ${item.c} shadow-[0_0_10px_rgba(255,255,255,0.5)]`} />
                    {item.t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: The 7 Depth Zone Cards */}
          <div className="lg:col-span-7">
            <div className="grid gap-6 sm:grid-cols-2">
              {CARDS.map((c, index) => {
                const Icon = c.icon;
                const isDeep = index >= 4;
                return (
                  <div 
                    key={c.title} 
                    data-story-in 
                    className={`story-card group relative rounded-3xl border border-white/10 bg-zinc-900/40 p-6 backdrop-blur-sm transition-all hover:border-cyan-500/40 ${isDeep ? 'sm:col-span-2' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="grid size-12 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10 group-hover:bg-cyan-500/10 group-hover:ring-cyan-400/30 transition-all">
                        <Icon className="size-6 text-white/80 group-hover:text-cyan-400" />
                      </div>
                      <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Zone 0{index + 1}</div>
                    </div>
                    <div className={`mt-6 font-bold text-white transition-colors group-hover:text-cyan-400 ${isDeep ? 'text-2xl' : 'text-lg'}`}>
                      {c.title}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">{c.body}</p>
                    
                    {isDeep && (
                      <div className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-r from-cyan-500/10 to-transparent blur-xl" />
                    )}
                  </div>
                );
              })}

              {/* Final Conclusion Card */}
              <div data-story-in className="story-card sm:col-span-2 overflow-hidden rounded-3xl border border-cyan-500/30 bg-black/80 group">
                <div className="relative p-8">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.15),transparent_70%)]" />
                  <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-xl font-bold text-white tracking-tight">Ascend to Surface</div>
                      <div className="mt-1 text-sm text-zinc-400 max-w-xs">Data collection complete. The mysteries of the Hadal zone remain largely unexplored.</div>
                    </div>
                    <a href="#top" className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-8 py-4 text-sm font-bold text-black transition-all hover:bg-cyan-400 hover:scale-105 active:scale-95">
                      Restart Expedition <ArrowUpRight className="size-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}