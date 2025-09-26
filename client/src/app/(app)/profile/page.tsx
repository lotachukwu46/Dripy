'use client';

import { motion } from 'framer-motion';
import { User, Trophy, Award, Star, Zap, TrendingUp, Calendar, Crown, Shield, Gem } from 'lucide-react';

const sampleProfile = {
  username: "DripMaster99",
  league: "Gold",
  streak: 7,
  dp: 3920,
  level: 24,
  badges: ["🔥 Streak Master", "💰 Big Earner", "🏅 Top 10 League", "⭐ Rising Star", "🚀 Fast Climber"],
  history: [
    { season: "Season 1", league: "Silver", rank: "Top 30%" },
    { season: "Season 2", league: "Gold", rank: "Top 15%" },
    { season: "Season 3", league: "Gold", rank: "Top 10%" },
  ],
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-5">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Profile
        </h1>
        <p className="text-indigo-500/80 text-sm mt-1">Your achievements and progress</p>
      </motion.header>

      {/* User Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 p-6 rounded-3xl text-white shadow-xl mb-8 overflow-hidden"
      >
        {/* Background elements */}
        <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-white/5 blur-2xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-bold">{sampleProfile.username}</h2>
              <div className="flex items-center mt-1">
                <Trophy className="w-4 h-4 text-amber-400 mr-1" />
                <span className="text-indigo-100">{sampleProfile.league} League</span>
              </div>
            </div>
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
              <User className="w-7 h-7" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 p-3 rounded-xl backdrop-blur-md">
              <div className="flex items-center">
                <Zap className="w-4 h-4 text-amber-400 mr-2" />
                <span className="text-sm">Streak</span>
              </div>
              <p className="font-bold text-lg mt-1">{sampleProfile.streak} days</p>
            </div>
            
            <div className="bg-white/10 p-3 rounded-xl backdrop-blur-md">
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 text-emerald-400 mr-2" />
                <span className="text-sm">DP</span>
              </div>
              <p className="font-bold text-lg mt-1">{sampleProfile.dp.toLocaleString()}</p>
            </div>
          </div>

          {/* Level Progress */}
          <div className="mt-5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Level {sampleProfile.level}</span>
              <span className="text-sm">65%</span>
            </div>
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "65%" }}
                transition={{ duration: 1.5, delay: 0.3 }}
                className="bg-gradient-to-r from-amber-400 to-amber-500 h-2 rounded-full"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Badges Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-2xl shadow-sm p-5 mb-6 border border-indigo-100/50"
      >
        <h3 className="font-bold text-lg text-indigo-900 mb-4 flex items-center">
          <Award className="mr-2 w-5 h-5 text-amber-500" /> Achievements
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {sampleProfile.badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, type: "spring" }}
              className={`p-3 rounded-xl text-center ${
                index % 3 === 0 ? "bg-gradient-to-br from-amber-50 to-amber-100" :
                index % 3 === 1 ? "bg-gradient-to-br from-indigo-50 to-indigo-100" :
                "bg-gradient-to-br from-purple-50 to-purple-100"
              }`}
            >
              <div className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                index % 3 === 0 ? "bg-amber-200" :
                index % 3 === 1 ? "bg-indigo-200" :
                "bg-purple-200"
              }`}>
                {badge.includes("Streak") ? <Zap className="w-5 h-5 text-amber-600" /> :
                 badge.includes("Earner") ? <TrendingUp className="w-5 h-5 text-indigo-600" /> :
                 badge.includes("League") ? <Crown className="w-5 h-5 text-purple-600" /> :
                 badge.includes("Star") ? <Star className="w-5 h-5 text-amber-600" /> :
                 <Gem className="w-5 h-5 text-purple-600" />
                }
              </div>
              <p className="text-xs font-medium text-gray-700">{badge}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* League History */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white rounded-2xl shadow-sm p-5 border border-indigo-100/50"
      >
        <h3 className="font-bold text-lg text-indigo-900 mb-4 flex items-center">
          <Calendar className="mr-2 w-5 h-5 text-indigo-600" /> League History
        </h3>
        <div className="space-y-4">
          {sampleProfile.history.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 + 0.6 }}
              className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-indigo-100/50 border border-indigo-100"
            >
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${
                  h.league === "Gold" ? "bg-amber-100" : "bg-gray-200"
                }`}>
                  {h.league === "Gold" ? (
                    <Trophy className="w-5 h-5 text-amber-600" />
                  ) : (
                    <Shield className="w-5 h-5 text-gray-600" />
                  )}
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-800">{h.season}</p>
                  <p className="text-sm text-gray-600">{h.league} League</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">
                  {h.rank}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Progress Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 pt-4 border-t border-indigo-100"
        >
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Next league: Platinum</span>
            <span className="text-sm font-medium text-indigo-600">35% needed</span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full mt-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "35%" }}
              transition={{ duration: 1.5, delay: 1.2 }}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
            />
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}