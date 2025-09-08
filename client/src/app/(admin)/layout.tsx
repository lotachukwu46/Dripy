"use client";

import { useAuthStore } from "@/app/store/authStore";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      redirect("/login");
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className="w-64 bg-white shadow-lg">
          {/* Sidebar content */}
          <nav className="p-4">
            <h2 className="text-lg font-semibold mb-4">Drippy</h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="/dashboard"
                  className="block py-2 px-3 rounded hover:bg-gray-100"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/tasks"
                  className="block py-2 px-3 rounded hover:bg-gray-100"
                >
                  Tasks
                </a>
              </li>
              <li>
                <a
                  href="/wallet"
                  className="block py-2 px-3 rounded hover:bg-gray-100"
                >
                  Wallet
                </a>
              </li>
              <li>
                <a
                  href="/profile"
                  className="block py-2 px-3 rounded hover:bg-gray-100"
                >
                  Profile
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
