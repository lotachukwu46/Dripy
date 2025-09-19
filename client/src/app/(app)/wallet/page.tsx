"use client";

import Link from "next/link";

export default function WalletPage() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold">Wallet</h1>
      <p>Check your balance and transaction history here.</p>

      {/* Placeholder Transactions */}
      <ul className="space-y-2">
        <li className="border p-3 rounded">+200 DP (Task Completed)</li>
        <li className="border p-3 rounded">-1000 DP (Withdrawal)</li>
      </ul>

      <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
        Withdraw
      </button>

      <Link href="/dashboard" className="block mt-4 text-blue-500 underline">
        ⬅ Back to Dashboard
      </Link>
    </div>
  );
}
