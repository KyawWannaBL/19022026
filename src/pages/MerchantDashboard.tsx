import React, { useState } from 'react';
import { Package, Truck, CheckCircle2, DollarSign, Plus, Search, Filter, MoreHorizontal, Eye, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DashboardStat } from '@/components/ui/SharedComponents';
import { useLanguageContext } from '@/lib/LanguageContext';
import { ROUTE_PATHS } from '@/lib/index';
import { Link } from 'react-router-dom';

interface Shipment {
  id: string;
  trackingNumber: string;
  recipient: string;
  destination: string;
  status: 'pending' | 'in_transit' | 'delivered' | 'failed';
  amount: number;
  createdAt: string;
}

const mockShipments: Shipment[] = [
  { id: '1', trackingNumber: 'BE-2024-001', recipient: 'Mg Mg', destination: 'Yangon', status: 'delivered', amount: 25000, createdAt: '2024-01-15' },
  { id: '2', trackingNumber: 'BE-2024-002', recipient: 'Ma Ma', destination: 'Mandalay', status: 'in_transit', amount: 35000, createdAt: '2024-01-16' },
  { id: '3', trackingNumber: 'BE-2024-003', recipient: 'Ko Ko', destination: 'Naypyidaw', status: 'pending', amount: 15000, createdAt: '2024-01-17' }
];

export default function MerchantDashboardPage() {
  const { t } = useLanguageContext();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredShipments = mockShipments.filter(shipment =>
    shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.recipient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-[#0d2c54] uppercase tracking-tight">{t('merchant.portal')}</h1>
        <Button className="bg-[#ff6b00] hover:bg-[#ff6b00]/90 text-white font-bold uppercase text-xs rounded-xl">
          <Plus className="mr-2 h-4 w-4" /> {t('merchant.newOrder')}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <DashboardStat icon={Package} label={t('interface.pending')} value="12" color="blue" />
        <DashboardStat icon={Truck} label={t('interface.inTransit')} value="5" color="orange" />
        <DashboardStat icon={CheckCircle2} label={t('interface.delivered')} value="142" color="green" />
        <DashboardStat icon={DollarSign} label={t('merchant.codBalance')} value="450,000 MMK" color="red" />
      </div>

      <Card className="rounded-2xl border-none shadow-sm overflow-hidden">
        <CardHeader className="border-b bg-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-400">
              {t('merchant.recentShipments')}
            </CardTitle>
            <Input
              placeholder={t('form.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 border-slate-200"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-black uppercase text-slate-500 tracking-tighter">
                  <th className="p-4">Tracking</th>
                  <th className="p-4">Recipient</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredShipments.map((s) => (
                  <tr key={s.id} className="border-t hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-bold text-blue-600 underline">{s.trackingNumber}</td>
                    <td className="p-4 text-sm font-medium">{s.recipient}</td>
                    <td className="p-4 text-xs font-bold uppercase">{s.status}</td>
                    <td className="p-4 font-bold">{s.amount.toLocaleString()} <span className="text-[10px]">MMK</span></td>
                    <td className="p-4 text-center"><MoreHorizontal size={16} className="mx-auto text-slate-400" /></td>
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