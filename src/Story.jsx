import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Dot, Feather, Layers, Wand2 } from "lucide-react";

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
];

export default function Story() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-story-in]",
        { 
          y: 60,                // Start lower for a more dramatic entrance
          opacity: 0,
          clipPath: "inset(100% 0% 0% 0%)" // START: Hidden from bottom up (Mask effect)
        },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",  // END: Fully revealed
          duration: 1.2,
          ease: "expo.out",     // Smooth, high-end "Awwwards" easing
          stagger: 0.12,        // Delay between each element
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 85%",   // Triggers when section top hits 85% of viewport
            /* CHANGE: toggleActions now handles scrolling back UP.
               play: on enter down
               reverse: on leave up (hides them)
               play: on enter back down
               reverse: on leave back down
            */
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }, rootRef);

    return () => ctx.revert(); 
  }, []);

  return (
    <section ref={rootRef} id="story" className="relative py-16 sm:py-24 bg-black">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Column: Narrative */}
          <div className="lg:col-span-5">
            <div
              data-story-in
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80"
            >
              <Dot className="size-4 text-cyan-400 animate-pulse" />
              The story
            </div>

            <h2
              data-story-in
              className="mt-6 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl"
            >
              Built like a landing page—written like a memoir.
            </h2>

            <p
              data-story-in
              className="mt-6 text-pretty text-lg leading-relaxed text-zinc-400"
            >
              This section is where you introduce your “why”: what you care
              about, what you’re learning, and the kind of work you want to be
              hired for.
            </p>

            {/* Template Card */}
            <div data-story-in className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="text-sm font-semibold text-white uppercase tracking-widest">
                A quick narrative template
              </div>
              <ul className="mt-6 space-y-4 text-sm text-zinc-400">
                <li className="flex gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-cyan-500" />
                  I started with curiosity, not credentials.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-purple-500" />
                  I care about craft, performance, and clarity.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-pink-500" />
                  I’m looking for teams that value taste and speed.
                </li>
              </ul>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-white transition hover:text-cyan-400"
              >
                Let’s build something <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Grid of Cards */}
          <div className="lg:col-span-7">
            <div className="grid gap-6 sm:grid-cols-2">
              {CARDS.map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.title}
                    data-story-in
                    className="group relative rounded-3xl border border-white/10 bg-zinc-900/50 p-6 transition-all duration-500 hover:border-white/20 hover:bg-zinc-800/50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="grid size-12 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10 group-hover:bg-cyan-500/10 group-hover:ring-cyan-500/20 transition-colors">
                        <Icon className="size-6 text-white/80 group-hover:text-cyan-400" />
                      </div>
                      <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Note</div>
                    </div>
                    <div className="mt-6 text-lg font-bold text-white">
                      {c.title}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                      {c.body}
                    </p>
                  </div>
                );
              })}

              {/* Work Preview Card */}
              <div
                id="work"
                data-story-in
                className="sm:col-span-2 overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 group"
              >
                <div className="relative p-6 sm:p-8">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.1),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(217,70,239,0.08),transparent_45%)]" />
                  
                  <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-lg font-bold text-white">
                        Work section starter
                      </div>
                      <div className="mt-1 text-sm text-zinc-400">
                        Replace this with your projects grid when the theme drops.
                      </div>
                    </div>
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-black transition-transform hover:scale-105 active:scale-95"
                    >
                      Start a project <ArrowUpRight className="size-4" />
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