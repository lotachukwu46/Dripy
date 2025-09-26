'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Users, Gift, Share2, Copy, Zap, TrendingUp, Award, Coins } from 'lucide-react';
import { useState } from 'react';

const referralData = {
  code: "DRIPY123",
  link: "dripy.com/signup?ref=DRIPY123",
  count: 12,
  earnings: 350,
  pending: 150,
  rewards: [
    { friends: 5, reward: 100 },
    { friends: 10, reward: 250 },
    { friends: 20, reward: 600 },
  ]
};

const referralStats = [
  { label: "Successful Referrals", value: 8, icon: <Users className="w-4 h-4" /> },
  { label: "Pending Signups", value: 4, icon: <Zap className="w-4 h-4" /> },
  { label: "Total Earnings", value: `${referralData.earnings} DP`, icon: <Coins className="w-4 h-4" /> },
];

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralData.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-5">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-8"
      >
        <Link href="/dashboard" className="flex items-center text-indigo-600 font-medium">
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back
        </Link>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Referrals
        </h1>
        <div className="w-5"></div> {/* Spacer for balance */}
      </motion.header>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 p-6 rounded-3xl text-white shadow-xl mb-8 overflow-hidden"
      >
        {/* Background elements */}
        <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-white/5 blur-2xl"></div>
        
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Invite Friends & Earn</h2>
          <p className="text-indigo-100 mb-4">Get 100 DP for each friend who joins and completes their first task</p>
          <div className="bg-white/10 p-3 rounded-xl backdrop-blur-md">
            <p className="text-sm font-medium">Your referral code</p>
            <p className="text-2xl font-bold tracking-widest my-2">{referralData.code}</p>
            <div className="flex items-center justify-center text-xs text-indigo-200">
              <Users className="w-3 h-3 mr-1" />
              <span>{referralData.count} friends invited</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-2 gap-4 mb-8"
      >
        {referralStats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-2xl shadow-sm border border-indigo-100/50">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg ${
                index === 0 ? "bg-indigo-100" : 
                index === 1 ? "bg-amber-100" : 
                "bg-emerald-100"
              }`}>
                <div className={index === 0 ? "text-indigo-600" : index === 1 ? "text-amber-600" : "text-emerald-600"}>
                  {stat.icon}
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500">{stat.label}</p>
            <p className={`font-bold text-lg mt-1 ${
              index === 0 ? "text-indigo-700" : 
              index === 1 ? "text-amber-700" : 
              "text-emerald-700"
            }`}>
              {stat.value}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Referral Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-2xl shadow-sm p-5 mb-6 border border-indigo-100/50"
      >
        <h3 className="font-bold text-lg text-indigo-900 mb-3 flex items-center">
          <Share2 className="mr-2 w-5 h-5 text-indigo-600" /> Your Referral Link
        </h3>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-grow bg-indigo-50 p-3 rounded-xl overflow-hidden">
            <code className="text-sm text-indigo-700 truncate">{referralData.link}</code>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={copyToClipboard}
            className="p-3 rounded-xl bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors"
          >
            <Copy className="w-5 h-5" />
          </motion.button>
        </div>
        {copied && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-emerald-600 bg-emerald-50 p-2 rounded-lg text-center"
          >
            Link copied to clipboard!
          </motion.p>
        )}
      </motion.div>

      {/* Rewards Tiers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white rounded-2xl shadow-sm p-5 mb-6 border border-indigo-100/50"
      >
        <h3 className="font-bold text-lg text-indigo-900 mb-4 flex items-center">
          <Award className="mr-2 w-5 h-5 text-amber-500" /> Bonus Rewards
        </h3>
        <div className="space-y-4">
          {referralData.rewards.map((reward, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-indigo-50 to-indigo-100/50 border border-indigo-100">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                  <span className="font-bold text-indigo-700">{reward.friends}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Invite {reward.friends} friends</p>
                  <p className="text-xs text-gray-500">Get bonus when they complete tasks</p>
                </div>
              </div>
              <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-bold">
                +{reward.reward} DP
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Share Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-5 text-white shadow-lg"
      >
        <h3 className="font-bold text-lg mb-3 flex items-center">
          <TrendingUp className="mr-2 w-5 h-5" /> Share & Earn More
        </h3>
        <p className="text-indigo-100 text-sm mb-4">Share your link on social media and earn even more rewards</p>
        
        <div className="grid grid-cols-2 gap-3">
          {['WhatsApp', 'Facebook', 'Twitter', 'Email'].map((platform, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white/20 p-3 rounded-xl backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <span className="text-sm font-medium">{platform}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}