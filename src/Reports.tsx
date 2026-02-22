import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  TrendingUp, 
  DollarSign, 
  Package, 
  Truck, 
  Calendar as CalendarIcon, 
  Filter, 
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  ROUTE_PATHS, 
  formatCurrency, 
  formatDate 
} from '@/lib/index';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock Data for 2026 Logistics Performance
const REVENUE_DATA = [
  { name: 'Jan 2026', revenue: 45000000, costs: 32000000 },
  { name: 'Feb 2026', revenue: 52000000, costs: 35000000 },
  { name: 'Mar 2026', revenue: 48000000, costs: 31000000 },
  { name: 'Apr 2026', revenue: 61000000, costs: 38000000 },
  { name: 'May 2026', revenue: 55000000, costs: 36000000 },
  { name: 'Jun 2026', revenue: 67000000, costs: 41000000 },
];

const SHIPMENT_VOLUME = [
  { name: 'Yangon', value: 4500 },
  { name: 'Mandalay', value: 2800 },
  { name: 'Naypyidaw', value: 1200 },
  { name: 'Taunggyi', value: 900 },
  { name: 'Bago', value: 600 },
];

const COLORS = ['#D4AF37', '#B8941F', '#8A6E14', '#5E4B0E', '#3D3109'];

const RECENT_TRANSACTIONS = [
  { id: 'REP-001', date: '2026-02-19', type: 'Revenue', amount: 1250000, status: 'Completed', branch: 'Yangon Central' },
  { id: 'REP-002', date: '2026-02-18', type: 'COD Payout', amount: 850000, status: 'Processing', branch: 'Mandalay Hub' },
  { id: 'REP-003', date: '2026-02-18', type: 'Fleet Fuel', amount: 450000, status: 'Completed', branch: 'Naypyidaw' },
  { id: 'REP-004', date: '2026-02-17', type: 'Revenue', amount: 2100000, status: 'Completed', branch: 'Yangon Central' },
  { id: 'REP-005', date: '2026-02-17', type: 'Maintenance', amount: 120000, status: 'Completed', branch: 'Taunggyi' },
];

