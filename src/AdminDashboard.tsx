import React from "react";
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

  const t = (en: string, my: string) => (language === "my" ? my : en);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{t("Admin Dashboard", "အက်ဒမင် ဒက်ရှ်ဘုတ်")}</h1>
          <p className="text-sm text-muted-foreground">
            {t("Live overview from Supabase enterprise tables.", "Supabase enterprise table များမှ တကယ့်အချိန်အတွင်း အကျဉ်းချုပ်။")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users className="w-4 h-4" /> {t("Users", "အသုံးပြုသူများ")}</CardTitle>
            <CardDescription>{t("Profiles in system", "စနစ်ရှိ profile များ")}</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {usersLoading ? "…" : users.length}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Package className="w-4 h-4" /> {t("Shipments", "ပို့ဆောင်မှုများ")}</CardTitle>
            <CardDescription>{t("Total shipments", "စုစုပေါင်း ပို့ဆောင်မှု")}</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {shipmentsLoading ? "…" : shipments.length}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Activity className="w-4 h-4" /> {t("Delivered / Pending", "ပို့ပြီး / ဆိုင်းငံ့")}</CardTitle>
            <CardDescription>{t("Operational status mix", "လုပ်ငန်းဆောင်ရွက်မှု အခြေအနေ")}</CardDescription>
          </CardHeader>
          <CardContent className="text-xl font-semibold">
            {shipmentsLoading ? "…" : `${delivered} / ${pending}`}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
