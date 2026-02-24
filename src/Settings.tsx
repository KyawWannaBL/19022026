import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User as UserIcon, 
  Lock, 
  Bell, 
  Shield, 
  Save, 
  Monitor, 
  Smartphone,
  CheckCircle2 
} from 'lucide-react';

// UI Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

// Hooks & Context
import { useAuth } from '@/hooks/useAuth';
import { useLanguageContext } from '@/lib/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { toast } from 'sonner';

/**
 * Settings Component
 * Optimized for 2026 Fleet Logistics Platform
 */
const Settings = () => {
  const { user, role, branch_id } = useAuth();
  const { t, language } = useLanguageContext();
  const [saving, setSaving] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const onSave = async () => {
    setSaving(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    toast.success(t("Settings updated", "ဆက်တင်များကို အောင်မြင်စွာ ပြင်ဆင်ပြီးပါပြီ"), {
      icon: <CheckCircle2 className="h-4 w-4 text-primary" />,
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="p-6 md:p-10 max-w-7xl mx-auto space-y-8"
    >
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#0d2c54]">
            {t("System Settings", "စနစ်ဆက်တင်များ")}
          </h1>
          <p className="text-muted-foreground">
            {t("Manage your account and preferences", "အကောင့်နှင့် စနစ်သုံး ဆက်တင်များကို စီမံခန့်ခွဲပါ")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Button onClick={onSave} disabled={saving} className="bg-[#0d2c54] hover:bg-slate-800">
            <Save className="w-4 h-4 mr-2" />
            {saving ? t("Saving...", "သိမ်းနေသည်...") : t("Save Changes", "သိမ်းဆည်းမည်")}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2 mb-8">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <UserIcon size={16} /> {t("Account", "အကောင့်")}
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield size={16} /> {t("Security", "လုံခြုံရေး")}
          </TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <UserIcon className="text-primary" size={18} /> 
                  {t("Profile Details", "ကိုယ်ရေးအချက်အလက်")}
                </CardTitle>
                <CardDescription>
                  {t("Information linked to your enterprise account", "သင်၏ လုပ်ငန်းသုံးအကောင့် အချက်အလက်များ")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>{t("Email Address", "အီးမေးလ်")}</Label>
                  <Input value={user?.email ?? ""} readOnly className="bg-slate-50 cursor-not-allowed" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground uppercase">{t("System Role", "ရာထူး")}</Label>
                    <div className="font-bold text-[#0d2c54] uppercase tracking-wider">{String(role ?? "-")}</div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground uppercase">{t("Branch ID", "ဌာနခွဲ")}</Label>
                    <div className="font-bold text-[#ff6b00]">{String(branch_id ?? "HQ")}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="text-primary" size={18} /> 
                  {t("Notifications", "အကြောင်းကြားချက်များ")}
                </CardTitle>
                <CardDescription>{t("Configure how you stay updated", "အသိပေးချက်များ ရယူရန်")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">{t("Email Alerts", "အီးမေးလ် အသိပေးချက်")}</Label>
                    <p className="text-xs text-muted-foreground">{t("Receive shipment status updates via email", "ပို့ဆောင်မှုအခြေအနေများကို အီးမေးလ်ဖြင့်ပို့မည်")}</p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>
                <Separator />
                <div className="flex items-center justify-between opacity-50">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">{t("SMS Alerts", "SMS အသိပေးချက်")}</Label>
                    <p className="text-xs text-muted-foreground">{t("Critical operational alerts (Admin only)", "အရေးကြီး လုပ်ငန်းဆောင်ရွက်မှုများ")}</p>
                  </div>
                  <Switch disabled />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className="border-slate-200 shadow-sm max-w-2xl">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Lock className="text-primary" size={18} /> 
                {t("Active Sessions", "လက်ရှိအသုံးပြုမှုများ")}
              </CardTitle>
              <CardDescription>
                {t("Devices currently accessing your account", "သင်၏အကောင့်ကို အသုံးပြုနေသော စက်ပစ္စည်းများ")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                <Monitor className="text-slate-400" />
                <div className="flex-1">
                  <p className="text-sm font-bold">Chrome / MacOS (Current)</p>
                  <p className="text-xs text-muted-foreground">Yangon, Myanmar • Feb 2026</p>
                </div>
                <div className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded font-bold uppercase">Online</div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-slate-100">
                <Smartphone className="text-slate-400" />
                <div className="flex-1">
                  <p className="text-sm font-bold">Britium Express Rider App</p>
                  <p className="text-xs text-muted-foreground">iPhone 17 Pro • Last active 2h ago</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50 border-t mt-4 p-4">
              <Button variant="ghost" size="sm" className="text-destructive w-full hover:bg-red-50">
                {t("Terminate All Other Sessions", "အခြားစက်များအားလုံးမှ ထွက်မည်")}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <footer className="pt-12 text-center">
        <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
          © 2026 Britium Express • Secure Build v8.4.2
        </p>
      </footer>
    </motion.div>
  );
};

export default Settings;