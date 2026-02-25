import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  History, 
  User, 
  ArrowRight,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLanguageContext } from '@/lib/LanguageContext';
import { ROUTE_PATHS } from '@/lib/index';
import { DashboardStat } from '@/components/ui/SharedComponents';
import { Link } from 'react-router-dom';

interface CustomerShipment {
  id: string;
  awb: string;
  status: 'pending' | 'in_transit' | 'delivered';
  to: string;
  date: string;
}

// Clean data declaration to avoid build errors
const customerShipments: CustomerShipment[] = [
  { id: '1', awb: 'BE-5001', status: 'in_transit', to: 'Mandalay', date: '2026-02-23' },
  { id: '2', awb: 'BE-5002', status: 'delivered', to: 'Yangon', date: '2026-02-20' },
  { id: '3', awb: 'BE-5003', status: 'pending', to: 'Nay Pyi Taw', date: '2026-02-24' },
];

export default function CustomerDashboardPage() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const [search, setSearch] = useState('');

  const filtered = customerShipments.filter(s => 
    s.awb.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-[#0d2c54] uppercase tracking-tighter italic">My Shipments</h1>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Manage your personal deliveries</p>
        </div>
        <Button asChild className="bg-[#ff6b00] hover:bg-[#e66000] text-white font-black px-6 rounded-xl">
          <Link to="/customer/booking"><Plus className="mr-2 h-4 w-4" /> New Delivery</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardStat icon={Clock} label="Active" value="2" color="blue" />
        <DashboardStat icon={CheckCircle2} label="Delivered" value="15" color="green" />
        <DashboardStat icon={History} label="Total Orders" value="17" color="orange" />
      </div>

      <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
        <CardHeader className="bg-white border-b pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-lg font-black text-[#0d2c54] uppercase">Track Existing</CardTitle>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input 
                placeholder="Search tracking ID..." 
                className="pl-10 h-10 border-2 rounded-xl"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr className="border-b text-[10px] font-black uppercase text-slate-400">
                  <th className="text-left p-4 tracking-widest">Tracking Number</th>
                  <th className="text-left p-4 tracking-widest">Destination</th>
                  <th className="text-left p-4 tracking-widest">Status</th>
                  <th className="text-left p-4 tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-bold text-blue-700">{s.awb}</td>
                    <td className="p-4 font-medium text-slate-600">{s.to}</td>
                    <td className="p-4">
                      <Badge variant={s.status === 'delivered' ? 'outline' : 'default'} className="uppercase text-[9px] font-black">
                        {s.status.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="sm" asChild className="text-[#0d2c54] font-black text-[10px] uppercase">
                        <Link to={`${ROUTE_PATHS.PUBLIC_TRACKING}?id=${s.awb}`}>
                          Details <ArrowRight size={12} className="ml-1" />
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}