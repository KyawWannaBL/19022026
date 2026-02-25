import React, { useState } from 'react';
import { Truck, CircleDollarSign, Plane, Calculator, ShieldCheck, Headphones } from 'lucide-react';
import { IMAGES } from '@/assets/images';

export default function ServicesPage() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const [calcData, setCalcData] = useState({ dest: 0, weight: 0, l: 0, w: 0, h: 0, divisor: 5000 });
  const [result, setResult] = useState<number | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const volWeight = (calcData.l * calcData.w * calcData.h) / calcData.divisor;
    const chargeable = Math.max(calcData.weight, volWeight);
    setResult(chargeable * calcData.dest); //
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0d2c54] py-20 text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Our Logistics Solutions</h1>
        <p className="max-w-2xl mx-auto text-lg opacity-80">From domestic parcels to international air cargo.</p>
      </div>

      <section className="container mx-auto py-16 px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard 
            img="https://images.unsplash.com/photo-1580674285054-bed31e145f59"
            icon={<Truck />} title="Domestic Express" 
            desc="Door-to-door delivery connecting Yangon, Mandalay, and Nay Pyi Taw."
            link="/domestic"
          />
          <ServiceCard 
            img="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1"
            icon={<CircleDollarSign />} title="COD & E-Commerce" 
            desc="Grow your online shop with secure payments and 24-hour remittance."
            link="/ecommerce"
          />
          <ServiceCard 
            img="https://images.unsplash.com/photo-1436491865332-7a61a109cc05"
            icon={<Plane />} title="International Cargo" 
            desc="Reliable air freight forwarding to USA, Singapore, Thailand, and Europe."
            link="/quote"
          />
        </div>
      </section>

      {/* International Calculator */}
      <section className="bg-white py-16 border-y">
        <div className="container mx-auto px-4 max-w-4xl">
           <div className="bg-white p-8 rounded-2xl shadow-xl border-t-8 border-[#0d2c54]">
              <h2 className="text-2xl font-bold mb-6 text-center">International Air Cargo Calculator</h2>
              <form onSubmit={calculate} className="grid md:grid-cols-2 gap-6">
                 {/* Inputs mapping calcData... */}
                 <Button type="submit" className="md:col-span-2 bg-[#ff6b00] hover:bg-[#e66000] text-white py-6 text-lg font-bold">
                    <Calculator className="mr-2" /> Calculate Estimate
                 </Button>
              </form>
              {result !== null && (
                <div className="mt-8 p-6 bg-blue-50 border-2 border-dashed border-[#0d2c54] rounded-lg text-center">
                   <p className="text-gray-600 uppercase text-xs font-bold">Estimated Cost</p>
                   <h2 className="text-4xl font-black text-[#0d2c54]">${result.toFixed(2)}</h2>
                </div>
              )}
           </div>
        </div>
      </section>
    </div>
  );
}

const ServiceCard = ({ img, icon, title, desc, link }: any) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:-translate-y-2 group">
    <img src={img} className="h-56 w-full object-cover" alt={title} />
    <div className="p-8 text-center relative">
      <div className="w-16 h-16 bg-[#ff6b00] text-white rounded-full flex items-center justify-center mx-auto -mt-16 mb-6 border-4 border-white shadow-lg">
        {icon}
      </div>
      <h4 className="text-xl font-bold mb-3">{title}</h4>
      <p className="text-gray-500 text-sm mb-6">{desc}</p>
      <Link to={link} className="text-[#0d2c54] font-bold hover:underline">View More →</Link>
    </div>
  </div>
);