import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import LightControl from "@/components/LightControl";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Premium Luxury Header navigation */}
      <Navbar />

      {/* Main Layout Experience */}
      <main className="flex-grow">
        {/* Fullscreen cinematic video intro */}
        <Hero />

        {/* Brand identity concept */}
        <About />

        {/* Asymmetrical premium catalog */}
        <Services />

        {/* Architectural masonry photo gallery */}
        <Gallery />

        {/* Interactive sunlight-transformation slider */}
        <LightControl />

        {/* Modern high-end review deck */}
        <Testimonials />

        {/* Final cinematic conversion block */}
        <FinalCTA />
      </main>

      {/* Structured contact footer */}
      <Footer />
    </>
  );
}
