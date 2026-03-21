import { ArrowUpRight, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="relative pb-10 pt-16 sm:pt-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-white/10 to-white/5">
          <div className="relative px-5 py-10 sm:px-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(255,255,255,0.12),transparent_42%),radial-gradient(circle_at_70%_60%,rgba(34,211,238,0.14),transparent_45%)]" />

            <div className="relative grid gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-6">
                <div className="text-sm font-semibold text-white">
                  Let’s make something memorable.
                </div>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/70">
                  Swap the links below with your real email, socials, and
                  location. Keep it simple: one clear call-to-action.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="mailto:hello@example.com"
                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
                  >
                    <Mail className="size-4" />
                    Email me
                    <ArrowUpRight className="size-4" />
                  </a>
                  <a
                    href="#top"
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                  >
                    Back to top
                    <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-black/15 p-5">
                    <div className="text-xs font-semibold text-white/80">
                      Contact
                    </div>
                    <div className="mt-3 space-y-2 text-sm text-white/70">
                      <div className="flex items-center gap-2">
                        <Mail className="size-4 text-white/60" />
                        hello@example.com
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="size-4 text-white/60" />
                        Your City, Country
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-black/15 p-5">
                    <div className="text-xs font-semibold text-white/80">
                      Social
                    </div>
                    <div className="mt-3 space-y-2 text-sm">
                      {[
                        { label: "GitHub", href: "https://github.com/" },
                        { label: "LinkedIn", href: "https://linkedin.com/" },
                        { label: "X", href: "https://x.com/" },
                      ].map((l) => (
                        <a
                          key={l.label}
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-white/70 transition hover:text-white"
                        >
                          {l.label} <ArrowUpRight className="size-4" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
              <div>© {new Date().getFullYear()} My Story</div>
              <div>Built with React + Tailwind + GSAP</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
