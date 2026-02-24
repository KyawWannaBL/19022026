import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardStatProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color: 'blue' | 'orange' | 'green' | 'red' | 'navy';
  className?: string;
}

export const DashboardStat = ({ icon: Icon, label, value, color, className }: DashboardStatProps) => {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    orange: "bg-orange-50 text-[#ff6b00] border-orange-100", // Brand Orange
    green: "bg-green-50 text-green-600 border-green-100",
    red: "bg-red-50 text-red-600 border-red-100",
    navy: "bg-[#0d2c54]/5 text-[#0d2c54] border-[#0d2c54]/10", // Brand Blue
  };

  return (
    <div className={cn("p-6 rounded-3xl border bg-white shadow-sm transition-all hover:shadow-md", className)}>
      <div className="flex items-center gap-4">
        <div className={cn("p-3 rounded-2xl border", colorMap[color])}>
          <Icon size={24} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{label}</p>
          <h3 className="text-xl font-black text-slate-900 tracking-tighter">{value}</h3>
        </div>
      </div>
    </div>
  );
};