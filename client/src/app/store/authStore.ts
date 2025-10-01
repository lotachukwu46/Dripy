import api from "@/app/lib/axios";
import type { User } from "@/app/types";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  register: (data: { username: string; email: string; password: string; referredBy?: string }) => Promise<void>;
  logout: () => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post("/auth/login", { email, password });
      set({ user: data.user, isAuthenticated: true, isLoading: false });
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (err: any) {
      set({ isLoading: false, error: err?.response?.data?.error || "Login failed" });
      throw err;
    }
  },

  register: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const { data: resData } = await api.post("/auth/register", data);
      set({ user: resData.user ?? null, isAuthenticated: Boolean(resData.user), isLoading: false });
      if (resData.user) localStorage.setItem("user", JSON.stringify(resData.user));
      return resData;
    } catch (err: any) {
      set({ isLoading: false, error: err?.response?.data?.error || "Registration failed" });
      throw err;
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch (err: any) {
      console.error("Logout failed", err);
    } finally {
      set({ user: null, isAuthenticated: false });
      localStorage.removeItem("user");
    }
  },

  verifyEmail: async (token) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post("/auth/verify-email", { token });
      set({ isLoading: false });
      return data;
    } catch (err: any) {
      set({ isLoading: false, error: err?.response?.data?.error || "Verification failed" });
      throw err;
    }
  },

  loadUser: async () => {
    set({ isLoading: true });

    // Quick UI hint
    const userStr = localStorage.getItem("user");
    if (userStr) set({ user: JSON.parse(userStr), isAuthenticated: false });

    try {
      const { data } = await api.get("/auth/profile"); // uses cookie
      set({ user: data, isAuthenticated: true, isLoading: false });
      localStorage.setItem("user", JSON.stringify(data));
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false });
      localStorage.removeItem("user");
    }
  }
}));
