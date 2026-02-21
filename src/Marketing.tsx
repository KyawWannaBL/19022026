import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Megaphone,
  TrendingUp,
  Users,
  Target,
  BarChart3,
  Calendar,
  Plus,
  Search,
  Filter,
  ArrowUpRight,
  MessageSquare,
  Mail,
  Share2,
  Percent,
  Gift,
  ChevronRight
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { logisticsAPI } from '@/services/logistics-api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { springPresets, fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';

const CAMPAIGN_DATA = [
  { name: 'Summer Delivery', reach: 4500, conversion: 12.5, roi: 3.2, status: 'Active', type: 'Email' },
  { name: 'Merchant Welcome', reach: 1200, conversion: 28.4, roi: 5.1, status: 'Active', type: 'System' },
  { name: 'New Year Special', reach: 8900, conversion: 8.2, roi: 2.1, status: 'Completed', type: 'SMS' },
  { name: 'Loyalty Program', reach: 3400, conversion: 15.7, roi: 4.5, status: 'Active', type: 'Social' },
];

const ACQUISITION_DATA = [
  { month: 'Jan', organic: 400, referral: 240, paid: 200 },
  { month: 'Feb', organic: 300, referral: 139, paid: 221 },
  { month: 'Mar', organic: 200, referral: 980, paid: 229 },
  { month: 'Apr', organic: 278, referral: 390, paid: 200 },
  { month: 'May', organic: 189, referral: 480, paid: 218 },
  { month: 'Jun', organic: 239, referral: 380, paid: 250 },
];

const CUSTOMER_SEGMENTS = [
  { name: 'VIP Merchants', value: 400, color: '#D4AF37' },
  { name: 'E-commerce', value: 300, color: '#B8941F' },
  { name: 'Retailers', value: 300, color: '#1A1D23' },
  { name: 'Individual', value: 200, color: '#454545' },
];

