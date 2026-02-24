import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Database, CheckCircle, XCircle } from 'lucide-react';
const DatabaseTestPage = () => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState('idle');
    const [testResults, setTestResults] = useState([]);
    const [testSetting, setTestSetting] = useState('');
    const testDatabaseConnection = async () => {
        setLoading(true);
        setConnectionStatus('testing');
        const results = [];
        try {
            // Test 1: Basic connection
            results.push({ test: 'Basic Connection', status: 'testing' });
            const { data: authData, error: authError } = await supabase.auth.getUser();
            if (authError) {
                results[0] = { test: 'Basic Connection', status: 'error', message: authError.message };
            }
            else {
                results[0] = { test: 'Basic Connection', status: 'success', message: 'Connected successfully' };
            }
            // Test 2: Check if system_configuration table exists
            results.push({ test: 'System Config Table', status: 'testing' });
            const { data: configData, error: configError } = await supabase
                .from('system_configuration')
                .select('*')
                .limit(1);
            if (configError) {
                results[1] = { test: 'System Config Table', status: 'error', message: configError.message };
            }
            else {
                results[1] = { test: 'System Config Table', status: 'success', message: `Found ${configData?.length || 0} records` };
            }
            // Test 3: Check vouchers table
            results.push({ test: 'Vouchers Table', status: 'testing' });
            const { data: vouchersData, error: vouchersError } = await supabase
                .from('vouchers')
                .select('*')
                .limit(1);
            if (vouchersError) {
                results[2] = { test: 'Vouchers Table', status: 'error', message: vouchersError.message };
            }
            else {
                results[2] = { test: 'Vouchers Table', status: 'success', message: `Found ${vouchersData?.length || 0} records` };
            }
            // Test 4: Check cash_advances table
            results.push({ test: 'Cash Advances Table', status: 'testing' });
            const { data: advancesData, error: advancesError } = await supabase
                .from('cash_advances')
                .select('*')
                .limit(1);
            if (advancesError) {
                results[3] = { test: 'Cash Advances Table', status: 'error', message: advancesError.message };
            }
            else {
                results[3] = { test: 'Cash Advances Table', status: 'success', message: `Found ${advancesData?.length || 0} records` };
            }
            setConnectionStatus('success');
            toast({
                title: "Database Test Complete",
                description: "Check the results below",
            });
        }
        catch (error) {
            console.error('Database test error:', error);
            setConnectionStatus('error');
            toast({
                title: "Database Test Failed",
                description: error instanceof Error ? error.message : "Unknown error occurred",
                variant: "destructive",
            });
        }
        finally {
            setTestResults(results);
            setLoading(false);
        }
    };
    const testInsertSystemConfig = async () => {
        if (!testSetting.trim()) {
            toast({
                title: "Error",
                description: "Please enter a test setting value",
                variant: "destructive",
            });
            return;
        }
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('system_configuration')
                .insert({
                setting_key: 'test_setting_' + Date.now(),
                setting_value: testSetting,
                setting_type: 'string',
                description: 'Test setting created from database test page'
            })
                .select()
                .single();
            if (error) {
                throw error;
            }
            toast({
                title: "Success",
                description: `Test setting created with ID: ${data.id}`,
            });
            setTestSetting('');
            // Refresh the test results
            await testDatabaseConnection();
        }
        catch (error) {
            console.error('Insert test error:', error);
            toast({
                title: "Insert Test Failed",
                description: error instanceof Error ? error.message : "Unknown error occurred",
                variant: "destructive",
            });
        }
        finally {
            setLoading(false);
        }
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case 'success':
                return _jsx(CheckCircle, { className: "w-5 h-5 text-success" });
            case 'error':
                return _jsx(XCircle, { className: "w-5 h-5 text-error" });
            case 'testing':
                return _jsx(Loader2, { className: "w-5 h-5 animate-spin text-info" });
            default:
                return _jsx(Database, { className: "w-5 h-5 text-muted-foreground" });
        }
    };
    return (_jsxs("div", { className: "space-y-6 p-6", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Database, { className: "h-8 w-8 text-gold-500" }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "Database Connection Test" }), _jsx("p", { className: "text-muted-foreground", children: "Test Supabase database connectivity and table access" })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Connection Test" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx(Button, { onClick: testDatabaseConnection, disabled: loading, className: "w-full", children: loading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "w-4 h-4 animate-spin mr-2" }), "Testing..."] })) : (_jsxs(_Fragment, { children: [_jsx(Database, { className: "w-4 h-4 mr-2" }), "Test Database Connection"] })) }), testResults.length > 0 && (_jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-semibold", children: "Test Results:" }), testResults.map((result, index) => (_jsxs("div", { className: "flex items-center justify-between p-2 border rounded", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [getStatusIcon(result.status), _jsx("span", { className: "font-medium", children: result.test })] }), _jsx("span", { className: "text-sm text-muted-foreground", children: result.message })] }, index)))] }))] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Insert Test" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "testSetting", children: "Test Setting Value" }), _jsx(Input, { id: "testSetting", value: testSetting, onChange: (e) => setTestSetting(e.target.value), placeholder: "Enter a test value" })] }), _jsx(Button, { onClick: testInsertSystemConfig, disabled: loading || !testSetting.trim(), className: "w-full", children: loading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "w-4 h-4 animate-spin mr-2" }), "Inserting..."] })) : ('Test Insert Operation') })] })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Connection Status" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "flex items-center space-x-2", children: [getStatusIcon(connectionStatus), _jsxs("span", { className: "font-medium", children: [connectionStatus === 'idle' && 'Ready to test', connectionStatus === 'testing' && 'Testing connection...', connectionStatus === 'success' && 'Connection successful', connectionStatus === 'error' && 'Connection failed'] })] }) })] })] }));
};
export default DatabaseTestPage;
