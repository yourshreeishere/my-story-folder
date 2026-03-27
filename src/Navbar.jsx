import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowUpRight, Menu, X } from "lucide-react";

// ─── External link targets ────────────────────────────────────────────────────
const LINKS = {
  work:     { href: "https://github.com/yourshreeishere/my-story-folder", external: true },
  contact:  { href: "mailto:bobdevedshree59@gmail.com",                   external: false },
  letsTalk: { href: "https://www.linkedin.com/in/vedshree-bobde-836150319", external: true },
};

export default function Navbar() {
  const rootRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-nav-anim]",
        { y: -18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.06 }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <header ref={rootRef} className="sticky top-0 z-50">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 to-transparent" />
      <div className="mx-auto max-w-6xl px-4">
        <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">

          {/* ── Desktop row ── */}
          <div className="flex items-center justify-between px-4 py-3 sm:px-5">

            {/* Logo */}
            <a data-nav-anim href="#top" className="group inline-flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10">
                <span className="size-2.5 rounded-full bg-white" />
              </span>
              <div className="leading-tight">
                <div className="text-sm font-semibold tracking-tight text-white">My Story</div>
                <div className="text-xs text-white/60">A personal portfolio</div>
              </div>
            </a>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 sm:flex">
              {/* Story → smooth scroll to #story section */}
              <a
                data-nav-anim
                href="#story"
                className="rounded-xl px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                Story
              </a>

              {/* Work → GitHub (external) */}
              <a
                data-nav-anim
                href={LINKS.work.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                Work
              </a>

              {/* Contact → mailto */}
              <a
                data-nav-anim
                href={LINKS.contact.href}
                className="rounded-xl px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                Contact
              </a>

              {/* Let's Talk → LinkedIn (external) */}
              <a
                data-nav-anim
                href={LINKS.letsTalk.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Let's talk <ArrowUpRight className="size-4" />
              </a>
            </nav>

            {/* Mobile hamburger */}
            <button
              data-nav-anim
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 text-white/80 transition hover:bg-white/10 sm:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>

          {/* ── Mobile drawer ── */}
          <div className={["sm:hidden", open ? "grid" : "hidden", "border-t border-white/10 px-4 py-3"].join(" ")}>

            <a href="#story"
              className="rounded-xl px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
              onClick={() => setOpen(false)}>
              Story
            </a>

            {/* Work → GitHub */}
            <a
              href={LINKS.work.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
              onClick={() => setOpen(false)}
            >
              Work
            </a>

            {/* Contact → mailto */}
            <a
              href={LINKS.contact.href}
              className="rounded-xl px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
              onClick={() => setOpen(false)}
            >
              Contact
            </a>

            {/* Let's Talk → LinkedIn */}
            <a
              href={LINKS.letsTalk.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
              onClick={() => setOpen(false)}
            >
              Let's talk <ArrowUpRight className="size-4" />
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}
