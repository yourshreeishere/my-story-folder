import { ArrowUpRight, ShieldCheck, Database, HardDrive } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-black pb-12 pt-24 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-12 items-end">
          <div className="lg:col-span-7">
            <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-cyan-500 mb-6">Exploration Complete</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-[0.85]">
              Data Saved to <br/> <span className="text-zinc-700">The Archive.</span>
            </h2>
            <div className="mt-10 flex flex-wrap gap-4">
               <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-3">
                  <Database className="size-4 text-cyan-500" />
                  <span className="text-xs font-bold text-white uppercase tracking-widest">11,000m Logged</span>
               </div>
               <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-3">
                  <ShieldCheck className="size-4 text-green-500" />
                  <span className="text-xs font-bold text-white uppercase tracking-widest">Secure Entry</span>
               </div>
            </div>
          </div>

          <div className="lg:col-span-5 text-left lg:text-right">
             <div className="space-y-6">
                <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Access Portals</div>
                <div className="flex flex-col gap-4">
                  {['GITHUB_CORE', 'SYSTEM_ARCHITECTURE', 'MISSION_LOG'].map((link) => (
                    <a key={link} href="#" className="text-xl font-bold text-white hover:text-cyan-400 transition-colors flex items-center gap-2 lg:justify-end">
                      {link} <ArrowUpRight className="size-5 text-cyan-500" />
                    </a>
                  ))}
                </div>
             </div>
          </div>
        </div>

        <div className="mt-24 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
             <div className="size-8 rounded-lg bg-white/5 border border-white/10 grid place-items-center">
                <HardDrive className="size-4 text-zinc-500" />
             </div>
             <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                Operator: Schrödinger's Coders
             </div>
          </div>
          <div className="text-[10px] font-mono text-zinc-800 uppercase tracking-widest">
            Established 2026 // Hadal Zone V.1
          </div>
        </div>
      </div>
    </footer>
  );
}