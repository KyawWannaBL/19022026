import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { TestTube, CheckCircle2, XCircle, AlertTriangle, Play, RefreshCw, Bug, Shield, Zap, TrendingUp, Clock, Users, Database, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useLanguageContext } from '@/lib/LanguageContext';
import { staggerContainer, staggerItem } from '@/lib/motion';
const QATestingPage = () => {
    const { language, t } = useLanguageContext();
    const { toast } = useToast();
    const [isRunningTests, setIsRunningTests] = useState(false);
    const [systemHealth, setSystemHealth] = useState('operational');
    const [testCoverage, setTestCoverage] = useState(94.2);
    const [testsPassed, setTestsPassed] = useState(2847);
    const [activeBugs, setActiveBugs] = useState(23);
    const [performanceScore, setPerformanceScore] = useState(87);
    const testSuites = [
        {
            id: 'auth',
            name: 'Authentication & Authorization',
            status: 'passed',
            testsTotal: 47,
            testsPassed: 47,
            coverage: 100,
            duration: '2.3s',
            icon: Shield
        },
        {
            id: 'rbac',
            name: 'Role-Based Access Control',
            status: 'running',
            testsTotal: 25,
            testsPassed: 23,
            coverage: 92,
            duration: '1.8s',
            icon: Users
        },
        {
            id: 'orders',
            name: 'Order Management System',
            status: 'warning',
            testsTotal: 158,
            testsPassed: 156,
            coverage: 98.7,
            duration: '12.4s',
            icon: Database
        },
        {
            id: 'payment',
            name: 'Payment Processing',
            status: 'failed',
            testsTotal: 36,
            testsPassed: 34,
            coverage: 94.4,
            duration: '5.7s',
            icon: Zap
        },
        {
            id: 'fleet',
            name: 'Fleet Management',
            status: 'passed',
            testsTotal: 89,
            testsPassed: 89,
            coverage: 100,
            duration: '8.2s',
            icon: Globe
        }
    ];
    const integrationMatrix = [
        { service: 'Admin Dashboard', auth: 'passed', order: 'passed', payment: 'warning', fleet: 'passed', notification: 'passed' },
        { service: 'Mobile Fleet App', auth: 'passed', order: 'passed', payment: 'passed', fleet: 'passed', notification: 'warning' },
        { service: 'Customer Portal', auth: 'passed', order: 'warning', payment: 'failed', fleet: 'na', notification: 'passed' },
        { service: 'Merchant Portal', auth: 'passed', order: 'passed', payment: 'passed', fleet: 'na', notification: 'passed' }
    ];
    const bugReports = [
        {
            id: 'BUG-2024-001',
            title: 'Payment gateway timeout',
            description: 'Users unable to complete payments during peak hours',
            severity: 'critical',
            timeAgo: '2h ago'
        },
        {
            id: 'BUG-2024-002',
            title: 'GPS tracking lag',
            description: 'Delivery tracking shows 2-3 minute delay',
            severity: 'high',
            timeAgo: '4h ago'
        },
        {
            id: 'BUG-2024-003',
            title: 'UI alignment issue',
            description: 'Mobile dashboard buttons misaligned on iOS',
            severity: 'medium',
            timeAgo: '1d ago'
        }
    ];
    const runAllTests = async () => {
        setIsRunningTests(true);
        toast({
            title: "Running Tests",
            description: "Executing full test suite...",
        });
        // Simulate test execution
        setTimeout(() => {
            setIsRunningTests(false);
            toast({
                title: "Tests Completed",
                description: "All test suites have been executed successfully",
            });
        }, 3000);
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case 'passed':
                return _jsx(CheckCircle2, { className: "w-5 h-5 text-success" });
            case 'failed':
                return _jsx(XCircle, { className: "w-5 h-5 text-error" });
            case 'warning':
                return _jsx(AlertTriangle, { className: "w-5 h-5 text-warning" });
            case 'running':
                return _jsx(RefreshCw, { className: "w-5 h-5 animate-spin text-info" });
            default:
                return _jsx(Clock, { className: "w-5 h-5 text-muted-foreground" });
        }
    };
    const getStatusBadge = (status) => {
        switch (status) {
            case 'passed':
                return _jsx(Badge, { className: "bg-success/10 text-success border-success/20", children: "PASSED" });
            case 'failed':
                return _jsx(Badge, { className: "bg-error/10 text-error border-error/20", children: "FAILED" });
            case 'warning':
                return _jsx(Badge, { className: "bg-warning/10 text-warning border-warning/20", children: "WARNING" });
            case 'running':
                return _jsx(Badge, { className: "bg-info/10 text-info border-info/20", children: "RUNNING" });
            default:
                return _jsx(Badge, { variant: "outline", children: status.toUpperCase() });
        }
    };
    const getSeverityBadge = (severity) => {
        switch (severity) {
            case 'critical':
                return _jsx(Badge, { className: "bg-error text-white", children: "CRITICAL" });
            case 'high':
                return _jsx(Badge, { className: "bg-warning text-white", children: "HIGH" });
            case 'medium':
                return _jsx(Badge, { className: "bg-info text-white", children: "MEDIUM" });
            case 'low':
                return _jsx(Badge, { className: "bg-muted text-muted-foreground", children: "LOW" });
            default:
                return _jsx(Badge, { variant: "outline", children: severity.toUpperCase() });
        }
    };
    const getIntegrationStatusIcon = (status) => {
        switch (status) {
            case 'passed':
                return '✅';
            case 'warning':
                return '⚠️';
            case 'failed':
                return '❌';
            case 'na':
                return '➖';
            default:
                return '❓';
        }
    };
    return (_jsxs(motion.div, { initial: "hidden", animate: "visible", variants: staggerContainer, className: "space-y-6", children: [_jsxs(motion.div, { variants: staggerItem, className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "p-2 bg-gold-500/10 rounded-lg", children: _jsx(TestTube, { className: "h-6 w-6 text-gold-500" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-navy-900", children: "Britium Express QA" }), _jsx("p", { className: "text-muted-foreground", children: "Integration Testing & Quality Assurance" })] })] }), _jsx("div", { className: "flex items-center space-x-3", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-2 h-2 bg-success rounded-full animate-pulse" }), _jsx("span", { className: "text-sm font-medium text-success", children: "All Systems Operational" })] }) })] }), _jsxs(motion.div, { variants: staggerItem, className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [_jsx(Card, { className: "glass-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Test Coverage" }), _jsxs("p", { className: "text-2xl font-bold text-navy-900", children: [testCoverage, "%"] }), _jsx("p", { className: "text-xs text-success", children: "+2.1% from last week" })] }), _jsx(TrendingUp, { className: "h-8 w-8 text-success" })] }) }) }), _jsx(Card, { className: "glass-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Tests Passed" }), _jsx("p", { className: "text-2xl font-bold text-navy-900", children: testsPassed.toLocaleString() }), _jsx("p", { className: "text-xs text-success", children: "98.7% success rate" })] }), _jsx(CheckCircle2, { className: "h-8 w-8 text-success" })] }) }) }), _jsx(Card, { className: "glass-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Active Bugs" }), _jsx("p", { className: "text-2xl font-bold text-navy-900", children: activeBugs }), _jsx("p", { className: "text-xs text-warning", children: "5 critical, 18 minor" })] }), _jsx(Bug, { className: "h-8 w-8 text-warning" })] }) }) }), _jsx(Card, { className: "glass-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Performance Score" }), _jsx("p", { className: "text-2xl font-bold text-navy-900", children: performanceScore }), _jsx("p", { className: "text-xs text-info", children: "Good performance" })] }), _jsx(Zap, { className: "h-8 w-8 text-info" })] }) }) })] }), _jsx(motion.div, { variants: staggerItem, children: _jsxs(Tabs, { defaultValue: "execution", className: "space-y-6", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-4", children: [_jsx(TabsTrigger, { value: "execution", children: "Test Execution" }), _jsx(TabsTrigger, { value: "integration", children: "Integration Matrix" }), _jsx(TabsTrigger, { value: "performance", children: "Performance" }), _jsx(TabsTrigger, { value: "security", children: "Security" })] }), _jsx(TabsContent, { value: "execution", className: "space-y-6", children: _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { children: "Test Execution Dashboard" }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs(Button, { onClick: runAllTests, disabled: isRunningTests, className: "btn-premium", children: [_jsx(Play, { className: "w-4 h-4 mr-2" }), "Run All Tests"] }), _jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(RefreshCw, { className: "w-4 h-4 mr-2" }), "Refresh"] })] })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: testSuites.map((suite) => {
                                                const IconComponent = suite.icon;
                                                return (_jsxs("div", { className: "flex items-center justify-between p-4 border rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(IconComponent, { className: "w-5 h-5 text-muted-foreground" }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold", children: suite.name }), _jsxs("p", { className: "text-sm text-muted-foreground", children: [suite.testsPassed, "/", suite.testsTotal, " tests"] })] })] }), getStatusBadge(suite.status)] }), _jsx("div", { className: "text-right", children: _jsxs("p", { className: "text-sm text-muted-foreground", children: ["Coverage: ", suite.coverage, "% | Duration: ", suite.duration] }) })] }, suite.id));
                                            }) }) })] }) }), _jsx(TabsContent, { value: "integration", className: "space-y-6", children: _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Integration Testing Matrix" }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b", children: [_jsx("th", { className: "text-left p-3", children: "Service" }), _jsx("th", { className: "text-center p-3", children: "Auth API" }), _jsx("th", { className: "text-center p-3", children: "Order API" }), _jsx("th", { className: "text-center p-3", children: "Payment API" }), _jsx("th", { className: "text-center p-3", children: "Fleet API" }), _jsx("th", { className: "text-center p-3", children: "Notification" })] }) }), _jsx("tbody", { children: integrationMatrix.map((row, index) => (_jsxs("tr", { className: "border-b", children: [_jsx("td", { className: "p-3 font-medium", children: row.service }), _jsx("td", { className: "text-center p-3", children: getIntegrationStatusIcon(row.auth) }), _jsx("td", { className: "text-center p-3", children: getIntegrationStatusIcon(row.order) }), _jsx("td", { className: "text-center p-3", children: getIntegrationStatusIcon(row.payment) }), _jsx("td", { className: "text-center p-3", children: getIntegrationStatusIcon(row.fleet) }), _jsx("td", { className: "text-center p-3", children: getIntegrationStatusIcon(row.notification) })] }, index))) })] }) }), _jsxs("div", { className: "flex items-center space-x-6 mt-4 text-sm", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { children: "\u2705" }), _jsx("span", { children: "Passing" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { children: "\u26A0\uFE0F" }), _jsx("span", { children: "Warning" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { children: "\u274C" }), _jsx("span", { children: "Failing" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { children: "\u2796" }), _jsx("span", { children: "Not Applicable" })] })] })] })] }) }), _jsxs(TabsContent, { value: "performance", className: "space-y-6", children: [_jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Performance Monitoring" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-3xl font-bold text-navy-900 mb-2", children: "245ms" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Avg Response Time" }), _jsx("p", { className: "text-xs text-success", children: "Target: <300ms" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-3xl font-bold text-navy-900 mb-2", children: "1.2K" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Requests/sec" }), _jsx("p", { className: "text-xs text-info", children: "Peak: 2.1K" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-3xl font-bold text-navy-900 mb-2", children: "0.3%" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Error Rate" }), _jsx("p", { className: "text-xs text-success", children: "Target: <1%" })] })] }) })] }), _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { children: "Active Issues" }), _jsx(Button, { variant: "outline", size: "sm", children: "View All" })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: bugReports.map((bug) => (_jsxs("div", { className: "flex items-start space-x-4 p-4 border rounded-lg", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [getSeverityBadge(bug.severity), _jsxs("span", { className: "text-sm font-mono text-muted-foreground", children: ["#", bug.id] })] }), _jsx("h4", { className: "font-semibold mb-1", children: bug.title }), _jsx("p", { className: "text-sm text-muted-foreground", children: bug.description })] }), _jsx("span", { className: "text-xs text-muted-foreground", children: bug.timeAgo })] }, bug.id))) }) })] })] }), _jsx(TabsContent, { value: "security", className: "space-y-6", children: _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Security Assessment" }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between p-3 border rounded", children: [_jsx("span", { children: "Vulnerability Scan" }), _jsx(Badge, { className: "bg-success/10 text-success border-success/20", children: "PASSED" })] }), _jsxs("div", { className: "flex items-center justify-between p-3 border rounded", children: [_jsx("span", { children: "Authentication Tests" }), _jsx(Badge, { className: "bg-success/10 text-success border-success/20", children: "PASSED" })] }), _jsxs("div", { className: "flex items-center justify-between p-3 border rounded", children: [_jsx("span", { children: "Data Encryption" }), _jsx(Badge, { className: "bg-success/10 text-success border-success/20", children: "PASSED" })] }), _jsxs("div", { className: "flex items-center justify-between p-3 border rounded", children: [_jsx("span", { children: "SQL Injection" }), _jsx(Badge, { className: "bg-success/10 text-success border-success/20", children: "PASSED" })] }), _jsxs("div", { className: "flex items-center justify-between p-3 border rounded", children: [_jsx("span", { children: "XSS Protection" }), _jsx(Badge, { className: "bg-warning/10 text-warning border-warning/20", children: "WARNING" })] })] }), _jsxs("div", { className: "mt-6 p-4 bg-muted/50 rounded-lg", children: [_jsx("div", { className: "flex items-center justify-between", children: _jsx("span", { className: "font-semibold", children: "Security Score: 94/100" }) }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Last scan: 2 hours ago" })] })] })] }) })] }) })] }));
};
export default QATestingPage;
