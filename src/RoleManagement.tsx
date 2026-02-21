import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Lock,
  UserCheck,
  Search,
  Save,
  RotateCcw,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Layout,
  Truck,
  Users,
  DollarSign,
  Warehouse,
  Settings,
  Eye,
  Edit3,
  Plus,
  Trash2,
  Database
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { logisticsAPI } from '@/services/logistics-api';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';

// Permission Definitions
const PERMISSION_GROUPS = [
  {
    id: 'shipments',
    label: 'Shipment Operations',
    icon: Truck,
    permissions: ['view_shipments', 'create_shipment', 'edit_shipment', 'cancel_shipment', 'track_realtime', 'manage_pod']
  },
  {
    id: 'finance',
    label: 'Financial Management',
    icon: DollarSign,
    permissions: ['view_revenue', 'manage_rates', 'collect_cod', 'finance_audit', 'process_refunds', 'export_financials']
  },
  {
    id: 'warehouse',
    label: 'Warehouse & Inventory',
    icon: Warehouse,
    permissions: ['receive_goods', 'dispatch_orders', 'inventory_audit', 'tag_assignment', 'label_activation', 'substation_ops']
  },
  {
    id: 'users',
    label: 'User & Staff Control',
    icon: Users,
    permissions: ['view_staff', 'edit_staff', 'manage_roles', 'hr_records', 'payroll_access', 'audit_logs']
  },
  {
    id: 'system',
    label: 'System Configuration',
    icon: Settings,
    permissions: ['branch_settings', 'api_configuration', 'maintenance_mode', 'security_policies', 'backup_management']
  }
];

const APP_ROLES = [
  { id: 'APP_OWNER', name: 'Application Owner', level: 100, color: 'text-luxury-gold' },
  { id: 'SUPER_ADMIN', name: 'Super Administrator', level: 90, color: 'text-red-500' },
  { id: 'OPERATIONS_ADMIN', name: 'Operations Admin', level: 80, color: 'text-blue-500' },
  { id: 'SUPERVISOR', name: 'Supervisor', level: 70, color: 'text-green-500' },
  { id: 'WAREHOUSE_MANAGER', name: 'Warehouse Manager', level: 60, color: 'text-purple-500' },
  { id: 'SUBSTATION_MANAGER', name: 'Substation Manager', level: 60, color: 'text-indigo-500' },
  { id: 'HR_ADMIN', name: 'HR Administrator', level: 50, color: 'text-pink-500' },
  { id: 'FINANCE_STAFF', name: 'Finance Staff', level: 50, color: 'text-emerald-500' },
  { id: 'RIDER', name: 'Delivery Rider', level: 20, color: 'text-orange-500' },
  { id: 'MERCHANT', name: 'Merchant', level: 15, color: 'text-cyan-500' },
  { id: 'CUSTOMER', name: 'Customer', level: 10, color: 'text-slate-500' }
];

