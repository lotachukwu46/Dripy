"use client";

import Link from "next/link";

export default function ReferralsPage() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold">Referrals</h1>
      <p>Invite friends and earn more!</p>

      {/* Placeholder Referral Info */}
      <div className="border p-4 rounded">
        <p>Your referral link:</p>
        <code className="block bg-gray-100 p-2 rounded">
          dripy.com/signup?ref=USER123
        </code>
      </div>

      <p>Referral Count: 12</p>
      <p>Earnings from referrals: 350 DP</p>

      <Link href="/dashboard" className="text-blue-500 underline">
        ⬅ Back to Dashboard
      </Link>
    </div>
  );
}
