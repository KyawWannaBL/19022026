import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from '@/components/ui/SharedComponents';
import PageHeader from '@/components/admin/PageHeader';
import EmptyState from '@/components/admin/EmptyState';
import { useLanguageContext } from '@/lib/LanguageContext';
export default function SimpleTransactionPage() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
    const { t } = useLanguageContext();
    return (_jsxs("div", { className: "space-y-6", children: [_jsx(PageHeader, { titleKey: "acct.simpleTransaction", subtitle: t('Write revenue/expense transactions into the database.') }), _jsx(Card, { className: "p-4", children: _jsx(EmptyState, { title: t('Transaction Entry'), description: t('Simple transaction entry interface will be implemented here.') }) })] }));
}
