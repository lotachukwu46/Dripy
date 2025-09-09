export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 lg:px-12 max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>
      <form className="grid gap-6 max-w-3xl mx-auto">
        <input type="text" placeholder="Your Name" className="px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-cyan-500" />
        <input type="email" placeholder="Your Email" className="px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-cyan-500" />
        <textarea placeholder="Your Message" rows={5} className="px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-cyan-500"></textarea>
        <button type="submit" className="px-6 py-3 bg-cyan-500 text-black font-semibold rounded-xl hover:bg-cyan-400 transition">Send Message</button>
      </form>
    </section>
  );
}
