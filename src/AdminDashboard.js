import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Users, Package, Activity, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useEnterpriseUsers } from "@/hooks/useEnterpriseUsers";
import { useEnterpriseShipments } from "@/hooks/useEnterpriseShipments";
import { useLanguage } from "@/contexts/LanguageContext";
/**
 * Admin Dashboard (Enterprise)
 * Supabase-only, real-time shipments + users overview.
 */
export default function AdminDashboard() {
    const { language } = useLanguage();
    const { data: users = [], isLoading: usersLoading } = useEnterpriseUsers();
    const { data: shipments = [], isLoading: shipmentsLoading } = useEnterpriseShipments();
    const delivered = shipments.filter((s) => s.status === "delivered").length;
    const pending = shipments.filter((s) => s.status === "pending").length;
    const t = (en, my) => (language === "my" ? my : en);
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, className: "p-6 space-y-6", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "p-2 rounded-lg bg-primary/10 text-primary", children: _jsx(ShieldCheck, { className: "w-5 h-5" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: t("Admin Dashboard", "အက်ဒမင် ဒက်ရှ်ဘုတ်") }), _jsx("p", { className: "text-sm text-muted-foreground", children: t("Live overview from Supabase enterprise tables.", "Supabase enterprise table များမှ တကယ့်အချိန်အတွင်း အကျဉ်းချုပ်။") })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Users, { className: "w-4 h-4" }), " ", t("Users", "အသုံးပြုသူများ")] }), _jsx(CardDescription, { children: t("Profiles in system", "စနစ်ရှိ profile များ") })] }), _jsx(CardContent, { className: "text-3xl font-bold", children: usersLoading ? "…" : users.length })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Package, { className: "w-4 h-4" }), " ", t("Shipments", "ပို့ဆောင်မှုများ")] }), _jsx(CardDescription, { children: t("Total shipments", "စုစုပေါင်း ပို့ဆောင်မှု") })] }), _jsx(CardContent, { className: "text-3xl font-bold", children: shipmentsLoading ? "…" : shipments.length })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Activity, { className: "w-4 h-4" }), " ", t("Delivered / Pending", "ပို့ပြီး / ဆိုင်းငံ့")] }), _jsx(CardDescription, { children: t("Operational status mix", "လုပ်ငန်းဆောင်ရွက်မှု အခြေအနေ") })] }), _jsx(CardContent, { className: "text-xl font-semibold", children: shipmentsLoading ? "…" : `${delivered} / ${pending}` })] })] })] }));
}