export default function RoleManagement() {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const { toast } = useToast();

  const [selectedRole, setSelectedRole] = useState(APP_ROLES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  // Mock state for permissions per role
  const [rolePermissions, setRolePermissions] = useState<Record<string, string[]>>({
    APP_OWNER: PERMISSION_GROUPS.flatMap(g => g.permissions),
    SUPER_ADMIN: PERMISSION_GROUPS.flatMap(g => g.permissions).filter(p => p !== 'maintenance_mode'),
    RIDER: ['view_shipments', 'track_realtime', 'manage_pod', 'label_activation'],
    MERCHANT: ['view_shipments', 'create_shipment', 'view_revenue'],
  });

  const filteredRoles = useMemo(() => {
    return APP_ROLES.filter(role => 
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      role.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const togglePermission = (roleId: string, permission: string) => {
    setRolePermissions(prev => {
      const current = prev[roleId] || [];
      if (current.includes(permission)) {
        return { ...prev, [roleId]: current.filter(p => p !== permission) };
      } else {
        return { ...prev, [roleId]: [...current, permission] };
      }
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // In a real app, this would be an API call to update role templates
      // await logisticsAPI.updateRolePermissions(selectedRole.id, rolePermissions[selectedRole.id]);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Changes Saved",
        description: `Permissions for ${selectedRole.name} have been updated successfully.`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "There was an error updating permissions.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 lg:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <Shield className="w-8 h-8 text-luxury-gold" />
            Role & Permissions
          </h1>
          <p className="text-muted-foreground mt-1">
            Configure access control levels and functional permissions for all system roles.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()} 
            className="border-luxury-gold/20 hover:border-luxury-gold/50"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Defaults
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="bg-luxury-gold text-black hover:bg-luxury-gold/90 font-bold"
          >
            {isSaving ? <Database className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar: Role Selection */}
        <Card className="lg:col-span-4 luxury-card overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border bg-card/50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search roles..."
                className="pl-10 bg-background/50 border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <ScrollArea className="flex-1 h-[600px]">
            <div className="p-2 space-y-1">
              {filteredRoles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 group ${
                    selectedRole.id === role.id 
                      ? 'bg-luxury-gold/10 border border-luxury-gold/30 shadow-lg' 
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg bg-background/80 shadow-inner ${
                      selectedRole.id === role.id ? 'text-luxury-gold' : 'text-muted-foreground'
                    }`}>
                      <Shield className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className={`font-semibold tracking-wide ${selectedRole.id === role.id ? 'text-luxury-gold' : 'text-foreground'}`}>
                        {role.name}
                      </p>
                      <p className="text-xs text-muted-foreground uppercase tracking-tighter">
                        Level {role.level} • {role.id}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${selectedRole.id === role.id ? 'translate-x-1 text-luxury-gold' : 'text-muted-foreground opacity-0 group-hover:opacity-100'}`} />
                </button>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Main: Permission Matrix */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="luxury-card p-6 border-luxury-gold/10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-luxury-gold/20 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-luxury-gold" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{selectedRole.name} Permissions</h2>
                  <p className="text-sm text-muted-foreground">Grant or revoke functional access for this role.</p>
                </div>
              </div>
              <Badge variant="outline" className="border-luxury-gold/30 text-luxury-gold px-3 py-1">
                System Role
              </Badge>
            </div>

            <Tabs defaultValue="shipments" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-5 bg-background/50 p-1 rounded-xl h-auto gap-1">
                {PERMISSION_GROUPS.map(group => (
                  <TabsTrigger 
                    key={group.id} 
                    value={group.id} 
                    className="data-[state=active]:bg-luxury-gold data-[state=active]:text-black py-2 text-xs md:text-sm"
                  >
                    <group.icon className="w-4 h-4 mr-2 hidden md:inline-block" />
                    {group.id.charAt(0).toUpperCase() + group.id.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>

              {PERMISSION_GROUPS.map(group => (
                <TabsContent key={group.id} value={group.id} className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {group.permissions.map(permission => {
                      const isEnabled = (rolePermissions[selectedRole.id] || []).includes(permission);
                      return (
                        <motion.div
                          key={permission}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
                            isEnabled ? 'bg-luxury-gold/5 border-luxury-gold/20' : 'bg-background/20 border-border'
                          }`}
                        >
                          <div className="space-y-1">
                            <p className="text-sm font-semibold capitalize">
                              {permission.replace(/_/g, ' ')}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Allow role to {permission.replace(/_/g, ' ')} across the system.
                            </p>
                          </div>
                          <Switch 
                            checked={isEnabled}
                            onCheckedChange={() => togglePermission(selectedRole.id, permission)}
                            className="data-[state=checked]:bg-luxury-gold"
                          />
                        </motion.div>
                      );
                    })}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </Card>

          {/* Role Hierarchy Visualizer */}
          <Card className="luxury-card p-6 bg-luxury-obsidian border-luxury-gold/5">
            <div className="flex items-center gap-3 mb-6">
              <UserCheck className="w-5 h-5 text-luxury-gold" />
              <h3 className="font-bold text-lg">Role Hierarchy</h3>
            </div>
            <div className="relative flex flex-col items-center gap-2">
              {APP_ROLES.slice(0, 5).map((role, idx) => (
                <React.Fragment key={role.id}>
                  <div className={`px-6 py-3 rounded-full border border-luxury-gold/20 bg-background/40 min-w-[200px] text-center transition-all ${
                    selectedRole.id === role.id ? 'ring-2 ring-luxury-gold border-luxury-gold' : 'opacity-60'
                  }`}>
                    <span className="text-sm font-bold tracking-widest">{role.name}</span>
                  </div>
                  {idx < 4 && <div className="w-0.5 h-6 bg-luxury-gold/20" />}
                </React.Fragment>
              ))}
              <div className="mt-4 text-xs text-muted-foreground text-center italic">
                Hierarchy determines operational override and data visibility bounds.
              </div>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="p-6 border-red-500/20 bg-red-500/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <div>
                  <h4 className="font-bold text-red-500">Caution</h4>
                  <p className="text-sm text-red-500/60">Changing core permissions may disrupt operational workflows.</p>
                </div>
              </div>
              <Button variant="ghost" className="text-red-500 hover:bg-red-500/10">
                <Trash2 className="w-4 h-4 mr-2" />
                Deprecate Role
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
