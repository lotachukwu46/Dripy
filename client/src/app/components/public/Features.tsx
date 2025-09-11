"use client";

import { motion } from "framer-motion";
import { Trophy, Zap, Layers, Shield, Users, Globe } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Gamified Leagues",
      desc: "Climb from Bronze to Platinum leagues. Higher tiers unlock better rewards and exclusive earning opportunities.",
      stats: "5 League Tiers",
      color: "from-amber-500 to-orange-500",
      delay: 0.1,
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Rewards",
      desc: "Cash out quick — no waiting, no hidden delays. Withdraw instantly to your local bank or mobile money.",
      stats: "24/7 Withdrawals",
      color: "from-cyan-400 to-blue-500",
      delay: 0.2,
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Multiple Tasks",
      desc: "Surveys, apps, games, videos — plenty of ways to play & pay. New tasks added daily.",
      stats: "100+ Daily Tasks",
      color: "from-purple-500 to-pink-500",
      delay: 0.3,
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Trusted",
      desc: "Your earnings are protected with bank-level security. We prioritize your privacy and data safety.",
      stats: "100% Secure",
      color: "from-emerald-500 to-green-500",
      delay: 0.4,
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Vibrant Community",
      desc: "Join thousands of Africans earning together. Share strategies, compete, and grow with others.",
      stats: "10k+ Earners",
      color: "from-violet-500 to-purple-600",
      delay: 0.5,
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "African Focused",
      desc: "Built for Africa with local payment methods, currencies, and tasks that actually work in your region.",
      stats: "4+ Countries",
      color: "from-rose-500 to-red-500",
      delay: 0.6,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="features"
      className="relative py-28 px-6 lg:px-12 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-10 left-10% w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute top-1/2 right-15% w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          className="absolute bottom-10 left-1/3 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto text-center">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="inline-flex items-center justify-center px-6 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-6">
            🎯 WHY CHOOSE US
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            The Ultimate Earning Experience
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Drippy isn't just another earning app—it's a revolution in how
            Africa earns online. We've combined gaming excitement with real
            financial rewards.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 hover:border-cyan-400/30 transition-all duration-500 overflow-hidden"
            >
              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />

              {/* Icon container */}
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 mx-auto text-white`}
              >
                {feature.icon}
              </motion.div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                {feature.title}
              </h3>

              <p className="text-gray-300 text-base leading-relaxed mb-4">
                {feature.desc}
              </p>

              {/* Stats badge */}
              <div className="inline-flex items-center px-3 py-1 bg-gray-800/50 border border-gray-700/50 rounded-full text-sm text-cyan-400">
                {feature.stats}
              </div>

              {/* Hover effect border */}
              <div
                className={`absolute inset-0 rounded-2xl border-2 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-8 rounded-2xl border border-cyan-500/20"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Level Up Your Earnings?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join the thousands of Africans who are already transforming their
            spare time into real income. Start your journey from Bronze to
            Platinum today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
            >
              Start Earning Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-transparent border border-gray-600 hover:border-cyan-500 text-gray-300 hover:text-cyan-400 rounded-lg font-semibold transition-all duration-300"
            >
              See How It Works
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
