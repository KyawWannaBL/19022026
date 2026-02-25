import { Shipment, User, ROUTE_PATHS, USER_ROLES } from "@/lib/index";
import React, { useState } from 'react';
import { 
  Package, Truck, CheckCircle2, DollarSign, Plus, 
  Search, Filter, MoreHorizontal, Eye, Download 
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Centralized Imports - Deduplicated
import { 
  Shipment, 
  getStatusLabel, 
  getStatusVariant, 
  ROUTE_PATHS 
} from '@/lib/index';
import { useLanguageContext } from '@/lib/LanguageContext';

// UI Component Imports
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { DashboardStat } from '@/components/ui/SharedComponents';

// Mock Data aligned with the Shipment Interface
const mockShipments: Shipment[] = [
  { 
    id: '1', 
    awb: 'BE-2024-001', 
    receiverName: 'Mg Mg', 
    destinationTownship: 'Yangon', 
    status: 'delivered', 
    cod_amount: 25000, 
    weight: 1.0, 
    senderName: 'Your Shop',
    createdAt: '2024-01-15' 
  },
  { 
    id: '2', 
    awb: 'BE-2024-002', 
    receiverName: 'Ma Ma', 
    destinationTownship: 'Mandalay', 
    status: 'in_transit', 
    cod_amount: 35000, 
    weight: 2.5,
    senderName: 'Your Shop',
    createdAt: '2024-01-16' 
  },
  { 
    id: '3', 
    awb: 'BE-2024-003', 
    receiverName: 'Ko Ko', 
    destinationTownship: 'Naypyidaw', 
    status: 'pending', 
    cod_amount: 15000, 
    weight: 0.5,
    senderName: 'Your Shop',
    createdAt: '2024-01-17' 
  }
];

export default function MerchantDashboardPage() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter logic adjusted for receiverName
  const filteredShipments = mockShipments.filter(shipment =>
    (shipment.awb?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (shipment.receiverName?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section / ခေါင်းစဉ်ပိုင်း */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-[#0d2c54] uppercase tracking-tight">
          {t('merchant.portal', 'ကုန်သည် Dashboard')}
        </h1>
        <Link to={ROUTE_PATHS.CREATE_SHIPMENT}>
          <Button className="bg-[#ff6b00] hover:bg-[#ff6b00]/90 text-white font-bold uppercase text-xs rounded-xl">
            <Plus className="mr-2 h-4 w-4" /> {t('merchant.newOrder', 'အမှာစာအသစ်')}
          </Button>
        </Link>
      </div>

      {/* Statistics Grid / စာရင်းအနှစ်ချုပ် */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <DashboardStat icon={Package} label={t('interface.pending', 'စောင့်ဆိုင်းဆဲ')} value="12" color="blue" />
        <DashboardStat icon={Truck} label={t('interface.inTransit', 'ပို့ဆောင်ဆဲ')} value="5" color="orange" />
        <DashboardStat icon={CheckCircle2} label={t('interface.delivered', 'ရောက်ရှိပြီး')} value="142" color="green" />
        <DashboardStat icon={DollarSign} label={t('merchant.codBalance', 'COD လက်ကျန်')} value="450,000 MMK" color="red" />
      </div>

      {/* Recent Shipments Table / နောက်ဆုံးပို့ဆောင်မှုများ */}
      <Card className="rounded-2xl border-none shadow-sm overflow-hidden bg-white">
        <CardHeader className="border-b">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-400">
              {t('merchant.recentShipments', 'နောက်ဆုံးပို့ဆောင်မှုစာရင်း')}
            </CardTitle>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder={t('form.search', 'ရှာဖွေမည်...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-slate-200 rounded-xl"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-black uppercase text-slate-500 tracking-tighter">
                  <th className="p-4">{t('table.tracking', 'AWB နံပါတ်')}</th>
                  <th className="p-4">{t('table.receiverName', 'လက်ခံသူ')}</th>
                  <th className="p-4">{t('table.status', 'အခြေအနေ')}</th>
                  <th className="p-4">{t('table.amount', 'COD ပမာဏ')}</th>
                  <th className="p-4 text-center">{t('table.action', 'ဆောင်ရွက်ချက်')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredShipments.map((s) => (
                  <tr key={s.id} className="border-t hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-bold text-blue-600 font-mono tracking-tighter">
                      {s.awb}
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-bold text-slate-700">{s.receiverName}</div>
                      <div className="text-[10px] text-slate-400 font-medium">{s.destinationTownship}</div>
                    </td>
                    <td className="p-4">
                      <Badge variant={getStatusVariant(s.status) as any} className="text-[10px] font-black uppercase">
                        {getStatusLabel(s.status, t)}
                      </Badge>
                    </td>
                    <td className="p-4 font-bold text-slate-700">
                      {(s.cod_amount || 0).toLocaleString()} <span className="text-[10px] text-slate-400">MMK</span>
                    </td>
                    <td className="p-4 text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4 text-slate-400" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl">
                          <DropdownMenuItem className="gap-2 text-xs font-bold">
                            <Eye className="h-3.5 w-3.5" /> {t('action.view', 'ကြည့်မည်')}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-xs font-bold text-blue-600">
                            <Download className="h-3.5 w-3.5" /> {t('action.download', 'ဒေါင်းလုဒ်')}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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