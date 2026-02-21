import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Truck,
  DollarSign,
  TrendingUp,
  MapPin,
  Search,
  Filter,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  ChevronRight,
  UserPlus,
  Settings
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Cell
} from 'recharts';

import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { logisticsAPI } from '@/services/logistics-api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { springPresets, fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';

const Substation = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const isMM = language === 'my';

  // Translations
  const t = {
    title: isMM ? 'လုပ်ငန်းခွဲ စီမံခန့်ခွဲမှု' : 'Substation Management',
    dashboard: isMM ? 'ပင်မစာမျက်နှာ' : 'Dashboard',
    totalShipments: isMM ? 'စုစုပေါင်း ပစ္စည်းအရေအတွက်' : 'Total Shipments',
    revenue: isMM ? 'ဝင်ငွေစုစုပေါင်း' : 'Total Revenue',
    activeRiders: isMM ? 'အလုပ်ဆင်းနေသော Rider များ' : 'Active Riders',
    deliveryRate: isMM ? 'ပို့ဆောင်မှုနှုန်း' : 'Delivery Rate',
    operations: isMM ? 'လုပ်ငန်းဆောင်ရွက်ချက်များ' : 'Operations',
    staff: isMM ? 'ဝန်ထမ်းများ' : 'Staff Management',
    analytics: isMM ? 'သုံးသပ်ချက်များ' : 'Performance Analytics',
    recentShipments: isMM ? 'မကြာသေးမီက ပစ္စည်းများ' : 'Recent Shipments',
    searchStaff: isMM ? 'ဝန်ထမ်းရှာဖွေရန်...' : 'Search staff...',
    addStaff: isMM ? 'ဝန်ထမ်းသစ်ထည့်ရန်' : 'Add Staff',
    branchInfo: isMM ? 'လုပ်ငန်းခွဲအချက်အလက်' : 'Branch Information',
    status: isMM ? 'အခြေအနေ' : 'Status',
    role: isMM ? 'ရာထူး' : 'Role',
    name: isMM ? 'အမည်' : 'Name',
    performance: isMM ? 'စွမ်းဆောင်ရည်' : 'Performance',
  };

  // Fetch Metrics
  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ['substation-metrics', (user as any)?.branch_id],
    queryFn: () => logisticsAPI.getDashboardMetrics(undefined, (user as any)?.branch_id),
    enabled: !!(user as any)?.branch_id,
  });

  // Fetch Staff
  const { data: staffData, isLoading: staffLoading } = useQuery({
    queryKey: ['substation-staff', (user as any)?.branch_id],
    queryFn: () => logisticsAPI.getProfiles({ branch_id: (user as any)?.branch_id }),
    enabled: !!(user as any)?.branch_id,
  });

  // Filtered Staff
  const filteredStaff = useMemo(() => {
    if (!staffData?.data) return [];
    return staffData.data.filter((s: any) => 
      s.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [staffData, searchQuery]);

  // Mock Performance Data
  const performanceData = [
    { name: 'Mon', shipments: 120, revenue: 4500 },
    { name: 'Tue', shipments: 150, revenue: 5200 },
    { name: 'Wed', shipments: 180, revenue: 6100 },
    { name: 'Thu', shipments: 140, revenue: 4800 },
    { name: 'Fri', shipments: 210, revenue: 7500 },
    { name: 'Sat', shipments: 190, revenue: 6800 },
    { name: 'Sun', shipments: 110, revenue: 3900 },
  ];

  const renderMetricCard = (title: string, value: string | number | undefined, icon: React.ReactNode, trend: string, color: string) => (
    <motion.div variants={staggerItem}>
      <Card className="luxury-card overflow-hidden group">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-primary`}>
              {icon}
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-green-500">
              <TrendingUp size={14} />
              {trend}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">
              {metricsLoading ? <Skeleton className="h-8 w-24" /> : value}
            </h3>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          <div className="flex items-center gap-3 text-primary mb-2">
            <MapPin size={20} className="animate-pulse" />
            <span className="text-sm font-bold tracking-widest uppercase">{t.branchInfo}</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
            {t.title}
            <span className="text-primary ml-2">.</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Managing {(user as any)?.branch?.name || 'Central'} Hub Operations (2026)
          </p>
        </motion.div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-full border-primary/20 hover:border-primary/50">
            <Settings size={18} className="mr-2" />
            {isMM ? 'ဆက်တင်' : 'Settings'}
          </Button>
          <Button className="luxury-button rounded-full px-8">
            {isMM ? 'အစီရင်ခံစာထုတ်ရန်' : 'Export Report'}
          </Button>
        </div>
      </header>

      {/* Metrics Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {renderMetricCard(t.totalShipments, metrics?.metrics?.total_shipments, <Package size={24} />, '+12.5%', 'bg-blue-500')}
        {renderMetricCard(t.revenue, `$${metrics?.metrics?.total_revenue?.toLocaleString()}`, <DollarSign size={24} />, '+8.2%', 'bg-amber-500')}
        {renderMetricCard(t.activeRiders, metrics?.metrics?.active_vehicles, <Truck size={24} />, '+3.1%', 'bg-purple-500')}
        {renderMetricCard(t.deliveryRate, `${metrics?.metrics?.delivery_rate || 94}%`, <Activity size={24} />, '+1.2%', 'bg-green-500')}
      </motion.div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="operations" className="w-full">
        <div className="flex items-center justify-between mb-6">
          <TabsList className="bg-secondary/50 p-1 rounded-xl">
            <TabsTrigger value="operations" className="rounded-lg px-6">{t.operations}</TabsTrigger>
            <TabsTrigger value="staff" className="rounded-lg px-6">{t.staff}</TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-lg px-6">{t.analytics}</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="operations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="luxury-card lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{t.recentShipments}</CardTitle>
                  <CardDescription>Latest 10 shipments processed at this branch</CardDescription>
                </div>
                <Button variant="ghost" className="text-primary hover:text-primary-foreground">
                  View All <ChevronRight size={16} className="ml-1" />
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/50 hover:bg-transparent">
                      <TableHead>AWB</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <TableRow key={i} className="border-border/20 group hover:bg-white/5 transition-colors">
                        <TableCell className="font-mono font-medium text-primary">BRT-2026-00{i}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">Aung Myo</span>
                            <span className="text-xs text-muted-foreground">Yangon, Myanmar</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                            Processing
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-semibold">$45.00</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="luxury-card">
              <CardHeader>
                <CardTitle>Fleet Status</CardTitle>
                <CardDescription>Real-time rider tracking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        R{i}
                      </div>
                      <div>
                        <p className="font-medium">Rider #{i}04</p>
                        <p className="text-xs text-muted-foreground">12 parcels in bag</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Online</Badge>
                  </div>
                ))}
                <Button variant="outline" className="w-full border-dashed border-primary/30 hover:border-primary">
                  Assign New Task
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="staff" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-2xl border border-border/50">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input 
                placeholder={t.searchStaff} 
                className="pl-10 rounded-xl bg-background border-none ring-1 ring-border/50 focus:ring-primary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="rounded-xl">
                <Filter size={18} className="mr-2" />
                Filter
              </Button>
              <Button className="bg-primary text-primary-foreground rounded-xl">
                <UserPlus size={18} className="mr-2" />
                {t.addStaff}
              </Button>
            </div>
          </div>

          <Card className="luxury-card">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50">
                    <TableHead className="pl-6">{t.name}</TableHead>
                    <TableHead>{t.role}</TableHead>
                    <TableHead>{t.status}</TableHead>
                    <TableHead>{t.performance}</TableHead>
                    <TableHead className="pr-6 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staffLoading ? (
                    Array(5).fill(0).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell className="pl-6"><Skeleton className="h-10 w-40" /></TableCell>
                        <TableCell><Skeleton className="h-10 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-10 w-20" /></TableCell>
                        <TableCell><Skeleton className="h-10 w-32" /></TableCell>
                        <TableCell className="pr-6"><Skeleton className="h-10 w-20 ml-auto" /></TableCell>
                      </TableRow>
                    ))
                  ) : (
                    filteredStaff.map((staff: any) => (
                      <TableRow key={staff.id} className="border-border/20 group hover:bg-white/5">
                        <TableCell className="pl-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold text-sm">
                              {staff.full_name.charAt(0)}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium">{staff.full_name}</span>
                              <span className="text-xs text-muted-foreground font-mono">{staff.email}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-white/5 font-normal">{staff.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${staff.status === 'active' ? 'bg-green-500' : 'bg-amber-500'}`} />
                            <span className="capitalize text-sm">{staff.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="w-full max-w-[120px] bg-secondary h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="bg-primary h-full"
                              style={{ width: `${Math.random() * 40 + 60}%` }}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="pr-6 text-right">
                          <Button variant="ghost" size="sm" className="hover:bg-primary/20 hover:text-primary">
                            Manage
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="luxury-card p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Shipment Volume</CardTitle>
                <CardDescription>Daily parcel processing history</CardDescription>
              </CardHeader>
              <div className="h-[350px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorShip" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--muted-foreground)', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--muted-foreground)', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '12px' }}
                      itemStyle={{ color: 'var(--primary)' }}
                    />
                    <Area type="monotone" dataKey="shipments" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorShip)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="luxury-card p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Revenue Insights</CardTitle>
                <CardDescription>COD collection and service fees</CardDescription>
              </CardHeader>
              <div className="h-[350px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--muted-foreground)', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--muted-foreground)', fontSize: 12}} />
                    <Tooltip 
                      cursor={{fill: 'rgba(255,255,255,0.05)'}}
                      contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '12px' }}
                    />
                    <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                      {performanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? 'var(--primary)' : 'var(--accent)'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Substation;