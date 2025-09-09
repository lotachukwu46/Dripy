export default function HowItWorks() {
  const steps = [
    { step: "Sign Up", desc: "Create your free Dripy account in seconds." },
    { step: "Complete Tasks", desc: "Engage with surveys, apps, and more." },
    { step: "Earn Rewards", desc: "Cash out instantly with multiple options." },
  ];

  return (
    <section id="how" className="py-24 px-6 lg:px-12 max-w-6xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-12">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((s, i) => (
          <div key={i} className="bg-gray-800/60 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-cyan-400 mb-2">{s.step}</h3>
            <p className="text-gray-300">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
