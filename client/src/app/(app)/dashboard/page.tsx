'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Award, TrendingUp, PieChart, Users, Star, Zap, Wallet } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-indigo-100 p-4">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-6"
      >
        <div>
          <h1 className="text-3xl font-extrabold text-indigo-900 tracking-tight">Dripy</h1>
          <p className="text-sm text-indigo-600">Welcome back, Mark! 🚀</p>
        </div>
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className="w-11 h-11 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg"
        >
          M
        </motion.div>
      </motion.header>

      {/* Balance Card */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative p-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl mb-6 overflow-hidden backdrop-blur-lg"
      >
        <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-white/5 blur-2xl"></div>
        
        <div className="relative z-10">
          <p className="text-sm opacity-80">Total Balance</p>
          <div className="flex items-end justify-between mt-2">
            <div>
              <h2 className="text-4xl font-extrabold">1,250 <span className="text-lg">DP</span></h2>
              <p className="text-purple-200 mt-1">≈ $12.50</p>
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
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* League Card */}
        <motion.div
          whileHover={{ y: -6 }}
          className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">League</h3>
            <Award className="text-yellow-500 w-5 h-5" />
          </div>
          <p className="font-bold text-indigo-900">Silver</p>
          <div className="w-full bg-gray-100 h-2 rounded-full mt-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ duration: 1 }}
              className="bg-gradient-to-r from-amber-400 to-amber-500 h-2"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">60% to Gold</p>
        </motion.div>

        {/* Streak Card */}
        <motion.div
          whileHover={{ y: -6 }}
          className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition"
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
                transition={{ delay: day * 0.1 }}
                className="w-4 h-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 mr-1"
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Stats */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-md p-5 mb-6 border border-gray-100 hover:shadow-lg transition"
      >
        <h2 className="font-bold text-lg text-indigo-900 mb-4 flex items-center">
          <TrendingUp className="mr-2 w-5 h-5 text-indigo-600" /> Today's Stats
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-indigo-50 p-3 rounded-xl">
            <p className="text-xs text-indigo-700">Earned Today</p>
            <p className="font-bold text-indigo-900">200 <span className="text-sm">DP</span></p>
          </div>
          <div className="bg-amber-50 p-3 rounded-xl">
            <p className="text-xs text-amber-700">Tasks Completed</p>
            <p className="font-bold text-amber-900">4</p>
          </div>
        </div>
      </motion.section>

      {/* Navigation Grid */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-2 gap-4"
      >
        {[
          { href: "/tasks", label: "Tasks", icon: <PieChart className="w-5 h-5 text-indigo-600" />, color: "bg-indigo-500" },
          { href: "/wallet", label: "Wallet", icon: <Wallet className="w-5 h-5 text-emerald-600" />, color: "bg-emerald-500" },
          { href: "/referrals", label: "Referrals", icon: <Users className="w-5 h-5 text-amber-600" />, color: "bg-amber-500" },
          { href: "/leaderboard", label: "Leaderboard", icon: <Star className="w-5 h-5 text-purple-600" />, color: "bg-purple-500" },
          { href: "/profile", label: "Profile", icon: <Award className="w-5 h-5 text-rose-600" />, color: "bg-rose-500", colSpan: true },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.97 }}
            className={`${item.colSpan ? "col-span-2" : ""}`}
          >
            <Link href={item.href}>
              <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 flex items-center justify-between hover:shadow-lg transition">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${item.color.replace('500', '100')}`}>
                    {item.icon}
                  </div>
                  <span className="font-medium text-gray-700 ml-3">{item.label}</span>
                </div>
                <ArrowUpRight className="text-gray-400 w-4 h-4" />
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
        className="fixed bottom-6 right-6"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-2xl flex items-center justify-center text-white"
        >
          <Zap className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </div>
  );
}
