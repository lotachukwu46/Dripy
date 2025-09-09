export default function Testimonials() {
  const feedback = [
    { name: "Alex", text: "Dripy helped me earn while having fun!" },
    { name: "Maya", text: "I love the leagues — it feels like a game." },
    { name: "James", text: "Fast payouts and simple interface. Highly recommend." },
  ];

  return (
    <section id="testimonials" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12">What Our Users Say</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {feedback.map((f, i) => (
          <div key={i} className="bg-gray-800/60 rounded-xl p-6 border border-gray-700">
            <p className="text-gray-300 mb-4">"{f.text}"</p>
            <h3 className="font-bold text-cyan-400">{f.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
