"use client";

import { motion } from "framer-motion";

const sampleData = [
  { id: 1, name: "Alice", dp: 5000, league: "Platinum" },
  { id: 2, name: "Bob", dp: 4200, league: "Diamond" },
  { id: 3, name: "You", dp: 3900, league: "Gold" },
  { id: 4, name: "Chris", dp: 3200, league: "Gold" },
  { id: 5, name: "Daniel", dp: 2500, league: "Silver" },
];

export default function LeaderboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">🏆 Leaderboard</h1>

      <div className="space-y-4">
        {sampleData.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex justify-between items-center p-4 rounded-lg shadow-md ${
              user.name === "You"
                ? "bg-yellow-100 border-2 border-yellow-400"
                : "bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-gray-600">#{index + 1}</span>
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.league} League</p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold text-blue-600">{user.dp} DP</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
