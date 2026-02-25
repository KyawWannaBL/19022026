import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useLanguageContext } from "@/lib/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
export default function AccountBalancePage() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
    const { t } = useLanguageContext();
    const [searchTerm, setSearchTerm] = useState("");
    // Mock account data
    const accounts = [
        { code: '1000', name: 'Cash in Hand', balance: 450000, type: 'Asset' },
        { code: '1001', name: 'Bank - KBZ', balance: 2500000, type: 'Asset' },
        { code: '1002', name: 'Bank - CB', balance: 1800000, type: 'Asset' },
        { code: '1100', name: 'Accounts Receivable', balance: 750000, type: 'Asset' },
        { code: '1200', name: 'Inventory', balance: 320000, type: 'Asset' },
        { code: '2000', name: 'Accounts Payable', balance: -180000, type: 'Liability' },
        { code: '2001', name: 'Accrued Expenses', balance: -95000, type: 'Liability' },
        { code: '3000', name: 'Owner\'s Equity', balance: -3000000, type: 'Equity' },
        { code: '4000', name: 'Delivery Revenue', balance: -2450000, type: 'Revenue' },
        { code: '4001', name: 'COD Commission', balance: -350000, type: 'Revenue' },
        { code: '5000', name: 'Fuel Expense', balance: 280000, type: 'Expense' },
        { code: '5001', name: 'Vehicle Maintenance', balance: 150000, type: 'Expense' },
        { code: '5002', name: 'Staff Salaries', balance: 800000, type: 'Expense' },
        { code: '5003', name: 'Office Rent', balance: 120000, type: 'Expense' },
    ];
    const filteredAccounts = accounts.filter(account => account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.code.includes(searchTerm));
    const totalAssets = accounts.filter(a => a.type === 'Asset').reduce((sum, a) => sum + a.balance, 0);
    const totalLiabilities = Math.abs(accounts.filter(a => a.type === 'Liability').reduce((sum, a) => sum + a.balance, 0));
    const totalEquity = Math.abs(accounts.filter(a => a.type === 'Equity').reduce((sum, a) => sum + a.balance, 0));
    const totalRevenue = Math.abs(accounts.filter(a => a.type === 'Revenue').reduce((sum, a) => sum + a.balance, 0));
    const totalExpenses = accounts.filter(a => a.type === 'Expense').reduce((sum, a) => sum + a.balance, 0);
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 p-4", children: _jsxs("div", { className: "max-w-6xl mx-auto space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-3xl font-bold text-white mb-2", children: [t('accounting.accountBalance'), " / \u1005\u102C\u101B\u1004\u103A\u1038\u1000\u102D\u102F\u1004\u103A\u101C\u1000\u103A\u1000\u103B\u1014\u103A"] }), _jsxs("p", { className: "text-gold-300", children: ["Current account balances as of ", new Date().toLocaleDateString()] })] }), _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-400 w-4 h-4" }), _jsx(Input, { placeholder: "Search accounts...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "pl-10 bg-navy-800/50 border-gold-400/30 text-white placeholder:text-gold-300/50" })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-5 gap-4", children: [_jsx(Card, { className: "lotus-card border-gold-400/20", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx(TrendingUp, { className: "w-8 h-8 text-green-400 mx-auto mb-2" }), _jsx("div", { className: "text-lg font-bold text-white", children: totalAssets.toLocaleString() }), _jsx("div", { className: "text-gold-300 text-sm", children: "Total Assets" })] }) }), _jsx(Card, { className: "lotus-card border-gold-400/20", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx(TrendingDown, { className: "w-8 h-8 text-red-400 mx-auto mb-2" }), _jsx("div", { className: "text-lg font-bold text-white", children: totalLiabilities.toLocaleString() }), _jsx("div", { className: "text-gold-300 text-sm", children: "Total Liabilities" })] }) }), _jsx(Card, { className: "lotus-card border-gold-400/20", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx(DollarSign, { className: "w-8 h-8 text-blue-400 mx-auto mb-2" }), _jsx("div", { className: "text-lg font-bold text-white", children: totalEquity.toLocaleString() }), _jsx("div", { className: "text-gold-300 text-sm", children: "Total Equity" })] }) }), _jsx(Card, { className: "lotus-card border-gold-400/20", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx(TrendingUp, { className: "w-8 h-8 text-green-400 mx-auto mb-2" }), _jsx("div", { className: "text-lg font-bold text-white", children: totalRevenue.toLocaleString() }), _jsx("div", { className: "text-gold-300 text-sm", children: "Total Revenue" })] }) }), _jsx(Card, { className: "lotus-card border-gold-400/20", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx(TrendingDown, { className: "w-8 h-8 text-orange-400 mx-auto mb-2" }), _jsx("div", { className: "text-lg font-bold text-white", children: totalExpenses.toLocaleString() }), _jsx("div", { className: "text-gold-300 text-sm", children: "Total Expenses" })] }) })] }), _jsxs(Card, { className: "lotus-card border-gold-400/20", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Account Balances" }) }), _jsx(CardContent, { children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-gold-400/20", children: [_jsx("th", { className: "text-left py-3 px-4 text-gold-300 font-medium", children: "Account Code" }), _jsx("th", { className: "text-left py-3 px-4 text-gold-300 font-medium", children: "Account Name" }), _jsx("th", { className: "text-left py-3 px-4 text-gold-300 font-medium", children: "Type" }), _jsx("th", { className: "text-right py-3 px-4 text-gold-300 font-medium", children: "Balance (MMK)" })] }) }), _jsx("tbody", { children: filteredAccounts.map((account, index) => (_jsxs("tr", { className: "border-b border-navy-800/50 hover:bg-navy-800/20", children: [_jsx("td", { className: "py-3 px-4 text-gold-400 font-mono", children: account.code }), _jsx("td", { className: "py-3 px-4 text-white font-medium", children: account.name }), _jsx("td", { className: "py-3 px-4", children: _jsx("span", { className: `px-2 py-1 rounded-full text-xs font-medium ${account.type === 'Asset' ? 'bg-green-500/20 text-green-300' :
                                                                account.type === 'Liability' ? 'bg-red-500/20 text-red-300' :
                                                                    account.type === 'Equity' ? 'bg-blue-500/20 text-blue-300' :
                                                                        account.type === 'Revenue' ? 'bg-purple-500/20 text-purple-300' :
                                                                            'bg-orange-500/20 text-orange-300'}`, children: account.type }) }), _jsx("td", { className: `py-3 px-4 text-right font-bold ${account.balance >= 0 ? 'text-green-300' : 'text-red-300'}`, children: account.balance.toLocaleString() })] }, index))) })] }) }) })] })] }) }));
}
