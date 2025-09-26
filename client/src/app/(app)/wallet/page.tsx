'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, TrendingDown, Download, CreditCard, History, Wallet as WalletIcon, Coins, Zap } from 'lucide-react';

const transactions = [
  { id: 1, type: "earned", amount: 200, description: "Task Completed", date: "2 hours ago", icon: <Zap className="w-4 h-4" /> },
  { id: 2, type: "withdrawal", amount: 1000, description: "Withdrawal to Bank", date: "1 day ago", icon: <Download className="w-4 h-4" /> },
  { id: 3, type: "earned", amount: 150, description: "Daily Streak Bonus", date: "1 day ago", icon: <TrendingUp className="w-4 h-4" /> },
  { id: 4, type: "earned", amount: 300, description: "App Installation", date: "2 days ago", icon: <Coins className="w-4 h-4" /> },
  { id: 5, type: "earned", amount: 50, description: "Watch Ad", date: "3 days ago", icon: <Zap className="w-4 h-4" /> },
];

export default function WalletPage() {
  const totalBalance = 1250; // Example balance
  
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
          Wallet
        </h1>
        <div className="w-5"></div> {/* Spacer for balance */}
      </motion.header>

      {/* Balance Card */}
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
          <div className="flex items-center justify-between mb-2">
            <p className="text-indigo-100 text-sm">Total Balance</p>
            <WalletIcon className="w-5 h-5 text-indigo-200" />
          </div>
          
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-4xl font-extrabold tracking-tight">{totalBalance.toLocaleString()} <span className="text-lg font-semibold">DP</span></h2>
              <p className="text-indigo-100/90 mt-1">≈ ${(totalBalance / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-2 gap-4 mb-8"
      >
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="bg-white p-4 rounded-2xl shadow-sm border border-indigo-100/50 flex flex-col items-center justify-center hover:shadow-md transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
            <Download className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="font-medium text-gray-700 text-sm">Withdraw</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="bg-white p-4 rounded-2xl shadow-sm border border-indigo-100/50 flex flex-col items-center justify-center hover:shadow-md transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
            <CreditCard className="w-5 h-5 text-indigo-600" />
          </div>
          <span className="font-medium text-gray-700 text-sm">Add Card</span>
        </motion.button>
      </motion.div>

      {/* Transaction History Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex items-center justify-between mb-4"
      >
        <h3 className="font-bold text-lg text-indigo-900 flex items-center">
          <History className="mr-2 w-5 h-5 text-indigo-600" /> Transaction History
        </h3>
        <span className="text-sm text-indigo-500 bg-indigo-100 px-2 py-1 rounded-full">
          {transactions.length} transactions
        </span>
      </motion.div>

      {/* Transactions List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="space-y-3"
      >
        {transactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.4 }}
            className="bg-white p-4 rounded-2xl shadow-sm border border-indigo-100/50 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`p-2 rounded-xl ${
                  transaction.type === "earned" 
                    ? "bg-emerald-100" 
                    : "bg-rose-100"
                }`}>
                  {transaction.type === "earned" 
                    ? <TrendingUp className="w-4 h-4 text-emerald-600" /> 
                    : <TrendingDown className="w-4 h-4 text-rose-600" />
                  }
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-800">{transaction.description}</p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
              </div>
              
              <div className={`text-right ${
                transaction.type === "earned" ? "text-emerald-600" : "text-rose-600"
              }`}>
                <p className="font-bold">
                  {transaction.type === "earned" ? "+" : "-"}{transaction.amount} DP
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Withdrawal Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-8 p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-2xl border border-indigo-100"
      >
        <div className="flex items-start">
          <div className="p-2 rounded-lg bg-indigo-200 mr-3">
            <CreditCard className="w-4 h-4 text-indigo-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-indigo-800">Withdrawal Information</p>
            <p className="text-xs text-indigo-600 mt-1">Minimum withdrawal: 1000 DP • Processed within 24-48 hours</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}