// components/AuthInitializer.tsx
'use client';

import { useAuthStore } from "@/app/store/authStore";
import { useEffect } from "react";

export default function AuthInitializer() {
  const initialize = useAuthStore((state) => state.initialize);
  
  useEffect(() => {
    initialize();
  }, [initialize]);
  
  return null;
}