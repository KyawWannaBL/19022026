import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useLanguageContext } from "@/lib/LanguageContext";
import { MessageSquare, Clock, CheckCircle, AlertCircle, Star, TrendingUp, Phone, Mail, User, Calendar } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CustomerServiceAPI } from "@/lib/admin-api";
export default function CustomerServiceDashboard() {
    const { t } = useLanguageContext();
    const [interactions, setInteractions] = useState([]);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState('all');
    useEffect(() => {
        loadCustomerServiceData();
    }, []);
    const loadCustomerServiceData = async () => {
        try {
            setLoading(true);
            const [interactionsData, statsData] = await Promise.all([
                CustomerServiceAPI.list(),
                CustomerServiceAPI.getStats()
            ]);
            setInteractions(interactionsData);
            setStats(statsData);
        }
        catch (error) {
            console.error('Error loading customer service data:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleUpdateInteraction = async (id, updates) => {
        try {
            await CustomerServiceAPI.update(id, updates);
            loadCustomerServiceData();
        }
        catch (error) {
            console.error('Error updating interaction:', error);
        }
    };
    const filteredInteractions = interactions.filter(interaction => {
        if (selectedFilter === 'all')
            return true;
        return interaction.status === selectedFilter;
    });
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'urgent': return 'bg-red-100 text-red-800';
            case 'high': return 'bg-orange-100 text-orange-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'open': return 'bg-blue-100 text-blue-800';
            case 'in_progress': return 'bg-yellow-100 text-yellow-800';
            case 'resolved': return 'bg-green-100 text-green-800';
            case 'closed': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    if (loading) {
        return (_jsx("div", { className: "p-6", children: _jsx("div", { className: "text-center py-8", children: _jsx("div", { className: "text-lg", children: t('common.loading') }) }) }));
    }
    return (_jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-2xl font-bold text-gray-900", children: [t("cs.dashboard"), " / \u1016\u1031\u102C\u1000\u103A\u101E\u100A\u103A \u101D\u1014\u103A\u1006\u1031\u102C\u1004\u103A\u1019\u103E\u102F \u1012\u1000\u103A\u101B\u103E\u103A\u1018\u102F\u1010\u103A"] }), _jsx("p", { className: "text-gray-600 mt-1", children: "Manage customer interactions and support tickets / \u1016\u1031\u102C\u1000\u103A\u101E\u100A\u103A \u1006\u1000\u103A\u101E\u103D\u101A\u103A\u1019\u103E\u102F\u1019\u103B\u102C\u1038\u1014\u103E\u1004\u1037\u103A \u1015\u1036\u1037\u1015\u102D\u102F\u1038\u1019\u103E\u102F \u1010\u1031\u102C\u1004\u103A\u1038\u1006\u102D\u102F\u1019\u103E\u102F\u1019\u103B\u102C\u1038\u1000\u102D\u102F \u1005\u102E\u1019\u1036\u1015\u102B" })] }), _jsx("div", { className: "flex gap-2", children: _jsxs("select", { value: selectedFilter, onChange: (e) => setSelectedFilter(e.target.value), className: "px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", children: [_jsx("option", { value: "all", children: "All Tickets / \u1021\u102C\u1038\u101C\u102F\u1036\u1038" }), _jsxs("option", { value: "open", children: [t("cs.open"), " / \u1016\u103D\u1004\u1037\u103A\u1011\u102C\u1038\u101E\u1031\u102C"] }), _jsxs("option", { value: "in_progress", children: [t("cs.inProgress"), " / \u101C\u102F\u1015\u103A\u1006\u1031\u102C\u1004\u103A\u1014\u1031\u101E\u1031\u102C"] }), _jsxs("option", { value: "resolved", children: [t("cs.resolved"), " / \u1016\u103C\u1031\u101B\u103E\u1004\u103A\u1038\u1015\u103C\u102E\u1038\u101E\u1031\u102C"] }), _jsxs("option", { value: "closed", children: [t("cs.closed"), " / \u1015\u102D\u1010\u103A\u1011\u102C\u1038\u101E\u1031\u102C"] })] }) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [_jsx(KPICard, { icon: MessageSquare, label: t("cs.totalInteractions") + " / စုစုပေါင်း ဆက်သွယ်မှုများ", value: stats.total || 0, color: "blue", trend: "+8%" }), _jsx(KPICard, { icon: AlertCircle, label: t("cs.openTickets") + " / ဖွင့်ထားသော တောင်းဆိုမှုများ", value: stats.open || 0, color: "orange", trend: "-5%" }), _jsx(KPICard, { icon: CheckCircle, label: t("cs.resolvedTickets") + " / ဖြေရှင်းပြီးသော တောင်းဆိုမှုများ", value: stats.resolved || 0, color: "green", trend: "+12%" }), _jsx(KPICard, { icon: Star, label: t("cs.avgSatisfactionRating") + " / ပျမ်းမျှ ကျေနပ်မှု အဆင့်", value: `${stats.avgRating || 0}/5`, color: "purple", trend: "+0.3" })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Performance Metrics / \u1005\u103D\u1019\u103A\u1038\u1006\u1031\u102C\u1004\u103A\u101B\u100A\u103A \u1019\u1000\u103A\u1011\u101B\u1005\u103A\u1019\u103B\u102C\u1038" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between p-3 bg-blue-50 rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Clock, { className: "w-5 h-5 text-blue-600" }), _jsxs("span", { className: "font-medium", children: [t("cs.responseTime"), " / \u1015\u103B\u1019\u103A\u1038\u1019\u103B\u103E \u1010\u102F\u1036\u1037\u1015\u103C\u1014\u103A\u1019\u103E\u102F \u1021\u1001\u103B\u102D\u1014\u103A"] })] }), _jsx("span", { className: "text-xl font-bold text-blue-600", children: "2.5h" })] }), _jsxs("div", { className: "flex items-center justify-between p-3 bg-green-50 rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(CheckCircle, { className: "w-5 h-5 text-green-600" }), _jsxs("span", { className: "font-medium", children: [t("cs.resolutionRate"), " / \u1016\u103C\u1031\u101B\u103E\u1004\u103A\u1038\u1019\u103E\u102F \u1014\u103E\u102F\u1014\u103A\u1038"] })] }), _jsxs("span", { className: "text-xl font-bold text-green-600", children: [stats.resolutionRate || 0, "%"] })] }), _jsxs("div", { className: "flex items-center justify-between p-3 bg-purple-50 rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Star, { className: "w-5 h-5 text-purple-600" }), _jsx("span", { className: "font-medium", children: "Customer Satisfaction / \u1016\u1031\u102C\u1000\u103A\u101E\u100A\u103A \u1000\u103B\u1031\u1014\u1015\u103A\u1019\u103E\u102F" })] }), _jsxs("span", { className: "text-xl font-bold text-purple-600", children: [stats.avgRating || 0, "/5 \u2B50"] })] })] }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Interaction Types / \u1006\u1000\u103A\u101E\u103D\u101A\u103A\u1019\u103E\u102F \u1021\u1019\u103B\u102D\u102F\u1038\u1021\u1005\u102C\u1038\u1019\u103B\u102C\u1038" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: Object.entries(stats.byType || {}).map(([type, count]) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { className: "text-sm capitalize", children: [type.replace('_', ' '), " / ", t(`cs.${type}`) || type] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-20 bg-gray-200 rounded-full h-2", children: _jsx("div", { className: "bg-blue-500 h-2 rounded-full", style: { width: `${(count / stats.total) * 100}%` } }) }), _jsx("span", { className: "text-sm font-medium w-8", children: count })] })] }, type))) }) })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Recent Interactions / \u101C\u1010\u103A\u1010\u101C\u1031\u102C \u1006\u1000\u103A\u101E\u103D\u101A\u103A\u1019\u103E\u102F\u1019\u103B\u102C\u1038" }) }), _jsx(CardContent, { children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b", children: [_jsxs("th", { className: "text-left py-3 px-4", children: [t("cs.customerName"), " / \u1016\u1031\u102C\u1000\u103A\u101E\u100A\u103A \u1021\u1019\u100A\u103A"] }), _jsxs("th", { className: "text-left py-3 px-4", children: [t("cs.subject"), " / \u1021\u1000\u103C\u1031\u102C\u1004\u103A\u1038\u1021\u101B\u102C"] }), _jsxs("th", { className: "text-left py-3 px-4", children: [t("cs.interactionType"), " / \u1021\u1019\u103B\u102D\u102F\u1038\u1021\u1005\u102C\u1038"] }), _jsxs("th", { className: "text-left py-3 px-4", children: [t("cs.priority"), " / \u1026\u1038\u1005\u102C\u1038\u1015\u1031\u1038\u1019\u103E\u102F"] }), _jsxs("th", { className: "text-left py-3 px-4", children: [t("admin.status"), " / \u1021\u1001\u103C\u1031\u1021\u1014\u1031"] }), _jsx("th", { className: "text-left py-3 px-4", children: "Created / \u1016\u1014\u103A\u1010\u102E\u1038\u101E\u100A\u1037\u103A\u1021\u1001\u103B\u102D\u1014\u103A" }), _jsxs("th", { className: "text-left py-3 px-4", children: [t("admin.action"), " / \u101C\u102F\u1015\u103A\u1006\u1031\u102C\u1004\u103A\u1001\u103B\u1000\u103A"] })] }) }), _jsx("tbody", { children: filteredInteractions.slice(0, 10).map((interaction) => (_jsxs("tr", { className: "border-b hover:bg-gray-50", children: [_jsx("td", { className: "py-3 px-4", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(User, { className: "w-4 h-4 text-gray-400" }), _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: interaction.customer_name }), interaction.customer_phone && (_jsx("div", { className: "text-xs text-gray-500", children: interaction.customer_phone }))] })] }) }), _jsx("td", { className: "py-3 px-4", children: _jsx("div", { className: "max-w-xs truncate", title: interaction.subject, children: interaction.subject }) }), _jsx("td", { className: "py-3 px-4", children: _jsx("span", { className: "px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs capitalize", children: interaction.interaction_type.replace('_', ' ') }) }), _jsx("td", { className: "py-3 px-4", children: _jsx("span", { className: `px-2 py-1 rounded-full text-xs capitalize ${getPriorityColor(interaction.priority)}`, children: interaction.priority }) }), _jsx("td", { className: "py-3 px-4", children: _jsx("span", { className: `px-2 py-1 rounded-full text-xs capitalize ${getStatusColor(interaction.status)}`, children: interaction.status.replace('_', ' ') }) }), _jsx("td", { className: "py-3 px-4", children: _jsxs("div", { className: "flex items-center gap-1 text-sm text-gray-600", children: [_jsx(Calendar, { className: "w-3 h-3" }), new Date(interaction.created_at).toLocaleDateString()] }) }), _jsx("td", { className: "py-3 px-4", children: _jsxs("div", { className: "flex gap-1", children: [interaction.status === 'open' && (_jsx(Button, { size: "sm", variant: "outline", onClick: () => handleUpdateInteraction(interaction.id, { status: 'in_progress' }), children: "Start" })), interaction.status === 'in_progress' && (_jsx(Button, { size: "sm", className: "bg-green-600 hover:bg-green-700 text-white", onClick: () => handleUpdateInteraction(interaction.id, { status: 'resolved' }), children: "Resolve" })), _jsx(Button, { size: "sm", variant: "ghost", children: _jsx(Phone, { className: "w-3 h-3" }) }), _jsx(Button, { size: "sm", variant: "ghost", children: _jsx(Mail, { className: "w-3 h-3" }) })] }) })] }, interaction.id))) })] }) }) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsx(Card, { children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-blue-600 mb-2", children: [Math.round(((stats.resolved || 0) / (stats.total || 1)) * 100), "%"] }), _jsx("div", { className: "text-sm text-gray-600", children: "Resolution Rate" }), _jsx("div", { className: "text-sm text-gray-600", children: "\u1016\u103C\u1031\u101B\u103E\u1004\u103A\u1038\u1019\u103E\u102F \u1014\u103E\u102F\u1014\u103A\u1038" })] }) }), _jsx(Card, { children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx("div", { className: "text-2xl font-bold text-green-600 mb-2", children: "2.5h" }), _jsx("div", { className: "text-sm text-gray-600", children: "Avg Response Time" }), _jsx("div", { className: "text-sm text-gray-600", children: "\u1015\u103B\u1019\u103A\u1038\u1019\u103B\u103E \u1010\u102F\u1036\u1037\u1015\u103C\u1014\u103A\u1019\u103E\u102F \u1021\u1001\u103B\u102D\u1014\u103A" })] }) }), _jsx(Card, { children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-purple-600 mb-2", children: [stats.avgRating || 0, "/5"] }), _jsx("div", { className: "text-sm text-gray-600", children: "Customer Satisfaction" }), _jsx("div", { className: "text-sm text-gray-600", children: "\u1016\u1031\u102C\u1000\u103A\u101E\u100A\u103A \u1000\u103B\u1031\u1014\u1015\u103A\u1019\u103E\u102F" })] }) })] })] }));
}
function KPICard({ icon: Icon, label, value, color, trend }) {
    const colors = {
        blue: "text-blue-600 bg-blue-50",
        orange: "text-orange-600 bg-orange-50",
        green: "text-green-600 bg-green-50",
        purple: "text-purple-600 bg-purple-50"
    };
    return (_jsx(Card, { children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("div", { className: `p-3 rounded-lg ${colors[color]}`, children: _jsx(Icon, { className: "w-6 h-6" }) }), trend && (_jsxs("span", { className: `text-sm font-medium ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`, children: [_jsx(TrendingUp, { className: "w-3 h-3 inline mr-1" }), trend] }))] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600 mb-1", children: label }), _jsx("p", { className: "text-2xl font-bold", children: value })] })] }) }));
}