const Marketing: React.FC = () => {
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');

  const isMyanmar = language === 'my';

  const metrics = [
    {
      title: isMyanmar ? 'စုစုပေါင်း ကမ်ပိန်းများ' : 'Total Campaigns',
      value: '24',
      change: '+12%',
      icon: Megaphone,
      color: 'text-luxury-gold'
    },
    {
      title: isMyanmar ? 'ပြောင်းလဲမှုနှုန်း' : 'Conversion Rate',
      value: '18.4%',
      change: '+2.4%',
      icon: Target,
      color: 'text-green-500'
    },
    {
      title: isMyanmar ? 'အသစ်ရရှိသော ဖောက်သည်များ' : 'New Customers',
      value: '1,284',
      change: '+8%',
      icon: Users,
      color: 'text-blue-500'
    },
    {
      title: isMyanmar ? 'ရင်းနှီးမြှုပ်နှံမှု အကျိုးအမြတ်' : 'Marketing ROI',
      value: '4.2x',
      change: '+0.5x',
      icon: TrendingUp,
      color: 'text-luxury-gold'
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6 lg:p-10 space-y-8">
      {/* Header Section */}
      <motion.div 
        initial="hidden" 
        animate="visible" 
        variants={fadeInUp} 
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <Megaphone className="w-8 h-8 text-luxury-gold" />
            {isMyanmar ? 'စျေးကွက်မြှင့်တင်ရေး ဒိုင်ခွက်' : 'Marketing Command Center'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isMyanmar ? 'ကမ်ပိန်းများနှင့် ဖောက်သည်ခွဲခြမ်းစိတ်ဖြာမှုကို စီမံခန့်ခွဲပါ' : 'Manage campaigns and customer growth analytics'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-luxury-gold/20 hover:bg-luxury-gold/10">
            <BarChart3 className="w-4 h-4 mr-2" />
            {isMyanmar ? 'အစီရင်ခံစာထုတ်ရန်' : 'Export Report'}
          </Button>
          <Button className="luxury-button shadow-luxury">
            <Plus className="w-4 h-4 mr-2" />
            {isMyanmar ? 'ကမ်ပိန်းအသစ်' : 'New Campaign'}
          </Button>
        </div>
      </motion.div>

      {/* Key Metrics Grid */}
      <motion.div 
        variants={staggerContainer} 
        initial="hidden" 
        animate="visible" 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {metrics.map((metric, idx) => (
          <motion.div key={idx} variants={staggerItem}>
            <Card className="luxury-card overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className={`p-3 rounded-2xl bg-muted/50 ${metric.color}`}>
                    <metric.icon className="w-6 h-6" />
                  </div>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-none font-mono">
                    {metric.change}
                  </Badge>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <h3 className="text-2xl font-bold mt-1 font-mono">{metric.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <Tabs defaultValue="overview" className="w-full space-y-6" onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList className="bg-muted/50 border border-border/50 p-1 rounded-xl">
            <TabsTrigger value="overview" className="rounded-lg px-6">{isMyanmar ? 'ခြုံငုံသုံးသပ်ချက်' : 'Overview'}</TabsTrigger>
            <TabsTrigger value="campaigns" className="rounded-lg px-6">{isMyanmar ? 'ကမ်ပိန်းများ' : 'Campaigns'}</TabsTrigger>
            <TabsTrigger value="tools" className="rounded-lg px-6">{isMyanmar ? 'ကိရိယာများ' : 'Tools'}</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Growth Chart */}
            <Card className="lg:col-span-2 luxury-card">
              <CardHeader>
                <CardTitle className="text-lg">{isMyanmar ? 'ဖောက်သည်ရရှိမှု အခြေအနေ' : 'Customer Acquisition Growth'}</CardTitle>
                <CardDescription>{isMyanmar ? 'လအလိုက် ရရှိမှုလမ်းကြောင်းများ' : 'Acquisition channels performance over time'}</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px] pt-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={ACQUISITION_DATA}>
                    <defs>
                      <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0B0C10', borderColor: '#D4AF37', color: '#FAF9F6' }}
                      itemStyle={{ color: '#D4AF37' }}
                    />
                    <Area type="monotone" dataKey="organic" stroke="#D4AF37" fillOpacity={1} fill="url(#colorOrganic)" strokeWidth={3} />
                    <Area type="monotone" dataKey="referral" stroke="#454545" fillOpacity={0} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Segments Chart */}
            <Card className="luxury-card">
              <CardHeader>
                <CardTitle className="text-lg">{isMyanmar ? 'ဖောက်သည် အပိုင်းကဏ္ဍများ' : 'Customer Segments'}</CardTitle>
                <CardDescription>{isMyanmar ? 'လုပ်ငန်းအမျိုးအစားအလိုက် ခွဲခြားမှု' : 'Distribution by business type'}</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex flex-col items-center justify-center">
                <ResponsiveContainer width="100%" height="80%">
                  <PieChart>
                    <Pie
                      data={CUSTOMER_SEGMENTS}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {CUSTOMER_SEGMENTS.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="w-full grid grid-cols-2 gap-2 mt-4 text-xs">
                  {CUSTOMER_SEGMENTS.map((segment, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: segment.color }}></div>
                      <span className="text-muted-foreground">{segment.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <Card className="luxury-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{isMyanmar ? 'အီးမေးလ် ပေးပို့မှု' : 'Email Campaigns'}</CardTitle>
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-mono">92.4%</div>
                  <p className="text-xs text-muted-foreground">{isMyanmar ? 'ဖွင့်ကြည့်နှုန်း (Delivery rate)' : 'Average delivery rate'}</p>
                  <Progress value={92.4} className="h-1.5 mt-4" />
                </CardContent>
             </Card>
             <Card className="luxury-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{isMyanmar ? 'SMS ပေးပို့မှု' : 'SMS Marketing'}</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-mono">12,400</div>
                  <p className="text-xs text-muted-foreground">{isMyanmar ? 'ယခုလ ပေးပို့ပြီးအရေအတွက်' : 'Messages sent this month'}</p>
                  <div className="flex items-center gap-2 mt-4 text-green-500 text-xs font-mono">
                    <ArrowUpRight className="w-3 h-3" /> +15.2%
                  </div>
                </CardContent>
             </Card>
             <Card className="luxury-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{isMyanmar ? 'လူမှုကွန်ရက် မျှဝေမှု' : 'Social Engagement'}</CardTitle>
                  <Share2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-mono">8.5k</div>
                  <p className="text-xs text-muted-foreground">{isMyanmar ? 'စုစုပေါင်း တုံ့ပြန်မှု' : 'Total social interactions'}</p>
                  <div className="flex items-center gap-2 mt-4 text-luxury-gold text-xs font-mono">
                    <TrendingUp className="w-3 h-3" /> {isMyanmar ? 'အကောင်းဆုံး' : 'Trending'}
                  </div>
                </CardContent>
             </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <Card className="luxury-card overflow-hidden">
            <div className="p-4 border-b border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 bg-muted/20">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder={isMyanmar ? 'ရှာဖွေပါ...' : 'Search campaigns...'} className="pl-10 bg-background" />
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Button variant="outline" size="sm"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
                <Button variant="outline" size="sm"><Calendar className="w-4 h-4 mr-2" /> Date</Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/30 text-muted-foreground font-medium border-b border-border/50">
                  <tr>
                    <th className="px-6 py-4">{isMyanmar ? 'ကမ်ပိန်းအမည်' : 'Campaign Name'}</th>
                    <th className="px-6 py-4">{isMyanmar ? 'အမျိုးအစား' : 'Channel'}</th>
                    <th className="px-6 py-4">{isMyanmar ? 'ရောက်ရှိမှု' : 'Reach'}</th>
                    <th className="px-6 py-4">{isMyanmar ? 'ပြောင်းလဲမှု' : 'Conv. %'}</th>
                    <th className="px-6 py-4">{isMyanmar ? 'ROI' : 'ROI'}</th>
                    <th className="px-6 py-4">{isMyanmar ? 'အခြေအနေ' : 'Status'}</th>
                    <th className="px-6 py-4 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {CAMPAIGN_DATA.map((campaign, i) => (
                    <tr key={i} className="hover:bg-muted/10 transition-colors group">
                      <td className="px-6 py-4 font-medium">{campaign.name}</td>
                      <td className="px-6 py-4">
                         <Badge variant="outline" className="font-mono uppercase text-[10px]">{campaign.type}</Badge>
                      </td>
                      <td className="px-6 py-4 font-mono">{campaign.reach.toLocaleString()}</td>
                      <td className="px-6 py-4 font-mono">{campaign.conversion}%</td>
                      <td className="px-6 py-4 font-mono">{campaign.roi}x</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${campaign.status === 'Active' ? 'bg-green-500 animate-pulse' : 'bg-muted-foreground'}`}></div>
                          <span className="text-xs">{campaign.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[ 
            {
              title: isMyanmar ? 'ပရိုမိုးရှင်း ကုဒ်များ' : 'Promo Code Generator',
              desc: isMyanmar ? 'ဖောက်သည်များအတွက် လျှော့စျေးကုဒ်များ ဖန်တီးပါ' : 'Generate and manage discount codes for customers.',
              icon: Percent
            },
            {
              title: isMyanmar ? 'စာတိုအမြောက်အမြား ပေးပို့ခြင်း' : 'SMS Bulk Blast',
              desc: isMyanmar ? 'ဖောက်သည်အားလုံးထံ SMS သတင်းစကားများ ပေးပို့ပါ' : 'Send promotional SMS to targeted customer segments.',
              icon: MessageSquare
            },
            {
              title: isMyanmar ? 'အီးမေးလ် ဒီဇိုင်းရေးဆွဲခြင်း' : 'Email Designer',
              desc: isMyanmar ? 'လှပသော အီးမေးလ်ပုံစံများကို ဖန်တီးပါ' : 'Create professional email templates with drag & drop.',
              icon: Mail
            },
            {
              title: isMyanmar ? 'လက်ဆောင်ပေးခြင်း အစီအစဉ်' : 'Loyalty Rewards',
              desc: isMyanmar ? 'သစ္စာရှိဖောက်သည်များအတွက် အမှတ်ပေးစနစ်' : 'Manage points and rewards for frequent shippers.',
              icon: Gift
            },
            {
              title: isMyanmar ? 'ပစ်မှတ်ထားသော စာရင်းများ' : 'Targeted Lists',
              desc: isMyanmar ? 'အပြုအမူအလိုက် ဖောက်သည်စာရင်းများ ခွဲခြားပါ' : 'Segment customers based on shipping frequency.',
              icon: Users
            },
            {
              title: isMyanmar ? 'ကြော်ငြာ ကိရိယာများ' : 'Ad Management',
              desc: isMyanmar ? 'ပြင်ပကြော်ငြာ ကမ်ပိန်းများကို စောင့်ကြည့်ပါ' : 'Monitor external social and search ad campaigns.',
              icon: Share2
            }
          ].map((tool, idx) => (
            <motion.div 
              key={idx} 
              whileHover={{ y: -5 }}
              transition={springPresets.snappy}
            >
              <Card className="luxury-card h-full flex flex-col">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-luxury-gold/10 flex items-center justify-center mb-4">
                    <tool.icon className="w-6 h-6 text-luxury-gold" />
                  </div>
                  <CardTitle className="text-lg">{tool.title}</CardTitle>
                  <CardDescription>{tool.desc}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button className="w-full variant-outline border-luxury-gold/20 hover:bg-luxury-gold/10">
                    {isMyanmar ? 'အသုံးပြုမည်' : 'Open Tool'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>
      </Tabs>

      {/* Footer Insight */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.8 }}
        className="p-6 rounded-3xl bg-luxury-gold/5 border border-luxury-gold/10 flex flex-col md:flex-row items-center gap-6"
      >
        <div className="p-4 rounded-full bg-luxury-gold/20">
          <TrendingUp className="w-8 h-8 text-luxury-gold" />
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-bold text-luxury-gold">
            {isMyanmar ? 'AI စျေးကွက်သုံးသပ်ချက်' : 'AI Marketing Insight'}
          </h4>
          <p className="text-sm text-muted-foreground">
            {isMyanmar 
              ? 'သင်၏ ပြီးခဲ့သော အပတ်က အီးမေးလ်ကမ်ပိန်းသည် ပုံမှန်ထက် ၂၀% ပိုမိုအောင်မြင်ခဲ့ပါသည်။ လာမည့်အပတ်တွင် ပို့ဆောင်ခလျှော့စျေးများ ထပ်မံပြုလုပ်ရန် အကြံပြုပါသည်။'
              : 'Your email campaigns saw a 20% uplift last week. We recommend doubling down on referral incentives for the upcoming merchant onboarding phase.'}
          </p>
        </div>
        <Button variant="link" className="text-luxury-gold">
          {isMyanmar ? 'အသေးစိတ်ကြည့်ရန်' : 'View Full Insights'} <ChevronRight className="ml-2 w-4 h-4" />
        </Button>
      </motion.div>

      <footer className="text-center text-xs text-muted-foreground py-10 border-t border-border/20">
        © 2026 Britium Express Logistics. {isMyanmar ? 'မူပိုင်ခွင့်အားလုံးရယူထားသည်။' : 'All rights reserved.'}
      </footer>
    </div>
  );
};

export default Marketing;
