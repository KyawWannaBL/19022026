import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/SharedComponents';
import PageHeader from '@/components/admin/PageHeader';
import { useLanguageContext } from '@/lib/LanguageContext';
import { ROUTE_PATHS } from '@/lib/index';
function Tile({ to, title, desc }) {
    return (_jsxs(Link, { to: to, className: "block rounded-2xl border bg-white p-4 shadow-sm hover:bg-slate-50 transition hover:shadow-md", children: [_jsx("div", { className: "font-extrabold text-slate-900", children: title }), _jsx("div", { className: "mt-1 text-sm text-slate-600", children: desc })] }));
}
export default function ReportsHome() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
    const { t } = useLanguageContext();
    return (_jsxs("div", { className: "space-y-6", children: [_jsx(PageHeader, { titleKey: "admin.reports", subtitle: t('Client-side for now. For large datasets, move aggregation to server API later.') }), _jsx(Card, { className: "p-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3", children: [_jsx(Tile, { to: ROUTE_PATHS.REPORTS_DELIVERYMAN, title: t('reports.byDeliveryman'), desc: "Performance and delivery statistics by rider/deliveryman." }), _jsx(Tile, { to: ROUTE_PATHS.REPORTS_MERCHANT, title: t('reports.byMerchant'), desc: "Merchant performance and transaction reports." }), _jsx(Tile, { to: ROUTE_PATHS.REPORTS_TOWN, title: t('reports.byTown'), desc: "Regional delivery statistics and coverage analysis." }), _jsx(Tile, { to: ROUTE_PATHS.REPORTS_AUDIT, title: t('reports.auditLogs'), desc: "System audit trails and user activity logs." }), _jsx(Tile, { to: ROUTE_PATHS.REPORTS_DELIVERY_WAYS, title: t('reports.waysToDeliver'), desc: "Analyze delivery types and methods performance." })] }) })] }));
}
