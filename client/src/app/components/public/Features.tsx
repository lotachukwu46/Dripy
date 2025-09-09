export default function Features() {
  const features = [
    { title: "Gamified Earnings", desc: "Climb leagues and earn more with progress." },
    { title: "Instant Rewards", desc: "Get payouts quickly, no delays." },
    { title: "Multiple Tasks", desc: "Surveys, apps, games, and more earning options." },
  ];

  return (
    <section id="features" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12">Why Choose <span className="text-cyan-400">Dripy</span>?</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div key={i} className="bg-gray-800/60 rounded-xl p-8 border border-gray-700 hover:border-cyan-400 transition">
            <h3 className="text-xl font-bold mb-4 text-cyan-400">{f.title}</h3>
            <p className="text-gray-300">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
