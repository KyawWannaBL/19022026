import React from 'react';
import { Users, Package, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Shipments', value: '1,284', icon: Package, color: 'text-blue-600' },
    { title: 'Active Sellers', value: '156', icon: Users, color: 'text-emerald-600' },
    { title: 'Revenue (MMK)', value: '4.2M', icon: TrendingUp, color: 'text-orange-600' },
    { title: 'Pending Issues', value: '12', icon: AlertCircle, color: 'text-rose-600' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Admin Overview</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Recent System Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground italic">No recent critical logs found.</p>
        </CardContent>
      </Card>
    </div>
  );
}