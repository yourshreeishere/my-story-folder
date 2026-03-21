import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Dot, Feather, Layers, Wand2, Zap, Code2 } from "lucide-react";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    icon: Layers,
    title: "Structure first",
    body: "A clear layout grid, consistent spacing, and typographic rhythm you can scale.",
  },
  {
    icon: Wand2,
    title: "Motion with restraint",
    body: "Soft entrance animations and micro-interactions—enough to feel premium.",
  },
  {
    icon: Feather,
    title: "Editorial tone",
    body: "Short sections, strong headings, and “story beats” that read like a feature page.",
  },
  {
    icon: Zap,
    title: "Performance Focus",
    body: "Optimized asset loading and clean architecture for sub-second responses.",
  },
  {
    icon: Code2,
    title: "Scalable Logic",
    body: "Modular component design that allows for rapid feature expansion during the hack.",
  },
];

export default function Story() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) return;

    let ctx = gsap.context(() => {
      // 1. INDIVIDUAL TRIGGER LOGIC (Fixes the 'stuck' first card)
      const animatedElements = gsap.utils.toArray("[data-story-in]");
      
      animatedElements.forEach((el) => {
        gsap.fromTo(
          el,
          { 
            y: 40, 
            opacity: 0,
            filter: "blur(10px)" 
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,          // Each element triggers itself
              start: "top 90%",     // Starts when 10% of the element is visible
              end: "top 60%",       // Fully visible by 40% of the screen
              scrub: 1,             // Ties progress to scroll
              toggleActions: "play reverse restart reset",
            },
          }
        );
      });

      // 2. MAGNETIC HOVER EFFECT
      const cards = gsap.utils.toArray(".story-card");
      cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -8, scale: 1.02, duration: 0.4, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, scale: 1, duration: 0.4, ease: "power2.out" });
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="story" className="relative py-24 bg-black overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Column: Narrative */}
          <div className="lg:col-span-5">
            <div data-story-in className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
              <Dot className="size-4 text-cyan-400 animate-pulse" />
              The story
            </div>

            <h2 data-story-in className="mt-6 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl leading-[1.1]">
              Built like a landing page—written like a memoir.
            </h2>

            <p data-story-in className="mt-6 text-pretty text-lg leading-relaxed text-zinc-400">
              This section is where you introduce your “why”: what you care about, what you’re learning, and the kind of work you want to be hired for.
            </p>

            <div data-story-in className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <div className="text-sm font-semibold text-white uppercase tracking-widest opacity-60">
                A quick narrative template
              </div>
              <ul className="mt-6 space-y-4 text-sm text-zinc-400">
                <li className="flex gap-3"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-cyan-500" /> I started with curiosity.</li>
                <li className="flex gap-3"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-purple-500" /> I care about craft and clarity.</li>
                <li className="flex gap-3"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-pink-500" /> I value taste and speed.</li>
              </ul>
              <a href="#contact" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-white transition hover:text-cyan-400">
                Let’s build something <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>

          {/* Right Column: 5 Cards + Work Section */}
          <div className="lg:col-span-7">
            <div className="grid gap-6 sm:grid-cols-2">
              {CARDS.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.title} data-story-in className="story-card group relative rounded-3xl border border-white/10 bg-zinc-900/50 p-6">
                    <div className="flex items-center justify-between">
                      <div className="grid size-12 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10 group-hover:bg-cyan-500/10 group-hover:ring-cyan-400/30 transition-all">
                        <Icon className="size-6 text-white/80 group-hover:text-cyan-400" />
                      </div>
                    </div>
                    <div className="mt-6 text-lg font-bold text-white">{c.title}</div>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">{c.body}</p>
                  </div>
                );
              })}

              {/* Work Preview Card - spans two columns to balance the odd number of cards */}
              <div id="work" data-story-in className="story-card sm:col-span-2 overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 group">
                <div className="relative p-6 sm:p-8">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.1),transparent_40%)]" />
                  <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-lg font-bold text-white">Work section starter</div>
                      <div className="mt-1 text-sm text-zinc-400">Replace this with your projects grid when the theme drops.</div>
                    </div>
                    <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-black transition-transform hover:scale-105 active:scale-95">
                      Start <ArrowUpRight className="size-4" />
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