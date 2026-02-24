import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { UserPlus, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ROUTE_PATHS } from '@/lib/index';
import { IMAGES } from '@/assets/images';
import { ROLE_DESCRIPTIONS } from '@/types/roles';
const signUpSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
    fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
    role: z.string().min(1, { message: "Please select a role" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});
export default function SignUp() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const form = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
            fullName: '',
            role: ''
        },
    });
    const onSubmit = async (values) => {
        setIsLoading(true);
        setError('');
        setSuccess('');
        try {
            // First, create the user in Supabase Auth
            const { data, error } = await supabase.auth.signUp({
                email: values.email,
                password: values.password,
                options: {
                    data: {
                        full_name: values.fullName,
                        role: values.role,
                    }
                }
            });
            if (error) {
                throw new Error(error.message);
            }
            if (data.user) {
                // Try to create profile manually if trigger doesn't work
                try {
                    const { error: profileError } = await supabase
                        .from('profiles')
                        .insert({
                        id: data.user.id,
                        email: values.email,
                        full_name: values.fullName,
                        role: values.role,
                        is_active: true,
                        must_change_password: false
                    });
                    // Don't throw error if profile already exists (trigger might have created it)
                    if (profileError && !profileError.message.includes('duplicate key')) {
                        console.warn('Profile creation warning:', profileError.message);
                    }
                }
                catch (profileError) {
                    console.warn('Profile creation failed, but user was created:', profileError);
                }
                setSuccess('Account created successfully! Please check your email to verify your account, then you can log in.');
                form.reset();
                // Redirect to login after 3 seconds
                setTimeout(() => {
                    navigate(ROUTE_PATHS.LOGIN);
                }, 3000);
            }
        }
        catch (error) {
            setError(error.message || 'Failed to create account');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs("div", { className: "relative min-h-screen w-full flex items-center justify-center bg-background overflow-hidden", children: [_jsxs("div", { className: "absolute inset-0 z-0", children: [_jsx("img", { src: IMAGES.SCREENSHOT5867_2_57, alt: "Britium Express Logistics Background", className: "w-full h-full object-cover opacity-30 grayscale-[20%]" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/90" })] }), _jsx(motion.div, { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { type: "spring", stiffness: 300, damping: 30 }, className: "relative z-10 w-full max-w-[500px] px-6", children: _jsxs(Card, { className: "border-border bg-card/95 backdrop-blur-sm shadow-2xl", children: [_jsxs(CardHeader, { className: "text-center pb-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx(Link, { to: ROUTE_PATHS.LOGIN, className: "p-2 rounded-full hover:bg-muted transition-colors", children: _jsx(ArrowLeft, { className: "w-5 h-5" }) }), _jsx("div", { className: "mx-auto p-3 rounded-full bg-primary/10 text-primary", children: _jsx(UserPlus, { className: "w-8 h-8" }) }), _jsx("div", { className: "w-9" }), " "] }), _jsx(CardTitle, { className: "text-2xl font-bold", children: "Create Account" }), _jsx(CardDescription, { className: "text-muted-foreground", children: "Join the Britium Enterprise Logistics Platform" })] }), _jsxs(CardContent, { children: [error && (_jsx(Alert, { variant: "destructive", className: "mb-6", children: _jsx(AlertDescription, { children: error }) })), success && (_jsx(Alert, { className: "mb-6 border-green-200 bg-green-50 text-green-800", children: _jsx(AlertDescription, { children: success }) })), _jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: [_jsx(FormField, { control: form.control, name: "fullName", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Full Name" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Enter your full name", ...field, className: "h-11" }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "email", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Corporate Email" }), _jsx(FormControl, { children: _jsx(Input, { type: "email", placeholder: "admin@britiumexpress.com", ...field, className: "h-11" }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "role", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Role" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { className: "h-11", children: _jsx(SelectValue, { placeholder: "Select your role" }) }) }), _jsx(SelectContent, { children: Object.entries(ROLE_DESCRIPTIONS).map(([role, description]) => (_jsx(SelectItem, { value: role, children: description }, role))) })] }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "password", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Password" }), _jsx(FormControl, { children: _jsxs("div", { className: "relative", children: [_jsx(Input, { type: showPassword ? "text" : "password", placeholder: "Create a strong password", ...field, className: "h-11 pr-10" }), _jsx(Button, { type: "button", variant: "ghost", size: "sm", className: "absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent", onClick: () => setShowPassword(!showPassword), children: showPassword ? (_jsx(EyeOff, { className: "h-4 w-4 text-muted-foreground" })) : (_jsx(Eye, { className: "h-4 w-4 text-muted-foreground" })) })] }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "confirmPassword", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Confirm Password" }), _jsx(FormControl, { children: _jsxs("div", { className: "relative", children: [_jsx(Input, { type: showConfirmPassword ? "text" : "password", placeholder: "Confirm your password", ...field, className: "h-11 pr-10" }), _jsx(Button, { type: "button", variant: "ghost", size: "sm", className: "absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent", onClick: () => setShowConfirmPassword(!showConfirmPassword), children: showConfirmPassword ? (_jsx(EyeOff, { className: "h-4 w-4 text-muted-foreground" })) : (_jsx(Eye, { className: "h-4 w-4 text-muted-foreground" })) })] }) }), _jsx(FormMessage, {})] })) }), _jsx(Button, { type: "submit", className: "w-full h-11 font-semibold", disabled: isLoading, children: isLoading ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" }), "Creating Account..."] })) : (_jsxs(_Fragment, { children: [_jsx(UserPlus, { className: "mr-2 h-4 w-4" }), "Create Account"] })) })] }) }), _jsx("div", { className: "mt-6 text-center", children: _jsxs("p", { className: "text-sm text-muted-foreground", children: ["Already have an account?", ' ', _jsx(Link, { to: ROUTE_PATHS.LOGIN, className: "text-primary font-semibold hover:underline transition-all underline-offset-4", children: "Sign in here" })] }) }), _jsxs("div", { className: "mt-6 p-4 bg-muted/50 rounded-lg", children: [_jsx("h4", { className: "font-medium text-sm mb-2", children: "Account Requirements:" }), _jsxs("ul", { className: "text-xs text-muted-foreground space-y-1", children: [_jsx("li", { children: "\u2022 Use your corporate email address" }), _jsx("li", { children: "\u2022 Password must be at least 8 characters" }), _jsx("li", { children: "\u2022 Select the role that matches your position" }), _jsx("li", { children: "\u2022 Email verification required before login" })] })] })] })] }) })] }));
}
