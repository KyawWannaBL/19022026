import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Users, Clock, Info, MessageSquare, CheckCircle2, AlertCircle, Smartphone, Mail, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '@/lib/index';
import { useLanguageContext } from '@/lib/LanguageContext';
import { useTranslation } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
const SendMessagePage = () => {
    const { language } = useLanguageContext();
    const { t } = useTranslation(language);
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        receiverNameGroup: 'all',
        deliveryMethods: {
            push: true,
            sms: false,
            email: false,
        },
        schedule: 'immediate',
        scheduledTime: '',
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.content) {
            toast.error(t('common.error'), {
                description: 'Please fill in all required fields.'
            });
            return;
        }
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        toast.success(t('common.success'), {
            description: 'Broadcast message has been sent successfully.'
        });
        navigate(ROUTE_PATHS.BROADCAST_MESSAGE_HISTORY);
    };
    return (_jsxs("div", { className: "min-h-screen bg-background p-6 lg:p-10 space-y-8", children: [_jsx("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: _jsxs("div", { className: "space-y-1", children: [_jsx("div", { className: "flex items-center gap-2 text-muted-foreground mb-2", children: _jsxs(Button, { variant: "ghost", size: "sm", className: "p-0 hover:bg-transparent text-gold-600", onClick: () => navigate(ROUTE_PATHS.BROADCAST_MESSAGES), children: [_jsx(ChevronLeft, { className: "w-4 h-4 mr-1" }), t('common.back')] }) }), _jsxs("h1", { className: "text-3xl font-bold tracking-tight text-navy-950 dark:text-gold-400 flex items-center gap-3", children: [_jsx(Send, { className: "w-8 h-8" }), t('broadcast.sendMessage')] }), _jsx("p", { className: "text-muted-foreground", children: "Compose and broadcast notifications to your network" })] }) }), _jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-8", children: [_jsxs("div", { className: "xl:col-span-2 space-y-6", children: [_jsxs(Card, { className: "border-border/40 shadow-xl shadow-navy-950/5", children: [_jsx(CardHeader, { className: "border-b border-border/40 bg-navy-50/50", children: _jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [_jsx(MessageSquare, { className: "w-5 h-5 text-gold-600" }), t('broadcast.messageContent')] }) }), _jsxs(CardContent, { className: "pt-6 space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "title", children: t('common.title') || 'Message Title' }), _jsx(Input, { id: "title", placeholder: "e.g., Important System Update", className: "input-modern", value: formData.title, onChange: (e) => setFormData({ ...formData, title: e.target.value }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "content", children: t('broadcast.messageContent') }), _jsx(Textarea, { id: "content", placeholder: "Type your message here...", className: "min-h-[200px] input-modern", value: formData.content, onChange: (e) => setFormData({ ...formData, content: e.target.value }) }), _jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [_jsx(Info, { className: "w-3 h-3" }), "Recommended message length: 10-500 characters."] })] })] })] }), _jsxs(Card, { className: "border-border/40", children: [_jsx(CardHeader, { className: "border-b border-border/40 bg-navy-50/50", children: _jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [_jsx(Clock, { className: "w-5 h-5 text-gold-600" }), "Scheduling Options"] }) }), _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsx(Label, { children: "Send Schedule" }), _jsxs("div", { className: "flex flex-wrap gap-4", children: [_jsx(Button, { variant: formData.schedule === 'immediate' ? 'default' : 'outline', className: formData.schedule === 'immediate' ? 'bg-navy-900 text-gold-400' : '', onClick: () => setFormData({ ...formData, schedule: 'immediate' }), children: "Send Immediately" }), _jsx(Button, { variant: formData.schedule === 'scheduled' ? 'default' : 'outline', className: formData.schedule === 'scheduled' ? 'bg-navy-900 text-gold-400' : '', onClick: () => setFormData({ ...formData, schedule: 'scheduled' }), children: "Schedule for Later" })] })] }), formData.schedule === 'scheduled' && (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: "space-y-2", children: [_jsx(Label, { htmlFor: "scheduledTime", children: "Scheduled Date & Time" }), _jsx(Input, { id: "scheduledTime", type: "datetime-local", className: "input-modern", value: formData.scheduledTime, onChange: (e) => setFormData({ ...formData, scheduledTime: e.target.value }) })] }))] }) })] })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "border-border/40 shadow-lg", children: [_jsx(CardHeader, { className: "border-b border-border/40 bg-navy-50/50", children: _jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [_jsx(Users, { className: "w-5 h-5 text-gold-600" }), t('broadcast.receiverNames')] }) }), _jsxs(CardContent, { className: "pt-6 space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { children: [t('common.select'), " Group"] }), _jsxs(Select, { value: formData.receiverNameGroup, onValueChange: (val) => setFormData({ ...formData, receiverNameGroup: val }), children: [_jsx(SelectTrigger, { className: "input-modern", children: _jsx(SelectValue, { placeholder: "Select a group" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: t('broadcast.allUsers') }), _jsx(SelectItem, { value: "merchants", children: t('broadcast.merchants') }), _jsx(SelectItem, { value: "deliverymen", children: t('broadcast.deliverymen') }), _jsx(SelectItem, { value: "customers", children: t('broadcast.customers') })] })] })] }), _jsxs("div", { className: "space-y-4 pt-4 border-t border-border/40", children: [_jsx(Label, { children: "Delivery Methods" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center space-x-3 bg-navy-50/30 p-3 rounded-lg border border-border/20", children: [_jsx(Checkbox, { id: "push", checked: formData.deliveryMethods.push, onCheckedChange: (checked) => setFormData({
                                                                            ...formData,
                                                                            deliveryMethods: { ...formData.deliveryMethods, push: checked }
                                                                        }) }), _jsxs("label", { htmlFor: "push", className: "flex flex-1 items-center gap-3 cursor-pointer", children: [_jsx(Smartphone, { className: "w-4 h-4 text-navy-700" }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-sm font-medium", children: "Push Notification" }), _jsx("span", { className: "text-xs text-muted-foreground", children: "In-app & Mobile OS" })] })] })] }), _jsxs("div", { className: "flex items-center space-x-3 bg-navy-50/30 p-3 rounded-lg border border-border/20", children: [_jsx(Checkbox, { id: "sms", checked: formData.deliveryMethods.sms, onCheckedChange: (checked) => setFormData({
                                                                            ...formData,
                                                                            deliveryMethods: { ...formData.deliveryMethods, sms: checked }
                                                                        }) }), _jsxs("label", { htmlFor: "sms", className: "flex flex-1 items-center gap-3 cursor-pointer", children: [_jsx(MessageSquare, { className: "w-4 h-4 text-navy-700" }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-sm font-medium", children: "SMS Text Message" }), _jsx("span", { className: "text-xs text-muted-foreground", children: "Carrier charges apply" })] })] })] }), _jsxs("div", { className: "flex items-center space-x-3 bg-navy-50/30 p-3 rounded-lg border border-border/20", children: [_jsx(Checkbox, { id: "email", checked: formData.deliveryMethods.email, onCheckedChange: (checked) => setFormData({
                                                                            ...formData,
                                                                            deliveryMethods: { ...formData.deliveryMethods, email: checked }
                                                                        }) }), _jsxs("label", { htmlFor: "email", className: "flex flex-1 items-center gap-3 cursor-pointer", children: [_jsx(Mail, { className: "w-4 h-4 text-navy-700" }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-sm font-medium", children: "Email Broadcast" }), _jsx("span", { className: "text-xs text-muted-foreground", children: "Rich text support" })] })] })] })] })] })] })] }), _jsxs(Card, { className: "border-border/40 bg-gold-50/50", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-sm font-semibold flex items-center gap-2 text-gold-900", children: [_jsx(AlertCircle, { className: "w-4 h-4" }), "Final Checklist"] }) }), _jsxs(CardContent, { className: "space-y-2 text-xs text-gold-800", children: [_jsxs("p", { className: "flex items-center gap-2", children: [_jsx(CheckCircle2, { className: "w-3 h-3 text-success" }), "Targeting ", formData.receiverNameGroup === 'all' ? 'All Active Users' : formData.receiverNameGroup] }), _jsxs("p", { className: "flex items-center gap-2", children: [_jsx(CheckCircle2, { className: "w-3 h-3 text-success" }), "Sending via ", Object.entries(formData.deliveryMethods).filter(([_, v]) => v).map(([k]) => k.toUpperCase()).join(', ')] }), _jsxs("p", { className: "flex items-center gap-2", children: [_jsx(CheckCircle2, { className: "w-3 h-3 text-success" }), formData.schedule === 'immediate' ? 'Immediate Delivery' : `Scheduled for ${formData.scheduledTime || 'unspecified'}`] })] }), _jsx(CardFooter, { children: _jsx(Button, { className: "w-full luxury-button", onClick: handleSubmit, disabled: isSubmitting, children: isSubmitting ? t('common.loading') : t('broadcast.sendMessage') }) })] })] })] }), _jsx("div", { className: "flex items-center justify-center py-8 text-sm text-muted-foreground border-t border-border/40", children: "\u00A9 2026 Britium Express Logistics System. All rights reserved." })] }));
};
export default SendMessagePage;
