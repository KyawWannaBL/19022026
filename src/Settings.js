import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Shield, User as UserIcon, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { toast } from "sonner";
/**
 * Settings (Enterprise)
<<<<<<< HEAD
 * Supabase-only, shows current session info and basic preferences.
 */
export default function Settings() {
    const { user, role, branch_id } = useAuth();
    const { language } = useLanguage();
    const [saving, setSaving] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const t = (en, my) => (language === "my" ? my : en);
    const onSave = async () => {
        setSaving(true);
        try {
            await new Promise((r) => setTimeout(r, 600));
            toast.success(t("Saved", "သိမ်းဆည်းပြီးပါပြီ"));
        }
        finally {
            setSaving(false);
        }
    };
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, className: "p-6 space-y-6", children: ["=======", _jsxs(motion.div, { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, className: "p-6 space-y-6", children: [">>>>>>> add-supabase-user-script", _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: t("Settings", "ဆက်တင်များ") }), _jsx("p", { className: "text-sm text-muted-foreground", children: t("Session & preferences", "Session နှင့် preference များ") })] }), _jsx(LanguageSwitcher, {})] }), _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4" })] })] }));
    _jsx(Card, { children: _jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(UserIcon, { className: "w-4 h-4" }), " ", t("Account", "အကောင့်")] }), "=======", _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(UserIcon, { className: "w-4 h-4" }), " ", t("Account", "အကောင့်")] }), ">>>>>>> add-supabase-user-script", _jsx(CardDescription, { children: t("Current signed-in user", "လက်ရှိ ဝင်ထားသော အသုံးပြုသူ") })] }), _jsx(CardContent, { className: "space-y-3", children: _jsx("div", { className: "space-y-1", children: _jsx(Label, { children: "Email" }) }) })] })] }) });
    _jsx(Input, { value: user?.email ?? "", readOnly: true });
    div >
        (_jsxs("div", { className: "text-sm text-muted-foreground", children: [t("Role", "အခန်းကဏ္ဍ"), ": ", _jsx("span", { className: "font-semibold text-foreground", children: String(role ?? "-") }), "=======", _jsx(Input, { value: user?.email ?? "", readOnly: true, className: "bg-muted/50" })] })
            ,
                _jsxs("div", { className: "text-sm text-muted-foreground", children: [t("Role", "အခန်းကဏ္ဍ"), ": ", _jsx("span", { className: "font-semibold text-foreground uppercase", children: String(role ?? "-") }), ">>>>>>> add-supabase-user-script"] })
                    ,
                        _jsxs("div", { className: "text-sm text-muted-foreground", children: [t("Branch", "ဘရားခ်"), ": ", _jsx("span", { className: "font-semibold text-foreground", children: String(branch_id ?? "-") })] }));
    CardContent >
    ;
    Card >
        _jsx(Card, { children: _jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Bell, { className: "w-4 h-4" }), " ", t("Notifications", "အကြောင်းကြားချက်")] }), "=======", _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Bell, { className: "w-4 h-4" }), " ", t("Notifications", "အကြောင်းကြားချက်")] }), ">>>>>>> add-supabase-user-script", _jsx(CardDescription, { children: t("Basic preferences", "အခြေခံ preference များ") })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx(Shield, { className: "w-4 h-4 text-primary" }), t("Email notifications", "အီးမေးလ် အကြောင်းကြားချက်")] }), _jsx(Switch, { checked: emailNotifications, onCheckedChange: setEmailNotifications })] }), _jsxs(Button, { onClick: onSave, disabled: saving, className: "w-full", children: [_jsx(Save, { className: "w-4 h-4 mr-2" }), saving ? t("Saving...", "သိမ်းနေသည်...") : t("Save changes", "ပြောင်းလဲမှုများ သိမ်းရန်")] })] })] })] }) });
    ;
}
