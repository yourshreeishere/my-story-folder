import Navbar from "./Navbar.jsx";
import Hero from "./Hero.jsx";
import Story from "./Story.jsx";
import Footer from "./Footer.jsx";

export default function App() {
  return (
    <div className="min-h-dvh bg-[#07090f] text-white">
      <Navbar />

      <main>
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_0%,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.10),transparent_42%),radial-gradient(circle_at_50%_90%,rgba(217,70,239,0.08),transparent_45%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.5),transparent_30%,rgba(0,0,0,0.7))]" />
        </div>

        <Hero />
        <Story />
        <Footer />
      </main>
    </div>
  );
}
