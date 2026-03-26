import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowDown, Radio, Activity, Navigation } from "lucide-react";

export default function Hero() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-item]",
        { y: 20, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "expo.out", stagger: 0.1 }
      );
      gsap.to("[data-orb]", {
        scale: 1.1,
        opacity: 0.8,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="top" className="relative overflow-hidden bg-[#00080d] pt-20">
      {/* Deep Sea Ambient Lights */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 size-[600px] rounded-full bg-cyan-900/20 blur-[120px]" />
        <div className="absolute -right-24 bottom-0 size-[600px] rounded-full bg-blue-900/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div data-hero-item className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
              <Radio className="size-3 animate-pulse" /> Signal: Established
            </div>

            <h1 data-hero-item className="mt-8 text-6xl font-black tracking-tighter text-white md:text-8xl leading-[0.85] uppercase">
              The <span className="text-transparent bg-clip-text bg-gradient-to-b from-cyan-400 to-blue-700">Descent</span>
            </h1>

            <p data-hero-item className="mt-8 max-w-xl text-lg leading-relaxed text-zinc-400 font-medium">
              95% of the Earth's oceans remain unexplored. You are cleared for a vertical expedition into the Hadal zone. Prepare for pressure exceeding 15,000 PSI.
            </p>

            <div data-hero-item className="mt-10 flex flex-wrap gap-4">
              <a href="#story" className="group inline-flex items-center justify-center rounded-xl bg-cyan-500 px-8 py-4 text-sm font-bold text-black transition-all hover:bg-cyan-400 hover:scale-105">
                Initiate Dive Sequence
              </a>
              <div className="flex items-center gap-4 px-4 text-zinc-500 text-[10px] uppercase tracking-widest font-bold">
                <Navigation className="size-4 text-cyan-500" /> Site: Challenger Deep
              </div>
            </div>

            <div data-hero-item className="mt-16 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-500/50">
              <ArrowDown className="size-4 animate-bounce" /> Scroll to depressurize
            </div>
          </div>

          <div className="lg:col-span-5">
            <div data-hero-item className="relative overflow-hidden rounded-[32px] border border-white/5 bg-zinc-900/20 p-8 backdrop-blur-3xl">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">Submersible Status</div>
                <Activity className="size-4 text-green-500" />
              </div>

              <div className="mt-6 space-y-4">
                {[
                  { k: "Hull Integrity", v: "100%", c: "text-green-400" },
                  { k: "Oxygen Supply", v: "Optimal", c: "text-cyan-400" },
                  { k: "External Temp", v: "2.4°C", c: "text-blue-400" },
                ].map((row) => (
                  <div key={row.k} className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/5">
                    <div className="text-[10px] uppercase text-white/40">{row.k}</div>
                    <div className={`text-xs font-mono font-bold ${row.c}`}>{row.v}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div data-orb className="h-20 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 flex flex-col items-center justify-center">
                   <div className="text-[8px] uppercase text-cyan-500 mb-1">Sonar</div>
                   <div className="size-2 rounded-full bg-cyan-500 animate-ping" />
                </div>
                <div data-orb className="h-20 rounded-2xl border border-white/10 bg-white/5 flex flex-col items-center justify-center">
                   <div className="text-[8px] uppercase text-white/40 mb-1">Depth Lock</div>
                   <div className="font-mono text-white text-xs">ACTIVE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}