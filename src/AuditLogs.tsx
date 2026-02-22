import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Search,
  Filter,
  Calendar as CalendarIcon,
  FileText,
  User as UserIcon,
  Activity,
  Download,
  RefreshCw,
  Eye,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { logisticsAPI } from '@/services/logistics-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { format } from 'date-fns';

const AuditLogs: React.FC = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const [logs, setLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [resourceFilter, setResourceFilter] = useState('all');
  const [selectedLog, setSelectedLog] = useState<any>(null);

  // Translations dictionary
  const dict = {
    en: {
      title: 'System Audit Logs',
      subtitle: 'Track system activity, security events, and compliance across the platform.',
      searchPlaceholder: 'Search by user or action...',
      action: 'Action',
      resource: 'Resource',
      user: 'User',
      timestamp: 'Timestamp',
      details: 'Details',
      ipAddress: 'IP Address',
      export: 'Export CSV',
      refresh: 'Refresh',
      noLogs: 'No audit logs found matching criteria.',
      metadata: 'Metadata',
      all: 'All Types'
    },
    my: {
      title: 'စနစ်စစ်ဆေးမှု မှတ်တမ်းများ',
      subtitle: 'ပလက်ဖောင်းတစ်လျှောက် စနစ်လှုပ်ရှားမှု၊ လုံခြုံရေးနှင့် လိုက်နာမှုများကို ခြေရာခံပါ။',
      searchPlaceholder: 'အသုံးပြုသူ သို့မဟုတ် လုပ်ဆောင်ချက်ဖြင့် ရှာဖွေပါ...',
      action: 'လုပ်ဆောင်ချက်',
      resource: 'အရင်းအမြစ်',
      user: 'အသုံးပြုသူ',
      timestamp: 'အချိန်',
      details: 'အသေးစိတ်',
      ipAddress: 'IP လိပ်စာ',
      export: 'CSV ထုတ်ယူရန်',
      refresh: 'အသစ်ပြန်လုပ်ရန်',
      noLogs: 'ကိုက်ညီသော မှတ်တမ်းများ မတွေ့ပါ။',
      metadata: 'အချက်အလက်များ',
      all: 'အားလုံး'
    }
  };

  const l = language === 'my' ? dict.my : dict.en;

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const filters: any = {
        limit: 100
      };
      if (actionFilter !== 'all') filters.action = actionFilter;
      if (resourceFilter !== 'all') filters.resource_type = resourceFilter;

      const { data, error } = await logisticsAPI.getAuditLogs(filters);
      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      toast.error('Failed to load audit logs');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [actionFilter, resourceFilter]);

  const getActionBadge = (action: string) => {
    const a = action.toLowerCase();
    if (a.includes('create') || a.includes('add')) return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">CREATE</Badge>;
    if (a.includes('delete') || a.includes('remove')) return <Badge variant="destructive">DELETE</Badge>;
    if (a.includes('update') || a.includes('edit')) return <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">UPDATE</Badge>;
    if (a.includes('login') || a.includes('auth')) return <Badge className="bg-luxury-gold/20 text-luxury-gold border-luxury-gold/30">SECURITY</Badge>;
    return <Badge variant="outline">{action.toUpperCase()}</Badge>;
  };

  const filteredLogs = logs.filter(log => 
    log.action?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.user?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.resource_type?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <Shield className="w-8 h-8 text-luxury-gold" />
            {l.title}
          </h1>
          <p className="text-muted-foreground mt-1">{l.subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-luxury-gold/20 hover:bg-luxury-gold/10" onClick={fetchLogs}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            {l.refresh}
          </Button>
          <Button variant="outline" size="sm" className="border-luxury-gold/20 hover:bg-luxury-gold/10">
            <Download className="w-4 h-4 mr-2" />
            {l.export}
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="luxury-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Events</p>
                <h3 className="text-2xl font-bold mt-1">{logs.length}</h3>
              </div>
              <Activity className="w-8 h-8 text-luxury-gold opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="luxury-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Security Alerts</p>
                <h3 className="text-2xl font-bold mt-1 text-destructive">
                  {logs.filter(log => log.action.toLowerCase().includes('auth')).length}
                </h3>
              </div>
              <Shield className="w-8 h-8 text-destructive opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="luxury-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Active Users</p>
                <h3 className="text-2xl font-bold mt-1">
                  {new Set(logs.map(log => log.user_id)).size}
                </h3>
              </div>
              <UserIcon className="w-8 h-8 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="luxury-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">System Health</p>
                <h3 className="text-2xl font-bold mt-1 text-green-500">Operational</h3>
              </div>
              <AlertCircle className="w-8 h-8 text-green-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters Area */}
      <Card className="luxury-card border-luxury-gold/10">
        <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 space-y-1.5 w-full">
            <label className="text-xs font-semibold text-muted-foreground uppercase">{l.searchPlaceholder}</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder={l.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 border-luxury-gold/20 focus:border-luxury-gold"
              />
            </div>
          </div>
          <div className="w-full md:w-48 space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase">{l.action}</label>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="bg-background/50 border-luxury-gold/20">
                <SelectValue placeholder="Filter Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{l.all}</SelectItem>
                <SelectItem value="LOGIN">Login Events</SelectItem>
                <SelectItem value="CREATE">Creation</SelectItem>
                <SelectItem value="UPDATE">Modification</SelectItem>
                <SelectItem value="DELETE">Deletion</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-48 space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase">{l.resource}</label>
            <Select value={resourceFilter} onValueChange={setResourceFilter}>
              <SelectTrigger className="bg-background/50 border-luxury-gold/20">
                <SelectValue placeholder="Filter Resource" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{l.all}</SelectItem>
                <SelectItem value="SHIPMENT">Shipments</SelectItem>
                <SelectItem value="USER">Users</SelectItem>
                <SelectItem value="MERCHANT">Merchants</SelectItem>
                <SelectItem value="FINANCE">Finance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card className="luxury-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="border-luxury-gold/10">
                <TableHead className="w-[180px]">{l.timestamp}</TableHead>
                <TableHead>{l.user}</TableHead>
                <TableHead>{l.action}</TableHead>
                <TableHead>{l.resource}</TableHead>
                <TableHead>{l.ipAddress}</TableHead>
                <TableHead className="text-right">{l.details}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="animate-pulse border-luxury-gold/5">
                    <TableCell colSpan={6} className="h-12 bg-muted/10" />
                  </TableRow>
                ))
              ) : filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <TableRow key={log.id} className="hover:bg-luxury-gold/5 border-luxury-gold/5 transition-colors group">
                    <TableCell className="font-mono text-xs">
                      {format(new Date(log.timestamp), 'yyyy-MM-dd HH:mm:ss')}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{log.user?.full_name || 'System'}</span>
                        <span className="text-xs text-muted-foreground">{log.user?.email || 'automated-task'}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getActionBadge(log.action)}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{log.resource_type}</span>
                        <span className="text-xs text-muted-foreground font-mono">{log.resource_id?.substring(0, 8)}...</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {log.ip_address || 'Internal'}
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="hover:text-luxury-gold hover:bg-luxury-gold/10"
                            onClick={() => setSelectedLog(log)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="luxury-card border-luxury-gold/20 max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-luxury-gold flex items-center gap-2">
                              <FileText className="w-5 h-5" />
                              {l.metadata}
                            </DialogTitle>
                            <DialogDescription>
                              Complete event trace for log ID: {selectedLog?.id}
                            </DialogDescription>
                          </DialogHeader>
                          <ScrollArea className="h-[400px] w-full rounded-md border border-luxury-gold/10 bg-black/40 p-4">
                            <pre className="text-xs font-mono text-luxury-gold/80 whitespace-pre-wrap">
                              {JSON.stringify(selectedLog, null, 2)}
                            </pre>
                          </ScrollArea>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground italic">
                    {l.noLogs}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-xs text-muted-foreground mt-4 px-2">
        <p>© 2026 Britium Express. All system actions are cryptographically logged.</p>
        <p>Retention Policy: 365 Days</p>
      </div>
    </div>
  );
};

export default AuditLogs;