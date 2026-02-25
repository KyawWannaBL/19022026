import { Save, Shield, User as UserIcon, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useLanguageContext } from "@/lib/LanguageContext";
import { toast } from "sonner";

// Changed to 'default' export to satisfy App.tsx import
export default function EnterpriseRoutes() {
  const { user, role } = useAuth();
  const { language } = useLanguageContext();
  const [saving, setSaving] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const t = (en: string, my: string) => (language === "my" ? my : en);

  const onSave = async () => {
    setSaving(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      toast.success(t("Settings Saved", "ဆက်တင်များ သိမ်းဆည်းပြီးပါပြီ"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="p-6 space-y-6"
    >
      <h1 className="text-2xl font-bold">{t("Enterprise Settings", "လုပ်ငန်းဆိုင်ရာ ဆက်တင်များ")}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="w-4 h-4" /> Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Label>Email</Label>
            <Input value={user?.email ?? ""} readOnly className="bg-muted" />
            <p className="text-sm text-muted-foreground">
              Current Role: <span className="text-foreground font-medium uppercase">{role}</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-4 h-4" /> Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Email Alerts</span>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>
            <Button onClick={onSave} disabled={saving} className="w-full">
              {saving ? "Saving..." : "Save Preferences"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}