export default function Reports() {
  const { language } = useLanguage();
  const [timeframe, setTimeframe] = useState('monthly');

  const t = {
    en: {
      title: 'Enterprise Intelligence Reports',
      subtitle: 'Comprehensive financial and operational performance analysis for fiscal year 2026.',
      export: 'Export Report',
      financial: 'Financial',
      operations: 'Operations',
      performance: 'Performance',
      compliance: 'Compliance',
      revenueSummary: 'Revenue Summary',
      shipmentVolume: 'Shipment Volume by Region',
      recentActivity: 'Recent Financial Activity',
      stats: {
        totalRevenue: 'Total Revenue',
        totalShipments: 'Total Shipments',
        successRate: 'Delivery Success Rate',
        activeFleet: 'Active Fleet Utilization'
      }
    },
    my: {
      title: 'လုပ်ငန်းဆိုင်ရာ အစီရင်ခံစာများ',
      subtitle: '၂၀၂၆ ဘဏ္ဍာရေးနှစ်အတွက် ငွေကြေးနှင့် လုပ်ငန်းဆောင်ရွက်မှု ခွဲခြမ်းစိတ်ဖြာချက်များ။',
      export: 'အစီရင်ခံစာ ထုတ်ယူရန်',
      financial: 'ဘဏ္ဍာရေး',
      operations: 'လုပ်ငန်းလည်ပတ်မှု',
      performance: 'စွမ်းဆောင်ရည်',
      compliance: 'လိုက်နာမှု',
      revenueSummary: 'ဝင်ငွေအကျဉ်းချုပ်',
      shipmentVolume: 'တိုင်းဒေသကြီးအလိုက် ပို့ဆောင်မှုပမာဏ',
      recentActivity: 'မကြာသေးမီက ငွေကြေးလှုပ်ရှားမှုများ',
      stats: {
        totalRevenue: 'စုစုပေါင်းဝင်ငွေ',
        totalShipments: 'စုစုပေါင်းပို့ဆောင်မှု',
        successRate: 'အောင်မြင်မှုနှုန်း',
        activeFleet: 'ယာဉ်အုပ်စု အသုံးပြုမှု'
      }
    }
  };

  const currentT = t[language as keyof typeof t] || t.en;

  return (
    <div className="min-h-screen bg-background p-6 space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-heading">
            {currentT.title}
          </h1>
          <p className="text-muted-foreground">
            {currentT.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="2026">
            <SelectTrigger className="w-[120px] bg-card border-border">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
            </SelectContent>
          </Select>
          <Button className="luxury-button h-10 px-6">
            <Download className="mr-2 h-4 w-4" />
            {currentT.export}
          </Button>
        </div>
      </header>

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[ 
          { label: currentT.stats.totalRevenue, value: '328.4M', change: '+12.5%', icon: DollarSign, trend: 'up' },
          { label: currentT.stats.totalShipments, value: '10,842', change: '+8.2%', icon: Package, trend: 'up' },
          { label: currentT.stats.successRate, value: '98.4%', change: '-0.2%', icon: TrendingUp, trend: 'down' },
          { label: currentT.stats.activeFleet, value: '84%', change: '+4.1%', icon: Truck, trend: 'up' },
        ].map((metric, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="luxury-card">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <metric.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className={`flex items-center text-xs font-medium ${metric.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {metric.change}
                    {metric.trend === 'up' ? <ArrowUpRight className="h-3 w-3 ml-1" /> : <ArrowDownRight className="h-3 w-3 ml-1" />}
                  </div>
                </div>
                <div className="mt-4 space-y-1">
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-2xl font-bold font-mono">{metric.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Detailed Reports Tabs */}
      <Tabs defaultValue="financial" className="w-full space-y-6">
        <TabsList className="bg-card border border-border p-1 rounded-xl h-auto">
          <TabsTrigger value="financial" className="rounded-lg py-2 px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            {currentT.financial}
          </TabsTrigger>
          <TabsTrigger value="operations" className="rounded-lg py-2 px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            {currentT.operations}
          </TabsTrigger>
          <TabsTrigger value="performance" className="rounded-lg py-2 px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            {currentT.performance}
          </TabsTrigger>
          <TabsTrigger value="compliance" className="rounded-lg py-2 px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            {currentT.compliance}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Trend Chart */}
            <Card className="lg:col-span-2 luxury-card overflow-hidden">
              <CardHeader className="border-b border-border/50">
                <CardTitle className="text-lg">{currentT.revenueSummary} (2026)</CardTitle>
                <CardDescription>Monthly comparison of gross revenue vs operational costs</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={REVENUE_DATA}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#71717a" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="#71717a" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false}
                      tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0B0C10', border: '1px solid #27272a', borderRadius: '12px' }}
                      formatter={(value: number) => [formatCurrency(value), 'MMK']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="var(--primary)" 
                      fillOpacity={1} 
                      fill="url(#colorRevenue)" 
                      strokeWidth={3}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="costs" 
                      stroke="#71717a" 
                      fillOpacity={0.1} 
                      fill="#71717a" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Region Distribution */}
            <Card className="luxury-card overflow-hidden">
              <CardHeader className="border-b border-border/50">
                <CardTitle className="text-lg">{currentT.shipmentVolume}</CardTitle>
                <CardDescription>Active delivery volume across hubs</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={SHIPMENT_VOLUME}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {SHIPMENT_VOLUME.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0B0C10', border: '1px solid #27272a', borderRadius: '12px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                   {SHIPMENT_VOLUME.map((item, i) => (
                     <div key={item.name} className="flex items-center justify-between text-sm">
                       <div className="flex items-center gap-2">
                         <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                         <span className="text-muted-foreground">{item.name}</span>
                       </div>
                       <span className="font-mono font-medium">{item.value}</span>
                     </div>
                   ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transaction Table */}
          <Card className="luxury-card">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/50">
              <div>
                <CardTitle className="text-lg">{currentT.recentActivity}</CardTitle>
                <CardDescription>Audit trail for financial settlements and payouts</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="border-border hover:bg-muted">
                View All
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border/50">
                    <TableHead className="w-[120px] text-muted-foreground">ID</TableHead>
                    <TableHead className="text-muted-foreground">Date</TableHead>
                    <TableHead className="text-muted-foreground">Type</TableHead>
                    <TableHead className="text-muted-foreground">Branch</TableHead>
                    <TableHead className="text-muted-foreground">Amount</TableHead>
                    <TableHead className="text-right text-muted-foreground">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {RECENT_TRANSACTIONS.map((tx) => (
                    <TableRow key={tx.id} className="border-border/50 hover:bg-primary/5 transition-colors">
                      <TableCell className="font-mono text-xs">{tx.id}</TableCell>
                      <TableCell className="text-sm">{formatDate(tx.date)}</TableCell>
                      <TableCell className="text-sm">{tx.type}</TableCell>
                      <TableCell className="text-sm">{tx.branch}</TableCell>
                      <TableCell className="font-mono font-medium">
                        {formatCurrency(tx.amount)}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          tx.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                        }`}>
                          {tx.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operations" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="luxury-card h-[300px] flex flex-col items-center justify-center text-center p-8">
            <Package className="h-12 w-12 text-primary/40 mb-4" />
            <h3 className="text-xl font-semibold">Operations Report</h3>
            <p className="text-muted-foreground max-w-xs mt-2">Detailed analysis of package flow, bottleneck detection, and delivery latency metrics.</p>
            <Button variant="outline" className="mt-6 border-primary/30">Download PDF</Button>
          </Card>
          <Card className="luxury-card h-[300px] flex flex-col items-center justify-center text-center p-8">
            <Truck className="h-12 w-12 text-primary/40 mb-4" />
            <h3 className="text-xl font-semibold">Fleet Maintenance</h3>
            <p className="text-muted-foreground max-w-xs mt-2">Fuel consumption efficiency, maintenance schedules, and vehicle downtime reports.</p>
            <Button variant="outline" className="mt-6 border-primary/30">Download PDF</Button>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="flex items-center justify-center h-[400px] border border-dashed border-border rounded-2xl">
          <div className="text-center space-y-4">
            <TrendingUp className="h-16 w-16 text-muted-foreground/20 mx-auto" />
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Performance Benchmarks</h3>
              <p className="text-muted-foreground">Advanced analytics module is generating quarterly performance scores.</p>
            </div>
            <Button disabled className="opacity-50 cursor-not-allowed">
              Generating Report...
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
           <Card className="luxury-card">
              <CardHeader>
                <CardTitle>Compliance & Safety Audit</CardTitle>
                <CardDescription>Quarterly audit results for safety protocols and regulatory compliance in 2026.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[ 
                    { title: 'Dangerous Goods Handling', score: '99.2%', status: 'Pass' },
                    { title: 'Driver Hours Regulation', score: '97.5%', status: 'Pass' },
                    { title: 'Warehouse Safety Standards', score: '92.1%', status: 'Warning' },
                    { title: 'Data Privacy & GDPR (MM)', score: '100%', status: 'Pass' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-border/50">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-xs text-muted-foreground">Score: {item.score}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        item.status === 'Pass' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20 text-amber-500'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
