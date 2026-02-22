import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  MoreVertical,
  ShieldCheck,
  Activity,
  Edit2,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Building2,
  BadgeCheck,
  Lock,
  ChevronRight,
  X
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { logisticsAPI, User, Branch } from '@/services/logistics-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { springPresets, fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';

const UserManagement: React.FC = () => {
  const { user: currentUser } = useAuth();
  const { t } = useLanguage();
  
  // State
  const [users, setUsers] = useState<User[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Modal States
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isActivityOpen, setIsActivityOpen] = useState(false);
  const [userActivity, setUserActivity] = useState<any[]>([]);

  // Load initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [usersRes, branchesRes] = await Promise.all([
          logisticsAPI.getProfiles(),
          logisticsAPI.getBranches()
        ]);

        if (usersRes.data) setUsers(usersRes.data);
        if (branchesRes.branches) setBranches(branchesRes.branches);
      } catch (error) {
        console.error('Failed to fetch user management data:', error);
        toast.error('Failed to load system users');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtered Users
  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchesSearch = 
        u.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.employee_id?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesRole = roleFilter === 'all' || u.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || u.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  const fetchUserActivity = async (userId: string) => {
    try {
      const { data } = await logisticsAPI.getAuditLogs({ user_id: userId, limit: 10 });
      setUserActivity(data || []);
      setIsActivityOpen(true);
    } catch (error) {
      toast.error('Could not load user activity');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'inactive': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'pending': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  };

  const getRoleBadge = (role: string) => {
    const luxuryGoldStyle = "bg-luxury-gold/10 text-luxury-gold border-luxury-gold/20";
    const secondaryStyle = "bg-secondary text-secondary-foreground border-border";
    
    const isAdmin = ['SUPER_ADMIN', 'APP_OWNER', 'OPERATIONS_ADMIN'].includes(role);
    return (
      <Badge className={`font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 ${isAdmin ? luxuryGoldStyle : secondaryStyle}`}>
        {role.replace('_', ' ')}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-8">
      {/* Header Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Users className="w-8 h-8 text-luxury-gold" />
            User Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage enterprise accounts, roles, and system access control.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => setIsAddUserOpen(true)}
            className="luxury-button"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Create Account
          </Button>
        </div>
      </motion.div>

      {/* Analytics Summary Cards */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'Total Users', value: users.length, icon: Users, color: 'text-primary' },
          { label: 'Active Staff', value: users.filter(u => u.status === 'active').length, icon: BadgeCheck, color: 'text-emerald-500' },
          { label: 'Pending Access', value: users.filter(u => u.status === 'pending').length, icon: Lock, color: 'text-amber-500' },
          { label: 'Privileged Roles', value: users.filter(u => ['SUPER_ADMIN', 'APP_OWNER'].includes(u.role)).length, icon: ShieldCheck, color: 'text-luxury-gold' },
        ].map((stat, i) => (
          <motion.div key={i} variants={staggerItem}>
            <Card className="luxury-card">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-full bg-background/50 border border-border ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Filters & Table Section */}
      <Card className="luxury-card border-none">
        <CardHeader className="border-b border-border/50 pb-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name, email or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 border-border focus:ring-luxury-gold"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[160px] bg-background/50 border-border">
                  <Filter className="w-3 h-3 mr-2" />
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                  <SelectItem value="RIDER">Rider</SelectItem>
                  <SelectItem value="WAREHOUSE_MANAGER">Warehouse</SelectItem>
                  <SelectItem value="CUSTOMER_SERVICE">Support</SelectItem>
                  <SelectItem value="MERCHANT">Merchant</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] bg-background/50 border-border">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[600px] w-full">
            <Table>
              <TableHeader className="bg-muted/30 sticky top-0 z-10">
                <TableRow>
                  <TableHead className="w-[300px]">User Identity</TableHead>
                  <TableHead>Role & Access</TableHead>
                  <TableHead>Department / Branch</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i} className="animate-pulse">
                      <TableCell colSpan={6} className="h-16 bg-muted/10" />
                    </TableRow>
                  ))
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((u) => (
                    <TableRow key={u.id} className="hover:bg-muted/20 transition-colors group">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-luxury-gold/20 flex items-center justify-center border border-luxury-gold/30 text-luxury-gold font-bold">
                            {u.full_name.charAt(0)}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold">{u.full_name}</span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Mail className="w-3 h-3" /> {u.email}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          {getRoleBadge(u.role)}
                          <span className="text-[10px] text-muted-foreground uppercase font-mono">
                            ID: {u.employee_id || 'N/A'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{u.department || 'Operations'}</span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Building2 className="w-3 h-3" /> {(u as any).branch?.name || 'Central Office'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(u.status)}>
                          {u.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs font-mono text-muted-foreground">
                          {u.updated_at ? new Date(u.updated_at).toLocaleDateString() : 'Never'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="hover:text-luxury-gold"
                            onClick={() => fetchUserActivity(u.id)}
                          >
                            <Activity className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="hover:text-luxury-gold">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-64 text-center">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Users className="w-12 h-12 mb-2 opacity-20" />
                        <p>No users found matching your filters</p>
                        <Button variant="link" onClick={() => { setRoleFilter('all'); setStatusFilter('all'); setSearchQuery(''); }}>
                          Clear all filters
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="max-w-2xl bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <UserPlus className="text-luxury-gold" />
              Register New System Account
            </DialogTitle>
            <DialogDescription>
              Create a new user profile with specific role-based access permissions.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-muted-foreground">Full Legal Name</label>
              <Input placeholder="e.g. John Doe" className="bg-background border-border" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-muted-foreground">Work Email Address</label>
              <Input placeholder="john.doe@britium.com" className="bg-background border-border" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-muted-foreground">Primary Role</label>
              <Select>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OPERATIONS_ADMIN">Operations Admin</SelectItem>
                  <SelectItem value="WAREHOUSE_MANAGER">Warehouse Manager</SelectItem>
                  <SelectItem value="SUBSTATION_MANAGER">Substation Manager</SelectItem>
                  <SelectItem value="RIDER">Delivery Rider</SelectItem>
                  <SelectItem value="DATA_ENTRY">Data Entry Clerk</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-muted-foreground">Assigned Branch</label>
              <Select>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map(b => (
                    <SelectItem key={b.id} value={b.id}>{b.name} ({b.code})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 col-span-2">
              <label className="text-xs font-mono uppercase text-muted-foreground">Initial Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="password" className="pl-10 bg-background border-border" placeholder="••••••••" />
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsAddUserOpen(false)} className="border-border">
              Cancel
            </Button>
            <Button className="luxury-button" onClick={() => { toast.success('Account creation initiated'); setIsAddUserOpen(false); }}>
              Confirm & Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Activity Log Drawer/Dialog */}
      <Dialog open={isActivityOpen} onOpenChange={setIsActivityOpen}>
        <DialogContent className="max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Activity className="text-luxury-gold" />
              User Activity Monitor
            </DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {userActivity.length > 0 ? (
                userActivity.map((log, i) => (
                  <div key={i} className="p-3 rounded-lg bg-muted/30 border border-border/50 relative overflow-hidden">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-mono text-luxury-gold uppercase tracking-tighter">{log.action}</span>
                      <span className="text-[10px] text-muted-foreground">{new Date(log.timestamp).toLocaleString()}</span>
                    </div>
                    <p className="text-sm mt-1">{log.resource_type}: Accessing system resources</p>
                    <div className="absolute left-0 top-0 w-1 h-full bg-luxury-gold/50" />
                  </div>
                ))
              ) : (
                <div className="h-32 flex items-center justify-center text-muted-foreground text-sm">
                  No recent activity recorded for this user
                </div>
              )}
            </div>
          </ScrollArea>

          <Button className="w-full mt-4 border-border" variant="outline" onClick={() => setIsActivityOpen(false)}>
            Close Monitor
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;