import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Server, Database, Users, Settings, Lock, Key, Monitor, HardDrive, Cpu, Wifi, AlertTriangle, CheckCircle2, Clock, Activity, RefreshCw, Download, Upload, Terminal, FileText, Zap, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useLanguageContext } from '@/lib/LanguageContext';
import { staggerContainer, staggerItem } from '@/lib/motion';
const SystemAdministrationPage = () => {
    const { language, t } = useLanguageContext();
    const { toast } = useToast();
    const [systemUptime, setSystemUptime] = useState('15 days, 7 hours');
    const [activeUsers, setActiveUsers] = useState(127);
    const [systemLoad, setSystemLoad] = useState(68);
    const [securityScore, setSecurityScore] = useState(94);
    const systemMetrics = [
        { name: 'CPU Usage', value: 45, unit: '%', status: 'healthy', trend: 'stable' },
        { name: 'Memory Usage', value: 72, unit: '%', status: 'warning', trend: 'up' },
        { name: 'Disk Usage', value: 34, unit: '%', status: 'healthy', trend: 'stable' },
        { name: 'Network I/O', value: 156, unit: 'MB/s', status: 'healthy', trend: 'up' },
        { name: 'Database Connections', value: 89, unit: 'active', status: 'healthy', trend: 'stable' },
        { name: 'API Response Time', value: 245, unit: 'ms', status: 'healthy', trend: 'down' }
    ];
    const services = [
        { id: '1', name: 'Web Server (Nginx)', status: 'running', uptime: '15d 7h', memory: 128, cpu: 12 },
        { id: '2', name: 'Database (PostgreSQL)', status: 'running', uptime: '15d 7h', memory: 2048, cpu: 25 },
        { id: '3', name: 'Redis Cache', status: 'running', uptime: '15d 7h', memory: 512, cpu: 8 },
        { id: '4', name: 'Message Queue', status: 'running', uptime: '15d 7h', memory: 256, cpu: 15 },
        { id: '5', name: 'File Storage', status: 'running', uptime: '15d 7h', memory: 64, cpu: 3 },
        { id: '6', name: 'Backup Service', status: 'stopped', uptime: '0h', memory: 0, cpu: 0 }
    ];
    const systemUsers = [
        { id: '1', username: 'admin', email: 'admin@britium.com', role: 'Super Admin', lastLogin: '2026-01-27 09:30', status: 'active' },
        { id: '2', username: 'manager1', email: 'manager@britium.com', role: 'Manager', lastLogin: '2026-01-27 08:45', status: 'active' },
        { id: '3', username: 'operator1', email: 'operator@britium.com', role: 'Operator', lastLogin: '2026-01-26 17:20', status: 'inactive' },
        { id: '4', username: 'guest', email: 'guest@britium.com', role: 'Guest', lastLogin: 'Never', status: 'locked' }
    ];
    const securityEvents = [
        {
            id: '1',
            type: 'failed_login',
            user: 'unknown',
            timestamp: '2026-01-27 09:45:23',
            severity: 'medium',
            description: 'Multiple failed login attempts from IP 192.168.1.100'
        },
        {
            id: '2',
            type: 'permission_change',
            user: 'admin',
            timestamp: '2026-01-27 09:30:15',
            severity: 'low',
            description: 'User permissions updated for manager1'
        },
        {
            id: '3',
            type: 'data_access',
            user: 'operator1',
            timestamp: '2026-01-27 08:15:42',
            severity: 'low',
            description: 'Accessed sensitive customer data'
        }
    ];
    const getStatusBadge = (status) => {
        switch (status) {
            case 'running':
            case 'active':
            case 'healthy':
                return _jsx(Badge, { className: "bg-success/10 text-success border-success/20", children: "Running" });
            case 'stopped':
            case 'inactive':
                return _jsx(Badge, { className: "bg-warning/10 text-warning border-warning/20", children: "Stopped" });
            case 'error':
            case 'locked':
            case 'critical':
                return _jsx(Badge, { className: "bg-error/10 text-error border-error/20", children: "Error" });
            case 'warning':
                return _jsx(Badge, { className: "bg-warning/10 text-warning border-warning/20", children: "Warning" });
            default:
                return _jsx(Badge, { variant: "outline", children: status });
        }
    };
    const getSeverityBadge = (severity) => {
        switch (severity) {
            case 'high':
                return _jsx(Badge, { className: "bg-error text-white", children: "High" });
            case 'medium':
                return _jsx(Badge, { className: "bg-warning text-white", children: "Medium" });
            case 'low':
                return _jsx(Badge, { className: "bg-info text-white", children: "Low" });
            default:
                return _jsx(Badge, { variant: "outline", children: severity });
        }
    };
    const getMetricIcon = (name) => {
        switch (name.toLowerCase()) {
            case 'cpu usage':
                return _jsx(Cpu, { className: "w-4 h-4" });
            case 'memory usage':
                return _jsx(Monitor, { className: "w-4 h-4" });
            case 'disk usage':
                return _jsx(HardDrive, { className: "w-4 h-4" });
            case 'network i/o':
                return _jsx(Wifi, { className: "w-4 h-4" });
            case 'database connections':
                return _jsx(Database, { className: "w-4 h-4" });
            case 'api response time':
                return _jsx(Activity, { className: "w-4 h-4" });
            default:
                return _jsx(Monitor, { className: "w-4 h-4" });
        }
    };
    const restartService = (serviceId) => {
        toast({
            title: "Service Restart",
            description: `Restarting service ${serviceId}...`,
        });
    };
    const backupSystem = () => {
        toast({
            title: "System Backup",
            description: "System backup initiated...",
        });
    };
    const generateReport = () => {
        toast({
            title: "Generating Report",
            description: "System administration report is being generated...",
        });
    };
    return (_jsxs(motion.div, { initial: "hidden", animate: "visible", variants: staggerContainer, className: "space-y-6", children: [_jsxs(motion.div, { variants: staggerItem, className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "p-2 bg-gold-500/10 rounded-lg", children: _jsx(Shield, { className: "h-6 w-6 text-gold-500" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-navy-900", children: "System Administration" }), _jsx("p", { className: "text-muted-foreground", children: "Server Management & Security Control" })] })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs("div", { className: "text-right", children: [_jsx("p", { className: "text-sm font-medium", children: "System Administrator" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "admin@britium.com" })] }), _jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(RefreshCw, { className: "w-4 h-4 mr-2" }), "Refresh"] })] })] }), _jsxs(motion.div, { variants: staggerItem, className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [_jsx(Card, { className: "glass-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "System Uptime" }), _jsx("p", { className: "text-2xl font-bold text-navy-900", children: systemUptime }), _jsx("p", { className: "text-xs text-success", children: "99.8% availability" })] }), _jsx(Clock, { className: "h-8 w-8 text-success" })] }) }) }), _jsx(Card, { className: "glass-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Active Users" }), _jsx("p", { className: "text-2xl font-bold text-navy-900", children: activeUsers }), _jsx("p", { className: "text-xs text-info", children: "Peak: 156 users" })] }), _jsx(Users, { className: "h-8 w-8 text-info" })] }) }) }), _jsx(Card, { className: "glass-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "System Load" }), _jsxs("p", { className: "text-2xl font-bold text-navy-900", children: [systemLoad, "%"] }), _jsx("p", { className: "text-xs text-warning", children: "Moderate load" })] }), _jsx(Activity, { className: "h-8 w-8 text-warning" })] }) }) }), _jsx(Card, { className: "glass-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Security Score" }), _jsxs("p", { className: "text-2xl font-bold text-navy-900", children: [securityScore, "%"] }), _jsx("p", { className: "text-xs text-success", children: "Excellent" })] }), _jsx(Shield, { className: "h-8 w-8 text-success" })] }) }) })] }), _jsx(motion.div, { variants: staggerItem, children: _jsxs(Tabs, { defaultValue: "dashboard", className: "space-y-6", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-7", children: [_jsx(TabsTrigger, { value: "dashboard", children: "Dashboard" }), _jsx(TabsTrigger, { value: "services", children: "Services" }), _jsx(TabsTrigger, { value: "users", children: "Users" }), _jsx(TabsTrigger, { value: "security", children: "Security" }), _jsx(TabsTrigger, { value: "monitoring", children: "Monitoring" }), _jsx(TabsTrigger, { value: "backup", children: "Backup" }), _jsx(TabsTrigger, { value: "logs", children: "Logs" })] }), _jsxs(TabsContent, { value: "dashboard", className: "space-y-6", children: [_jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "System Metrics" }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: systemMetrics.map((metric, index) => (_jsxs("div", { className: "p-4 border rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [getMetricIcon(metric.name), _jsx("span", { className: "font-medium text-sm", children: metric.name })] }), getStatusBadge(metric.status)] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-2xl font-bold", children: metric.value }), _jsx("span", { className: "text-sm text-muted-foreground", children: metric.unit })] }), _jsx(Progress, { value: typeof metric.value === 'number' && metric.unit === '%' ? metric.value : 50, className: "mt-2 h-2" })] }, index))) }) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "System Actions" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-3", children: [_jsxs(Button, { onClick: backupSystem, className: "w-full justify-start", children: [_jsx(Download, { className: "w-4 h-4 mr-2" }), "Create System Backup"] }), _jsxs(Button, { variant: "outline", className: "w-full justify-start", children: [_jsx(RefreshCw, { className: "w-4 h-4 mr-2" }), "Restart Services"] }), _jsxs(Button, { variant: "outline", className: "w-full justify-start", children: [_jsx(Terminal, { className: "w-4 h-4 mr-2" }), "Open Terminal"] }), _jsxs(Button, { onClick: generateReport, variant: "outline", className: "w-full justify-start", children: [_jsx(FileText, { className: "w-4 h-4 mr-2" }), "Generate Report"] })] }) })] }), _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "System Alerts" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-start space-x-3 p-3 bg-warning/5 border border-warning/20 rounded", children: [_jsx(AlertTriangle, { className: "w-4 h-4 text-warning mt-1" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-sm", children: "High Memory Usage" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Memory usage at 72% - consider optimization" })] })] }), _jsxs("div", { className: "flex items-start space-x-3 p-3 bg-info/5 border border-info/20 rounded", children: [_jsx(Clock, { className: "w-4 h-4 text-info mt-1" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-sm", children: "Scheduled Maintenance" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "System maintenance scheduled for tonight 2:00 AM" })] })] }), _jsxs("div", { className: "flex items-start space-x-3 p-3 bg-success/5 border border-success/20 rounded", children: [_jsx(CheckCircle2, { className: "w-4 h-4 text-success mt-1" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-sm", children: "Backup Completed" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Daily backup completed successfully at 1:00 AM" })] })] })] }) })] })] })] }), _jsx(TabsContent, { value: "services", className: "space-y-6", children: _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { children: "System Services" }), _jsxs(Button, { className: "btn-premium", children: [_jsx(Zap, { className: "w-4 h-4 mr-2" }), "Start All"] })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b", children: [_jsx("th", { className: "text-left p-3", children: "Service" }), _jsx("th", { className: "text-left p-3", children: "Status" }), _jsx("th", { className: "text-left p-3", children: "Uptime" }), _jsx("th", { className: "text-left p-3", children: "Memory" }), _jsx("th", { className: "text-left p-3", children: "CPU" }), _jsx("th", { className: "text-left p-3", children: "Actions" })] }) }), _jsx("tbody", { children: services.map((service) => (_jsxs("tr", { className: "border-b", children: [_jsx("td", { className: "p-3", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Server, { className: "w-4 h-4 text-muted-foreground" }), _jsx("span", { className: "font-medium", children: service.name })] }) }), _jsx("td", { className: "p-3", children: getStatusBadge(service.status) }), _jsx("td", { className: "p-3", children: service.uptime }), _jsxs("td", { className: "p-3", children: [service.memory, " MB"] }), _jsxs("td", { className: "p-3", children: [service.cpu, "%"] }), _jsx("td", { className: "p-3", children: _jsxs("div", { className: "flex space-x-2", children: [_jsx(Button, { size: "sm", variant: service.status === 'running' ? 'outline' : 'default', onClick: () => restartService(service.id), children: service.status === 'running' ? 'Restart' : 'Start' }), _jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Eye, { className: "w-4 h-4" }) })] }) })] }, service.id))) })] }) }) })] }) }), _jsx(TabsContent, { value: "users", className: "space-y-6", children: _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { children: "System Users" }), _jsxs(Button, { className: "btn-premium", children: [_jsx(Users, { className: "w-4 h-4 mr-2" }), "Add User"] })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b", children: [_jsx("th", { className: "text-left p-3", children: "Username" }), _jsx("th", { className: "text-left p-3", children: "Email" }), _jsx("th", { className: "text-left p-3", children: "Role" }), _jsx("th", { className: "text-left p-3", children: "Last Login" }), _jsx("th", { className: "text-left p-3", children: "Status" }), _jsx("th", { className: "text-left p-3", children: "Actions" })] }) }), _jsx("tbody", { children: systemUsers.map((user) => (_jsxs("tr", { className: "border-b", children: [_jsx("td", { className: "p-3 font-medium", children: user.username }), _jsx("td", { className: "p-3", children: user.email }), _jsx("td", { className: "p-3", children: user.role }), _jsx("td", { className: "p-3", children: user.lastLogin }), _jsx("td", { className: "p-3", children: getStatusBadge(user.status) }), _jsx("td", { className: "p-3", children: _jsxs("div", { className: "flex space-x-2", children: [_jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Key, { className: "w-4 h-4" }) }), _jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Lock, { className: "w-4 h-4" }) })] }) })] }, user.id))) })] }) }) })] }) }), _jsx(TabsContent, { value: "security", className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Security Events" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: securityEvents.map((event) => (_jsxs("div", { className: "flex items-start space-x-3 p-3 border rounded-lg", children: [_jsx("div", { className: "p-1 bg-muted/50 rounded", children: _jsx(Shield, { className: "w-4 h-4" }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("span", { className: "font-medium text-sm capitalize", children: event.type.replace('_', ' ') }), getSeverityBadge(event.severity)] }), _jsx("p", { className: "text-xs text-muted-foreground mb-1", children: event.description }), _jsxs("div", { className: "flex items-center space-x-4 text-xs text-muted-foreground", children: [_jsxs("span", { children: ["User: ", event.user] }), _jsx("span", { children: event.timestamp })] })] })] }, event.id))) }) })] }), _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Security Settings" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Two-Factor Authentication" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Require 2FA for all admin accounts" })] }), _jsx(Switch, { defaultChecked: true })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Session Timeout" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Auto-logout after inactivity" })] }), _jsx(Switch, { defaultChecked: true })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "IP Whitelist" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Restrict access by IP address" })] }), _jsx(Switch, {})] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Audit Logging" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Log all system activities" })] }), _jsx(Switch, { defaultChecked: true })] }), _jsx("div", { className: "pt-4 border-t", children: _jsxs(Button, { className: "w-full", children: [_jsx(Shield, { className: "w-4 h-4 mr-2" }), "Run Security Scan"] }) })] }) })] })] }) }), _jsx(TabsContent, { value: "monitoring", className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Performance Monitoring" }) }), _jsx(CardContent, { children: _jsx("div", { className: "h-64 flex items-center justify-center bg-muted/20 rounded", children: _jsx(Activity, { className: "w-16 h-16 text-muted-foreground" }) }) })] }), _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Resource Usage" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-sm font-medium", children: "CPU Usage" }), _jsx("span", { className: "text-sm", children: "45%" })] }), _jsx(Progress, { value: 45, className: "h-2" })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-sm font-medium", children: "Memory Usage" }), _jsx("span", { className: "text-sm", children: "72%" })] }), _jsx(Progress, { value: 72, className: "h-2" })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-sm font-medium", children: "Disk Usage" }), _jsx("span", { className: "text-sm", children: "34%" })] }), _jsx(Progress, { value: 34, className: "h-2" })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-sm font-medium", children: "Network Usage" }), _jsx("span", { className: "text-sm", children: "28%" })] }), _jsx(Progress, { value: 28, className: "h-2" })] })] }) })] })] }) }), _jsx(TabsContent, { value: "backup", className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Backup Status" }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between p-3 border rounded-lg", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Daily Backup" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Last: 2026-01-27 01:00 AM" })] }), _jsx(Badge, { className: "bg-success/10 text-success border-success/20", children: "Completed" })] }), _jsxs("div", { className: "flex items-center justify-between p-3 border rounded-lg", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Weekly Backup" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Last: 2026-01-21 02:00 AM" })] }), _jsx(Badge, { className: "bg-success/10 text-success border-success/20", children: "Completed" })] }), _jsxs("div", { className: "flex items-center justify-between p-3 border rounded-lg", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Monthly Backup" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Next: 2026-02-01 03:00 AM" })] }), _jsx(Badge, { className: "bg-info/10 text-info border-info/20", children: "Scheduled" })] })] }), _jsxs("div", { className: "mt-6 space-y-3", children: [_jsxs(Button, { onClick: backupSystem, className: "w-full", children: [_jsx(Download, { className: "w-4 h-4 mr-2" }), "Create Manual Backup"] }), _jsxs(Button, { variant: "outline", className: "w-full", children: [_jsx(Upload, { className: "w-4 h-4 mr-2" }), "Restore from Backup"] })] })] })] }), _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Backup Configuration" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Backup Schedule" }), _jsxs("div", { className: "mt-2 space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm", children: "Daily at 1:00 AM" }), _jsx(Switch, { defaultChecked: true })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm", children: "Weekly on Sunday" }), _jsx(Switch, { defaultChecked: true })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm", children: "Monthly on 1st" }), _jsx(Switch, { defaultChecked: true })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Retention Policy" }), _jsxs("div", { className: "mt-2 space-y-2", children: [_jsx(Input, { placeholder: "Daily backups (days)", defaultValue: "7" }), _jsx(Input, { placeholder: "Weekly backups (weeks)", defaultValue: "4" }), _jsx(Input, { placeholder: "Monthly backups (months)", defaultValue: "12" })] })] }), _jsxs(Button, { variant: "outline", className: "w-full", children: [_jsx(Settings, { className: "w-4 h-4 mr-2" }), "Update Configuration"] })] }) })] })] }) }), _jsx(TabsContent, { value: "logs", className: "space-y-6", children: _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { children: "System Logs" }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(RefreshCw, { className: "w-4 h-4 mr-2" }), "Refresh"] }), _jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(Download, { className: "w-4 h-4 mr-2" }), "Export"] })] })] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "bg-black text-green-400 p-4 rounded-lg font-mono text-sm h-96 overflow-y-auto", children: [_jsx("div", { children: "[2026-01-27 09:45:23] INFO: User admin logged in from 192.168.1.50" }), _jsx("div", { children: "[2026-01-27 09:44:15] INFO: Database backup completed successfully" }), _jsx("div", { children: "[2026-01-27 09:43:02] WARN: High memory usage detected (72%)" }), _jsx("div", { children: "[2026-01-27 09:42:18] INFO: Service nginx restarted" }), _jsx("div", { children: "[2026-01-27 09:41:45] ERROR: Failed login attempt from 192.168.1.100" }), _jsx("div", { children: "[2026-01-27 09:40:32] INFO: System health check completed" }), _jsx("div", { children: "[2026-01-27 09:39:28] INFO: Cache cleared successfully" }), _jsx("div", { children: "[2026-01-27 09:38:15] WARN: Disk usage approaching 80%" }), _jsx("div", { children: "[2026-01-27 09:37:42] INFO: Scheduled task executed" }), _jsx("div", { children: "[2026-01-27 09:36:58] INFO: API response time: 245ms" })] }) })] }) })] }) })] }));
};
export default SystemAdministrationPage;
