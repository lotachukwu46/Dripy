"use client";

import { motion } from "framer-motion";

const sampleProfile = {
  username: "DripMaster99",
  league: "Gold",
  streak: 7,
  dp: 3920,
  badges: ["🔥 Streak Master", "💰 Big Earner", "🏅 Top 10 League"],
  history: [
    { season: "Season 1", league: "Silver" },
    { season: "Season 2", league: "Gold" },
  ],
};

export default function ProfilePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">👤 Profile</h1>

      {/* User Info */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-lg shadow-md mb-6 text-center"
      >
        <h2 className="text-xl font-bold">{sampleProfile.username}</h2>
        <p className="text-gray-500">League: {sampleProfile.league}</p>
        <p className="mt-2">🔥 Streak: {sampleProfile.streak} days</p>
        <p className="font-semibold text-blue-600 mt-1">
          {sampleProfile.dp} DP
        </p>
      </motion.div>

      {/* Badges */}
      <section className="mb-6">
        <h3 className="font-semibold mb-3">🏅 Achievements</h3>
        <div className="flex gap-2 flex-wrap">
          {sampleProfile.badges.map((badge, index) => (
            <motion.span
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-yellow-100 border border-yellow-400 px-3 py-1 rounded-lg text-sm"
            >
              {badge}
            </motion.span>
          ))}
        </div>
      </section>

      {/* League History */}
      <section>
        <h3 className="font-semibold mb-3">📜 League History</h3>
        <ul className="space-y-2">
          {sampleProfile.history.map((h, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-50 border rounded p-3"
            >
              {h.season}: {h.league}
            </motion.li>
          ))}
        </ul>
      </section>
    </div>
  );
}
