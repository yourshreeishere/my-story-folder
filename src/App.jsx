import Navbar from "./Navbar.jsx";
import Story from "./Story.jsx";

export default function App() {
  return (
    <div className="min-h-dvh bg-[#07090f] text-white">
      {/* Navbar stays at the top */}
      <Navbar />

      <main>
        {/* We removed <Hero /> and <Footer /> because they are 
          now built directly into the <Story /> component!
        */}
        <Story />
      </main>
    </div>
  );
}