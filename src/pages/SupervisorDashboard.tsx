import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Truck, AlertTriangle, CheckCircle, 
  Search, Filter, LayoutDashboard, BarChart3, Package,
  ArrowUpRight, Clock
} from 'lucide-react';
import { useLanguageContext } from '@/lib/LanguageContext';
import { 
  Shipment, 
  getStatusLabel, 
  getStatusVariant, 
  ROUTE_PATHS 
} from '@/lib/index';
import { supabase } from '@/lib/supabase';
import { TABLES } from '@/lib/db/tables';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Reusable Metric Card to clean up the main render
const MetricCard = ({ title, value, icon: Icon, colorClass, trend }: any) => (
  <Card className="border-none shadow-sm bg-white overflow-hidden group hover:shadow-md transition-shadow">
    <CardContent className="pt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-black text-slate-800">{value}</h3>
            {trend && <span className="text-[10px] text-emerald-500 font-bold">+{trend}%</span>}
          </div>
        </div>
        <div className={`p-4 ${colorClass} rounded-2xl group-hover:scale-110 transition-transform`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function SupervisorDashboard() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    pending: 0,
    active: 0,
    delivered: 0,
    exceptions: 0
  });

  useEffect(() => {
    async function fetchDashboardStats() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from(TABLES.SHIPMENTS)
          .select('status');

        if (error) throw error;

        const counts = (data as Shipment[]).reduce((acc: any, curr) => {
          const status = curr.status.toLowerCase();
          if (status.includes('pending')) acc.pending++;
          else if (status.includes('transit') || status.includes('delivery')) acc.active++;
          else if (status.includes('delivered')) acc.delivered++;
          else if (status.includes('failed') || status.includes('ndr')) acc.exceptions++;
          return acc;
        }, { pending: 0, active: 0, delivered: 0, exceptions: 0 });

        setStats(counts);
      } catch (err) {
        console.error("Dashboard Stats Error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardStats();
  }, []);

  return (
    <div className="p-6 space-y-8 bg-slate-50/50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 font-heading tracking-tight">
            {t('Supervisor Control', 'ကြီးကြပ်သူ ထိန်းချုပ်မှုဗဟို')}
          </h1>
          <p className="text-slate-500 font-medium">
            {t('Real-time fleet and shipment oversight.', 'ယာဉ်စုနှင့် ပစ္စည်းစီးဆင်းမှုအား တိုက်ရိုက်ကြည့်ရှုခြင်း။')}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white border-slate-200">
            <LayoutDashboard className="w-4 h-4 mr-2" /> {t('Overview', 'အနှစ်ချုပ်')}
          </Button>
          <Button className="shadow-lg shadow-primary/20">
            <Truck className="w-4 h-4 mr-2" /> {t('Fleet Map', 'ယာဉ်စုမြေပုံ')}
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title={t('Pending Verification', 'စစ်ဆေးရန်ကျန်')} 
          value={loading ? '...' : stats.pending} 
          icon={AlertTriangle} 
          colorClass="bg-amber-50 text-amber-500"
        />
        <MetricCard 
          title={t('Active Deliveries', 'လက်ရှိပို့ဆောင်မှု')} 
          value={loading ? '...' : stats.active} 
          icon={Truck} 
          colorClass="bg-blue-50 text-blue-500"
          trend={12}
        />
        <MetricCard 
          title={t('Completed Today', 'ယနေ့ပြီးစီးမှု')} 
          value={loading ? '...' : stats.delivered} 
          icon={CheckCircle} 
          colorClass="bg-emerald-50 text-emerald-500"
        />
        <MetricCard 
          title={t('Exceptions', 'ထူးခြားဖြစ်စဉ်')} 
          value={loading ? '...' : stats.exceptions} 
          icon={Package} 
          colorClass="bg-rose-50 text-rose-500"
        />
      </div>

      {/* Main Analysis Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              {t('Operational Analytics', 'လုပ်ငန်းပိုင်းဆိုင်ရာ စစ်ဆေးချက်')}
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-primary">{t('View Detailed Report', 'အစီရင်ခံစာအပြည့်အစုံကြည့်ရန်')}</Button>
          </CardHeader>
          <CardContent className="p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-10 h-10 text-slate-200" />
             </div>
             <h3 className="text-lg font-bold text-slate-400 max-w-xs mx-auto">
               {t('Select a branch to view detailed operational analytics', 'အသေးစိတ်အချက်အလက်များကြည့်ရန် ဌာနခွဲတစ်ခု ရွေးချယ်ပါ')}
             </h3>
          </CardContent>
        </Card>

        {/* Alerts Sidebar */}
        <Card className="border-none shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold">{t('Critical Alerts', 'အရေးကြီးအချက်ပေးချက်များ')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
              <div>
                <p className="text-xs font-bold text-rose-600">Substation Overload</p>
                <p className="text-[10px] text-rose-500/80 font-medium">Kamayut Hub reached 95% capacity.</p>
              </div>
            </div>
            {/* More alerts can be mapped here */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}