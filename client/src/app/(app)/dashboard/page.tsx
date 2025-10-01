"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight,
  Award,
  TrendingUp,
  PieChart,
  Users,
  Star,
  Zap,
  Wallet,
} from "lucide-react";
import { useAuthStore } from "@/app/store/authStore";

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);

  // Use default/fallback values if user or fields are missing
  const username = user?.username || "User";
  const avatarInitial = username.charAt(0).toUpperCase();
  const league = user?.league || "silver";
  const isVerified = user?.isVerified;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-5">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Dripy
          </h1>
          <p className="text-sm text-indigo-500/80 mt-1">
            Welcome back, {username}! 🚀
          </p>
        </div>
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200"
        >
          {avatarInitial}
        </motion.div>
      </motion.header>

      {/* Balance Card */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative p-6 rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 text-white shadow-xl mb-8 overflow-hidden"
      >
        <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-white/5 blur-2xl"></div>
        <div className="absolute right-20 top-10 w-20 h-20 rounded-full bg-white/5 blur-xl"></div>

        <div className="relative z-10">
          <p className="text-sm opacity-90 font-medium">Total Balance</p>
          <div className="flex items-end justify-between mt-2">
            <div>
              {/* Placeholder values for now */}
              <h2 className="text-4xl font-extrabold tracking-tight">
                1,250 <span className="text-lg font-semibold">DP</span>
              </h2>
              <p className="text-indigo-100/90 mt-1">≈ $12.50</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white/20 p-3 rounded-xl backdrop-blur-md shadow-inner"
            >
              <ArrowUpRight className="text-white w-6 h-6" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-5 mb-8">
        {/* League Card */}
        <motion.div
          whileHover={{ y: -6 }}
          className="bg-white p-5 rounded-2xl shadow-sm border border-indigo-100/50 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">League</h3>
            <Award className="text-amber-500 w-5 h-5" />
          </div>
          <p className="font-bold text-indigo-900">
            {league.charAt(0).toUpperCase() + league.slice(1)}
          </p>
          <div className="w-full bg-gray-100 h-2 rounded-full mt-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "60%" }} // still placeholder
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-gradient-to-r from-amber-400 to-amber-500 h-2 rounded-full"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">60% to Gold</p>
        </motion.div>

        {/* Streak Card (placeholder) */}
        <motion.div
          whileHover={{ y: -6 }}
          className="bg-white p-5 rounded-2xl shadow-sm border border-indigo-100/50 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Streak</h3>
            <Zap className="text-amber-500 w-5 h-5" />
          </div>
          <div className="flex items-end">
            <p className="font-bold text-indigo-900 text-xl">5</p>
            <span className="text-sm text-gray-500 ml-1">days</span>
          </div>
          <div className="flex mt-2">
            {[1, 2, 3, 4, 5].map((day) => (
              <motion.div
                key={day}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: day * 0.1, type: "spring" }}
                className="w-4 h-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 mr-1 shadow-sm"
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Stats (placeholder) */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-sm p-5 mb-8 border border-indigo-100/50 hover:shadow-md transition-all"
      >
        <h2 className="font-bold text-lg text-indigo-900 mb-4 flex items-center">
          <TrendingUp className="mr-2 w-5 h-5 text-indigo-600" /> Today's Stats
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-xl">
            <p className="text-xs text-indigo-700 font-medium">Earned Today</p>
            <p className="font-bold text-indigo-900">
              200 <span className="text-sm">DP</span>
            </p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl">
            <p className="text-xs text-amber-700 font-medium">
              Tasks Completed
            </p>
            <p className="font-bold text-amber-900">4</p>
          </div>
        </div>
      </motion.section>

      {/* Navigation Grid */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-2 gap-5 mb-16"
      >
        {[
          {
            href: "/tasks",
            label: "Tasks",
            icon: <PieChart className="w-5 h-5 text-indigo-600" />,
            color: "bg-indigo-500",
          },
          {
            href: "/wallet",
            label: "Wallet",
            icon: <Wallet className="w-5 h-5 text-emerald-600" />,
            color: "bg-emerald-500",
          },
          {
            href: "/referrals",
            label: "Referrals",
            icon: <Users className="w-5 h-5 text-amber-600" />,
            color: "bg-amber-500",
          },
          {
            href: "/leaderboard",
            label: "Leaderboard",
            icon: <Star className="w-5 h-5 text-purple-600" />,
            color: "bg-purple-500",
          },
          {
            href: "/profile",
            label: "Profile",
            icon: <Award className="w-5 h-5 text-rose-600" />,
            color: "bg-rose-500",
            colSpan: true,
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.97 }}
            className={`${item.colSpan ? "col-span-2" : ""}`}
          >
            <Link href={item.href}>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-indigo-100/50 flex items-center justify-between hover:shadow-md transition-all group">
                <div className="flex items-center">
                  <div
                    className={`p-3 rounded-xl ${item.color.replace(
                      "500",
                      "100"
                    )} group-hover:opacity-90 transition-opacity`}
                  >
                    {item.icon}
                  </div>
                  <span className="font-medium text-gray-700 ml-4">
                    {item.label}
                  </span>
                </div>
                <ArrowUpRight className="text-gray-400 w-4 h-4 group-hover:text-indigo-500 transition-colors" />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.nav>

      {/* Floating Action Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed bottom-6 right-6 z-10"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-300 flex items-center justify-center text-white hover:shadow-xl transition-shadow"
        >
          <Zap className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </div>
  );
}
