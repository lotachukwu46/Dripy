"use client";

import { useAuthStore } from "@/app/store/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

// ----------------------
// Types
// ----------------------
type FormFields = {
  username: string;
  email: string;
  password: string;
  confirm: string;
  referredBy?: string;
};

// ----------------------
// SignupForm (top-level)
// ----------------------
function SignupForm() {
  const router = useRouter();
  const register = useAuthStore((s) => s.register);
  const isLoading = useAuthStore((s) => s.isLoading);

  const [form, setForm] = useState<FormFields>({
    username: "",
    email: "",
    password: "",
    confirm: "",
    referredBy: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirm)
      return toast.error("Passwords do not match");
    if (!form.username.trim() || !form.email.trim() || !form.password)
      return toast.error("Username, email, and password are required");

    const toastId = toast.loading("Creating account...");
    try {
      await register({
        username: form.username.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        referredBy: form.referredBy?.trim().toUpperCase(),
      });

      toast.success("Account created! Check your email to verify.", {
        id: toastId,
      });
      router.push("/verify-email");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.error || err?.message || "Registration failed",
        { id: toastId }
      );
    }
  };

  return (
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
        {["username", "email", "password", "confirm", "referredBy"].map(
          (name) => (
            <div key={name}>
              <input
                type={
                  name.includes("password")
                    ? "password"
                    : name === "email"
                    ? "email"
                    : "text"
                }
                name={name}
                placeholder={
                  name === "referredBy"
                    ? "Referral Code (optional)"
                    : name.charAt(0).toUpperCase() + name.slice(1)
                }
                value={form[name as keyof FormFields]}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-800/70 border border-gray-700 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent placeholder-gray-400 text-white transition-all"
                required={name !== "referredBy"}
              />
            </div>
          )
        )}

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
          disabled={isLoading}
          className={`w-full py-3.5 rounded-xl text-[var(--color-primary-foreground)] font-bold transition-all transform hover:-translate-y-0.5 shadow-lg ${
            isLoading
              ? "opacity-70 cursor-not-allowed bg-[var(--color-primary)]"
              : "bg-[var(--color-primary)] hover:opacity-90"
          }`}
        >
          {isLoading ? "Creating account..." : "Create Account & Start Earning"}
        </button>
      </form>

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
  );
}

// ----------------------
// Hero (main)
// ----------------------
export default function Hero() {
  const BackgroundVisuals = () => (
    <div className="absolute inset-0 z-0">
      <div className="absolute top-10 left-10 w-64 h-64 md:w-72 md:h-72 bg-[var(--color-primary)]/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute top-1/4 right-10 w-80 h-80 md:w-96 md:h-96 bg-[var(--color-primary)]/15 rounded-full blur-3xl animate-pulse-medium"></div>
      <div className="absolute bottom-10 left-1/4 w-64 h-64 md:w-80 md:h-80 bg-[var(--color-primary)]/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none"></div>
    </div>
  );

  const StatsCard = ({ label, value }: { label: string; value: string }) => (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-[var(--color-primary)]/40 transition-all hover:scale-105">
      <div className="text-2xl font-bold text-[var(--color-primary)]">
        {value}
      </div>
      <div className="text-sm text-white/70">{label}</div>
    </div>
  );

  const LeftContent = () => (
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
        Complete offers, play games, and take surveys to earn money and rewards.
        Join over{" "}
        <span className="text-white font-semibold">2 million users</span>{" "}
        already cashing out.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
        {[
          { label: "Total Payouts", value: "₦450M+" },
          { label: "Users", value: "1.6M+" },
          { label: "Offers", value: "5000+" },
          { label: "Rating", value: "4.8/5" },
        ].map((stat, idx) => (
          <StatsCard key={idx} {...stat} />
        ))}
      </div>
    </div>
  );

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center min-h-screen overflow-hidden pt-3"
    >
      <Toaster position="top-right" />
      <BackgroundVisuals />
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl px-4 sm:px-6 lg:px-12 gap-10 py-16">
        <LeftContent />
        <SignupForm />
      </div>
    </section>
  );
}
