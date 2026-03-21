import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowDown, Sparkles } from "lucide-react";

export default function Hero() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-item]",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.08 }
      );
      gsap.to("[data-orb]", {
        y: -12,
        duration: 2.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.25,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative overflow-hidden pt-10 sm:pt-14"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 size-[420px] rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute -right-24 top-20 size-[520px] rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute inset-x-0 bottom-[-180px] mx-auto h-[520px] max-w-6xl rounded-[48px] bg-gradient-to-tr from-white/5 via-white/0 to-white/5 blur-2xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div
              data-hero-item
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80"
            >
              <Sparkles className="size-4 text-white/80" />
              Modern, clean, motion-first starter
            </div>

            <h1
              data-hero-item
              className="mt-5 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl"
            >
              A story-driven portfolio that feels crafted, not templated.
            </h1>

            <p
              data-hero-item
              className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-white/70"
            >
              Use this as your “Awwwards-style” foundation: strong typography,
              tasteful glass UI, and subtle GSAP motion—ready to evolve into your
              personal brand.
            </p>

            <div data-hero-item className="mt-7 flex flex-wrap gap-3">
              <a
                href="#work"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Explore work
              </a>
              <a
                href="#story"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
              >
                Read the story
              </a>
            </div>

            <div
              data-hero-item
              className="mt-10 flex items-center gap-2 text-xs text-white/50"
            >
              <ArrowDown className="size-4" />
              Scroll for the narrative
            </div>
          </div>

          <div className="lg:col-span-5">
            <div
              data-hero-item
              className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-5"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(34,211,238,0.20),transparent_40%),radial-gradient(circle_at_60%_90%,rgba(217,70,239,0.16),transparent_45%)]" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-white">
                    Snapshot
                  </div>
                  <div className="text-xs text-white/60">2026</div>
                </div>

                <div className="mt-4 grid gap-3">
                  {[
                    { k: "Focus", v: "Design-engineering" },
                    { k: "Tools", v: "React • Tailwind • GSAP" },
                    { k: "Vibe", v: "Editorial • Minimal • Bold" },
                  ].map((row) => (
                    <div
                      key={row.k}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                    >
                      <div className="text-xs text-white/60">{row.k}</div>
                      <div className="text-xs font-semibold text-white/90">
                        {row.v}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  {["A", "W", "W"].map((t, i) => (
                    <div
                      key={`${t}-${i}`}
                      data-orb
                      className="grid aspect-square place-items-center rounded-2xl border border-white/10 bg-white/5 text-lg font-semibold text-white/90"
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
