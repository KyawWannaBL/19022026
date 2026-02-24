import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Save, RotateCcw, Settings, AlertCircle, CheckCircle2, Loader2, Phone, Hash, MapPin, Building, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useLanguageContext } from '@/lib/LanguageContext';
import { SystemConfigAPI } from '@/lib/forms-api';
import { staggerContainer, staggerItem } from '@/lib/motion';
const SystemConfigurationPage = () => {
    const { language, t } = useLanguageContext();
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        wayIdLength: '6',
        promotionCodeLength: '8',
        contactPhone: '+95 9 123 456789',
        maxStationDistance: '5000',
        companyName: 'Britium Express Logistics',
        defaultCurrency: 'MMK',
        maxCashAdvance: '500000',
        autoApproveLimit: '100000'
    });
    const [originalData, setOriginalData] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [resetting, setResetting] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [errors, setErrors] = useState({});
    const [hasChanges, setHasChanges] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);
    // Load configuration on mount and when needed
    const loadConfiguration = useCallback(async (showRefreshToast = false) => {
        try {
            setLoading(true);
            const configs = await SystemConfigAPI.getAll();
            const configMap = {};
            configs.forEach(config => {
                configMap[config.setting_key] = config.setting_value;
            });
            const loadedData = {
                wayIdLength: configMap.wayIdLength || '6',
                promotionCodeLength: configMap.promotionCodeLength || '8',
                contactPhone: configMap.contactPhone || '+95 9 123 456789',
                maxStationDistance: configMap.maxStationDistance || '5000',
                companyName: configMap.companyName || 'Britium Express Logistics',
                defaultCurrency: configMap.defaultCurrency || 'MMK',
                maxCashAdvance: configMap.maxCashAdvance || '500000',
                autoApproveLimit: configMap.autoApproveLimit || '100000'
            };
            setFormData(loadedData);
            setOriginalData(loadedData);
            setErrors({});
            if (showRefreshToast) {
                toast({
                    title: "Success",
                    description: "Configuration refreshed successfully",
                });
            }
        }
        catch (error) {
            console.error('Error loading configuration:', error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to load system configuration",
                variant: "destructive",
            });
        }
        finally {
            setLoading(false);
        }
    }, [toast]);
    // Refresh data manually
    const handleRefresh = async () => {
        setRefreshing(true);
        await loadConfiguration(true);
        setRefreshing(false);
    };
    // Test database connection
    const testDatabaseConnection = async () => {
        try {
            setRefreshing(true);
            // Test basic connection
            const data = await SystemConfigAPI.getAll();
            toast({
                title: "Database Connection Test",
                description: `✅ Connection successful! Found ${data.length} configuration settings.`,
            });
        }
        catch (error) {
            console.error('Database test error:', error);
            toast({
                title: "Database Connection Test",
                description: `❌ Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
                variant: "destructive",
            });
        }
        finally {
            setRefreshing(false);
        }
    };
    useEffect(() => {
        loadConfiguration();
    }, [loadConfiguration]);
    useEffect(() => {
        const changed = JSON.stringify(formData) !== JSON.stringify(originalData);
        setHasChanges(changed);
    }, [formData, originalData]);
    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error for this field
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };
    const validateForm = async () => {
        try {
            const validation = await SystemConfigAPI.validate(formData);
            setErrors(validation.errors);
            return validation.isValid;
        }
        catch (error) {
            console.error('Validation error:', error);
            return false;
        }
    };
    const handleSave = async () => {
        try {
            setSaving(true);
            const isValid = await validateForm();
            if (!isValid) {
                toast({
                    title: "Validation Error",
                    description: "Please fix the errors before saving",
                    variant: "destructive",
                });
                return;
            }
            const configs = [
                {
                    setting_key: 'wayIdLength',
                    setting_value: formData.wayIdLength,
                    setting_type: 'integer',
                    description: 'Number of digits for Way ID generation (4-10)',
                    min_value: 4,
                    max_value: 10
                },
                {
                    setting_key: 'promotionCodeLength',
                    setting_value: formData.promotionCodeLength,
                    setting_type: 'integer',
                    description: 'Length of promotion codes (6-12 characters)',
                    min_value: 6,
                    max_value: 12
                },
                {
                    setting_key: 'contactPhone',
                    setting_value: formData.contactPhone,
                    setting_type: 'string',
                    description: 'Customer support contact number'
                },
                {
                    setting_key: 'maxStationDistance',
                    setting_value: formData.maxStationDistance,
                    setting_type: 'integer',
                    description: 'Maximum distance between stations in meters',
                    min_value: 100,
                    max_value: 50000
                },
                {
                    setting_key: 'companyName',
                    setting_value: formData.companyName,
                    setting_type: 'string',
                    description: 'Company name for documents and communications'
                },
                {
                    setting_key: 'defaultCurrency',
                    setting_value: formData.defaultCurrency,
                    setting_type: 'string',
                    description: 'Default currency for transactions'
                },
                {
                    setting_key: 'maxCashAdvance',
                    setting_value: formData.maxCashAdvance,
                    setting_type: 'decimal',
                    description: 'Maximum cash advance amount per deliveryman'
                },
                {
                    setting_key: 'autoApproveLimit',
                    setting_value: formData.autoApproveLimit,
                    setting_type: 'decimal',
                    description: 'Auto-approve vouchers below this amount'
                }
            ];
            await SystemConfigAPI.update(configs);
            // Update original data to reflect saved state
            setOriginalData(formData);
            setLastSaved(new Date());
            toast({
                title: "Success",
                description: "System configuration saved successfully",
            });
            // Refresh data to ensure consistency
            setTimeout(() => {
                loadConfiguration();
            }, 500);
        }
        catch (error) {
            console.error('Error saving configuration:', error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to save system configuration",
                variant: "destructive",
            });
        }
        finally {
            setSaving(false);
        }
    };
    const handleReset = async () => {
        try {
            setResetting(true);
            await SystemConfigAPI.resetToDefaults();
            toast({
                title: "Success",
                description: "System configuration reset to defaults",
            });
            // Reload configuration after reset
            await loadConfiguration();
        }
        catch (error) {
            console.error('Error resetting configuration:', error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to reset system configuration",
                variant: "destructive",
            });
        }
        finally {
            setResetting(false);
        }
    };
    const handleDiscard = () => {
        setFormData(originalData);
        setErrors({});
        toast({
            title: "Changes Discarded",
            description: "All unsaved changes have been discarded",
        });
    };
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-[400px]", children: _jsxs("div", { className: "text-center", children: [_jsx(Loader2, { className: "w-8 h-8 animate-spin text-gold-500 mx-auto mb-4" }), _jsx("p", { className: "text-muted-foreground", children: "Loading system configuration..." })] }) }));
    }
    return (_jsxs(motion.div, { initial: "hidden", animate: "visible", variants: staggerContainer, className: "space-y-6", children: [_jsxs(motion.div, { variants: staggerItem, className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "p-2 bg-gold-500/10 rounded-lg", children: _jsx(Settings, { className: "h-6 w-6 text-gold-500" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-navy-900", children: "System Configuration" }), _jsxs("p", { className: "text-muted-foreground", children: ["Basic system settings and identifiers", lastSaved && (_jsxs("span", { className: "ml-2 text-xs text-success", children: ["Last saved: ", lastSaved.toLocaleTimeString()] }))] })] })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: handleRefresh, disabled: refreshing, children: [_jsx(RefreshCw, { className: `w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}` }), "Refresh"] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: testDatabaseConnection, disabled: refreshing, className: "bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200", children: [_jsx(CheckCircle2, { className: `w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}` }), "Test DB"] }), hasChanges && (_jsxs(Badge, { variant: "outline", className: "bg-warning/10 text-warning border-warning/20", children: [_jsx(AlertCircle, { className: "w-3 h-3 mr-1" }), "Unsaved Changes"] }))] })] }), _jsx(motion.div, { variants: staggerItem, children: _jsxs(Tabs, { defaultValue: "general", className: "space-y-6", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-4", children: [_jsxs(TabsTrigger, { value: "general", className: "flex items-center space-x-2", children: [_jsx(Settings, { className: "w-4 h-4" }), _jsx("span", { children: "General" })] }), _jsxs(TabsTrigger, { value: "operations", className: "flex items-center space-x-2", children: [_jsx(Hash, { className: "w-4 h-4" }), _jsx("span", { children: "Operations" })] }), _jsxs(TabsTrigger, { value: "automation", className: "flex items-center space-x-2", children: [_jsx(CheckCircle2, { className: "w-4 h-4" }), _jsx("span", { children: "Automation" })] }), _jsxs(TabsTrigger, { value: "merchant", className: "flex items-center space-x-2", children: [_jsx(Building, { className: "w-4 h-4" }), _jsx("span", { children: "Merchant" })] })] }), _jsx(TabsContent, { value: "general", className: "space-y-6", children: _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center space-x-2", children: [_jsx(Settings, { className: "w-5 h-5 text-gold-500" }), _jsx("span", { children: "General Settings" })] }) }), _jsx(CardContent, { className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "wayIdLength", className: "flex items-center space-x-2", children: [_jsx(Hash, { className: "w-4 h-4 text-gold-500" }), _jsx("span", { children: "Way ID Length" })] }), _jsx(Input, { id: "wayIdLength", type: "number", min: "4", max: "10", value: formData.wayIdLength, onChange: (e) => handleInputChange('wayIdLength', e.target.value), className: errors.wayIdLength ? 'border-error' : '' }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Number of digits for Way ID generation (4-10)" }), errors.wayIdLength && (_jsx("p", { className: "text-sm text-error", children: errors.wayIdLength }))] }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "promotionCodeLength", className: "flex items-center space-x-2", children: [_jsx(Hash, { className: "w-4 h-4 text-gold-500" }), _jsx("span", { children: "Promotion Code Length" })] }), _jsx(Input, { id: "promotionCodeLength", type: "number", min: "6", max: "12", value: formData.promotionCodeLength, onChange: (e) => handleInputChange('promotionCodeLength', e.target.value), className: errors.promotionCodeLength ? 'border-error' : '' }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Length of promotion codes (6-12 characters)" }), errors.promotionCodeLength && (_jsx("p", { className: "text-sm text-error", children: errors.promotionCodeLength }))] }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "contactPhone", className: "flex items-center space-x-2", children: [_jsx(Phone, { className: "w-4 h-4 text-gold-500" }), _jsx("span", { children: "Contact Phone" })] }), _jsx(Input, { id: "contactPhone", type: "tel", value: formData.contactPhone, onChange: (e) => handleInputChange('contactPhone', e.target.value), className: errors.contactPhone ? 'border-error' : '' }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Customer support contact number" }), errors.contactPhone && (_jsx("p", { className: "text-sm text-error", children: errors.contactPhone }))] }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "maxStationDistance", className: "flex items-center space-x-2", children: [_jsx(MapPin, { className: "w-4 h-4 text-gold-500" }), _jsx("span", { children: "Max Station Distance" })] }), _jsx(Input, { id: "maxStationDistance", type: "number", min: "100", max: "50000", value: formData.maxStationDistance, onChange: (e) => handleInputChange('maxStationDistance', e.target.value), className: errors.maxStationDistance ? 'border-error' : '' }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Maximum distance between stations in meters" }), errors.maxStationDistance && (_jsx("p", { className: "text-sm text-error", children: errors.maxStationDistance }))] })] }) })] }) }), _jsx(TabsContent, { value: "operations", className: "space-y-6", children: _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center space-x-2", children: [_jsx(Hash, { className: "w-5 h-5 text-gold-500" }), _jsx("span", { children: "Operations Settings" })] }) }), _jsx(CardContent, { className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "companyName", className: "flex items-center space-x-2", children: [_jsx(Building, { className: "w-4 h-4 text-gold-500" }), _jsx("span", { children: "Company Name" })] }), _jsx(Input, { id: "companyName", value: formData.companyName, onChange: (e) => handleInputChange('companyName', e.target.value) }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Company name for documents and communications" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "defaultCurrency", children: "Default Currency" }), _jsx(Input, { id: "defaultCurrency", value: formData.defaultCurrency, onChange: (e) => handleInputChange('defaultCurrency', e.target.value) }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Default currency for transactions" })] })] }) })] }) }), _jsx(TabsContent, { value: "automation", className: "space-y-6", children: _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center space-x-2", children: [_jsx(CheckCircle2, { className: "w-5 h-5 text-gold-500" }), _jsx("span", { children: "Automation Settings" })] }) }), _jsx(CardContent, { className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "maxCashAdvance", children: "Max Cash Advance (MMK)" }), _jsx(Input, { id: "maxCashAdvance", type: "number", value: formData.maxCashAdvance, onChange: (e) => handleInputChange('maxCashAdvance', e.target.value) }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Maximum cash advance amount per deliveryman" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "autoApproveLimit", children: "Auto Approve Limit (MMK)" }), _jsx(Input, { id: "autoApproveLimit", type: "number", value: formData.autoApproveLimit, onChange: (e) => handleInputChange('autoApproveLimit', e.target.value) }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Auto-approve vouchers below this amount" })] })] }) })] }) }), _jsx(TabsContent, { value: "merchant", className: "space-y-6", children: _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center space-x-2", children: [_jsx(Building, { className: "w-5 h-5 text-gold-500" }), _jsx("span", { children: "Merchant Settings" })] }) }), _jsx(CardContent, { children: _jsx("p", { className: "text-muted-foreground", children: "Merchant-specific settings will be available in future updates." }) })] }) })] }) }), _jsxs(motion.div, { variants: staggerItem, className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs(Button, { variant: "outline", onClick: handleReset, disabled: resetting || saving, className: "flex items-center space-x-2", children: [resetting ? (_jsx(Loader2, { className: "w-4 h-4 animate-spin" })) : (_jsx(RotateCcw, { className: "w-4 h-4" })), _jsx("span", { children: "Reset to Default" })] }), hasChanges && (_jsx(Button, { variant: "outline", onClick: handleDiscard, disabled: saving, className: "text-warning hover:text-warning", children: "Discard Changes" }))] }), _jsxs(Button, { onClick: handleSave, disabled: !hasChanges || saving, className: "btn-premium flex items-center space-x-2", children: [saving ? (_jsx(Loader2, { className: "w-4 h-4 animate-spin" })) : (_jsx(Save, { className: "w-4 h-4" })), _jsx("span", { children: saving ? 'Saving...' : 'Save Changes' })] })] })] }));
};
export default SystemConfigurationPage;
