'use client';

import { useAuthStore } from "@/app/store/authStore";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  Home, 
  ClipboardList, 
  Wallet, 
  User, 
  Trophy, 
  Users, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  Zap,
  PieChart
} from 'lucide-react';

// BottomNav Component for mobile
function BottomNav() {
  const pathname = usePathname();
  
  const navigationItems = [
    { href: "/dashboard", label: "Dashboard", icon: <PieChart className="w-5 h-5" /> },
    { href: "/tasks", label: "Tasks", icon: <ClipboardList className="w-5 h-5" /> },
    { href: "/wallet", label: "Wallet", icon: <Wallet className="w-5 h-5" /> },
    { href: "/profile", label: "Profile", icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-indigo-100/50 z-30">
      <div className="grid grid-cols-4 gap-1 p-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                isActive ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600'
              }`}
            >
              <div className={`${isActive ? 'text-indigo-600' : 'text-gray-400'}`}>
                {item.icon}
              </div>
              <span className="text-xs mt-1">{item.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout, user, isLoading } = useAuthStore();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Check if we're still loading auth state
    if (isLoading) {
      return;
    }
    
    // If not authenticated after loading, redirect to login
    if (!isAuthenticated) {
      <a href="/{navigationItems}"></a>
    } else {
      // If authenticated, allow access to the page
      setIsCheckingAuth(false);
    }
  }, [isAuthenticated, isLoading, pathname]);

  const navigationItems = [
    { href: "/dashboard", label: "Dashboard", icon: <PieChart className="w-5 h-5" /> },
    { href: "/tasks", label: "Tasks", icon: <ClipboardList className="w-5 h-5" /> },
    { href: "/wallet", label: "Wallet", icon: <Wallet className="w-5 h-5" /> },
    { href: "/leaderboard", label: "Leaderboard", icon: <Trophy className="w-5 h-5" /> },
    { href: "/referrals", label: "Referrals", icon: <Users className="w-5 h-5" /> },
    { href: "/profile", label: "Profile", icon: <User className="w-5 h-5" /> },
  ];

  const handleLogout = () => {
    logout();
    redirect("/login");
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Desktop Sidebar (hidden on mobile) */}
      <div className="hidden md:flex fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-indigo-600 to-purple-600 text-white flex-col justify-between flex-shrink-0">
        <div>
          {/* Logo */}
          <div className="p-6 border-b border-indigo-500/30">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">Dripy</h1>
            </div>
            <p className="text-indigo-200 text-sm mt-1">Welcome back, {user?.name || 'User'}!</p>
          </div>

          {/* Navigation */}
          <nav className="p-4">
            <ul className="space-y-1">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={`flex items-center px-4 py-3 rounded-xl transition-all ${
                        isActive 
                          ? 'bg-white/20 text-white shadow-lg' 
                          : 'text-indigo-100 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span className={`mr-3 ${isActive ? 'text-white' : 'text-indigo-200'}`}>
                        {item.icon}
                      </span>
                      <span className="font-medium">{item.label}</span>
                      {isActive && (
                        <ChevronRight className="w-4 h-4 ml-auto text-white" />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-indigo-500/30">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-indigo-100 hover:bg-white/10 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Header (hidden on desktop) */}
      <div className="md:hidden sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-indigo-100/50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg bg-indigo-100 text-indigo-600 mr-3"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Dripy
            </h1>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
            {user?.name?.charAt(0) || 'U'}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div className={`md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-indigo-600 to-purple-600 text-white transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-indigo-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">Dripy</h1>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg bg-white/20 text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-indigo-200 text-sm mt-1">Welcome back, {user?.name || 'User'}!</p>
        </div>

        <nav className="p-4">
          <ul className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`flex items-center px-4 py-3 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-white/20 text-white shadow-lg' 
                        : 'text-indigo-100 hover:bg-white/10 hover:text-white'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className={`mr-3 ${isActive ? 'text-white' : 'text-indigo-200'}`}>
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <ChevronRight className="w-4 h-4 ml-auto text-white" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-indigo-500/30">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-indigo-100 hover:bg-white/10 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto md:ml-64">
        <div className="p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>

      {/* Bottom Navigation - Only on mobile */}
      <BottomNav />
    </div>
  );
}