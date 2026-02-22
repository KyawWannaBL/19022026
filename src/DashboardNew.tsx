import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Database, 
  Users, 
  MapPin, 
  Package, 
  Truck, 
  BarChart3, 
  Calculator,
  QrCode,
  Zap,
  CreditCard,
  Warehouse as WarehouseIcon
} from 'lucide-react';
import { ROUTE_PATHS } from '@/lib/index';
import { useLanguage } from '@/contexts/LanguageContext';

function StatCard({
  title,
  icon: Icon,
  value,
  subtitle,
  href,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  value: React.ReactNode;
  subtitle?: string;
  href?: string;
}) {
  const content = (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200 hover:border-primary/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <Icon className="h-5 w-5 text-primary" />
      </div>
      {subtitle && <p className="text-xs text-muted-foreground mb-2">{subtitle}</p>}
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );

  if (href) {
    return <Link to={href}>{content}</Link>;
  }

  return content;
}

function QuickActionCard({
  title,
  description,
  icon: Icon,
  href,
  color = "primary"
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  color?: string;
}) {
  return (
    <Link 
      to={href}
      className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200 hover:border-primary/50 group"
    >
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-lg bg-${color}/10 group-hover:bg-${color}/20 transition-colors`}>
          <Icon className={`h-6 w-6 text-${color}`} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function Dashboard() {
  const { t } = useLanguage();

  // Mock data for demonstration
  const stats = {
    totalShipments: 1247,
    activeDeliveries: 89,
    totalUsers: 156,
    totalRevenue: "₹2,45,670"
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {t('dashboard.title')}
          </h1>
          <p className="text-muted-foreground mt-2">
            Welcome to Britium Express Enterprise Logistics Platform
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          {t('dashboard.signedInAs')} <span className="font-medium">System Administrator</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Shipments"
          icon={Package}
          value={stats.totalShipments.toLocaleString()}
          subtitle="All time shipments"
          href={ROUTE_PATHS.SHIPMENTS}
        />
        <StatCard
          title="Active Deliveries"
          icon={Truck}
          value={stats.activeDeliveries}
          subtitle="Currently in transit"
          href={ROUTE_PATHS.DELIVERY}
        />
        <StatCard
          title="Total Users"
          icon={Users}
          value={stats.totalUsers}
          subtitle="Registered users"
          href={ROUTE_PATHS.USERS}
        />
        <StatCard
          title="Revenue"
          icon={CreditCard}
          value={stats.totalRevenue}
          subtitle="This month"
          href={ROUTE_PATHS.FINANCE}
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-6">
          {t('dashboard.quickLinks')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <QuickActionCard
            title="Operations Center"
            description="Manage daily operations and track performance"
            icon={ShieldCheck}
            href={ROUTE_PATHS.OPERATIONS}
          />
          <QuickActionCard
            title="Parcel Pickup"
            description="Register new parcels and generate QR codes"
            icon={QrCode}
            href={ROUTE_PATHS.PARCEL_PICKUP}
          />
          <QuickActionCard
            title="Shipping Calculator"
            description="Calculate domestic and international shipping rates"
            icon={Calculator}
            href={ROUTE_PATHS.SHIPPING_CALCULATOR}
          />
          <QuickActionCard
            title="Fleet Management"
            description="Monitor vehicles and driver assignments"
            icon={Truck}
            href={ROUTE_PATHS.FLEET}
          />
          <QuickActionCard
            title="Warehouse Operations"
            description="Manage inventory and warehouse activities"
            icon={WarehouseIcon}
            href={ROUTE_PATHS.WAREHOUSE}
          />
          <QuickActionCard
            title="Advanced Logistics"
            description="GPS tracking, route optimization, and signatures"
            icon={Zap}
            href={ROUTE_PATHS.ADVANCED_LOGISTICS}
          />
          <QuickActionCard
            title="Analytics Dashboard"
            description="View reports and performance metrics"
            icon={BarChart3}
            href={ROUTE_PATHS.ANALYTICS}
          />
          <QuickActionCard
            title="User Management"
            description="Manage user accounts and permissions"
            icon={Users}
            href={ROUTE_PATHS.USERS}
          />
          <QuickActionCard
            title="Financial Reports"
            description="View financial data and generate reports"
            icon={CreditCard}
            href={ROUTE_PATHS.FINANCE}
          />
        </div>
      </div>

      {/* System Status */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-muted-foreground">Database: Online</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-muted-foreground">API Services: Active</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-muted-foreground">GPS Tracking: Enabled</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground py-8">
        {t('brand.copyright')}
      </div>
    </div>
  );
}