"use client";

import { useState } from "react";
import Link from "next/link";

export default function Hero() {
  const [form, setForm] = useState({
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

  return (
    <div className="relative flex-1 flex items-center justify-center overflow-hidden pt-24">
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500 rounded-full mix-blend-soft-light filter blur-3xl"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-400 rounded-full mix-blend-soft-light filter blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-cyan-300 rounded-full mix-blend-soft-light filter blur-3xl"></div>
      </div>

      {/* Hero */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl px-6 lg:px-12">
        {/* Left */}
        <div className="max-w-2xl mb-12 lg:mb-0">
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Level Up <span className="text-cyan-400">Your Earnings</span>,<br />
            Unlock <span className="text-cyan-400">Rewards</span>
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Complete tasks, climb through leagues, and earn more with our unique gamified platform.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8 max-w-md">
            {[
              { label: "Leagues", value: "5" },
              { label: "Max Multiplier", value: "2.5x" },
              { label: "Task Types", value: "10+" },
              { label: "Earning Potential", value: "∞" },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/10 rounded-lg p-4 border border-cyan-400/20">
                <div className="text-2xl font-bold text-cyan-400">{stat.value}</div>
                <div className="text-sm text-white">{stat.label}</div>
              </div>
            ))}
          </div>
          <Link href="#features" className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition">
            Learn More
          </Link>
        </div>

        {/* Right: Register */}
        <div className="w-full max-w-md bg-gray-800/80 p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Create Your Account</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-cyan-500" required />
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-cyan-500" required />
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-cyan-500" required />
            <input type="password" name="confirm" placeholder="Confirm Password" value={form.confirm} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-cyan-500" required />
            <button type="submit" className="w-full py-3 rounded-xl bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition">Sign Up</button>
          </form>
          <p className="mt-6 text-center text-gray-400 text-sm">
            Already have an account? <Link href="/login" className="text-cyan-400 hover:underline">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
