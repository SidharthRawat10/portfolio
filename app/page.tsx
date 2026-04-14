import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import Portfolio from "@/components/Portfolio";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <main className="relative w-full selection:bg-white selection:text-black z-0">
      <Navbar />
      
      {/* Container for the sticky scroll section */}
      <div className="relative h-[500vh]">
        <ScrollyCanvas />
        <Overlay />
      </div>
      
      {/* Projects grid appears after scrolling past 500vh */}
      <Projects />

      {/* Core Skills Section */}
      <Skills />

      {/* 5-Slide Portfolio Section */}
      <Portfolio />

      <Footer />
    </main>
  );
}
