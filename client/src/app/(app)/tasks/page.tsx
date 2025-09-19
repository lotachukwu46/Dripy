"use client";

import { motion } from "framer-motion";

const sampleTasks = [
  { id: 1, title: "Complete Survey", reward: 150, time: "5 min", expires: "2h" },
  { id: 2, title: "Install App X", reward: 300, time: "10 min", expires: "6h" },
  { id: 3, title: "Watch Ad", reward: 50, time: "1 min", expires: "30m" },
  { id: 4, title: "Register on Platform Y", reward: 400, time: "15 min", expires: "12h" },
];

export default function TasksPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">📝 Tasks</h1>

      <div className="space-y-4">
        {sampleTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center hover:shadow-lg transition"
          >
            <div>
              <h2 className="font-semibold">{task.title}</h2>
              <p className="text-sm text-gray-500">
                ⏱ {task.time} • ⌛ Expires in {task.expires}
              </p>
            </div>

            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600 transition">
              +{task.reward} DP
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
