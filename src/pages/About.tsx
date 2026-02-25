import { ShieldCheck, Target, Users, Award } from 'lucide-react';
import { IMAGES } from '@/assets/images';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#0d2c54] py-24 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase italic tracking-tighter">
          Our Story
        </h1>
        <p className="max-w-2xl mx-auto text-lg opacity-80 font-medium">
          A dedicated delivery arm of Britium Ventures Company Limited.
        </p>
      </div>

      <section className="container mx-auto py-20 px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-black text-[#0d2c54] mb-6 uppercase tracking-tighter">
              Reliable Nationwide Logistics
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              We specialize in the "Golden Triangle" of Myanmar's economy, running daily schedules between 
              Yangon, Mandalay, and Nay Pyi Taw. Our mission is to provide fast, 
              secure, and compliant logistics solutions across Myanmar and beyond.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-10">
              <div className="border-l-4 border-[#ff6b00] pl-4">
                <h4 className="font-black text-[#0d2c54] uppercase text-sm">Founded</h4>
                <p className="text-2xl font-black">2026</p>
              </div>
              <div className="border-l-4 border-[#ff6b00] pl-4">
                <h4 className="font-black text-[#0d2c54] uppercase text-sm">Coverage</h4>
                <p className="text-2xl font-black">Nationwide</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1595150937666-419b48f93309" 
              className="rounded-3xl shadow-2xl" 
              alt="About Britium" 
            />
          </div>
        </div>
      </section>
    </div>
  );
}