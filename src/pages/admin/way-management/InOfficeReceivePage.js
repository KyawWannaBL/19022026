import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Printer, Save, Package, User, MapPin, CheckCircle2, Plus, FileText, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '@/lib/index';
import { useTranslation } from '@/lib/translations';
import { useLanguageContext } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { fadeInUp } from '@/lib/motion';
const InOfficeReceivePage = () => {
    const navigate = useNavigate();
    const { language } = useLanguageContext();
    const { t } = useTranslation(language);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showReceipt, setShowReceipt] = useState(false);
    const [receiptData, setReceiptData] = useState(null);
    // Form State
    const [formData, setFormData] = useState({
        senderName: '',
        senderPhone: '',
        senderAddress: '',
        receiverName: '',
        receiverPhone: '',
        receiverAddress: '',
        receiverCity: 'Yangon',
        serviceType: 'express',
        weight: '1',
        codAmount: '0',
        paymentMethod: 'cash',
        notes: '',
        dimensions: { l: '', w: '', h: '' }
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const calculateTotal = () => {
        const baseRate = formData.serviceType === 'express' ? 3500 : 2500;
        const weightCharge = Math.max(0, (parseFloat(formData.weight) || 1) - 1) * 1000;
        return baseRate + weightCharge;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API Call
        setTimeout(() => {
            const trackingId = `BRT${Math.floor(Math.random() * 90000000 + 10000000)}`;
            const finalData = {
                ...formData,
                trackingId,
                totalFee: calculateTotal(),
                timestamp: new Date().toLocaleString(),
                branch: 'Yangon Main Office'
            };
            setReceiptData(finalData);
            setIsSubmitting(false);
            setShowReceipt(true);
            toast.success(t('common.success'));
        }, 1500);
    };
    const handlePrint = () => {
        window.print();
    };
    const handleNewReceive = () => {
        setShowReceipt(false);
        setFormData({
            senderName: '',
            senderPhone: '',
            senderAddress: '',
            receiverName: '',
            receiverPhone: '',
            receiverAddress: '',
            receiverCity: 'Yangon',
            serviceType: 'express',
            weight: '1',
            codAmount: '0',
            paymentMethod: 'cash',
            notes: '',
            dimensions: { l: '', w: '', h: '' }
        });
    };
    return (_jsxs("div", { className: "min-h-screen bg-background p-4 md:p-8 space-y-8", children: [_jsxs("header", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Button, { variant: "ghost", size: "icon", onClick: () => navigate(ROUTE_PATHS.WAY_MANAGEMENT), className: "rounded-full hover:bg-navy-50", children: _jsx(ArrowLeft, { className: "h-5 w-5" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-navy-950 tracking-tight myanmar-text", children: t('way.inOfficeReceive') }), _jsx("p", { className: "text-muted-foreground myanmar-text", children: language === 'en' ? 'Process walk-in customers and create new shipments instantly.' : 'လာရောက်အပ်နှံသော ပါဆယ်များကို လက်ခံပြီး အသစ်ဖန်တီးပါ။' })] })] }), _jsx("div", { className: "flex items-center gap-2", children: _jsx(Badge, { variant: "outline", className: "px-3 py-1 border-gold-400 text-gold-600 bg-gold-50", children: "Yangon Main Branch" }) })] }), _jsx(AnimatePresence, { mode: "wait", children: !showReceipt ? (_jsxs(motion.div, { initial: "hidden", animate: "visible", exit: { opacity: 0, y: -20 }, variants: fadeInUp, className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsxs("form", { onSubmit: handleSubmit, className: "lg:col-span-2 space-y-6", children: [_jsxs(Card, { className: "lotus-card overflow-hidden", children: [_jsx(CardHeader, { className: "bg-navy-900/5", children: _jsxs(CardTitle, { className: "flex items-center gap-2 text-navy-900 myanmar-text", children: [_jsx(User, { className: "h-5 w-5 text-gold-500" }), language === 'en' ? 'Sender Information' : 'ပေးပို့သူ အချက်အလက်'] }) }), _jsxs(CardContent, { className: "grid grid-cols-1 md:grid-cols-2 gap-4 pt-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: t('merchant.name') }), _jsx(Input, { name: "senderName", required: true, placeholder: "John Doe", value: formData.senderName, onChange: handleInputChange })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: t('merchant.phone') }), _jsx(Input, { name: "senderPhone", required: true, placeholder: "09123456789", value: formData.senderPhone, onChange: handleInputChange })] }), _jsxs("div", { className: "md:col-span-2 space-y-2", children: [_jsx(Label, { children: t('merchant.address') }), _jsx(Textarea, { name: "senderAddress", required: true, placeholder: "No. 123, Street Name...", value: formData.senderAddress, onChange: handleInputChange })] })] })] }), _jsxs(Card, { className: "lotus-card overflow-hidden", children: [_jsx(CardHeader, { className: "bg-navy-900/5", children: _jsxs(CardTitle, { className: "flex items-center gap-2 text-navy-900 myanmar-text", children: [_jsx(MapPin, { className: "h-5 w-5 text-gold-500" }), language === 'en' ? 'Receiver Information' : 'လက်ခံသူ အချက်အလက်'] }) }), _jsxs(CardContent, { className: "grid grid-cols-1 md:grid-cols-2 gap-4 pt-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: t('deliveryman.name') }), _jsx(Input, { name: "receiverName", required: true, placeholder: "Jane Doe", value: formData.receiverName, onChange: handleInputChange })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: t('deliveryman.phone') }), _jsx(Input, { name: "receiverPhone", required: true, placeholder: "09987654321", value: formData.receiverPhone, onChange: handleInputChange })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { children: [t('tracking.location'), " (City)"] }), _jsxs(Select, { value: formData.receiverCity, onValueChange: (v) => setFormData(p => ({ ...p, receiverCity: v })), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select City" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "Yangon", children: "Yangon" }), _jsx(SelectItem, { value: "Mandalay", children: "Mandalay" }), _jsx(SelectItem, { value: "Naypyidaw", children: "Naypyidaw" }), _jsx(SelectItem, { value: "Taunggyi", children: "Taunggyi" })] })] })] }), _jsxs("div", { className: "md:col-span-2 space-y-2", children: [_jsx(Label, { children: t('order.deliveryAddress') }), _jsx(Textarea, { name: "receiverAddress", required: true, placeholder: "House No, Block, Street...", value: formData.receiverAddress, onChange: handleInputChange })] })] })] }), _jsxs(Card, { className: "lotus-card overflow-hidden", children: [_jsx(CardHeader, { className: "bg-navy-900/5", children: _jsxs(CardTitle, { className: "flex items-center gap-2 text-navy-900 myanmar-text", children: [_jsx(Package, { className: "h-5 w-5 text-gold-500" }), language === 'en' ? 'Parcel Information' : 'ပါဆယ် အချက်အလက်'] }) }), _jsxs(CardContent, { className: "grid grid-cols-1 md:grid-cols-3 gap-4 pt-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: t('order.serviceType') }), _jsxs(Select, { value: formData.serviceType, onValueChange: (v) => setFormData(p => ({ ...p, serviceType: v })), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "express", children: "Express (Next Day)" }), _jsx(SelectItem, { value: "standard", children: "Standard (2-3 Days)" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { children: [t('order.weight'), " (kg)"] }), _jsx(Input, { name: "weight", type: "number", step: "0.1", value: formData.weight, onChange: handleInputChange })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { children: [t('order.codAmount'), " (MMK)"] }), _jsx(Input, { name: "codAmount", type: "number", value: formData.codAmount, onChange: handleInputChange })] }), _jsxs("div", { className: "md:col-span-3 space-y-2", children: [_jsx(Label, { children: t('order.specialInstructions') }), _jsx(Input, { name: "notes", placeholder: "Fragile, don't drop, etc.", value: formData.notes, onChange: handleInputChange })] })] })] })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "lotus-card sticky top-8", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-navy-900 myanmar-text", children: t('common.total') }), _jsx(CardDescription, { children: language === 'en' ? 'Pricing breakdown based on weight and service.' : 'အလေးချိန်နှင့် ဝန်ဆောင်မှုအပေါ် မူတည်၍ တွက်ချက်ထားသည်။' })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-muted-foreground", children: t('common.subtotal') }), _jsxs("span", { className: "font-mono", children: [calculateTotal().toLocaleString(), " MMK"] })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsxs("span", { className: "text-muted-foreground", children: [t('common.tax'), " (0%)"] }), _jsx("span", { className: "font-mono", children: "0 MMK" })] }), _jsx(Separator, {}), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "font-bold text-navy-900", children: t('common.total') }), _jsxs("span", { className: "text-2xl font-bold text-gold-600 font-mono", children: [calculateTotal().toLocaleString(), " MMK"] })] }), _jsxs("div", { className: "pt-4 space-y-2", children: [_jsx(Label, { children: language === 'en' ? 'Payment Status' : 'ငွေပေးချေမှု အခြေအနေ' }), _jsxs(Select, { value: formData.paymentMethod, onValueChange: (v) => setFormData(p => ({ ...p, paymentMethod: v })), children: [_jsx(SelectTrigger, { className: "bg-white", children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "cash", children: "Cash Paid" }), _jsx(SelectItem, { value: "kpay", children: "KPay Paid" }), _jsx(SelectItem, { value: "receiver_pay", children: "Receiver Pays (COD Fee)" })] })] })] })] }), _jsxs(CardFooter, { className: "flex flex-col gap-3", children: [_jsx(Button, { className: "w-full luxury-button h-12 text-lg", disabled: isSubmitting, onClick: handleSubmit, children: isSubmitting ? t('common.loading') : (_jsxs(_Fragment, { children: [_jsx(Save, { className: "mr-2 h-5 w-5" }), language === 'en' ? 'Process Shipment' : 'ပါဆယ်ပို့ဆောင်မှု အတည်ပြုရန်'] })) }), _jsx(Button, { variant: "outline", className: "w-full", onClick: handleNewReceive, children: t('common.reset') })] })] }), _jsxs("div", { className: "p-6 rounded-2xl bg-navy-50 border border-navy-100 flex items-start gap-3", children: [_jsx(FileText, { className: "h-6 w-6 text-navy-400 mt-1" }), _jsx("p", { className: "text-xs text-navy-600 leading-relaxed", children: language === 'en'
                                                ? "By processing this shipment, you confirm that the parcel content complies with Britium Express safety policies. Digital receipt will be generated automatically."
                                                : "ဤပါဆယ်ကို လက်ခံခြင်းဖြင့် Britium Express ၏ ဘေးကင်းလုံခြုံရေး မူဝါဒများကို လိုက်နာကြောင်း အတည်ပြုပါသည်။ ငွေလက်ခံဖြတ်ပိုင်းကို အလိုအလျောက် ထုတ်ပေးမည်ဖြစ်ပါသည်။" })] })] })] }, "form")) : (_jsx(motion.div, { initial: "hidden", animate: "visible", variants: fadeInUp, className: "max-w-2xl mx-auto", children: _jsxs(Card, { className: "border-2 border-navy-900 shadow-2xl relative overflow-hidden", children: [_jsx("div", { className: "absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-navy-900 via-gold-500 to-navy-900" }), _jsxs(CardHeader, { className: "text-center pb-2", children: [_jsx("div", { className: "mx-auto w-16 h-16 bg-navy-900 rounded-full flex items-center justify-center mb-4", children: _jsx(CheckCircle2, { className: "h-10 w-10 text-gold-500" }) }), _jsx(CardTitle, { className: "text-2xl font-bold text-navy-900 font-display uppercase tracking-widest", children: "Britium Express" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Official Digital Receipt" })] }), _jsxs(CardContent, { className: "space-y-6 pt-4", children: [_jsxs("div", { className: "flex justify-between items-start border-y border-dashed py-4 border-navy-200", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-xs text-muted-foreground uppercase", children: "Tracking Number" }), _jsx("p", { className: "text-lg font-bold font-mono text-navy-950", children: receiptData?.trackingId })] }), _jsxs("div", { className: "text-right space-y-1", children: [_jsx("p", { className: "text-xs text-muted-foreground uppercase", children: "Date & Time" }), _jsx("p", { className: "text-sm font-medium", children: receiptData?.timestamp })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-8", children: [_jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-xs font-bold text-navy-400 uppercase", children: "From" }), _jsxs("div", { children: [_jsx("p", { className: "font-bold", children: receiptData?.senderName }), _jsx("p", { className: "text-sm text-muted-foreground", children: receiptData?.senderPhone }), _jsx("p", { className: "text-xs leading-tight mt-1", children: receiptData?.senderAddress })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-xs font-bold text-navy-400 uppercase", children: "To" }), _jsxs("div", { children: [_jsx("p", { className: "font-bold", children: receiptData?.receiverName }), _jsx("p", { className: "text-sm text-muted-foreground", children: receiptData?.receiverPhone }), _jsxs("p", { className: "text-xs leading-tight mt-1", children: [receiptData?.receiverAddress, ", ", receiptData?.receiverCity] })] })] })] }), _jsx(Separator, { className: "border-navy-100" }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-xs font-bold text-navy-400 uppercase", children: "Shipment Details" }), _jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsxs("div", { className: "bg-navy-50 p-3 rounded-lg", children: [_jsx("p", { className: "text-[10px] text-navy-400 uppercase", children: "Weight" }), _jsxs("p", { className: "text-sm font-bold", children: [receiptData?.weight, " KG"] })] }), _jsxs("div", { className: "bg-navy-50 p-3 rounded-lg", children: [_jsx("p", { className: "text-[10px] text-navy-400 uppercase", children: "Service" }), _jsx("p", { className: "text-sm font-bold capitalize", children: receiptData?.serviceType })] }), _jsxs("div", { className: "bg-navy-50 p-3 rounded-lg", children: [_jsx("p", { className: "text-[10px] text-navy-400 uppercase", children: "COD" }), _jsxs("p", { className: "text-sm font-bold", children: [parseInt(receiptData?.codAmount).toLocaleString(), " MMK"] })] })] })] }), _jsxs("div", { className: "bg-gold-500/10 p-4 rounded-xl border border-gold-500/20", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-navy-900 font-medium", children: "Total Shipping Fee" }), _jsxs("span", { className: "text-xl font-bold text-navy-900", children: [receiptData?.totalFee.toLocaleString(), " MMK"] })] }), _jsxs("p", { className: "text-[10px] text-navy-500 mt-1 uppercase", children: ["Payment: ", receiptData?.paymentMethod.replace('_', ' '), " \u2022 Status: Confirmed"] })] }), _jsx("div", { className: "flex justify-center pt-4", children: _jsxs("div", { className: "bg-white p-4 rounded-xl border border-navy-100 shadow-sm", children: [_jsx(QrCode, { className: "h-32 w-32 text-navy-900" }), _jsx("p", { className: "text-[10px] text-center text-muted-foreground mt-2 font-mono", children: "SCAN TO TRACK" })] }) })] }), _jsxs(CardFooter, { className: "flex justify-center gap-4 bg-navy-50 border-t border-navy-100 py-6", children: [_jsxs(Button, { variant: "outline", className: "flex-1", onClick: handlePrint, children: [_jsx(Printer, { className: "mr-2 h-4 w-4" }), "Print Receipt"] }), _jsxs(Button, { className: "flex-1 luxury-button", onClick: handleNewReceive, children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "New Customer"] })] })] }) }, "receipt")) }), _jsx("style", { dangerouslySetInnerHTML: { __html: `
        @media print {
          body * {
            visibility: hidden;
          }
          .max-w-2xl, .max-w-2xl * {
            visibility: visible;
          }
          .max-w-2xl {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .flex-1 {
            display: none;
          }
        }
      ` } })] }));
};
export default InOfficeReceivePage;
