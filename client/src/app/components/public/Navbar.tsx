"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const navLinks = ["Features", "About", "Testimonials", "How", "Contact"];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled || isMenuOpen
            ? "bg-[var(--color-background)]/10 backdrop-blur-lg border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-gray-700/80 p-1.5 rounded-lg border border-white/10">
              <Image
                src="/slogo.png"
                alt="Drippy Logo"
                width={40}
                height={40}
                priority
              />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-[var(--color-primary)] drop-shadow">
              Drippy
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 text-gray-300 font-medium items-center">
            {navLinks.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
                className="hover:text-[var(--color-primary)] transition-colors"
              >
                {item}
              </Link>
            ))}
            <Link
              href="/login"
              className="px-4 py-2 bg-[var(--color-primary)] rounded-lg text-[var(--color-primary-foreground)] font-semibold hover:opacity-90 shadow-md hover:shadow-lg hover:scale-105 transition-all"
            >
              Log In
            </Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 relative group p-2 bg-white/10 rounded-lg border border-white/10"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span
              className={`absolute h-0.5 w-7 bg-[var(--color-primary)] rounded transition-all duration-300 ${
                isMenuOpen
                  ? "rotate-45"
                  : "-translate-y-2 group-hover:-translate-y-2.5"
              }`}
            />
            <span
              className={`absolute h-0.5 w-7 bg-[var(--color-primary)] rounded transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute h-0.5 w-7 bg-[var(--color-primary)] rounded transition-all duration-300 ${
                isMenuOpen
                  ? "-rotate-45"
                  : "translate-y-2 group-hover:translate-y-2.5"
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu + Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Glassy Page Blur Overlay */}
              <motion.div
                key="page-blur"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/30 backdrop-blur-xl z-40 md:hidden"
                onClick={() => setIsMenuOpen(false)}
              />

              {/* Slide-in Menu */}
              <motion.div
                key="menu"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 80, damping: 18 }}
                className="fixed top-0 right-0 h-full w-72 bg-gray-900/95 backdrop-blur-2xl border-l border-white/20 shadow-2xl p-6 flex flex-col z-50 md:hidden"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                  <Link
                    href="/"
                    className="flex items-center space-x-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Image
                      src="/slogo.png"
                      alt="Drippy Logo"
                      width={36}
                      height={36}
                    />
                    <span className="text-lg font-bold text-[var(--color-primary)]">
                      Drippy
                    </span>
                  </Link>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Close menu"
                    className="text-gray-300 hover:text-[var(--color-primary)] text-2xl bg-white/10 rounded-full w-8 h-8 flex items-center justify-center border border-white/10 hover:scale-110 transition"
                  >
                    ×
                  </button>
                </div>

                {/* Links */}
                <nav className="flex flex-col space-y-4 text-gray-200 font-medium">
                  {navLinks.map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + 0.2 }}
                    >
                      <Link
                        href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
                        className="block py-3 border-b border-white/10 hover:text-[var(--color-primary)] transition-all pl-2 hover:pl-4"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Login Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-auto pt-6 border-t border-white/20"
                >
                  <Link
                    href="/login"
                    className="w-full px-4 py-3 bg-[var(--color-primary)] rounded-lg text-[var(--color-primary-foreground)] font-semibold text-center block hover:opacity-90 hover:scale-[1.02] transition-all shadow-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Log In
                  </Link>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* Additional blur effect for the entire page content */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-md bg-black/20 z-30 pointer-events-none md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
