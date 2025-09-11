import About from "@/app/components/public/About";
import CTA from "@/app/components/public/CTA";
import Contact from "@/app/components/public/Contact";
import Footer from "@/app/components/public/Footer";
import Hero from "@/app/components/public/Hero";
import HowItWorks from "@/app/components/public/HowItWorks";
import Navbar from "@/app/components/public/Navbar";
import Testimonials from "@/app/components/public/Testimonies";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-gray-950 via-gray-900  to-black text-white scroll-smooth">
      <Navbar />
      <Hero />
      <About />
      <Testimonials />
      <HowItWorks />
      <CTA />
      <Contact />
      <Footer />
    </div>
  );
}
