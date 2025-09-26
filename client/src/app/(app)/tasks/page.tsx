'use client';

import { motion } from 'framer-motion';
import { Clock, Zap, Calendar, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

const sampleTasks = [
  { id: 1, title: "Complete Survey", reward: 150, time: "5 min", expires: "2h", completed: false, priority: "high" },
  { id: 2, title: "Install App X", reward: 300, time: "10 min", expires: "6h", completed: false, priority: "medium" },
  { id: 3, title: "Watch Ad", reward: 50, time: "1 min", expires: "30m", completed: true, priority: "low" },
  { id: 4, title: "Register on Platform Y", reward: 400, time: "15 min", expires: "12h", completed: false, priority: "high" },
  { id: 5, title: "Refer a Friend", reward: 500, time: "2 min", expires: "24h", completed: false, priority: "medium" },
  { id: 6, title: "Social Media Share", reward: 200, time: "3 min", expires: "8h", completed: false, priority: "low" },
];

export default function TasksPage() {
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
          Tasks
        </h1>
        <p className="text-indigo-500/80 text-sm mt-1">Complete tasks and earn rewards</p>
      </motion.header>

      {/* Stats Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-2 gap-4 mb-6"
      >
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-indigo-100/50">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-indigo-100">
              <Zap className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs text-gray-500">Available</p>
              <p className="font-bold text-indigo-900">5 tasks</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-indigo-100/50">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-amber-100">
              <TrendingUp className="w-4 h-4 text-amber-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs text-gray-500">Potential</p>
              <p className="font-bold text-amber-900">1,100 DP</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tasks List */}
      <div className="space-y-4">
        {sampleTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            className={`bg-white rounded-2xl shadow-sm p-5 border transition-all ${
              task.completed 
                ? "border-emerald-100/70 opacity-80" 
                : task.priority === "high" 
                  ? "border-rose-100/70" 
                  : "border-indigo-100/50"
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start">
                <div className={`p-2 rounded-xl ${
                  task.completed 
                    ? "bg-emerald-100" 
                    : task.priority === "high" 
                      ? "bg-rose-100" 
                      : task.priority === "medium" 
                        ? "bg-amber-100" 
                        : "bg-indigo-100"
                }`}>
                  {task.completed ? (
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  ) : task.priority === "high" ? (
                    <AlertCircle className="w-5 h-5 text-rose-600" />
                  ) : (
                    <Zap className="w-5 h-5 text-indigo-600" />
                  )}
                </div>
                <div className="ml-4">
                  <h2 className={`font-semibold ${
                    task.completed ? "text-gray-500 line-through" : "text-gray-800"
                  }`}>
                    {task.title}
                  </h2>
                  <div className="flex items-center mt-1">
                    <Clock className="w-3 h-3 text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500 mr-3">{task.time}</span>
                    <Calendar className="w-3 h-3 text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500">Expires in {task.expires}</span>
                  </div>
                </div>
              </div>
              
              {!task.completed && (
                <div className={`rounded-full px-1 py-1 text-xs font-medium ${
                  task.priority === "high" 
                    ? "bg-rose-100 text-rose-700" 
                    : task.priority === "medium" 
                      ? "bg-amber-100 text-amber-700" 
                      : "bg-indigo-100 text-indigo-700"
                }`}>
                  {task.priority}
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                {task.completed ? (
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                    Completed
                  </span>
                ) : (
                  <span className="text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">
                    Available
                  </span>
                )}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={task.completed}
                className={`px-4 py-2 rounded-xl font-bold text-white ${
                  task.completed
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-500 to-purple-500 shadow-sm hover:shadow-md"
                }`}
              >
                {task.completed ? "Completed" : `+${task.reward} DP`}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Completed Tasks Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-2xl border border-indigo-100"
      >
        <div className="flex items-center">
          <CheckCircle className="w-5 h-5 text-indigo-600 mr-2" />
          <p className="text-sm text-indigo-700">
            <span className="font-semibold">1 task</span> completed today • <span className="font-semibold">50 DP</span> earned
          </p>
        </div>
      </motion.div>

      {/* Floating Action Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="fixed bottom-6 right-6 z-10"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg shadow-indigo-300 flex items-center justify-center text-white"
        >
          <Zap className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </div>
  );
}