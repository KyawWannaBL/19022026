import { Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="py-20 text-center max-w-4xl mx-auto px-6">
      <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-4 py-2 mb-6">
        <Calculator size={18} className="text-gold-400" />
        <span className="text-gold-400 text-sm font-medium">
          Shipping Rate Calculator
        </span>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        Reliable Express Delivery Across Myanmar
      </h1>

      <p className="text-gray-300 mb-10">
        Premium logistics solutions with real-time tracking and transparent pricing.
      </p>

      <Link
        to="/calculator"
        className="inline-block bg-gold-500 hover:bg-gold-600 text-navy-900 font-semibold px-8 py-3 rounded-xl transition"
      >
        Calculate Shipping Rate
      </Link>
    </section>
  );
}