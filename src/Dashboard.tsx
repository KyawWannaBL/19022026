import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  Truck,
  CheckCircle,
  DollarSign,
  AlertCircle,
  TrendingUp,
  Clock,
  MapPin,
  ChevronRight,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { 
  ROUTE_PATHS, 
  formatDate, 
  formatCurrency, 
  Shipment, 
  ShipmentStatus 
} from '@/lib/index';
import { useLanguage } from '@/contexts/LanguageContext';
import { StatusBadge } from '@/components/StatusBadge';
import { AuditFeed } from '@/components/AuditFeed';
import { IMAGES } from '@/assets/images';
import { logisticsAPI } from '@/services/logistics-api';
import type { DashboardMetrics, Shipment as APIShipment } from '@/services/logistics-api';

// Internal sub-components to maintain file structure constraints
const MetricsCard = ({ title, value, icon: Icon, trend }: any) => (
  <div className="luxury-card p-6 flex flex-col gap-4">
    <div className="flex items-center justify-between">
      <div className="p-2 rounded-xl bg-primary/10">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-medium ${trend.isPositive ? 'text-emerald-500' : 'text-destructive'}`}>
          {trend.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trend.value}%
        </div>
      )}
    </div>
    <div>
      <p className="text-sm text-muted-foreground font-medium">{title}</p>
      <h3 className="text-2xl font-bold tracking-tight mt-1">{value}</h3>
    </div>
  </div>
);

const FleetStatusCard = ({ vehicle }: any) => (
  <div className="luxury-card p-4 flex items-center gap-4">
    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center border border-border">
      <Truck className="w-6 h-6 text-primary" />
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold">{vehicle.plateNumber}</span>
        <StatusBadge status={vehicle.status} type="delivery" size="sm" />
      </div>
      <div className="flex items-center gap-2 mt-1">
        <div className="w-full bg-muted rounded-full h-1.5">
          <div 
            className="bg-primary h-1.5 rounded-full" 
            style={{ width: `${vehicle.fuelLevel}%` }}
          />
        </div>
        <span className="text-[10px] text-muted-foreground whitespace-nowrap">Fuel: {vehicle.fuelLevel}%</span>
      </div>
    </div>
  </div>
);

/**
 * Main Dashboard Page for Enterprise Logistics Platform
 * Current Year: 2026
 */
export default function Dashboard() {
  const { language, t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [recentShipments, setRecentShipments] = useState<APIShipment[]>([]);
  const [dashboardMetrics, setDashboardMetrics] = useState<DashboardMetrics | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Load dashboard data from backend
  const loadDashboardData = async () => {
    try {
      setError(null);
      
      // Load dashboard metrics
      const metricsResponse = await logisticsAPI.getDashboardMetrics();
      if (metricsResponse.success) {
        setDashboardMetrics(metricsResponse.metrics);
      }

      // Load recent shipments
      const shipmentsResponse = await logisticsAPI.getShipments({ limit: 10 });
      if (shipmentsResponse.success) {
        setRecentShipments(shipmentsResponse.shipments);
      }
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
  };

  // Fallback metrics for demo purposes
  const fallbackMetrics = {
    totalShipments: 1428,
    activeDeliveries: 342,
    onTimeDeliveryRate: 98.4,
    revenueToday: 12450000,
    fleetUtilization: 82,
    hourlyVolume: [
      { hour: '08:00', count: 120 },
      { hour: '10:00', count: 250 },
      { hour: '12:00', count: 180 },
      { hour: '14:00', count: 320 },
      { hour: '16:00', count: 410 },
      { hour: '18:00', count: 290 },
    ],
    statusDistribution: [
      { name: t('inTransit'), value: 45, color: 'var(--chart-1)' },
      { name: t('delivered'), value: 35, color: 'var(--chart-5)' },
      { name: t('pending'), value: 15, color: 'var(--chart-2)' },
      { name: t('exception'), value: 5, color: 'var(--destructive)' },
    ]
  };

  const metrics = dashboardMetrics ? {
    totalShipments: dashboardMetrics.total_shipments,
    activeDeliveries: dashboardMetrics.pending_shipments,
    onTimeDeliveryRate: dashboardMetrics.delivery_rate,
    revenueToday: dashboardMetrics.total_revenue,
    fleetUtilization: 82, // This would come from vehicle data
    hourlyVolume: fallbackMetrics.hourlyVolume, // This would need separate API
    statusDistribution: fallbackMetrics.statusDistribution
  } : fallbackMetrics;

  const fleetVehicles = [
    { id: 'V-201', plateNumber: 'YGN-2026-A1', status: 'ACTIVE', fuelLevel: 85 },
    { id: 'V-205', plateNumber: 'MDY-2026-C4', status: 'MAINTENANCE', fuelLevel: 42 },
    { id: 'V-210', plateNumber: 'YGN-2026-B9', status: 'ACTIVE', fuelLevel: 92 },
  ];

  useEffect(() => {
    // Load dashboard data on component mount
    loadDashboardData();
  }, []);

  // Fallback recent shipments for demo
  const fallbackShipments = [
    {
      id: 'SHP-99210',
      trackingNumber: 'BRT-2026-99210',
      status: 'IN_TRANSIT',
      destination: 'Yangon Central',
      created_at: '2026-02-19T10:30:00Z',
      senderName: 'Premium Merchant A'
    },
    {
      id: 'SHP-99211',
      trackingNumber: 'BRT-2026-99211',
      status: 'EXCEPTION',
      destination: 'Mandalay Hub',
      created_at: '2026-02-19T11:15:00Z',
      senderName: 'Express Logistics Co.'
    },
    {
      id: 'SHP-99212',
      trackingNumber: 'BRT-2026-99212',
      status: 'PICKED_UP',
      destination: 'Naypyidaw',
      created_at: '2026-02-19T12:00:00Z',
      senderName: 'Global Trade Ltd.'
    }
  ];

  // Use real data if available, otherwise fallback
  const displayShipments = recentShipments.length > 0 ? recentShipments : fallbackShipments;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { type: 'spring', stiffness: 300, damping: 30 } 
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground font-medium animate-pulse">
            {language === 'my' ? 'ဒေတာများကို ရယူနေပါသည်...' : 'Syncing real-time logistics data...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-6 lg:p-10 min-h-screen bg-background">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-sans">
            {language === 'my' ? 'လုပ်ငန်းဆောင်ရွက်မှု အနှစ်ချုပ်' : 'Operational Overview'}
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Clock className="w-4 h-4" />
            <span>{language === 'my' ? 'နောက်ဆုံးအပ်ဒိတ်' : 'Last Updated'}: Feb 19, 2026 — 12:39:16</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-secondary/50 backdrop-blur-sm rounded-lg flex items-center gap-2 border border-border shadow-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-foreground">
              {language === 'my' ? 'စနစ်အဆင်သင့်ဖြစ်သည်' : 'System Live'}
            </span>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-[2rem] h-48 lg:h-64 border border-border group">
        <img 
          src={IMAGES.DASHBOARD_ANALYTICS_2} 
          alt="Logistics Analytics" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        <div className="relative h-full flex flex-col justify-center px-8 lg:px-12 max-w-2xl">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-3 font-sans">
            Fleet Optimization 2026
          </h2>
          <p className="text-muted-foreground text-sm lg:text-base mb-6 max-w-md">
            Monitoring {metrics.activeDeliveries} active shipments and {metrics.fleetUtilization}% fleet utilization across the Myanmar hub network.
          </p>
          <div className="flex items-center gap-4">
            <button className="luxury-button">
              {language === 'my' ? 'လမ်းကြောင်းများကို အကောင်းဆုံးလုပ်ရန်' : 'Optimize Routes'}
            </button>
          </div>
        </div>
      </section>

      {/* Top Metrics Row */}
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <motion.div variants={itemVariants}>
          <MetricsCard 
            title="Total Shipments Today"
            value={metrics.totalShipments}
            icon={Package}
            trend={{ value: 12.5, isPositive: true }}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <MetricsCard 
            title="Active Deliveries"
            value={metrics.activeDeliveries}
            icon={Truck}
            trend={{ value: 8.2, isPositive: true }}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <MetricsCard 
            title="On-Time Rate"
            value={`${metrics.onTimeDeliveryRate}%`}
            icon={CheckCircle}
            trend={{ value: 0.5, isPositive: true }}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <MetricsCard 
            title="Revenue (Today)"
            value={formatCurrency(metrics.revenueToday, 'MMK')}
            icon={DollarSign}
            trend={{ value: 4.3, isPositive: true }}
          />
        </motion.div>
      </motion.div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Volume Chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-[2rem] p-8 shadow-luxury">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold">Shipment Volume</h3>
              <p className="text-xs text-muted-foreground">Traffic flow across all hubs (Last 24h)</p>
            </div>
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics.hourlyVolume}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="hour" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: 'oklch(0.7 0.01 50)' }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: 'oklch(0.7 0.01 50)' }}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(212, 175, 55, 0.05)' }}
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    borderColor: 'var(--border)',
                    borderRadius: '12px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                />
                <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-card border border-border rounded-[2rem] p-8 shadow-luxury">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold">Live Cargo Status</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-6">Real-time status breakdown</p>
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={metrics.statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {metrics.statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-6">
            {metrics.statusDistribution.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-secondary/30">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.name}</span>
                  <span className="text-xs font-bold">{item.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Operational Details Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Critical Attention / Recent Shipments */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              <h3 className="text-lg font-bold">Recent Shipments</h3>
            </div>
            <button className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">
              {language === 'my' ? 'အားလုံးကြည့်ရန်' : 'View All'}
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {recentShipments.map((shipment) => (
              <div 
                key={shipment.id} 
                className="luxury-card p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-secondary group-hover:bg-primary/20 transition-colors">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold tracking-tight">{shipment.awb_number}</p>
                    <p className="text-xs text-muted-foreground">{shipment.sender_name} • {shipment.receiver_city}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="hidden md:block text-right">
                    <p className="text-xs font-medium text-muted-foreground">{formatDate(shipment.created_at || '')}</p>
                    <p className="text-[10px] uppercase tracking-tighter">Created At</p>
                  </div>
                  <StatusBadge status={shipment.status} type="shipment" />
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fleet & Audit Sidebar */}
        <div className="space-y-8">
          {/* Fleet Status Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold">Fleet Status</h3>
              </div>
              <span className="text-[10px] font-bold text-primary px-2 py-1 bg-primary/10 rounded-full">
                {metrics.fleetUtilization}% USE
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {fleetVehicles.map((vehicle) => (
                <FleetStatusCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          </div>

          {/* System Audit Feed Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-1">
              <Activity className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold">System Activity</h3>
            </div>
            <div className="luxury-card p-4 min-h-[300px]">
              <AuditFeed maxEntries={5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
