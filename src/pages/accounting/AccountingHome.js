import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/SharedComponents';
import PageHeader from '@/components/admin/PageHeader';
import { useLanguageContext } from '@/lib/LanguageContext';
import { ROUTE_PATHS } from '@/lib/index';
function Tile({ to, title, desc }) {
    return (_jsxs(Link, { to: to, className: "block rounded-2xl border bg-white p-4 shadow-sm hover:bg-slate-50 transition hover:shadow-md", children: [_jsx("div", { className: "font-extrabold text-slate-900", children: title }), _jsx("div", { className: "mt-1 text-sm text-slate-600", children: desc })] }));
}
export default function AccountingHome() {
    const { t } = useLanguageContext();
    return (_jsxs("div", { className: "space-y-6", children: [_jsx(PageHeader, { titleKey: "admin.accounting", subtitle: t('Client-side for now. For large data, move KPI/ledger aggregation to your private server and call via API.') }), _jsx(Card, { className: "p-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3", children: [_jsx(Tile, { to: ROUTE_PATHS.ACCOUNTING_TRANSACTIONS, title: t('acct.simpleTransaction'), desc: "Write revenue/expense into database financials collection." }), _jsx(Tile, { to: ROUTE_PATHS.ACCOUNTING_JOURNAL, title: t('acct.journalVoucher') + ' Entry', desc: "Scaffold (to be implemented) for double-entry vouchers." }), _jsx(Tile, { to: ROUTE_PATHS.ACCOUNTING_JOURNAL_LIST, title: t('acct.journalVoucher') + ' List', desc: "Scaffold list + export." }), _jsx(Tile, { to: ROUTE_PATHS.ACCOUNTING_CASH, title: t('acct.cashVoucher') + ' Entry', desc: "Scaffold entry." }), _jsx(Tile, { to: ROUTE_PATHS.ACCOUNTING_CASH_LIST, title: t('acct.cashVoucher') + ' List', desc: "Scaffold list." }), _jsx(Tile, { to: ROUTE_PATHS.ACCOUNTING_CHART, title: t('acct.chartOfAccounts'), desc: "Scaffold CRUD for accounts." }), _jsx(Tile, { to: ROUTE_PATHS.ACCOUNTING_BALANCE, title: t('acct.accountBalance'), desc: "Compute balances from entries (scaffold)." }), _jsx(Tile, { to: ROUTE_PATHS.ACCOUNTING_BANKS, title: t('acct.bankList'), desc: "Manage banks collection (scaffold)." }), _jsx(Tile, { to: ROUTE_PATHS.ACCOUNTING_BRANCH, title: t('acct.branchAccounting'), desc: "Branch accounting snapshots (scaffold)." })] }) })] }));
}
