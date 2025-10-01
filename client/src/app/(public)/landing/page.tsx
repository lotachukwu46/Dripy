"use client";
import About from "@/app/components/public/About";
import CTA from "@/app/components/public/CTA";
import Contact from "@/app/components/public/Contact";
import Footer from "@/app/components/public/Footer";
import Hero from "@/app/components/public/Hero";
import HowItWorks from "@/app/components/public/HowItWorks";
import Navbar from "@/app/components/public/Navbar";
import Testimonials from "@/app/components/public/Testimonies";
import { useAuthStore } from "@/app/store/authStore";

export default function Home() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    window.location.href = "/dashboard";
  }

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
