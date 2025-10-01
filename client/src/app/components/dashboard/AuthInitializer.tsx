"use client";
import { useAuthStore } from "@/app/store/authStore";
import { useEffect, useState } from "react";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const loadUser = useAuthStore((state) => state.loadUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser().finally(() => setLoading(false));
  }, [loadUser]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );

  return <>{children}</>;
}
