'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/authStore";

interface GuardOptions {
  adminOnly?: boolean;
  redirectIfAuthenticated?: boolean;
  redirectPath?: string;
}

export function useAuthGuard({
  adminOnly = false,
  redirectIfAuthenticated = false,
  redirectPath = "/login",
}: GuardOptions = {}) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!user && !isAuthenticated) return; // wait until loadUser runs

    if (redirectIfAuthenticated && isAuthenticated) {
      router.replace(user?.role === "admin" ? "/admin" : "/dashboard");
    }

    if (adminOnly && user?.role !== "admin") {
      router.replace("/dashboard");
    }

    if (!redirectIfAuthenticated && !isAuthenticated) {
      router.replace("/login");
    }
  }, [user, isAuthenticated, router, adminOnly, redirectIfAuthenticated]);
}
