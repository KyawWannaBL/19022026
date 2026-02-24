import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "framer-motion";
import { User as UserIcon, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
// Changed to 'default' export to satisfy App.tsx import
export default function EnterpriseRoutes() {
    const { user, role } = useAuth();
    const { language } = useLanguage();
    const [saving, setSaving] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const t = (en, my) => (language === "my" ? my : en);
    const onSave = async () => {
        setSaving(true);
        try {
            await new Promise((r) => setTimeout(r, 600));
            toast.success(t("Settings Saved", "ဆက်တင်များ သိမ်းဆည်းပြီးပါပြီ"));
        }
        finally {
            setSaving(false);
        }
    };
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, className: "p-6 space-y-6", children: [_jsx("h1", { className: "text-2xl font-bold", children: t("Enterprise Settings", "လုပ်ငန်းဆိုင်ရာ ဆက်တင်များ") }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(UserIcon, { className: "w-4 h-4" }), " Account Information"] }) }), _jsxs(CardContent, { className: "space-y-3", children: [_jsx(Label, { children: "Email" }), _jsx(Input, { value: user?.email ?? "", readOnly: true, className: "bg-muted" }), _jsxs("p", { className: "text-sm text-muted-foreground", children: ["Current Role: ", _jsx("span", { className: "text-foreground font-medium uppercase", children: role })] })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Bell, { className: "w-4 h-4" }), " Notifications"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm", children: "Email Alerts" }), _jsx(Switch, { checked: emailNotifications, onCheckedChange: setEmailNotifications })] }), _jsx(Button, { onClick: onSave, disabled: saving, className: "w-full", children: saving ? "Saving..." : "Save Preferences" })] })] })] })] }));
}
