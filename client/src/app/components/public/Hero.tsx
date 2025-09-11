"use client";

import Link from "next/link";
import { useState } from "react";

type FormFields = {
  username: string;
  email: string;
  password: string;
  confirm: string;
};

export default function Hero() {
  const [form, setForm] = useState<FormFields>({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register form submitted:", form);
  };

  // Input config for mapping
  const inputs: {
    name: keyof FormFields;
    type: "text" | "email" | "password";
    placeholder: string;
  }[] = [
    { name: "username", type: "text", placeholder: "Username" },
    { name: "email", type: "email", placeholder: "Email" },
    { name: "password", type: "password", placeholder: "Password" },
    { name: "confirm", type: "password", placeholder: "Confirm Password" },
  ];

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center min-h-screen overflow-hidden pt-3"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-10 w-64 h-64 md:w-72 md:h-72 bg-[var(--color-primary)]/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/4 right-10 w-80 h-80 md:w-96 md:h-96 bg-[var(--color-primary)]/15 rounded-full blur-3xl animate-pulse-medium"></div>
        <div className="absolute bottom-10 left-1/4 w-64 h-64 md:w-80 md:h-80 bg-[var(--color-primary)]/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl px-4 sm:px-6 lg:px-12 gap-10 py-16">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-medium animate-fade-in">
            🚀 Join thousands earning daily
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            Earn{" "}
            <span className="bg-gradient-to-r from-[var(--color-primary)] to-pink-500 bg-clip-text text-transparent">
              Real Cash
            </span>{" "}
            Completing Simple Tasks
          </h1>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0">
            Complete offers, play games, and take surveys to earn money and
            rewards. Join over{" "}
            <span className="text-white font-semibold">2 million users</span>{" "}
            already cashing out.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {[
              { label: "Total Payouts", value: "₦45M+" },
              { label: "Users", value: "2M+" },
              { label: "Offers", value: "500+" },
              { label: "Rating", value: "4.8/5" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-[var(--color-primary)]/40 transition-all hover:scale-105"
              >
                <div className="text-2xl font-bold text-[var(--color-primary)]">
                  {stat.value}
                </div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Trust + Platforms */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mt-8">
            <div className="bg-black/40 rounded-xl p-4 border border-white/10 hover:border-[var(--color-primary)]/30 transition-all">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)] flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <div className="text-xs text-white/70">TrustPilot</div>
                  <div className="text-white font-semibold">
                    Excellent 4.8/5
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="bg-black/40 hover:bg-black/70 border border-white/10 rounded-lg p-3 transition-colors">
                <span className="text-xl">📱</span>
              </button>
              <button className="bg-black/40 hover:bg-black/70 border border-white/10 rounded-lg p-3 transition-colors">
                <span className="text-xl">🖥️</span>
              </button>
            </div>
          </div>
        </div>

        {/* Signup Form */}
        <div className="w-full lg:w-1/2 max-w-md bg-gray-900/80 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/10 animate-fade-up">
          <h2 className="text-2xl font-bold mb-2 text-center text-white">
            Start Earning Now
          </h2>
          <p className="text-gray-400 text-center mb-6">
            Sign up now and get{" "}
            <span className="text-[var(--color-primary)] font-semibold">
              $5 bonus
            </span>{" "}
            instantly!
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {inputs.map((input) => (
              <div key={input.name}>
                <input
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeholder}
                  value={form[input.name] ?? ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/70 border border-gray-700 
                             focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent 
                             placeholder-gray-400 text-white transition-all"
                  required
                />
              </div>
            ))}

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="mr-2 rounded focus:ring-[var(--color-primary)]"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-300">
                I agree to the Terms and Privacy Policy
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-bold hover:opacity-90 transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]"
            >
              Create Account & Start Earning
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900/80 text-gray-400">
                Or sign up with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {["Google", "Facebook"].map((provider) => (
              <button
                key={provider}
                className="py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <span>{provider}</span>
              </button>
            ))}
          </div>

          <p className="mt-6 text-center text-gray-400 text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[var(--color-primary)] hover:underline font-medium"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
