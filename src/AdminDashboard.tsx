import React, { useState } from 'react';
import {
  Users,
  Shield,
  Activity,
  Settings,
  Search,
  Plus,
  Server,
  Database,
  AlertTriangle,
  Trash2,
  Edit,
  MoreVertical,
  CheckCircle,
  ShieldCheck,
  Globe,
  Bell
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  ROUTE_PATHS, 
  USER_ROLES, 
  User, 
  formatDate 
} from '@/lib/index';
import { useLanguage } from '@/contexts/LanguageContext';
import { AuditFeed } from '@/components/AuditFeed';
import { StatusBadge } from '@/components/StatusBadge';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const AdminDashboard: React.FC = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Translation Helper
  const t = (en: string, mm: string) => (language === 'en' ? en : mm);

  // Mock Data: System Users
  const mockUsers: User[] = [
    {
      id: 'USR-001',
      name: 'Kyaw Zayar',
      email: 'admin@britium.com',
      role: 'SUPER_ADMIN',
      lastLogin: '2026-02-19T08:30:00Z',
      phone: '+95 912345678',
    },
    {
      id: 'USR-002',
      name: 'Thiri Myint',
      email: 'thiri.m@britium.com',
      role: 'OPERATIONS_ADMIN',
      lastLogin: '2026-02-18T14:45:00Z',
      phone: '+95 998765432',
    },
    {
      id: 'USR-003',
      name: 'Aung Ko',
      email: 'aung.ko@britium.com',
      role: 'WAREHOUSE_MANAGER',
      lastLogin: '2026-02-19T10:15:00Z',
      phone: '+95 944556677',
    },
    {
      id: 'USR-004',
      name: 'Htet Htet',
      email: 'htet.h@britium.com',
      role: 'FINANCE_STAFF',
      lastLogin: '2026-02-17T09:00:00Z',
      phone: '+95 933221100',
    },
  ];

  const stats = [
    {
      label: t('Total Users', 'အသုံးပြုသူ စုစုပေါင်း'),
      value: '1,284',
      change: '+12%',
      icon: Users,
      color: 'text-luxury-gold',
    },
    {
      label: t('System Uptime', 'စနစ်လည်ပတ်မှု အချိန်'),
      value: '99.98%',
      change: 'Stable',
      icon: Server,
      color: 'text-green-500',
    },
    {
      label: t('Active Nodes', 'တက်ကြွနေသော Nodes များ'),
      value: '12',
      change: 'Normal',
      icon: Database,
      color: 'text-blue-500',
    },
    {
      label: t('Security Alerts', 'လုံခြုံရေး သတိပေးချက်များ'),
      value: '0',
      change: 'Clean',
      icon: ShieldCheck,
      color: 'text-purple-500',
    },
  ];

  return (
    <div className="flex flex-col gap-8 p-6 lg:p-10 min-h-screen bg-background">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading tracking-tight text-foreground">
            {t('Admin Control Center', 'အက်ဒမင် ထိန်းချုပ်ရေးစင်တာ')}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t('Manage system configurations, users, and security policies for 2026 operations.', '၂၀၂၆ လုပ်ငန်းများအတွက် စနစ်ဖွဲ့စည်းပုံများ၊ အသုံးပြုသူများနှင့် လုံခြုံရေးမူဝါဒများကို စီမံခန့်ခွဲပါ။')}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-luxury-gold/30 hover:bg-luxury-gold/10">
            <Globe className="w-4 h-4 mr-2 text-luxury-gold" />
            {t('Global Settings', 'အထွေထွေ ဆက်တင်များ')}
          </Button>
          <Button className="bg-luxury-gold text-black hover:bg-luxury-gold/90">
            <Plus className="w-4 h-4 mr-2" />
            {t('Create User', 'အသုံးပြုသူအသစ်ဖန်တီးပါ')}
          </Button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="luxury-card group">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl bg-muted group-hover:bg-primary/10 transition-colors`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                  <h3 className="text-2xl font-bold mt-1 tracking-tight">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="users" className="w-full space-y-6">
        <TabsList className="bg-muted/50 p-1 border border-border rounded-xl">
          <TabsTrigger value="users" className="rounded-lg px-6">
            <Users className="w-4 h-4 mr-2" />
            {t('User Management', 'အသုံးပြုသူ စီမံခန့်ခွဲမှု')}
          </TabsTrigger>
          <TabsTrigger value="system" className="rounded-lg px-6">
            <Activity className="w-4 h-4 mr-2" />
            {t('System Health', 'စနစ်ကျန်းမာရေး')}
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-lg px-6">
            <Shield className="w-4 h-4 mr-2" />
            {t('Security & Roles', 'လုံခြုံရေးနှင့် ကဏ္ဍများ')}
          </TabsTrigger>
          <TabsTrigger value="audit" className="rounded-lg px-6">
            <Search className="w-4 h-4 mr-2" />
            {t('Audit Logs', 'လုပ်ဆောင်ချက်မှတ်တမ်းများ')}
          </TabsTrigger>
        </TabsList>

        {/* Users Tab Content */}
        <TabsContent value="users">
          <Card className="luxury-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{t('Platform Users', 'ပလပ်ဖောင်းအသုံးပြုသူများ')}</CardTitle>
                <CardDescription>{t('Manage access levels and account status for all employees.', 'ဝန်ထမ်းအားလုံးအတွက် ဝင်ရောက်ခွင့်အဆင့်များနှင့် အကောင့်အခြေအနေများကို စီမံပါ။')}</CardDescription>
              </div>
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder={t('Search users...', 'အသုံးပြုသူများကို ရှာဖွေပါ...')}
                  className="pl-10 bg-muted/30 border-border"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b border-border/50">
                    <TableHead>{t('User', 'အသုံးပြုသူ')}</TableHead>
                    <TableHead>{t('Role', 'ကဏ္ဍ')}</TableHead>
                    <TableHead>{t('Last Active', 'နောက်ဆုံးအသုံးပြုချိန်')}</TableHead>
                    <TableHead>{t('Status', 'အခြေအနေ')}</TableHead>
                    <TableHead className="text-right">{t('Actions', 'လုပ်ဆောင်ချက်များ')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id} className="group border-b border-border/30 hover:bg-muted/30 transition-colors">
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-luxury-gold/20 flex items-center justify-center text-luxury-gold font-bold">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs font-mono px-2 py-1 bg-secondary rounded text-secondary-foreground">
                          {user.role}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(user.lastLogin || '')}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status="ACTIVE" type="user" />
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="hover:bg-muted">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 luxury-glass">
                            <DropdownMenuLabel>{t('User Options', 'အသုံးပြုသူရွေးချယ်စရာများ')}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer">
                              <Edit className="w-4 h-4 mr-2" /> {t('Edit Profile', 'ပရိုဖိုင်ပြင်ဆင်ရန်')}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Shield className="w-4 h-4 mr-2" /> {t('Manage Permissions', 'ခွင့်ပြုချက်များစီမံရန်')}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive cursor-pointer">
                              <Trash2 className="w-4 h-4 mr-2" /> {t('Deactivate User', 'အသုံးပြုသူပိတ်သိမ်းရန်')}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Health Tab Content */}
        <TabsContent value="system">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="luxury-card lg:col-span-2">
              <CardHeader>
                <CardTitle>{t('Service Status', 'ဝန်ဆောင်မှု အခြေအနေ')}</CardTitle>
                <CardDescription>{t('Real-time monitoring of core microservices.', 'အဓိကဝန်ဆောင်မှုများကို အချိန်နှင့်တပြေးညီ စောင့်ကြည့်ခြင်း။')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[ 
                  { name: 'Auth Gateway', status: 'Online', latency: '12ms', uptime: '99.99%' },
                  { name: 'Shipment Engine', status: 'Online', latency: '45ms', uptime: '99.95%' },
                  { name: 'Tracking API', status: 'Degraded', latency: '450ms', uptime: '98.20%' },
                  { name: 'Payment Bridge', status: 'Online', latency: '28ms', uptime: '99.99%' },
                  { name: 'Notification Service', status: 'Online', latency: '5ms', uptime: '100%' },
                ].map((service) => (
                  <div key={service.name} className="flex items-center justify-between p-4 rounded-xl bg-muted/20 border border-border/50">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${service.status === 'Online' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'}`} />
                      <div>
                        <p className="font-semibold">{service.name}</p>
                        <p className="text-xs text-muted-foreground">Uptime: {service.uptime}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${service.latency.includes('450') ? 'text-amber-500' : 'text-foreground'}`}>
                        {service.latency}
                      </p>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{service.status}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="luxury-card">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bell className="w-4 h-4 text-luxury-gold" />
                    {t('System Alerts', 'စနစ်သတိပေးချက်များ')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                    <p className="text-xs text-amber-200/80">
                      {t('Tracking API latency is higher than usual in Yangon region.', 'ရန်ကုန်ဒေသတွင် Tracking API နှောင့်နှေးမှု ပုံမှန်ထက် ပိုများနေပါသည်။')}
                    </p>
                  </div>
                  <div className="flex gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <CheckCircle className="w-5 h-5 text-blue-500 shrink-0" />
                    <p className="text-xs text-blue-200/80">
                      {t('Backup synchronization completed successfully at 04:00 AM.', 'အရန်သိမ်းဆည်းမှု ချိတ်ဆက်ခြင်း နံနက် ၀၄:၀၀ နာရီတွင် အောင်မြင်စွာ ပြီးဆုံးပါသည်။')}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="luxury-card bg-luxury-gold/5 border-luxury-gold/20">
                <CardHeader>
                  <CardTitle className="text-lg">{t('Global Config', 'အထွေထွေပြင်ဆင်မှု')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="maintenance" className="text-sm cursor-pointer">{t('Maintenance Mode', 'ပြုပြင်ထိန်းသိမ်းမှုစနစ်')}</Label>
                    <Switch id="maintenance" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="reg" className="text-sm cursor-pointer">{t('Public Registration', 'အများပြည်သူ မှတ်ပုံတင်ခွင့်')}</Label>
                    <Switch id="reg" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="debug" className="text-sm cursor-pointer">{t('Debug Logs', 'Debug မှတ်တမ်းများ')}</Label>
                    <Switch id="debug" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Audit Tab Content */}
        <TabsContent value="audit">
          <Card className="luxury-card">
            <CardHeader>
              <CardTitle>{t('System Audit Feed', 'စနစ်လုပ်ဆောင်ချက် မှတ်တမ်းများ')}</CardTitle>
              <CardDescription>{t('Immutable trail of all administrative and operational actions.', 'စီမံခန့်ခွဲမှုနှင့် လုပ်ငန်းဆောင်ရွက်မှု အားလုံး၏ ပြောင်းလဲ၍မရသော မှတ်တမ်းများ။')}</CardDescription>
            </CardHeader>
            <CardContent>
              <AuditFeed maxEntries={15} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab Content */}
        <TabsContent value="security">
          <Card className="luxury-card">
            <CardHeader>
              <CardTitle>{t('Role-Based Access Control', 'ကဏ္ဍအလိုက် ဝင်ရောက်ခွင့် ထိန်းချုပ်မှု')}</CardTitle>
              <CardDescription>{t('Define permissions for different organizational units.', 'ကွဲပြားခြားနားသော အဖွဲ့အစည်းယူနစ်များအတွက် ခွင့်ပြုချက်များကို သတ်မှတ်ပါ။')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.keys(USER_ROLES).map((role) => (
                  <div key={role} className="p-4 rounded-xl border border-border bg-muted/10 hover:border-luxury-gold/50 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-sm text-luxury-gold">{role}</h4>
                      <Shield className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground mb-4">
                      {t('Access to core administrative functions and financial reports.', 'အဓိက စီမံခန့်ခွဲမှု လုပ်ဆောင်ချက်များနှင့် ဘဏ္ဍာရေး အစီရင်ခံစာများကို ဝင်ရောက်ကြည့်ရှုခွင့်။')}
                    </p>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="text-[10px] h-7">{t('Edit Permissions', 'ခွင့်ပြုချက်ပြင်ရန်')}</Button>
                      <Button size="sm" variant="ghost" className="text-[10px] h-7">{t('View Users', 'အသုံးပြုသူများကြည့်ရန်')}</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
