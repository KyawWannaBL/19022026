import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatCurrency, getStatusVariant } from "@/lib/index";
import { ShieldAlert, ArrowUpRight, ArrowDownRight, FileText, Activity } from "lucide-react";

export default function FinancialReportPage() {
  const { t } = useTranslation();
  const [reportType, setReportType] = useState<'LEDGER' | 'PL' | 'CASHFLOW'>('LEDGER');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 font-sans">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extralight tracking-tight text-zinc-900">
            Financial <span className="font-semibold text-[#D4AF37]">Intelligence</span>
          </h1>
          <p className="text-zinc-500 text-sm">Centralized Ledger & Anti-Fraud Monitoring</p>
        </div>
        
        <div className="flex bg-zinc-100 p-1 rounded-xl border border-zinc-200">
          {(['LEDGER', 'PL', 'CASHFLOW'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setReportType(type)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                reportType === type ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-400 hover:text-zinc-600'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </header>

      {/* Fraud Alert & KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-none shadow-2xl bg-zinc-900 text-white md:col-span-2">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-[#D4AF37] mb-2">
              <ShieldAlert className="h-4 w-4" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Audit Enforcement Active</span>
            </div>
            <p className="text-zinc-400 text-xs">Total Reconciled Cash (MMK)</p>
            <h2 className="text-4xl font-medium mt-1">245,670,000</h2>
            <div className="mt-4 flex gap-4 text-[10px] font-mono opacity-60">
              <span>INCOME: +12.5%</span>
              <span>EXPENDITURE: -2.1%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-100 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <p className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider">Unsettled COD</p>
              <Activity className="h-4 w-4 text-orange-500" />
            </div>
            <h2 className="text-2xl font-semibold mt-1 text-zinc-800">{formatCurrency(15400000)}</h2>
          </CardContent>
        </Card>

        <Card className="border-zinc-100 shadow-sm">
          <CardContent className="pt-6 text-green-600">
            <div className="flex justify-between items-start">
              <p className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider">Net Profit (P&L)</p>
              <ArrowUpRight className="h-4 w-4" />
            </div>
            <h2 className="text-2xl font-semibold mt-1">82,450,000</h2>
          </CardContent>
        </Card>
      </div>

      {/* Dynamic Report View */}
      <Card className="border-zinc-100 shadow-xl rounded-[2rem] overflow-hidden">
        <CardHeader className="bg-zinc-50/50 border-b border-zinc-100 flex flex-row items-center justify-between">
          <CardTitle className="text-sm uppercase tracking-widest text-zinc-500 flex items-center gap-2">
            <FileText className="h-4 w-4" />
            {reportType === 'LEDGER' ? 'General Ledger Transaction Flow' : 'Financial Statement Analysis'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-zinc-50 text-zinc-400 text-[10px] uppercase font-bold tracking-tighter">
                <tr>
                  <th className="px-6 py-4">Ref ID</th>
                  <th className="px-6 py-4">Entity/Account</th>
                  <th className="px-6 py-4">Flow Type</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Auth Hash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs">TRX-9921</td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-zinc-800">Income: Delivery Fee</p>
                    <p className="text-[10px] text-zinc-400">Station A -> General Account</p>
                  </td>
                  <td className="px-6 py-4"><span className="text-green-600 text-xs font-bold">+ CASH IN</span></td>
                  <td className="px-6 py-4 font-bold">{formatCurrency(4500)}</td>
                  <td className="px-6 py-4 text-[8px] text-zinc-300">SH256:882x...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}