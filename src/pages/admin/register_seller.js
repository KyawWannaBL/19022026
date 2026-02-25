import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { UserPlus, Building, Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
export default function RegisterSeller() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            toast({
                title: "Registration Successful",
                description: "The new seller has been added to the system.",
            });
        }, 1500);
    };
    return (_jsxs("div", { className: "max-w-2xl mx-auto space-y-6", children: [_jsxs("div", { className: "flex items-center gap-4 mb-8", children: [_jsx("div", { className: "p-3 bg-primary/10 rounded-xl", children: _jsx(UserPlus, { className: "w-8 h-8 text-primary" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Register New Seller" }), _jsx("p", { className: "text-muted-foreground", children: "Add a new e-commerce partner to the Britium network." })] })] }), _jsx("form", { onSubmit: handleSubmit, children: _jsxs(Card, { className: "border-2", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Business Information" }), _jsx(CardDescription, { children: "Enter the official details of the seller's business." })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Shop/Business Name" }), _jsxs("div", { className: "relative", children: [_jsx(Building, { className: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }), _jsx(Input, { className: "pl-9", placeholder: "e.g. Britium Shop", required: true })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Contact Person" }), _jsxs("div", { className: "relative", children: [_jsx(UserPlus, { className: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }), _jsx(Input, { className: "pl-9", placeholder: "Full Name", required: true })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Email Address" }), _jsxs("div", { className: "relative", children: [_jsx(Mail, { className: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }), _jsx(Input, { className: "pl-9", type: "email", placeholder: "seller@example.com", required: true })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Phone Number" }), _jsxs("div", { className: "relative", children: [_jsx(Phone, { className: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }), _jsx(Input, { className: "pl-9", placeholder: "+95 9...", required: true })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Pickup Address" }), _jsxs("div", { className: "relative", children: [_jsx(MapPin, { className: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }), _jsx(Input, { className: "pl-9", placeholder: "Detailed address for logistics team", required: true })] })] }), _jsx(Button, { type: "submit", className: "w-full h-12 text-lg", disabled: loading, children: loading ? "Processing..." : "Complete Registration" })] })] }) })] }));
}
