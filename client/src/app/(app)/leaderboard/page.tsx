'use client';

import { motion } from 'framer-motion';
import { Crown, Trophy, Award, Star, ChevronUp, User } from 'lucide-react';

const sampleData = [
  { id: 1, name: "Alice", dp: 5000, league: "Platinum" },
  { id: 2, name: "Bob", dp: 4200, league: "Diamond" },
  { id: 3, name: "You", dp: 3900, league: "Gold" },
  { id: 4, name: "Chris", dp: 3200, league: "Gold" },
  { id: 5, name: "Daniel", dp: 2500, league: "Silver" },
  { id: 6, name: "Emma", dp: 2100, league: "Silver" },
  { id: 7, name: "Frank", dp: 1800, league: "Bronze" },
  { id: 8, name: "Grace", dp: 1500, league: "Bronze" },
];

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-5">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <div className="flex items-center justify-center mb-2">
          <div className="relative">
            <Trophy className="w-10 h-10 text-amber-500" />
            <Star className="absolute -top-1 -right-1 w-5 h-5 text-yellow-300 fill-yellow-300" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent ml-2">
            Leaderboard
          </h1>
        </div>
        <p className="text-indigo-500/80 text-sm">Climb the ranks and earn rewards</p>
      </motion.header>

      {/* Top 3 Winners */}
      <div className="flex justify-center items-end gap-3 mb-8">
        {/* 2nd Place */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center w-1/4"
        >
          <div className="relative mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-400 to-gray-300 flex items-center justify-center text-white font-bold text-lg shadow-md">
              2
            </div>
            <Award className="absolute -top-1 -right-1 w-5 h-5 text-silver-500" />
          </div>
          <div className="bg-white p-3 rounded-2xl shadow-sm w-full text-center border border-indigo-100/50">
            <p className="font-semibold text-sm truncate">Bob</p>
            <p className="text-xs text-gray-500">4,200 DP</p>
          </div>
        </motion.div>

        {/* 1st Place */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center w-1/3"
        >
          <div className="relative mb-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              1
            </div>
            <Crown className="absolute -top-2 -right-2 w-6 h-6 text-amber-500 fill-amber-500" />
          </div>
          <div className="bg-white p-3 rounded-2xl shadow-md w-full text-center border border-amber-100/70">
            <p className="font-semibold text-sm truncate">Alice</p>
            <p className="text-xs text-gray-500">5,000 DP</p>
          </div>
        </motion.div>

        {/* 3rd Place */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center w-1/4"
        >
          <div className="relative mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-white font-bold text-lg shadow-md">
              3
            </div>
            <Award className="absolute -top-1 -right-1 w-5 h-5 text-amber-700" />
          </div>
          <div className="bg-white p-3 rounded-2xl shadow-sm w-full text-center border border-indigo-100/50">
            <p className="font-semibold text-sm truncate">You</p>
            <p className="text-xs text-gray-500">3,900 DP</p>
          </div>
        </motion.div>
      </div>

      {/* Leaderboard List */}
      <div className="space-y-3">
        {sampleData.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 + 0.4 }}
            className={`flex justify-between items-center p-4 rounded-2xl shadow-sm transition-all ${
              user.name === "You"
                ? "bg-gradient-to-r from-amber-100/70 to-yellow-100/70 border-2 border-amber-200/80 shadow-md"
                : "bg-white border border-indigo-100/50"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`relative flex items-center justify-center w-8 h-8 rounded-full ${
                index === 0 ? "bg-gradient-to-br from-amber-400 to-amber-500 text-white" :
                index === 1 ? "bg-gradient-to-br from-gray-400 to-gray-300 text-white" :
                index === 2 ? "bg-gradient-to-br from-amber-600 to-amber-700 text-white" :
                "bg-indigo-100 text-indigo-600"
              }`}>
                <span className="font-semibold text-sm">{index + 1}</span>
                {index < 3 && <Star className="absolute -top-1 -right-1 w-3 h-3 text-white" />}
              </div>
              
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${
                  user.league === "Platinum" ? "bg-gradient-to-br from-gray-200 to-gray-300" :
                  user.league === "Diamond" ? "bg-gradient-to-br from-cyan-100 to-blue-100" :
                  user.league === "Gold" ? "bg-gradient-to-br from-amber-100 to-yellow-100" :
                  user.league === "Silver" ? "bg-gradient-to-br from-gray-100 to-gray-200" :
                  "bg-gradient-to-br from-amber-200 to-orange-100"
                }`}>
                  {user.league === "Platinum" ? (
                    <Trophy className="w-4 h-4 text-gray-600" />
                  ) : user.league === "Diamond" ? (
                    <Award className="w-4 h-4 text-cyan-600" />
                  ) : user.league === "Gold" ? (
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ) : user.league === "Silver" ? (
                    <Award className="w-4 h-4 text-gray-500" />
                  ) : (
                    <Award className="w-4 h-4 text-amber-700" />
                  )}
                </div>
                
                <div>
                  <p className={`font-semibold ${user.name === "You" ? "text-amber-700" : "text-gray-700"}`}>
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">{user.league} League</p>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold text-indigo-600">{user.dp.toLocaleString()} DP</p>
              {index > 2 && (
                <div className="flex items-center justify-end mt-1">
                  <ChevronUp className="w-3 h-3 text-emerald-500" />
                  <span className="text-xs text-emerald-600 ml-1">+{(500 - index * 70).toLocaleString()}</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Your Ranking Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8 p-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-white shadow-lg"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold flex items-center">
            <User className="w-4 h-4 mr-2" />
            Your Ranking
          </h2>
          <span className="bg-white/20 px-2 py-1 rounded-full text-xs">Top 10%</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">#3</p>
            <p className="text-indigo-100 text-sm">Gold League</p>
          </div>
          
          <div className="text-right">
            <p className="text-lg font-bold">3,900 DP</p>
            <p className="text-indigo-100 text-sm">+200 from yesterday</p>
          </div>
        </div>
        
        <div className="mt-4 w-full bg-white/20 h-2 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "65%" }}
            transition={{ delay: 1, duration: 1 }}
            className="bg-gradient-to-r from-amber-400 to-amber-500 h-2 rounded-full"
          />
        </div>
        <p className="text-xs text-indigo-100 mt-2">65% to Platinum League</p>
      </motion.div>
    </div>
  );
}