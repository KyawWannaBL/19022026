import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Wallet, CreditCard, ArrowUpRight, ArrowDownLeft, RefreshCw, Download, Eye, EyeOff, Star, Gift, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useLanguageContext } from '@/lib/LanguageContext';
import { RiderAPI } from '@/lib/rider-api';
import { staggerContainer, staggerItem } from '@/lib/motion';
const RiderWallet = () => {
    const navigate = useNavigate();
    const { language, t } = useLanguageContext();
    const { toast } = useToast();
    const [rider, setRider] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showBalance, setShowBalance] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    useEffect(() => {
        loadWalletData();
    }, []);
    const loadWalletData = async () => {
        try {
            setLoading(true);
            // Load rider profile
            const riderProfile = await RiderAPI.getRiderProfile();
            if (riderProfile) {
                setRider(riderProfile);
                // Load transactions
                const riderTransactions = await RiderAPI.getRiderTransactions(riderProfile.id, 100);
                setTransactions(riderTransactions);
            }
        }
        catch (error) {
            console.error('Error loading wallet data:', error);
            toast({
                title: t('rider.error'),
                description: "Failed to load wallet data",
                variant: "destructive",
            });
        }
        finally {
            setLoading(false);
        }
    };
    const formatCurrency = (amount) => {
        if (!showBalance)
            return '****';
        return new Intl.NumberFormat('en-MM', {
            style: 'currency',
            currency: 'MMK',
            minimumFractionDigits: 0
        }).format(amount);
    };
    const getTransactionIcon = (type) => {
        switch (type) {
            case 'cod_collection':
                return _jsx(ArrowDownLeft, { className: "w-4 h-4 text-success" });
            case 'delivery_fee':
                return _jsx(TrendingUp, { className: "w-4 h-4 text-success" });
            case 'cod_remittance':
                return _jsx(ArrowUpRight, { className: "w-4 h-4 text-error" });
            case 'wallet_withdrawal':
                return _jsx(ArrowUpRight, { className: "w-4 h-4 text-error" });
            case 'bonus':
                return _jsx(Gift, { className: "w-4 h-4 text-gold-500" });
            case 'penalty':
                return _jsx(AlertTriangle, { className: "w-4 h-4 text-error" });
            default:
                return _jsx(DollarSign, { className: "w-4 h-4 text-muted-foreground" });
        }
    };
    const getTransactionColor = (type) => {
        switch (type) {
            case 'cod_collection':
            case 'delivery_fee':
            case 'bonus':
                return 'text-success';
            case 'cod_remittance':
            case 'wallet_withdrawal':
            case 'penalty':
                return 'text-error';
            default:
                return 'text-muted-foreground';
        }
    };
    const getTransactionAmount = (transaction) => {
        const isIncome = ['cod_collection', 'delivery_fee', 'bonus'].includes(transaction.transaction_type);
        const sign = isIncome ? '+' : '-';
        return `${sign}${formatCurrency(Math.abs(transaction.amount))}`;
    };
    const getTodayTransactions = () => {
        const today = new Date().toISOString().split('T')[0];
        return transactions.filter(t => t.createdAt.startsWith(today));
    };
    const getThisWeekTransactions = () => {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return transactions.filter(t => new Date(t.createdAt) >= weekAgo);
    };
    const getThisMonthTransactions = () => {
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        return transactions.filter(t => new Date(t.createdAt) >= monthAgo);
    };
    const calculateEarnings = (transactionList) => {
        return transactionList
            .filter(t => ['delivery_fee', 'bonus'].includes(t.transaction_type))
            .reduce((sum, t) => sum + t.amount, 0);
    };
    const calculateCOD = (transactionList) => {
        const collected = transactionList
            .filter(t => t.transaction_type === 'cod_collection')
            .reduce((sum, t) => sum + t.amount, 0);
        const remitted = transactionList
            .filter(t => t.transaction_type === 'cod_remittance')
            .reduce((sum, t) => sum + t.amount, 0);
        return collected - remitted;
    };
    const todayTransactions = getTodayTransactions();
    const weekTransactions = getThisWeekTransactions();
    const monthTransactions = getThisMonthTransactions();
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-navy-50 to-gold-50 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mx-auto mb-4" }), _jsx("p", { className: "text-navy-600", children: t('rider.loading') })] }) }));
    }
    return (_jsxs(motion.div, { initial: "hidden", animate: "visible", variants: staggerContainer, className: "min-h-screen bg-gradient-to-br from-navy-50 to-gold-50 pb-20", children: [_jsx(motion.div, { variants: staggerItem, className: "bg-white shadow-sm border-b", children: _jsx("div", { className: "px-4 py-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-10 h-10 bg-gold-500/10 rounded-full flex items-center justify-center", children: _jsx(Wallet, { className: "w-5 h-5 text-gold-500" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-lg font-bold text-navy-900", children: t('rider.wallet') }), _jsx("p", { className: "text-sm text-muted-foreground", children: rider?.full_name || 'Rider' })] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: () => setShowBalance(!showBalance), children: showBalance ? _jsx(Eye, { className: "w-4 h-4" }) : _jsx(EyeOff, { className: "w-4 h-4" }) }), _jsx(Button, { variant: "outline", size: "sm", onClick: loadWalletData, disabled: loading, children: _jsx(RefreshCw, { className: `w-4 h-4 ${loading ? 'animate-spin' : ''}` }) })] })] }) }) }), _jsxs("div", { className: "px-4 py-6 space-y-6", children: [_jsxs(motion.div, { variants: staggerItem, className: "grid grid-cols-2 gap-4", children: [_jsx(Card, { className: "glass-card bg-gradient-to-br from-gold-500/10 to-gold-600/10 border-gold-200", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx("div", { className: "w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-2", children: _jsx(Wallet, { className: "w-6 h-6 text-gold-500" }) }), _jsx("div", { className: "text-2xl font-bold text-gold-600", children: formatCurrency(rider?.wallet_balance || 0) }), _jsx("div", { className: "text-sm text-muted-foreground", children: t('rider.walletBalance') })] }) }), _jsx(Card, { className: "glass-card bg-gradient-to-br from-success/10 to-success/20 border-success/20", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx("div", { className: "w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-2", children: _jsx(DollarSign, { className: "w-6 h-6 text-success" }) }), _jsx("div", { className: "text-2xl font-bold text-success", children: formatCurrency(rider?.cod_balance || 0) }), _jsx("div", { className: "text-sm text-muted-foreground", children: t('rider.codBalance') })] }) })] }), _jsx(motion.div, { variants: staggerItem, children: _jsx(Card, { className: "glass-card bg-gradient-to-r from-info/10 to-info/20 border-info/20", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-muted-foreground", children: t('rider.todayEarnings') }), _jsx("p", { className: "text-3xl font-bold text-info", children: formatCurrency(calculateEarnings(todayTransactions)) }), _jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [todayTransactions.length, " ", t('rider.transactions')] })] }), _jsx("div", { className: "w-16 h-16 bg-info/20 rounded-full flex items-center justify-center", children: _jsx(TrendingUp, { className: "w-8 h-8 text-info" }) })] }) }) }) }), _jsx(motion.div, { variants: staggerItem, children: _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3 bg-white", children: [_jsx(TabsTrigger, { value: "overview", children: t('rider.overview') }), _jsx(TabsTrigger, { value: "transactions", children: t('rider.transactions') }), _jsx(TabsTrigger, { value: "actions", children: t('rider.actions') })] }), _jsx(TabsContent, { value: "overview", className: "mt-6 space-y-4", children: _jsxs("div", { className: "grid grid-cols-1 gap-4", children: [_jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-lg", children: [t('rider.earnings'), " ", t('rider.summary')] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-3 gap-4 text-center", children: [_jsxs("div", { children: [_jsx("div", { className: "text-xl font-bold text-navy-900", children: formatCurrency(calculateEarnings(todayTransactions)) }), _jsx("div", { className: "text-sm text-muted-foreground", children: t('rider.today') })] }), _jsxs("div", { children: [_jsx("div", { className: "text-xl font-bold text-navy-900", children: formatCurrency(calculateEarnings(weekTransactions)) }), _jsx("div", { className: "text-sm text-muted-foreground", children: t('rider.thisWeek') })] }), _jsxs("div", { children: [_jsx("div", { className: "text-xl font-bold text-navy-900", children: formatCurrency(calculateEarnings(monthTransactions)) }), _jsx("div", { className: "text-sm text-muted-foreground", children: t('rider.thisMonth') })] })] }) })] }), _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-lg", children: [t('rider.cod'), " ", t('rider.summary')] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-3 gap-4 text-center", children: [_jsxs("div", { children: [_jsx("div", { className: "text-xl font-bold text-success", children: formatCurrency(calculateCOD(todayTransactions)) }), _jsx("div", { className: "text-sm text-muted-foreground", children: t('rider.today') })] }), _jsxs("div", { children: [_jsx("div", { className: "text-xl font-bold text-success", children: formatCurrency(calculateCOD(weekTransactions)) }), _jsx("div", { className: "text-sm text-muted-foreground", children: t('rider.thisWeek') })] }), _jsxs("div", { children: [_jsx("div", { className: "text-xl font-bold text-success", children: formatCurrency(calculateCOD(monthTransactions)) }), _jsx("div", { className: "text-sm text-muted-foreground", children: t('rider.thisMonth') })] })] }) })] })] }) }), _jsx(TabsContent, { value: "transactions", className: "mt-6 space-y-4", children: _jsxs("div", { className: "space-y-3", children: [transactions.slice(0, 20).map((transaction) => (_jsx(motion.div, { variants: staggerItem, whileHover: { scale: 1.02 }, children: _jsx(Card, { className: "glass-card", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [getTransactionIcon(transaction.transaction_type), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-navy-900", children: t(`rider.${transaction.transaction_type}`) || transaction.transaction_type }), _jsx("p", { className: "text-sm text-muted-foreground", children: transaction.description }), _jsx("p", { className: "text-xs text-muted-foreground", children: new Date(transaction.createdAt).toLocaleString(language === 'my' ? 'my-MM' : 'en-MM') })] })] }), _jsxs("div", { className: "text-right", children: [_jsx("div", { className: `text-lg font-bold ${getTransactionColor(transaction.transaction_type)}`, children: getTransactionAmount(transaction) }), _jsx(Badge, { className: `text-xs ${transaction.status === 'completed' ? 'bg-success/10 text-success' :
                                                                                    transaction.status === 'pending' ? 'bg-warning/10 text-warning' :
                                                                                        'bg-error/10 text-error'}`, children: t(`rider.${transaction.status}`) || transaction.status })] })] }), transaction.reference_number && (_jsx("div", { className: "mt-2 pt-2 border-t border-muted/20", children: _jsxs("p", { className: "text-xs text-muted-foreground", children: ["Ref: ", transaction.reference_number] }) }))] }) }) }, transaction.id))), transactions.length === 0 && (_jsx(Card, { className: "glass-card", children: _jsxs(CardContent, { className: "p-8 text-center", children: [_jsx(Wallet, { className: "w-16 h-16 text-muted-foreground mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-semibold text-navy-900 mb-2", children: t('rider.noTransactions') }), _jsx("p", { className: "text-muted-foreground", children: "Your transaction history will appear here." })] }) }))] }) }), _jsxs(TabsContent, { value: "actions", className: "mt-6 space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx(Card, { className: "glass-card cursor-pointer hover:shadow-lg transition-all", children: _jsxs(CardContent, { className: "p-6 text-center", children: [_jsx("div", { className: "w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3", children: _jsx(ArrowUpRight, { className: "w-6 h-6 text-success" }) }), _jsx("h3", { className: "font-bold text-navy-900 mb-1", children: t('rider.remitCash') }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Submit COD collections" })] }) }), _jsx(Card, { className: "glass-card cursor-pointer hover:shadow-lg transition-all", children: _jsxs(CardContent, { className: "p-6 text-center", children: [_jsx("div", { className: "w-12 h-12 bg-info/10 rounded-full flex items-center justify-center mx-auto mb-3", children: _jsx(CreditCard, { className: "w-6 h-6 text-info" }) }), _jsx("h3", { className: "font-bold text-navy-900 mb-1", children: t('rider.withdraw') }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Withdraw earnings" })] }) }), _jsx(Card, { className: "glass-card cursor-pointer hover:shadow-lg transition-all", children: _jsxs(CardContent, { className: "p-6 text-center", children: [_jsx("div", { className: "w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3", children: _jsx(Download, { className: "w-6 h-6 text-warning" }) }), _jsx("h3", { className: "font-bold text-navy-900 mb-1", children: t('rider.downloadReport') }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Export transaction history" })] }) }), _jsx(Card, { className: "glass-card cursor-pointer hover:shadow-lg transition-all", children: _jsxs(CardContent, { className: "p-6 text-center", children: [_jsx("div", { className: "w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-3", children: _jsx(Star, { className: "w-6 h-6 text-gold-500" }) }), _jsx("h3", { className: "font-bold text-navy-900 mb-1", children: t('rider.bonusProgram') }), _jsx("p", { className: "text-sm text-muted-foreground", children: "View bonus opportunities" })] }) })] }), _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg", children: t('rider.quickStats') }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-navy-900", children: transactions.filter(t => t.transaction_type === 'delivery_fee').length }), _jsx("div", { className: "text-sm text-muted-foreground", children: t('rider.deliveriesPaid') })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-navy-900", children: transactions.filter(t => t.transaction_type === 'bonus').length }), _jsx("div", { className: "text-sm text-muted-foreground", children: t('rider.bonusesReceived') })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-success", children: formatCurrency(transactions
                                                                            .filter(t => t.transaction_type === 'cod_collection')
                                                                            .reduce((sum, t) => sum + t.amount, 0)) }), _jsx("div", { className: "text-sm text-muted-foreground", children: t('rider.totalCODCollected') })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-gold-600", children: formatCurrency(transactions
                                                                            .filter(t => ['delivery_fee', 'bonus'].includes(t.transaction_type))
                                                                            .reduce((sum, t) => sum + t.amount, 0)) }), _jsx("div", { className: "text-sm text-muted-foreground", children: t('rider.totalEarnings') })] })] }) })] })] })] }) })] })] }));
};
export default RiderWallet;
