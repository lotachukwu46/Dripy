"use client";

import { useAuthStore } from "@/app/store/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const isLoading = useAuthStore((s) => s.isLoading);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Logging in...");

    try {
      await login(form.email.trim().toLowerCase(), form.password);
      toast.success("Login successful!", { id: toastId });
      router.push("/dashboard"); // or wherever you want to redirect
    } catch (err: any) {
      toast.error(
        err?.response?.data?.error || err?.message || "Login failed",
        {
          id: toastId,
        }
      );
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-900">
      <Toaster position="top-right" />
      <div className="w-full max-w-md bg-gray-800 rounded-2xl p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-white text-center mb-4">
          Sign In to Drippy
        </h1>
        <p className="text-gray-400 text-center mb-6">
          Enter your credentials to access your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded-lg font-bold text-white transition ${
              isLoading
                ? "bg-blue-500 opacity-70 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Logging in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Don’t have an account?{" "}
          <Link href="/" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
}
