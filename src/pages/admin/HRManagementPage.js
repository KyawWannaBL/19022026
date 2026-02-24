import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, Briefcase, DollarSign, GraduationCap, Shield, Calendar, Search, Filter, Edit, Award, Plus, Clock, AlertTriangle, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useLanguageContext } from '@/lib/LanguageContext';
import { staggerContainer, staggerItem } from '@/lib/motion';
const HRManagementPage = () => {
    const { language, t } = useLanguageContext();
    const { toast } = useToast();
    const [totalEmployees, setTotalEmployees] = useState(1247);
    const [openPositions, setOpenPositions] = useState(23);
    const [attendanceRate, setAttendanceRate] = useState(94.2);
    const [trainingCompletion, setTrainingCompletion] = useState(87);
    const [searchQuery, setSearchQuery] = useState('');
    const employees = [
        {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@britium.com',
            role: 'Rider',
            branch: 'Yangon Central',
            status: 'active',
            joinDate: 'Jan 15, 2024'
        },
        {
            id: '2',
            name: 'Mary Smith',
            email: 'mary.smith@britium.com',
            role: 'Driver',
            branch: 'Mandalay Hub',
            status: 'training',
            joinDate: 'Jan 20, 2024'
        },
        {
            id: '3',
            name: 'Robert Johnson',
            email: 'robert.j@britium.com',
            role: 'Warehouse',
            branch: 'Yangon Central',
            status: 'probation',
            joinDate: 'Dec 10, 2023'
        }
    ];
    const jobPostings = [
        {
            id: '1',
            title: 'Senior Delivery Driver',
            department: 'Yangon Central Branch',
            location: 'Yangon',
            salary: '500,000 - 700,000 MMK',
            type: 'Full-time',
            status: 'active',
            applications: 12
        },
        {
            id: '2',
            title: 'Warehouse Supervisor',
            department: 'Mandalay Hub',
            location: 'Mandalay',
            salary: '800,000 - 1,200,000 MMK',
            type: 'Full-time',
            status: 'urgent',
            applications: 8
        }
    ];
    const trainingPrograms = [
        {
            id: '1',
            title: 'Safety & Security Training',
            description: 'Mandatory for all delivery staff',
            date: 'Jan 30, 2024',
            duration: '2 hours',
            enrolled: 45,
            status: 'scheduled',
            completion: 78
        },
        {
            id: '2',
            title: 'Customer Service Excellence',
            description: 'For all customer-facing roles',
            date: 'Feb 5, 2024',
            duration: '4 hours',
            enrolled: 67,
            status: 'active',
            completion: 92
        }
    ];
    const roleDistribution = [
        { role: 'Riders', count: 456, percentage: 37 },
        { role: 'Drivers', count: 234, percentage: 19 },
        { role: 'Warehouse', count: 189, percentage: 15 },
        { role: 'Supervisors', count: 67, percentage: 5 },
        { role: 'Management', count: 45, percentage: 4 }
    ];
    const recentActivities = [
        {
            id: '1',
            type: 'hire',
            message: 'New Employee Onboarded',
            description: 'John Doe joined as Rider - Yangon Branch',
            time: '2 hours ago'
        },
        {
            id: '2',
            type: 'review',
            message: 'Performance Review Completed',
            description: 'Q4 reviews completed for 45 employees',
            time: '5 hours ago'
        },
        {
            id: '3',
            type: 'training',
            message: 'Training Session Scheduled',
            description: 'Safety Training for all Drivers - Jan 30',
            time: '1 day ago'
        }
    ];
    const getStatusBadge = (status) => {
        switch (status) {
            case 'active':
                return _jsx(Badge, { className: "bg-success/10 text-success border-success/20", children: "Active" });
            case 'training':
                return _jsx(Badge, { className: "bg-info/10 text-info border-info/20", children: "Training" });
            case 'probation':
                return _jsx(Badge, { className: "bg-warning/10 text-warning border-warning/20", children: "Probation" });
            case 'suspended':
                return _jsx(Badge, { className: "bg-error/10 text-error border-error/20", children: "Suspended" });
            default:
                return _jsx(Badge, { variant: "outline", children: status });
        }
    };
    const getJobStatusBadge = (status) => {
        switch (status) {
            case 'active':
                return _jsx(Badge, { className: "bg-success/10 text-success border-success/20", children: "Active" });
            case 'urgent':
                return _jsx(Badge, { className: "bg-error/10 text-error border-error/20", children: "Urgent" });
            case 'closed':
                return _jsx(Badge, { className: "bg-muted text-muted-foreground", children: "Closed" });
            default:
                return _jsx(Badge, { variant: "outline", children: status });
        }
    };
    const getTrainingStatusBadge = (status) => {
        switch (status) {
            case 'scheduled':
                return _jsx(Badge, { className: "bg-info/10 text-info border-info/20", children: "Scheduled" });
            case 'active':
                return _jsx(Badge, { className: "bg-success/10 text-success border-success/20", children: "Active" });
            case 'completed':
                return _jsx(Badge, { className: "bg-muted text-muted-foreground", children: "Completed" });
            default:
                return _jsx(Badge, { variant: "outline", children: status });
        }
    };
    const getActivityIcon = (type) => {
        switch (type) {
            case 'hire':
                return _jsx(UserPlus, { className: "w-4 h-4 text-success" });
            case 'review':
                return _jsx(Award, { className: "w-4 h-4 text-info" });
            case 'training':
                return _jsx(GraduationCap, { className: "w-4 h-4 text-warning" });
            default:
                return _jsx(Users, { className: "w-4 h-4 text-muted-foreground" });
        }
    };
    const addEmployee = () => {
        toast({
            title: "Add Employee",
            description: "Employee creation form would open here",
        });
    };
    const generateReport = () => {
        toast({
            title: "Generating Report",
            description: "HR report is being generated...",
        });
    };
    return (_jsxs(motion.div, { initial: "hidden", animate: "visible", variants: staggerContainer, className: "space-y-6", children: [_jsxs(motion.div, { variants: staggerItem, className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "p-2 bg-gold-500/10 rounded-lg", children: _jsx(Users, { className: "h-6 w-6 text-gold-500" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-navy-900", children: "Britium Express" }), _jsx("p", { className: "text-muted-foreground", children: "Human Resources Management" })] })] }), _jsx("div", { className: "flex items-center space-x-3", children: _jsx("div", { className: "text-right", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Users, { className: "w-4 h-4 text-muted-foreground" }), _jsx("span", { className: "text-sm font-medium", children: "HR Manager" })] }) }) })] }), _jsxs(motion.div, { variants: staggerItem, className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [_jsx(Card, { className: "glass-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Total Employees" }), _jsx("p", { className: "text-2xl font-bold text-navy-900", children: totalEmployees.toLocaleString() }), _jsx("p", { className: "text-xs text-success", children: "+12 this month" })] }), _jsx(Users, { className: "h-8 w-8 text-info" })] }) }) }), _jsx(Card, { className: "glass-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Open Positions" }), _jsx("p", { className: "text-2xl font-bold text-navy-900", children: openPositions }), _jsx("p", { className: "text-xs text-warning", children: "5 urgent" })] }), _jsx(Briefcase, { className: "h-8 w-8 text-warning" })] }) }) }), _jsx(Card, { className: "glass-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Attendance Rate" }), _jsxs("p", { className: "text-2xl font-bold text-navy-900", children: [attendanceRate, "%"] }), _jsx("p", { className: "text-xs text-success", children: "+2.1% vs last month" })] }), _jsx(Clock, { className: "h-8 w-8 text-success" })] }) }) }), _jsx(Card, { className: "glass-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Training Completion" }), _jsxs("p", { className: "text-2xl font-bold text-navy-900", children: [trainingCompletion, "%"] }), _jsx("p", { className: "text-xs text-info", children: "156 completed" })] }), _jsx(GraduationCap, { className: "h-8 w-8 text-info" })] }) }) })] }), _jsx(motion.div, { variants: staggerItem, children: _jsxs(Tabs, { defaultValue: "dashboard", className: "space-y-6", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-7", children: [_jsx(TabsTrigger, { value: "dashboard", children: "Dashboard" }), _jsx(TabsTrigger, { value: "employees", children: "Employees" }), _jsx(TabsTrigger, { value: "recruitment", children: "Recruitment" }), _jsx(TabsTrigger, { value: "payroll", children: "Payroll" }), _jsx(TabsTrigger, { value: "performance", children: "Performance" }), _jsx(TabsTrigger, { value: "training", children: "Training" }), _jsx(TabsTrigger, { value: "compliance", children: "Compliance" })] }), _jsxs(TabsContent, { value: "dashboard", className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Employee Distribution by Role" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: roleDistribution.map((item, index) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Users, { className: "w-4 h-4 text-muted-foreground" }), _jsx("span", { className: "font-medium", children: item.role })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("span", { className: "text-sm text-muted-foreground", children: item.count }), _jsx("div", { className: "w-20", children: _jsx(Progress, { value: item.percentage, className: "h-2" }) })] })] }, index))) }) })] }), _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Recent HR Activities" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: recentActivities.map((activity) => (_jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("div", { className: "p-1 bg-muted/50 rounded", children: getActivityIcon(activity.type) }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "font-medium text-sm", children: activity.message }), _jsx("p", { className: "text-xs text-muted-foreground", children: activity.description }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: activity.time })] })] }, activity.id))) }) })] })] }), _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Quick Actions" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [_jsxs(Button, { onClick: addEmployee, className: "h-20 flex-col", children: [_jsx(UserPlus, { className: "w-6 h-6 mb-2" }), "Add Employee"] }), _jsxs(Button, { onClick: generateReport, variant: "outline", className: "h-20 flex-col", children: [_jsx(FileText, { className: "w-6 h-6 mb-2" }), "Generate Report"] }), _jsxs(Button, { variant: "outline", className: "h-20 flex-col", children: [_jsx(Calendar, { className: "w-6 h-6 mb-2" }), "Schedule Training"] }), _jsxs(Button, { variant: "outline", className: "h-20 flex-col", children: [_jsx(DollarSign, { className: "w-6 h-6 mb-2" }), "Process Payroll"] })] }) })] })] }), _jsx(TabsContent, { value: "employees", className: "space-y-6", children: _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { children: "Employee Management" }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(Filter, { className: "w-4 h-4 mr-2" }), "Filter"] }), _jsxs(Button, { onClick: addEmployee, className: "btn-premium", children: [_jsx(UserPlus, { className: "w-4 h-4 mr-2" }), "Add Employee"] })] })] }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "mb-4", children: _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search employees...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "pl-10" })] }) }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b", children: [_jsx("th", { className: "text-left p-3", children: "Employee" }), _jsx("th", { className: "text-left p-3", children: "Role" }), _jsx("th", { className: "text-left p-3", children: "Branch" }), _jsx("th", { className: "text-left p-3", children: "Status" }), _jsx("th", { className: "text-left p-3", children: "Join Date" }), _jsx("th", { className: "text-left p-3", children: "Actions" })] }) }), _jsx("tbody", { children: employees.map((employee) => (_jsxs("tr", { className: "border-b", children: [_jsx("td", { className: "p-3", children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Avatar, { children: _jsx(AvatarFallback, { children: employee.name.split(' ').map(n => n[0]).join('') }) }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: employee.name }), _jsx("p", { className: "text-sm text-muted-foreground", children: employee.email })] })] }) }), _jsx("td", { className: "p-3", children: employee.role }), _jsx("td", { className: "p-3", children: employee.branch }), _jsx("td", { className: "p-3", children: getStatusBadge(employee.status) }), _jsx("td", { className: "p-3", children: employee.joinDate }), _jsx("td", { className: "p-3", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Edit, { className: "w-4 h-4" }) }), _jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Shield, { className: "w-4 h-4" }) })] }) })] }, employee.id))) })] }) })] })] }) }), _jsx(TabsContent, { value: "recruitment", className: "space-y-6", children: _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { children: "Active Job Postings" }), _jsxs(Button, { className: "btn-premium", children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "New Posting"] })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: jobPostings.map((job) => (_jsxs("div", { className: "p-4 border rounded-lg", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h4", { className: "font-semibold", children: job.title }), _jsx("p", { className: "text-sm text-muted-foreground", children: job.department }), _jsxs("div", { className: "flex items-center space-x-4 mt-2 text-sm text-muted-foreground", children: [_jsxs("span", { children: ["\uD83D\uDCCD ", job.location] }), _jsxs("span", { children: ["\uD83D\uDCB0 ", job.salary] }), _jsxs("span", { children: ["\u23F0 ", job.type] })] })] }), _jsxs("div", { className: "text-right", children: [getJobStatusBadge(job.status), _jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [job.applications, " applications"] })] })] }), _jsxs("div", { className: "flex items-center space-x-3 mt-4", children: [_jsx(Button, { size: "sm", children: "View Applications" }), _jsx(Button, { variant: "outline", size: "sm", children: "Edit" })] })] }, job.id))) }) })] }) }), _jsx(TabsContent, { value: "training", className: "space-y-6", children: _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { children: "Training Programs" }), _jsxs(Button, { className: "btn-premium", children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "New Program"] })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: trainingPrograms.map((program) => (_jsxs("div", { className: "p-4 border rounded-lg", children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h4", { className: "font-semibold", children: program.title }), _jsx("p", { className: "text-sm text-muted-foreground", children: program.description }), _jsxs("div", { className: "flex items-center space-x-4 mt-2 text-sm text-muted-foreground", children: [_jsxs("span", { children: ["\uD83D\uDCC5 ", program.date] }), _jsxs("span", { children: ["\u23F0 ", program.duration] }), _jsxs("span", { children: ["\uD83D\uDC65 ", program.enrolled, " enrolled"] })] })] }), getTrainingStatusBadge(program.status)] }), _jsx("div", { className: "flex items-center justify-between", children: _jsxs("div", { className: "flex-1 mr-4", children: [_jsxs("div", { className: "flex items-center justify-between text-sm mb-1", children: [_jsx("span", { children: "Completion Rate" }), _jsxs("span", { children: [program.completion, "%"] })] }), _jsx(Progress, { value: program.completion, className: "h-2" })] }) })] }, program.id))) }) })] }) }), _jsx(TabsContent, { value: "payroll", className: "space-y-6", children: _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Payroll Management" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-3xl font-bold text-navy-900 mb-2", children: "\u20B9 45.2M" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Total Payroll" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-3xl font-bold text-navy-900 mb-2", children: "1,247" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Employees Paid" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-3xl font-bold text-navy-900 mb-2", children: "\u20B9 36,285" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Average Salary" })] })] }) })] }) }), _jsx(TabsContent, { value: "performance", className: "space-y-6", children: _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Performance Overview" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-4xl font-bold text-navy-900 mb-2", children: "8.4/10" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Overall Performance Score" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm", children: "On-time Delivery" }), _jsx("span", { className: "font-semibold", children: "92%" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm", children: "Customer Rating" }), _jsx("span", { className: "font-semibold", children: "4.7" })] })] })] }) })] }) }), _jsx(TabsContent, { value: "compliance", className: "space-y-6", children: _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Compliance Overview" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsxs("div", { className: "text-center mb-4", children: [_jsx("div", { className: "text-4xl font-bold text-success mb-2", children: "94%" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Compliance Score" })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between p-2 border rounded", children: [_jsx("span", { className: "text-sm", children: "Labor Law Compliance" }), _jsx("span", { className: "text-success font-semibold", children: "100%" })] }), _jsxs("div", { className: "flex items-center justify-between p-2 border rounded", children: [_jsx("span", { className: "text-sm", children: "Safety Regulations" }), _jsx("span", { className: "text-success font-semibold", children: "96%" })] }), _jsxs("div", { className: "flex items-center justify-between p-2 border rounded", children: [_jsx("span", { className: "text-sm", children: "Documentation" }), _jsx("span", { className: "text-warning font-semibold", children: "87%" })] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-4", children: "Required Actions" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-start space-x-3 p-3 border rounded-lg", children: [_jsx(AlertTriangle, { className: "w-4 h-4 text-warning mt-1" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-sm", children: "License Renewal Required" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "12 driver licenses expire within 30 days" })] })] }), _jsxs("div", { className: "flex items-start space-x-3 p-3 border rounded-lg", children: [_jsx(Clock, { className: "w-4 h-4 text-info mt-1" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-sm", children: "Training Overdue" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Safety training overdue for 8 employees" })] })] })] })] })] }) })] }) })] }) })] }));
};
export default HRManagementPage;
