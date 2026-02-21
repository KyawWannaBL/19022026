import React, { useState, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { logisticsAPI, User } from '@/services/logistics-api';
import { useQuery } from '@tanstack/react-query';
import {
  Users,
  UserPlus,
  DollarSign,
  Briefcase,
  TrendingUp,
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShieldCheck,
  Download,
  FileText,
  CheckCircle2,
  Clock
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { springPresets, fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';

const HumanResources: React.FC = () => {
  const { user: currentUser } = useAuth();
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('directory');

  // Translations
  const t = {
    en: {
      title: 'Human Resources',
      subtitle: 'Manage employee lifecycle, payroll, and performance.',
      addEmployee: 'Add Employee',
      totalStaff: 'Total Staff',
      activeRiders: 'Active Riders',
      pendingPayroll: 'Pending Payroll',
      openPositions: 'Open Positions',
      directory: 'Staff Directory',
      payroll: 'Payroll Management',
      recruitment: 'Recruitment',
      performance: 'Performance',
      searchPlaceholder: 'Search by name, ID or role...',
      name: 'Name',
      role: 'Role',
      dept: 'Department',
      status: 'Status',
      hired: 'Hired Date',
      actions: 'Actions',
      salary: 'Salary',
      bonus: 'Bonus',
      lastPaid: 'Last Paid',
      viewProfile: 'View Profile',
      editDetails: 'Edit Details',
      terminate: 'Terminate Contract',
    },
    my: {
      title: 'လူ့စွမ်းအားအရင်းအမြစ်',
      subtitle: 'ဝန်ထမ်းစီမံခန့်ခွဲမှု၊ လစာနှင့် စွမ်းဆောင်ရည်များကို စီမံပါ။',
      addEmployee: 'ဝန်ထမ်းအသစ်ထည့်ရန်',
      totalStaff: 'စုစုပေါင်းဝန်ထမ်း',
      activeRiders: 'အလုပ်လုပ်နေသော Rider များ',
      pendingPayroll: 'ပေးရန်ကျန်လစာ',
      openPositions: 'လစ်လပ်ရာထူးများ',
      directory: 'ဝန်ထမ်းစာရင်း',
      payroll: 'လစာစီမံခန့်ခွဲမှု',
      recruitment: 'အလုပ်ခေါ်ယူခြင်း',
      performance: 'စွမ်းဆောင်ရည်',
      searchPlaceholder: 'အမည်၊ ID သို့မဟုတ် ရာထူးဖြင့် ရှာဖွေရန်...',
      name: 'အမည်',
      role: 'ရာထူး',
      dept: 'ဌာန',
      status: 'အခြေအနေ',
      hired: 'ခန့်အပ်သည့်နေ့',
      actions: 'ဆောင်ရွက်ချက်များ',
      salary: 'လစာ',
      bonus: 'အပိုဆု',
      lastPaid: 'နောက်ဆုံးပေးခဲ့သည့်နေ့',
      viewProfile: 'ကိုယ်ရေးအချက်အလက်ကြည့်ရန်',
      editDetails: 'ပြင်ဆင်ရန်',
      terminate: 'အလုပ်မှရပ်စဲရန်',
    }
  };

  const content = language === 'my' ? t.my : t.en;

  // Data Fetching
  const { data: staffData, isLoading } = useQuery({
    queryKey: ['staff-profiles'],
    queryFn: async () => {
      const response = await logisticsAPI.getProfiles();
      return response.data as User[];
    }
  });

  const filteredStaff = useMemo(() => {
    if (!staffData) return [];
    return staffData.filter(staff => 
      staff.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.employee_id?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [staffData, searchTerm]);

  const stats = [
    { label: content.totalStaff, value: staffData?.length || 0, icon: Users, color: 'text-blue-500' },
    { label: content.activeRiders, value: staffData?.filter(s => s.role === 'RIDER').length || 0, icon: Briefcase, color: 'text-luxury-gold' },
    { label: content.pendingPayroll, value: '$12,450', icon: DollarSign, color: 'text-green-500' },
    { label: content.openPositions, value: '8', icon: TrendingUp, color: 'text-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-background p-6 lg:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-heading text-foreground">{content.title}</h1>
          <p className="text-muted-foreground mt-1">{content.subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-luxury-gold/30 text-luxury-gold hover:bg-luxury-gold/10">
            <Download className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
          <Button className="bg-luxury-gold text-black hover:bg-luxury-gold/90 font-bold">
            <UserPlus className="mr-2 h-4 w-4" />
            {content.addEmployee}
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, idx) => (
          <motion.div key={idx} variants={staggerItem}>
            <Card className="luxury-card border-none">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold font-mono">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-white/5 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
        <TabsList className="bg-card/50 border border-white/5 p-1 rounded-xl h-12">
          <TabsTrigger value="directory" className="data-[state=active]:bg-luxury-gold data-[state=active]:text-black px-6">{content.directory}</TabsTrigger>
          <TabsTrigger value="payroll" className="data-[state=active]:bg-luxury-gold data-[state=active]:text-black px-6">{content.payroll}</TabsTrigger>
          <TabsTrigger value="recruitment" className="data-[state=active]:bg-luxury-gold data-[state=active]:text-black px-6">{content.recruitment}</TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-luxury-gold data-[state=active]:text-black px-6">{content.performance}</TabsTrigger>
        </TabsList>

        <TabsContent value="directory" className="space-y-4">
          <Card className="luxury-card border-none">
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <CardTitle>{content.directory}</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder={content.searchPlaceholder}
                      className="pl-10 bg-white/5 border-white/10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon" className="border-white/10">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-white/5">
                    <TableHead className="text-muted-foreground">{content.name}</TableHead>
                    <TableHead className="text-muted-foreground">{content.role}</TableHead>
                    <TableHead className="text-muted-foreground">{content.dept}</TableHead>
                    <TableHead className="text-muted-foreground">{content.status}</TableHead>
                    <TableHead className="text-muted-foreground">{content.hired}</TableHead>
                    <TableHead className="text-right text-muted-foreground">{content.actions}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i} className="animate-pulse">
                        <TableCell colSpan={6} className="h-16 bg-white/5 rounded-md my-2" />
                      </TableRow>
                    ))
                  ) : filteredStaff.map((staff) => (
                    <TableRow key={staff.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border border-luxury-gold/20">
                            <AvatarImage src={staff.profile_image_url} />
                            <AvatarFallback className="bg-luxury-gold/10 text-luxury-gold">
                              {staff.full_name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold">{staff.full_name}</div>
                            <div className="text-xs text-muted-foreground font-mono">{staff.employee_id || 'EMP-000'}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-luxury-gold/20 text-luxury-gold bg-luxury-gold/5">
                          {staff.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{staff.department || 'Operations'}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${staff.status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'}`} />
                          <span className="text-sm">{staff.status}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground font-mono">
                        {staff.hire_date ? new Date(staff.hire_date).toLocaleDateString() : '2025-01-15'}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="hover:bg-white/10">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 bg-luxury-obsidian border-white/10">
                            <DropdownMenuLabel>Options</DropdownMenuLabel>
                            <DropdownMenuItem className="cursor-pointer">
                              <Mail className="mr-2 h-4 w-4" /> Email Staff
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <FileText className="mr-2 h-4 w-4" /> {content.viewProfile}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-white/5" />
                            <DropdownMenuItem className="text-destructive cursor-pointer">
                              {content.terminate}
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

        <TabsContent value="payroll">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="luxury-card border-none lg:col-span-2">
              <CardHeader>
                <CardTitle>Payroll History - Feb 2026</CardTitle>
                <CardDescription>Review and process salary payments for the current month.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-white/5">
                      <TableHead>{content.name}</TableHead>
                      <TableHead>{content.salary}</TableHead>
                      <TableHead>{content.bonus}</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>{content.status}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <TableRow key={i} className="border-white/5">
                        <TableCell className="font-medium">Staff Member {i}</TableCell>
                        <TableCell className="font-mono">$1,200.00</TableCell>
                        <TableCell className="font-mono text-green-500">+$150.00</TableCell>
                        <TableCell className="font-mono font-bold">$1,350.00</TableCell>
                        <TableCell>
                          <Badge className={i % 2 === 0 ? 'bg-green-500/20 text-green-500 border-none' : 'bg-yellow-500/20 text-yellow-500 border-none'}>
                            {i % 2 === 0 ? 'Paid' : 'Pending'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="luxury-card border-none bg-gradient-to-br from-luxury-gold/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-luxury-gold">Payroll Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Base Salary</span>
                    <span className="font-mono">$45,000.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Bonuses</span>
                    <span className="font-mono text-green-500">$3,450.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes & Deductions</span>
                    <span className="font-mono text-destructive">-$4,200.00</span>
                  </div>
                  <div className="h-px bg-white/10 my-2" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Net Disbursement</span>
                    <span className="text-luxury-gold">$44,250.00</span>
                  </div>
                  <Button className="w-full bg-luxury-gold text-black mt-4">
                    Process Batch Payment
                  </Button>
                </CardContent>
              </Card>

              <Card className="luxury-card border-none">
                <CardHeader>
                  <CardTitle>Upcoming Deadlines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-luxury-gold mt-0.5" />
                    <div>
                      <p className="font-medium">Tax Filing (Q1)</p>
                      <p className="text-xs text-muted-foreground">Feb 28, 2026</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Annual Bonus Review</p>
                      <p className="text-xs text-muted-foreground">March 15, 2026</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recruitment">
           <Card className="luxury-card border-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Open Requisitions</CardTitle>
                  <CardDescription>Active job postings and candidate pipelines.</CardDescription>
                </div>
                <Button size="sm" className="bg-white/5 border border-white/10 text-white hover:bg-white/10">
                  Post New Job
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {['Senior Logistics Coordinator', 'Dispatch Lead', 'Operations Analyst'].map((job, i) => (
                  <Card key={i} className="bg-white/5 border-white/5 p-5 space-y-4 hover:border-luxury-gold/30 transition-all cursor-pointer">
                    <div className="flex justify-between items-start">
                      <Badge className="bg-blue-500/20 text-blue-500 border-none">Full-Time</Badge>
                      <span className="text-xs text-muted-foreground">Posted 3d ago</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{job}</h4>
                      <p className="text-sm text-muted-foreground">Operations Department • Yangon HQ</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map(j => (
                          <Avatar key={j} className="h-7 w-7 border-2 border-background">
                            <AvatarFallback className="text-[10px] bg-muted">C{j}</AvatarFallback>
                          </Avatar>
                        ))}
                        <div className="h-7 w-7 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-muted-foreground border-2 border-background">
                          +12
                        </div>
                      </div>
                      <span className="text-xs font-medium">15 Applicants</span>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
           </Card>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="luxury-card border-none">
              <CardHeader>
                <CardTitle>Top Performing Riders</CardTitle>
                <CardDescription>Based on delivery success rate and customer ratings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all">
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-bold font-mono text-luxury-gold">#0{i}</span>
                      <Avatar className="h-12 w-12 border-2 border-luxury-gold/20">
                        <AvatarFallback>R{i}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold">Rider Name {i}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <CheckCircle2 className="h-3 w-3 text-green-500" />
                          <span>98.2% Success Rate</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold font-mono">4.9</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Avg Rating</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="luxury-card border-none">
              <CardHeader>
                <CardTitle>KPI Compliance Tracking</CardTitle>
                <CardDescription>Overall department performance vs monthly targets.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {['Logistics', 'Warehouse', 'Customer Service', 'Finance'].map((dept, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{dept}</span>
                      <span className="text-sm font-mono">{80 + i * 5}%</span>
                    </div>
                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${80 + i * 5}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className={`h-full rounded-full ${
                          80 + i * 5 > 90 ? 'bg-green-500' : 80 + i * 5 > 85 ? 'bg-luxury-gold' : 'bg-blue-500'
                        }`}
                      />
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 flex-1 text-center">
                    <p className="text-sm text-muted-foreground mb-1">Avg Performance</p>
                    <p className="text-2xl font-bold text-luxury-gold">88.4%</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 flex-1 text-center">
                    <p className="text-sm text-muted-foreground mb-1">Target Variance</p>
                    <p className="text-2xl font-bold text-green-500">+3.2%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HumanResources;