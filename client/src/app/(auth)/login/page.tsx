"use client";

import { useAuthStore } from "@/app/store/authStore";
import Link from "next/link";
import { useActionState } from "react";

export default function LoginPage() {
  const [state, formAction] = useActionState(
    async (prevState: any, formData: FormData) => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      try {
        await useAuthStore.getState().login(email, password);
        return { success: true };
      } catch (error) {
        return { error: "Login failed" };
      }
    },
    null
  );

  return (
    <form action={formAction} className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Sign In to Drippy</h1>
        <p className="text-gray-600 mt-2">
          Enter your credentials to access your account
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="Enter your password"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
      >
        Sign In
      </button>

      <div className="text-center">
        <Link href="/" className="text-blue-600 hover:text-blue-500">
          Create an account
        </Link>
      </div>
    </form>
  );
}
