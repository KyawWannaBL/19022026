import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MessageSquare, Ticket, Package as ShipmentIcon, AlertCircle, CheckCircle2, Clock, ChevronRight, Send, Plus, Star, ThumbsUp, Phone, Mail, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};
const MOCK_TICKETS = [
    {
        id: 'TK-8821',
        subject: 'Delayed shipment from North District',
        category: 'Logistics',
        status: 'In Progress',
        lastUpdate: '2026-02-11 14:20',
        priority: 'High',
    },
    {
        id: 'TK-8744',
        subject: 'Address update for AWB-99021',
        category: 'Shipment Modification',
        status: 'Resolved',
        lastUpdate: '2026-02-10 09:15',
        priority: 'Medium',
    },
];
const FAQ_ITEMS = [
    {
        question: "How do I track my shipment in real-time?",
        answer: "You can use our Live Tracking feature in the Customer Portal. Simply enter your AWB number to see the current GPS location of the courier."
    },
    {
        question: "What happens if I miss a delivery?",
        answer: "Our courier will attempt 3 deliveries. After the first miss, you can reschedule the time via the app or contact support to hold it at a substation."
    },
    {
        question: "How is COD handled?",
        answer: "Cash on Delivery payments are verified via OTP. Please ensure you have the exact amount ready to speed up the process."
    }
];
export default function CustomerSupport() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
    const { user, legacyUser } = useAuth();
    const { toast } = useToast();
    const [searchQuery, setSearchQuery] = useState('');
    const [chatMessage, setChatMessage] = useState('');
    const [isSurveyVisible, setIsSurveyVisible] = useState(false);
    const handleSendMessage = () => {
        if (!chatMessage.trim())
            return;
        toast({
            title: "Message Sent",
            description: "A support agent will be with you shortly.",
        });
        setChatMessage('');
    };
    return (_jsxs("div", { className: "min-h-screen bg-background p-6 md:p-8 space-y-8", children: [_jsxs(motion.div, { initial: "hidden", animate: "visible", variants: fadeInUp, className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight text-foreground", children: "Support Center" }), _jsxs("p", { className: "text-muted-foreground mt-1", children: ["Welcome back, ", legacyUser?.name, ". How can we assist your logistics needs today?"] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Button, { variant: "outline", className: "btn-modern", children: [_jsx(Phone, { className: "w-4 h-4 mr-2 text-primary" }), "Call Support"] }), _jsxs(Button, { className: "btn-modern bg-primary text-primary-foreground", children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "New Ticket"] })] })] }), _jsxs(motion.div, { variants: fadeInUp, className: "relative max-w-2xl mx-auto", children: [_jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" }), _jsx(Input, { placeholder: "Search for AWB numbers, help topics, or active tickets...", className: "pl-12 h-14 bg-card-modern border-border/50 shadow-lg rounded-2xl text-lg", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6", children: [_jsxs("div", { className: "lg:col-span-4 space-y-6", children: [_jsxs(motion.div, { variants: fadeInUp, className: "card-modern p-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Quick Assistance" }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("button", { className: "flex flex-col items-center justify-center p-4 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors group", children: [_jsx(ShipmentIcon, { className: "w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" }), _jsx("span", { className: "text-sm font-medium", children: "Track Package" })] }), _jsxs("button", { className: "flex flex-col items-center justify-center p-4 rounded-xl bg-accent/5 border border-accent/10 hover:bg-accent/10 transition-colors group", children: [_jsx(AlertCircle, { className: "w-8 h-8 text-accent-foreground mb-2 group-hover:scale-110 transition-transform" }), _jsx("span", { className: "text-sm font-medium", children: "Report Issue" })] }), _jsxs("button", { className: "flex flex-col items-center justify-center p-4 rounded-xl bg-secondary/5 border border-secondary/10 hover:bg-secondary/10 transition-colors group", children: [_jsx(HelpCircle, { className: "w-8 h-8 text-secondary-foreground mb-2 group-hover:scale-110 transition-transform" }), _jsx("span", { className: "text-sm font-medium", children: "Help Guides" })] }), _jsxs("button", { className: "flex flex-col items-center justify-center p-4 rounded-xl bg-destructive/5 border border-destructive/10 hover:bg-destructive/10 transition-colors group", children: [_jsx(Clock, { className: "w-8 h-8 text-destructive mb-2 group-hover:scale-110 transition-transform" }), _jsx("span", { className: "text-sm font-medium", children: "Reschedule" })] })] })] }), _jsxs(motion.div, { variants: fadeInUp, className: "card-modern p-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Knowledge Base" }), _jsx(Accordion, { type: "single", collapsible: true, className: "w-full", children: FAQ_ITEMS.map((item, i) => (_jsxs(AccordionItem, { value: `item-${i}`, children: [_jsx(AccordionTrigger, { className: "text-sm font-medium hover:no-underline", children: item.question }), _jsx(AccordionContent, { className: "text-muted-foreground text-sm", children: item.answer })] }, i))) }), _jsxs(Button, { variant: "link", className: "w-full mt-4 text-primary", children: ["View all 200+ articles ", _jsx(ChevronRight, { className: "w-4 h-4 ml-1" })] })] })] }), _jsx("div", { className: "lg:col-span-5 space-y-6", children: _jsxs(Card, { className: "card-modern overflow-hidden border-none", children: [_jsx(CardHeader, { className: "border-b border-border/50 bg-muted/20", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { children: "My Tickets" }), _jsx(CardDescription, { children: "Recent support requests and updates" })] }), _jsxs(Badge, { variant: "outline", children: [MOCK_TICKETS.length, " Active"] })] }) }), _jsx(CardContent, { className: "p-0", children: _jsx(ScrollArea, { className: "h-[500px]", children: _jsx("div", { className: "divide-y divide-border/50", children: MOCK_TICKETS.map((ticket) => (_jsxs("div", { className: "p-5 hover:bg-muted/30 transition-colors cursor-pointer group", children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsx("span", { className: "text-xs font-mono text-muted-foreground", children: ticket.id }), _jsx(Badge, { variant: ticket.status === 'Resolved' ? 'default' : 'secondary', className: "rounded-full", children: ticket.status })] }), _jsx("h4", { className: "font-semibold group-hover:text-primary transition-colors mb-1", children: ticket.subject }), _jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground", children: [_jsxs("span", { className: "flex items-center", children: [_jsx(Clock, { className: "w-3 h-3 mr-1" }), " ", ticket.lastUpdate] }), _jsxs("span", { className: "flex items-center", children: [_jsx(Ticket, { className: "w-3 h-3 mr-1" }), " ", ticket.category] })] })] }, ticket.id))) }) }) }), _jsx(CardFooter, { className: "bg-muted/10 p-4 border-t border-border/50", children: _jsx(Button, { variant: "ghost", className: "w-full", children: "Load Older Tickets" }) })] }) }), _jsx("div", { className: "lg:col-span-3", children: _jsxs(Card, { className: "card-modern h-full flex flex-col border-none", children: [_jsx(CardHeader, { className: "bg-primary text-primary-foreground", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold", children: "AI" }), _jsx("div", { className: "absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-primary rounded-full" })] }), _jsxs("div", { children: [_jsx(CardTitle, { className: "text-sm", children: "Logistics Assistant" }), _jsx(CardDescription, { className: "text-white/70 text-xs", children: "Always online" })] })] }) }), _jsx(CardContent, { className: "flex-1 p-4 bg-muted/5", children: _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "flex gap-2 max-w-[85%]", children: _jsxs("div", { className: "p-3 rounded-2xl rounded-tl-none bg-card shadow-sm text-sm", children: ["Hi ", legacyUser?.name, "! I can help you track orders or answer shipping questions. What's on your mind?"] }) }), _jsx("div", { className: "h-40 flex items-center justify-center opacity-20", children: _jsx(MessageSquare, { className: "w-12 h-12" }) })] }) }), _jsx(CardFooter, { className: "p-4 border-t border-border/50", children: _jsxs("div", { className: "relative w-full", children: [_jsx(Input, { placeholder: "Type a message...", className: "pr-12", value: chatMessage, onChange: (e) => setChatMessage(e.target.value), onKeyDown: (e) => e.key === 'Enter' && handleSendMessage() }), _jsx(Button, { size: "icon", className: "absolute right-1 top-1 w-8 h-8 rounded-lg", onClick: handleSendMessage, children: _jsx(Send, { className: "w-4 h-4" }) })] }) })] }) })] }), _jsxs(AnimatePresence, { children: [!isSurveyVisible && (_jsx(motion.div, { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 }, className: "fixed bottom-8 right-8 z-40", children: _jsxs(Button, { onClick: () => setIsSurveyVisible(true), className: "rounded-full h-14 px-6 shadow-2xl bg-accent text-accent-foreground hover:scale-105", children: [_jsx(ThumbsUp, { className: "w-5 h-5 mr-2" }), "Rate Our Service"] }) })), isSurveyVisible && (_jsx(motion.div, { initial: { opacity: 0, scale: 0.9, y: 100 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.9, y: 100 }, className: "fixed bottom-8 right-8 w-80 z-50", children: _jsxs(Card, { className: "card-modern shadow-2xl border-primary/20", children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsx(CardTitle, { className: "text-sm", children: "How was your experience?" }), _jsx(Button, { variant: "ghost", size: "icon", className: "h-6 w-6", onClick: () => setIsSurveyVisible(false), children: "\u00D7" })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx("div", { className: "flex justify-center gap-2", children: [1, 2, 3, 4, 5].map((star) => (_jsx(Star, { className: "w-6 h-6 cursor-pointer text-muted-foreground hover:text-yellow-400 transition-colors" }, star))) }), _jsx(Textarea, { placeholder: "Tell us more... (optional)", className: "text-xs h-20 resize-none" }), _jsx(Button, { className: "w-full", onClick: () => {
                                                toast({
                                                    title: "Feedback Received",
                                                    description: "Thank you for helping us improve!",
                                                });
                                                setIsSurveyVisible(false);
                                            }, children: "Submit Feedback" })] })] }) }))] }), _jsxs(motion.div, { variants: fadeInUp, className: "grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-border/50", children: [_jsxs("div", { className: "flex items-center gap-4 p-4 bg-muted/30 rounded-2xl", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center", children: _jsx(Phone, { className: "w-5 h-5 text-primary" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-muted-foreground", children: "24/7 Hotline" }), _jsx("p", { className: "font-bold", children: "+1 (800) LOGI-2026" })] })] }), _jsxs("div", { className: "flex items-center gap-4 p-4 bg-muted/30 rounded-2xl", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center", children: _jsx(Mail, { className: "w-5 h-5 text-primary" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-muted-foreground", children: "Email Support" }), _jsx("p", { className: "font-bold", children: "support@nextlogistics.ai" })] })] }), _jsxs("div", { className: "flex items-center gap-4 p-4 bg-muted/30 rounded-2xl", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center", children: _jsx(CheckCircle2, { className: "w-5 h-5 text-primary" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-muted-foreground", children: "System Status" }), _jsx("p", { className: "font-bold text-green-500", children: "All Services Operational" })] })] })] })] }));
}
