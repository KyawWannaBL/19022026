import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useLanguageContext } from "@/lib/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Save } from "lucide-react";
export default function SimpleTransactionPage() {
    const { t } = useLanguageContext();
    const [transaction, setTransaction] = useState({
        date: new Date().toISOString().split('T')[0],
        description: '',
        amount: '',
        type: 'income',
        category: '',
        reference: ''
    });
    const categories = [
        'Delivery Revenue',
        'COD Collection',
        'Fuel Expense',
        'Vehicle Maintenance',
        'Staff Salary',
        'Office Rent',
        'Utilities',
        'Marketing',
        'Other'
    ];
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle transaction submission
        console.log('Transaction:', transaction);
        // Reset form
        setTransaction({
            date: new Date().toISOString().split('T')[0],
            description: '',
            amount: '',
            type: 'income',
            category: '',
            reference: ''
        });
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 p-4", children: _jsxs("div", { className: "max-w-4xl mx-auto space-y-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-3xl font-bold text-white mb-2", children: "Simple Transaction Entry / \u101B\u102D\u102F\u1038\u101B\u103E\u1004\u103A\u1038\u101E\u1031\u102C \u1004\u103D\u1031\u1005\u102C\u101B\u1004\u103A\u1038\u1011\u100A\u1037\u103A\u1001\u103C\u1004\u103A\u1038" }), _jsx("p", { className: "text-gold-300", children: "Quick entry for daily transactions" })] }), _jsxs(Card, { className: "lotus-card border-gold-400/20", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center", children: [_jsx(DollarSign, { className: "w-5 h-5 mr-2" }), "New Transaction"] }) }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-gold-300 text-sm font-medium mb-2", children: "Date / \u101B\u1000\u103A\u1005\u103D\u1032" }), _jsx(Input, { type: "date", value: transaction.date, onChange: (e) => setTransaction({ ...transaction, date: e.target.value }), className: "bg-navy-800/50 border-gold-400/30 text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gold-300 text-sm font-medium mb-2", children: "Type / \u1021\u1019\u103B\u102D\u102F\u1038\u1021\u1005\u102C\u1038" }), _jsxs(Select, { value: transaction.type, onValueChange: (value) => setTransaction({ ...transaction, type: value }), children: [_jsx(SelectTrigger, { className: "bg-navy-800/50 border-gold-400/30 text-white", children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "income", children: "Income / \u101D\u1004\u103A\u1004\u103D\u1031" }), _jsx(SelectItem, { value: "expense", children: "Expense / \u1011\u103D\u1000\u103A\u1004\u103D\u1031" })] })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gold-300 text-sm font-medium mb-2", children: "Description / \u1016\u1031\u102C\u103A\u1015\u103C\u1001\u103B\u1000\u103A" }), _jsx(Input, { value: transaction.description, onChange: (e) => setTransaction({ ...transaction, description: e.target.value }), placeholder: "Enter transaction description...", className: "bg-navy-800/50 border-gold-400/30 text-white placeholder:text-gold-300/50" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-gold-300 text-sm font-medium mb-2", children: "Amount (MMK) / \u1015\u1019\u102C\u0DAB" }), _jsx(Input, { type: "number", value: transaction.amount, onChange: (e) => setTransaction({ ...transaction, amount: e.target.value }), placeholder: "0", className: "bg-navy-800/50 border-gold-400/30 text-white placeholder:text-gold-300/50" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gold-300 text-sm font-medium mb-2", children: "Category / \u1021\u1019\u103B\u102D\u102F\u1038\u1021\u1005\u102C\u1038\u1001\u103D\u1032" }), _jsxs(Select, { value: transaction.category, onValueChange: (value) => setTransaction({ ...transaction, category: value }), children: [_jsx(SelectTrigger, { className: "bg-navy-800/50 border-gold-400/30 text-white", children: _jsx(SelectValue, { placeholder: "Select category..." }) }), _jsx(SelectContent, { children: categories.map((cat) => (_jsx(SelectItem, { value: cat, children: cat }, cat))) })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gold-300 text-sm font-medium mb-2", children: "Reference / \u1000\u102D\u102F\u1038\u1000\u102C\u1038\u1001\u103B\u1000\u103A" }), _jsx(Input, { value: transaction.reference, onChange: (e) => setTransaction({ ...transaction, reference: e.target.value }), placeholder: "Reference number or note...", className: "bg-navy-800/50 border-gold-400/30 text-white placeholder:text-gold-300/50" })] }), _jsxs("div", { className: "flex space-x-4", children: [_jsxs(Button, { type: "submit", className: "luxury-button flex-1", children: [_jsx(Save, { className: "w-4 h-4 mr-2" }), "Save Transaction / \u101E\u102D\u1019\u103A\u1038\u101B\u1014\u103A"] }), _jsx(Button, { type: "button", variant: "outline", className: "border-gold-400/30 text-gold-300", onClick: () => setTransaction({
                                                    date: new Date().toISOString().split('T')[0],
                                                    description: '',
                                                    amount: '',
                                                    type: 'income',
                                                    category: '',
                                                    reference: ''
                                                }), children: "Clear / \u101B\u103E\u1004\u103A\u1038\u101C\u1004\u103A\u1038\u101B\u1014\u103A" })] })] }) })] }), _jsxs(Card, { className: "lotus-card border-gold-400/20", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Recent Transactions" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: [
                                    { date: '2026-02-04', desc: 'Delivery Revenue - YGN Route', amount: 45000, type: 'income' },
                                    { date: '2026-02-04', desc: 'Fuel Expense', amount: -15000, type: 'expense' },
                                    { date: '2026-02-03', desc: 'COD Collection', amount: 125000, type: 'income' },
                                    { date: '2026-02-03', desc: 'Vehicle Maintenance', amount: -25000, type: 'expense' },
                                ].map((tx, index) => (_jsxs("div", { className: "flex items-center justify-between p-3 bg-navy-800/30 rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: `w-3 h-3 rounded-full ${tx.type === 'income' ? 'bg-green-400' : 'bg-red-400'}` }), _jsxs("div", { children: [_jsx("div", { className: "text-white text-sm font-medium", children: tx.desc }), _jsx("div", { className: "text-gold-300 text-xs", children: tx.date })] })] }), _jsxs("div", { className: `font-bold ${tx.type === 'income' ? 'text-green-300' : 'text-red-300'}`, children: [tx.type === 'income' ? '+' : '', tx.amount.toLocaleString(), " MMK"] })] }, index))) }) })] })] }) }));
}
