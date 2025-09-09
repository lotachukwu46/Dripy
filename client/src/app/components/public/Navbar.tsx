"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md border-b border-gray-800">
      <div className="flex items-center justify-between px-6 py-4 lg:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="Dripy Logo" width={50} height={50} />
          <span className="text-xl font-bold text-cyan-400">Dripy</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 text-gray-300 font-medium">
          <Link href="#features" className="hover:text-cyan-400">Features</Link>
          <Link href="#about" className="hover:text-cyan-400">About</Link>
          <Link href="#testimonials" className="hover:text-cyan-400">Testimonials</Link>
          <Link href="#how" className="hover:text-cyan-400">How It Works</Link>
          <Link href="#contact" className="hover:text-cyan-400">Contact</Link>
          <Link
            href="/login"
            className="px-4 py-2 bg-cyan-500 rounded-lg text-black font-semibold hover:bg-cyan-400 transition"
          >
            Log In
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span
            className={`absolute h-0.5 w-6 bg-cyan-400 rounded transition-transform duration-300 ${
              isMenuOpen ? "rotate-45" : "-translate-y-2"
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-cyan-400 rounded transition-opacity duration-300 ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-cyan-400 rounded transition-transform duration-300 ${
              isMenuOpen ? "-rotate-45" : "translate-y-2"
            }`}
          />
        </button>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* Mobile Glassy Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 transform transition-transform duration-300 md:hidden
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full p-6 bg-white/10 backdrop-blur-xl border-l border-white/20 shadow-lg">
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
              <Image src="/logo.png" alt="Dripy Logo" width={40} height={40} />
              <span className="text-lg font-bold text-cyan-400">Dripy</span>
            </Link>
            <button
              onClick={closeMenu}
              className="text-gray-300 hover:text-cyan-400 text-3xl"
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col space-y-6 text-gray-200 font-medium">
            <Link href="#features" className="hover:text-cyan-400" onClick={closeMenu}>Features</Link>
            <Link href="#about" className="hover:text-cyan-400" onClick={closeMenu}>About</Link>
            <Link href="#testimonials" className="hover:text-cyan-400" onClick={closeMenu}>Testimonials</Link>
            <Link href="#how" className="hover:text-cyan-400" onClick={closeMenu}>How It Works</Link>
            <Link href="#contact" className="hover:text-cyan-400" onClick={closeMenu}>Contact</Link>
          </nav>

          {/* Footer */}
          <div className="mt-auto pt-8 border-t border-white/20">
            <Link
              href="/login"
              className="w-full px-4 py-3 bg-cyan-500/80 backdrop-blur-md rounded-lg text-black font-semibold hover:bg-cyan-400 transition text-center block"
              onClick={closeMenu}
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
