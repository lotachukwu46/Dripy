import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 px-6 lg:px-12 max-w-6xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-6">Ready to <span className="text-cyan-400">Start Earning?</span></h2>
      <p className="text-gray-300 mb-8">Join thousands of users making money with Dripy today.</p>
      <Link href="/register" className="px-6 py-3 bg-cyan-500 text-black font-semibold rounded-xl hover:bg-cyan-400 transition">
        Get Started
      </Link>
    </section>
  );
}
