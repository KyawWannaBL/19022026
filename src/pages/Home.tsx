import { Truck, ShieldCheck, Globe, ArrowRight, PackageSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTE_PATHS } from '@/lib/index';
import { IMAGES } from '@/assets/images';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center bg-[#0d2c54] overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d" className="w-full h-full object-cover" alt="Logistics Background" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight uppercase italic tracking-tighter">
              Connecting Myanmar <br /> <span className="text-[#ff6b00]">To The World</span>
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mb-8 opacity-90 font-medium">
              From local express delivery to international air cargo solutions. Britium Express delivers confidence in motion.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-[#ff6b00] hover:bg-[#e66000] text-white font-black rounded-none px-8">
                <Link to={ROUTE_PATHS.PUBLIC_TRACKING}>TRACK SHIPMENT <PackageSearch className="ml-2" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-[#0d2c54] font-black rounded-none px-8">
                <Link to={ROUTE_PATHS.SERVICES}>OUR SERVICES</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats/Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4 group">
            <div className="w-16 h-16 bg-blue-50 text-[#0d2c54] mx-auto flex items-center justify-center rounded-2xl group-hover:bg-[#0d2c54] group-hover:text-white transition-colors">
              <Truck size={32} />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tighter">Domestic Express</h3>
            <p className="text-slate-500 text-sm">Door-to-door delivery connecting the Golden Triangle: Yangon, Mandalay, and Nay Pyi Taw.</p>
          </div>
          {/* Add more features matching domestic.html/ecommerce.html */}
        </div>
      </section>
    </div>
  );
}