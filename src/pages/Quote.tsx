import React, { useState } from 'react';
import { Calculator, Package, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Quote() {
  const [form, setForm] = useState({ townshipRate: 0, weight: 1 });

  const calculateTotal = () => {
    if (form.townshipRate === 0) return 0;
    // Base rate for 1st Kg + 500 MMK per additional Kg
    const extraWeightCost = form.weight > 1 ? (form.weight - 1) * 500 : 0;
    return form.townshipRate + extraWeightCost;
  };

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-black text-[#0d2c54] mb-8 uppercase italic tracking-tighter">Shipping Rate Calculator</h2>
        
        <div className="grid md:grid-cols-5 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden border">
          <div className="md:col-span-3 p-8 md:p-12">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2">
              <Package size={14} className="text-[#ff6b00]" /> Shipment Details
            </h4>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2">Yangon Destination Township</label>
                <select 
                  className="w-full h-12 rounded-xl border-2 px-4 bg-slate-50 font-medium"
                  onChange={(e) => setForm({...form, townshipRate: parseInt(e.target.value)})}
                >
                  <option value="0">-- Select Area --</option>
                  <optgroup label="Zone 1 - 3,000 MMK">
                    <option value="3000">Bahan / Sanchaung / Kamaryut</option>
                  </optgroup>
                  <optgroup label="Zone 2 - 3,500 MMK">
                    <option value="3500">East Dagon / North Dagon / South Dagon</option>
                  </optgroup>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Estimated Weight (Kg)</label>
                <input 
                  type="number" 
                  min="1"
                  value={form.weight}
                  onChange={(e) => setForm({...form, weight: parseFloat(e.target.value)})}
                  className="w-full h-12 rounded-xl border-2 px-4 bg-slate-50"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-slate-900 p-12 text-center flex flex-col justify-center border-l border-slate-800">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Estimated Total</span>
            <h3 className="text-4xl font-black text-[#ff6b00] mb-8">{calculateTotal().toLocaleString()} <span className="text-xs text-white">MMK</span></h3>
            <Button className="w-full h-14 bg-[#ff6b00] hover:bg-[#e66000] text-white font-black text-sm uppercase tracking-widest rounded-xl">
               Book Shipment
            </Button>
            <p className="text-[10px] text-slate-500 italic mt-6">*Price includes base rate and additional weight surcharge.</p>
          </div>
        </div>
      </div>
    </div>
  );
}