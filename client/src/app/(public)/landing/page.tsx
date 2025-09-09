import Navbar from "@/app/components/public/Navbar";
import Hero from "@/app/components/public/Hero";
import Features from "@/app/components/public/Features";
import About from "@/app/components/public/About";
import Testimonials from "@/app/components/public/Testimonies";
import HowItWorks from "@/app/components/public/HowItWorks";
import CTA from "@/app/components/public/CTA";
import Contact from "@/app/components/public/Contact";
import Footer from "@/app/components/public/Footer";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <Navbar />
      <Hero />
      <Features />
      <About />
      <Testimonials />
      <HowItWorks />
      <CTA />
      <Contact />
      <Footer />
    </div>
  );
}
