import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { useLanguageContext } from "@/lib/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, FileText, DollarSign, TrendingUp, Building, CreditCard, BookOpen, BarChart3 } from "lucide-react";
import { ROUTE_PATHS } from "@/lib/index";
export default function AccountingHome() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
    const { t } = useLanguageContext();
    const navigate = useNavigate();
    const accountingModules = [
        {
            title: t('accounting.journalVoucherEntry'),
            description: "Create journal entries for transactions",
            icon: FileText,
            path: ROUTE_PATHS.ACCOUNTING_JOURNAL,
            color: "bg-blue-500/20 text-blue-400"
        },
        {
            title: t('accounting.journalVoucherList'),
            description: "View all journal vouchers",
            icon: BookOpen,
            path: ROUTE_PATHS.ACCOUNTING_JOURNAL_LIST,
            color: "bg-green-500/20 text-green-400"
        },
        {
            title: t('accounting.cashVoucherEntry'),
            description: "Record cash transactions",
            icon: DollarSign,
            path: ROUTE_PATHS.ACCOUNTING_CASH,
            color: "bg-yellow-500/20 text-yellow-400"
        },
        {
            title: t('accounting.cashVoucherList'),
            description: "View all cash vouchers",
            icon: CreditCard,
            path: ROUTE_PATHS.ACCOUNTING_CASH_LIST,
            color: "bg-purple-500/20 text-purple-400"
        },
        {
            title: t('accounting.chartOfAccounts'),
            description: "Manage chart of accounts",
            icon: BarChart3,
            path: ROUTE_PATHS.ACCOUNTING_CHART,
            color: "bg-orange-500/20 text-orange-400"
        },
        {
            title: t('accounting.accountBalance'),
            description: "View account balances",
            icon: Calculator,
            path: ROUTE_PATHS.ACCOUNTING_BALANCE,
            color: "bg-teal-500/20 text-teal-400"
        },
        {
            title: t('accounting.bankList'),
            description: "Manage bank accounts",
            icon: Building,
            path: ROUTE_PATHS.ACCOUNTING_BANKS,
            color: "bg-indigo-500/20 text-indigo-400"
        },
        {
            title: t('accounting.branchAccounting'),
            description: "Branch-wise accounting",
            icon: TrendingUp,
            path: ROUTE_PATHS.ACCOUNTING_BRANCH,
            color: "bg-pink-500/20 text-pink-400"
        }
    ];
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 p-4", children: _jsxs("div", { className: "max-w-6xl mx-auto space-y-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-3xl font-bold text-white mb-2", children: "Accounting System / \u1005\u102C\u101B\u1004\u103A\u1038\u1000\u102D\u102F\u1004\u103A\u1005\u1014\u1005\u103A" }), _jsx("p", { className: "text-gold-300", children: "Complete financial management for Britium Express" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsx(Card, { className: "lotus-card border-gold-400/20", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx(DollarSign, { className: "w-8 h-8 text-green-400 mx-auto mb-2" }), _jsx("div", { className: "text-xl font-bold text-white", children: "2,450,000" }), _jsx("div", { className: "text-gold-300 text-sm", children: "Total Revenue (MMK)" })] }) }), _jsx(Card, { className: "lotus-card border-gold-400/20", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx(TrendingUp, { className: "w-8 h-8 text-blue-400 mx-auto mb-2" }), _jsx("div", { className: "text-xl font-bold text-white", children: "1,850,000" }), _jsx("div", { className: "text-gold-300 text-sm", children: "Total Expenses (MMK)" })] }) }), _jsx(Card, { className: "lotus-card border-gold-400/20", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx(Calculator, { className: "w-8 h-8 text-yellow-400 mx-auto mb-2" }), _jsx("div", { className: "text-xl font-bold text-white", children: "600,000" }), _jsx("div", { className: "text-gold-300 text-sm", children: "Net Profit (MMK)" })] }) }), _jsx(Card, { className: "lotus-card border-gold-400/20", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx(FileText, { className: "w-8 h-8 text-purple-400 mx-auto mb-2" }), _jsx("div", { className: "text-xl font-bold text-white", children: "156" }), _jsx("div", { className: "text-gold-300 text-sm", children: "Transactions Today" })] }) })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: accountingModules.map((module, index) => (_jsxs(Card, { className: "lotus-card border-gold-400/20 cursor-pointer hover:border-gold-400/50 transition-all", onClick: () => navigate(module.path), children: [_jsxs(CardHeader, { children: [_jsx("div", { className: `w-12 h-12 rounded-full ${module.color} flex items-center justify-center mb-3`, children: _jsx(module.icon, { className: "w-6 h-6" }) }), _jsx(CardTitle, { className: "text-white text-lg", children: module.title })] }), _jsx(CardContent, { children: _jsx("p", { className: "text-gold-300 text-sm", children: module.description }) })] }, index))) })] }) }));
}
