import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { ShieldCheck, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ROUTE_PATHS } from '@/lib/index';
import { IMAGES } from '@/assets/images';
const changePasswordSchema = z.object({
    newPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});
export default function ChangePassword() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    const form = useForm({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: { newPassword: '', confirmPassword: '' },
    });
    useEffect(() => {
        // Get temporary user data from session storage
        const tempUserData = sessionStorage.getItem('temp_user_data');
        if (!tempUserData) {
            navigate(ROUTE_PATHS.LOGIN);
            return;
        }
        try {
            setUserData(JSON.parse(tempUserData));
        }
        catch (error) {
            navigate(ROUTE_PATHS.LOGIN);
        }
    }, [navigate]);
    const onSubmit = async (values) => {
        if (!userData)
            return;
        setIsLoading(true);
        setError('');
        try {
            const { data, error } = await supabase.rpc('change_user_password_2026_02_17_18_40', {
                user_id: userData.id,
                new_password: values.newPassword
            });
            if (error) {
                throw new Error('Failed to change password');
            }
            if (!data.success) {
                throw new Error(data.error || 'Failed to change password');
            }
            // Clear temporary data
            sessionStorage.removeItem('temp_user_data');
            // Redirect to login with success message
            navigate(ROUTE_PATHS.LOGIN, {
                state: { message: 'Password changed successfully. Please log in with your new password.' }
            });
        }
        catch (error) {
            setError(error.message || 'Failed to change password');
        }
        finally {
            setIsLoading(false);
        }
    };
    if (!userData) {
        return null; // Will redirect to login
    }
    return (_jsxs("div", { className: "relative min-h-screen w-full flex items-center justify-center bg-background overflow-hidden", children: [_jsxs("div", { className: "absolute inset-0 z-0", children: [_jsx("img", { src: IMAGES.SCREENSHOT8648_2_53, alt: "Britium Express Logistics Background", className: "w-full h-full object-cover opacity-30 grayscale-[20%]" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/90" })] }), _jsx(motion.div, { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { type: "spring", stiffness: 300, damping: 30 }, className: "relative z-10 w-full max-w-[460px] px-6", children: _jsxs(Card, { className: "border-border bg-card/95 backdrop-blur-sm shadow-2xl", children: [_jsxs(CardHeader, { className: "text-center pb-6", children: [_jsx("div", { className: "mx-auto mb-4 p-3 rounded-full bg-primary/10 text-primary w-fit", children: _jsx(ShieldCheck, { className: "w-8 h-8" }) }), _jsx(CardTitle, { className: "text-2xl font-bold", children: "Change Password Required" }), _jsxs(CardDescription, { className: "text-muted-foreground", children: ["Welcome, ", userData.full_name, ". For security reasons, you must change your password before accessing the system."] })] }), _jsxs(CardContent, { children: [error && (_jsx(Alert, { variant: "destructive", className: "mb-6", children: _jsx(AlertDescription, { children: error }) })), _jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: [_jsx(FormField, { control: form.control, name: "newPassword", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "New Password" }), _jsx(FormControl, { children: _jsxs("div", { className: "relative", children: [_jsx(Input, { type: showPassword ? "text" : "password", placeholder: "Enter new password", ...field, className: "h-11 pr-10" }), _jsx(Button, { type: "button", variant: "ghost", size: "sm", className: "absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent", onClick: () => setShowPassword(!showPassword), children: showPassword ? (_jsx(EyeOff, { className: "h-4 w-4 text-muted-foreground" })) : (_jsx(Eye, { className: "h-4 w-4 text-muted-foreground" })) })] }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "confirmPassword", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Confirm New Password" }), _jsx(FormControl, { children: _jsxs("div", { className: "relative", children: [_jsx(Input, { type: showConfirmPassword ? "text" : "password", placeholder: "Confirm new password", ...field, className: "h-11 pr-10" }), _jsx(Button, { type: "button", variant: "ghost", size: "sm", className: "absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent", onClick: () => setShowConfirmPassword(!showConfirmPassword), children: showConfirmPassword ? (_jsx(EyeOff, { className: "h-4 w-4 text-muted-foreground" })) : (_jsx(Eye, { className: "h-4 w-4 text-muted-foreground" })) })] }) }), _jsx(FormMessage, {})] })) }), _jsx(Button, { type: "submit", className: "w-full h-11 font-semibold", disabled: isLoading, children: isLoading ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" }), "Changing Password..."] })) : (_jsxs(_Fragment, { children: ["Change Password", _jsx(ArrowRight, { className: "ml-2 h-4 w-4" })] })) })] }) }), _jsxs("div", { className: "mt-6 p-4 bg-muted/50 rounded-lg", children: [_jsx("h4", { className: "font-medium text-sm mb-2", children: "Password Requirements:" }), _jsxs("ul", { className: "text-xs text-muted-foreground space-y-1", children: [_jsx("li", { children: "\u2022 At least 8 characters long" }), _jsx("li", { children: "\u2022 Must contain letters and numbers" }), _jsx("li", { children: "\u2022 Avoid using personal information" })] })] })] })] }) })] }));
}
