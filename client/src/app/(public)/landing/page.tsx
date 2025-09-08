import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700">
      <div className="container mx-auto px-4 py-16 text-center text-white">
        <h1 className="text-5xl font-bold mb-6">Welcome to Drippy</h1>
        <p className="text-xl mb-8">
          The gamified GPT platform where your hustle determines your rewards
        </p>

        <div className="space-x-4">
          <Link
            href="/register"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
