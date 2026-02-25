
export default function LegalPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-[#0d2c54] py-20 text-center text-white">
        <h1 className="text-4xl font-black mb-2 uppercase tracking-tighter">Legal & Privacy</h1>
        <p className="opacity-70 text-sm italic">Compliance and Terms of Service.</p>
      </div>

      <div className="container mx-auto px-4 -mt-10">
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-xl border space-y-10">
          <section>
            <h3 className="text-xl font-black text-[#0d2c54] uppercase mb-4 flex items-center gap-2">
              <Scale className="text-[#ff6b00]" /> Terms of Service
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              By using Britium Express, you agree to our cargo handling policies. We act as a dedicated delivery arm of Britium Ventures Company Limited. All shipments are subject to inspection for safety and compliance with Myanmar regulations.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-black text-[#0d2c54] uppercase mb-4 flex items-center gap-2">
              <Lock className="text-[#ff6b00]" /> Privacy Policy
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We collect information necessary for delivery and secure cash handling for our E-commerce partners. Your data is never sold to third parties and is used strictly for logistics and tracking purposes.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}