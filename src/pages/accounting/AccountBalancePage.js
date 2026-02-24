import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from '@/components/ui/SharedComponents';
import PageHeader from '@/components/admin/PageHeader';
import EmptyState from '@/components/admin/EmptyState';
export default function AccountBalancePage() {
    return (_jsxs("div", { className: "space-y-6", children: [_jsx(PageHeader, { titleKey: "acct.accountBalance", subtitle: "Compute balances from entries (scaffold)" }), _jsx(Card, { className: "p-4", children: _jsx(EmptyState, {}) })] }));
}
