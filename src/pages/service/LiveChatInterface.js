import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Paperclip, Monitor, Package, Clock, ShieldCheck, Search, MoreVertical, Phone, Video, Circle, Image as ImageIcon, ChevronRight, MessageSquare, Star } from 'lucide-react';
import { SHIPMENT_STATUS } from '@/lib/index';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
const MOCK_CHATS = [
    {
        id: 'chat_1',
        customerId: 'cust_101',
        customerName: 'Alex Thompson',
        lastMessage: 'Where is my package? It was supposed to arrive today.',
        timestamp: '17:05',
        unreadCount: 2,
        status: 'online',
        shipmentId: 'AWB-2026-X991',
        priority: 'High',
    },
    {
        id: 'chat_2',
        customerId: 'cust_102',
        customerName: 'Sarah Jenkins',
        lastMessage: 'The delivery rider was very professional. Thank you!',
        timestamp: '16:45',
        unreadCount: 0,
        status: 'away',
        shipmentId: 'AWB-2026-M442',
        priority: 'Low',
    },
    {
        id: 'chat_3',
        customerId: 'cust_103',
        customerName: 'Marcus Chen',
        lastMessage: 'Can I change my delivery address to the office?',
        timestamp: '16:12',
        unreadCount: 0,
        status: 'online',
        shipmentId: 'AWB-2026-K110',
        priority: 'Medium',
    },
];
const MOCK_MESSAGES = [
    {
        id: 'msg_1',
        senderId: 'cust_101',
        senderName: 'Alex Thompson',
        text: 'Hello, I need help with my shipment AWB-2026-X991.',
        timestamp: '2026-02-11T17:00:00Z',
        type: 'text',
        isStaff: false,
    },
    {
        id: 'msg_2',
        senderId: 'agent_01',
        senderName: 'Support Agent',
        text: 'Hello Alex! I can certainly help you with that. Let me pull up the details.',
        timestamp: '2026-02-11T17:01:30Z',
        type: 'text',
        isStaff: true,
    },
    {
        id: 'msg_3',
        senderId: 'cust_101',
        senderName: 'Alex Thompson',
        text: 'It says "In Transit" but it has been stuck in the Hub for 2 days.',
        timestamp: '2026-02-11T17:03:10Z',
        type: 'text',
        isStaff: false,
    },
];
export default function LiveChatInterface() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
    const { user, legacyUser } = useAuth();
    const [activeChat, setActiveChat] = useState(MOCK_CHATS[0]);
    const [messages, setMessages] = useState(MOCK_MESSAGES);
    const [newMessage, setNewMessage] = useState('');
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const scrollRef = useRef(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);
    const handleSendMessage = () => {
        if (!newMessage.trim() || !activeChat)
            return;
        const msg = {
            id: Date.now().toString(),
            senderId: legacyUser?.id || 'agent_01',
            senderName: legacyUser?.name || 'Support Agent',
            text: newMessage,
            timestamp: new Date().toISOString(),
            type: 'text',
            isStaff: true,
        };
        setMessages([...messages, msg]);
        setNewMessage('');
    };
    const toggleScreenShare = () => {
        setIsScreenSharing(!isScreenSharing);
        if (!isScreenSharing) {
            const systemMsg = {
                id: `sys_${Date.now()}`,
                senderId: 'system',
                senderName: 'System',
                text: 'Agent started a screen sharing session.',
                timestamp: new Date().toISOString(),
                type: 'system',
                isStaff: true,
            };
            setMessages([...messages, systemMsg]);
        }
    };
    return (_jsxs("div", { className: "flex h-[calc(100vh-4rem)] bg-background overflow-hidden", children: [_jsxs("div", { className: "w-80 border-r border-border flex flex-col bg-card/50 backdrop-blur-sm", children: [_jsxs("div", { className: "p-4 border-b border-border space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("h2", { className: "text-lg font-bold flex items-center gap-2", children: [_jsx(MessageSquare, { className: "w-5 h-5 text-primary" }), "Active Chats"] }), _jsx(Badge, { variant: "secondary", children: MOCK_CHATS.length })] }), _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search customers...", className: "pl-9 bg-background/50" })] })] }), _jsx(ScrollArea, { className: "flex-1", children: _jsx("div", { className: "divide-y divide-border/50", children: MOCK_CHATS.map((chat) => (_jsxs("button", { onClick: () => setActiveChat(chat), className: `w-full p-4 flex gap-3 text-left transition-colors hover:bg-accent/50 ${activeChat?.id === chat.id ? 'bg-accent border-l-4 border-primary' : ''}`, children: [_jsxs("div", { className: "relative", children: [_jsxs(Avatar, { className: "w-12 h-12", children: [_jsx(AvatarImage, { src: chat.customerAvatar }), _jsx(AvatarFallback, { children: chat.customerName.charAt(0) })] }), _jsx("div", { className: `absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${chat.status === 'online' ? 'bg-green-500' : 'bg-amber-500'}` })] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx("span", { className: "font-semibold truncate", children: chat.customerName }), _jsx("span", { className: "text-xs text-muted-foreground", children: chat.timestamp })] }), _jsx("p", { className: "text-sm text-muted-foreground truncate mt-1", children: chat.lastMessage }), _jsxs("div", { className: "flex items-center gap-2 mt-2", children: [_jsx(Badge, { variant: chat.priority === 'High' ? 'destructive' : 'secondary', className: "text-[10px] h-4", children: chat.priority }), chat.unreadCount > 0 && (_jsx("span", { className: "bg-primary text-primary-foreground text-[10px] rounded-full w-4 h-4 flex items-center justify-center", children: chat.unreadCount }))] })] })] }, chat.id))) }) })] }), _jsxs("div", { className: "flex-1 flex flex-col relative", children: [activeChat ? (_jsxs(_Fragment, { children: [_jsxs("header", { className: "h-16 border-b border-border px-6 flex items-center justify-between bg-card", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Avatar, { className: "w-10 h-10", children: _jsx(AvatarFallback, { children: activeChat.customerName.charAt(0) }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold text-sm", children: activeChat.customerName }), _jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx(Circle, { className: "w-2 h-2 fill-green-500 text-green-500 animate-pulse" }), _jsxs("span", { className: "text-xs text-muted-foreground", children: ["Customer ID: ", activeChat.customerId] })] })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(TooltipProvider, { children: [_jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", children: _jsx(Phone, { className: "w-4 h-4" }) }) }), _jsx(TooltipContent, { children: "Voice Call" })] }), _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", children: _jsx(Video, { className: "w-4 h-4" }) }) }), _jsx(TooltipContent, { children: "Video Call" })] }), _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(Button, { variant: isScreenSharing ? "destructive" : "ghost", size: "icon", onClick: toggleScreenShare, children: _jsx(Monitor, { className: "w-4 h-4" }) }) }), _jsx(TooltipContent, { children: isScreenSharing ? "Stop Screen Share" : "Start Screen Share" })] })] }), _jsx(Separator, { orientation: "vertical", className: "h-6 mx-2" }), _jsx(Button, { variant: "ghost", size: "icon", children: _jsx(MoreVertical, { className: "w-4 h-4" }) })] })] }), _jsx(ScrollArea, { ref: scrollRef, className: "flex-1 p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-5", children: _jsx("div", { className: "max-w-4xl mx-auto space-y-6", children: messages.map((msg) => (_jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: `flex ${msg.isStaff ? 'justify-end' : 'justify-start'}`, children: msg.type === 'system' ? (_jsx("div", { className: "w-full flex justify-center", children: _jsx("span", { className: "bg-muted text-muted-foreground text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-border/50", children: msg.text }) })) : (_jsxs("div", { className: `max-w-[70%] flex flex-col ${msg.isStaff ? 'items-end' : 'items-start'}`, children: [_jsxs("div", { className: "flex items-center gap-2 mb-1 px-1", children: [!msg.isStaff && _jsx("span", { className: "text-[10px] font-bold text-muted-foreground", children: msg.senderName }), _jsx("span", { className: "text-[10px] text-muted-foreground", children: new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }), msg.isStaff && _jsx(ShieldCheck, { className: "w-3 h-3 text-primary" })] }), _jsx("div", { className: `p-3 rounded-2xl shadow-sm ${msg.isStaff
                                                        ? 'bg-primary text-primary-foreground rounded-tr-none'
                                                        : 'bg-card border border-border/50 rounded-tl-none'}`, children: _jsx("p", { className: "text-sm leading-relaxed", children: msg.text }) })] })) }, msg.id))) }) }), _jsx("div", { className: "p-4 border-t border-border bg-card/80 backdrop-blur-md", children: _jsxs("div", { className: "max-w-4xl mx-auto flex items-center gap-3", children: [_jsxs("div", { className: "flex gap-1", children: [_jsx(Button, { variant: "ghost", size: "icon", className: "text-muted-foreground", children: _jsx(Paperclip, { className: "w-5 h-5" }) }), _jsx(Button, { variant: "ghost", size: "icon", className: "text-muted-foreground", children: _jsx(ImageIcon, { className: "w-5 h-5" }) })] }), _jsx(Input, { placeholder: "Type your message...", className: "flex-1 h-11 bg-background/50 border-border/50 focus:ring-primary/20", value: newMessage, onChange: (e) => setNewMessage(e.target.value), onKeyDown: (e) => e.key === 'Enter' && handleSendMessage() }), _jsx(Button, { size: "icon", className: "h-11 w-11 rounded-full shadow-lg shadow-primary/20", onClick: handleSendMessage, children: _jsx(Send, { className: "w-5 h-5" }) })] }) })] })) : (_jsxs("div", { className: "flex-1 flex flex-col items-center justify-center text-muted-foreground", children: [_jsx("div", { className: "w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4", children: _jsx(MessageSquare, { className: "w-12 h-12 opacity-20" }) }), _jsx("p", { className: "text-lg", children: "Select a chat to start assisting" })] })), _jsx(AnimatePresence, { children: isScreenSharing && (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.9 }, className: "absolute top-20 left-1/2 -translate-x-1/2 bg-destructive/90 text-destructive-foreground px-4 py-2 rounded-full flex items-center gap-3 shadow-xl backdrop-blur-md border border-white/20 z-50", children: [_jsx("div", { className: "w-3 h-3 bg-white rounded-full animate-pulse" }), _jsx("span", { className: "text-sm font-bold uppercase tracking-wider", children: "Live Screen Share Active" }), _jsx(Button, { variant: "secondary", size: "sm", className: "h-7 text-xs bg-white text-destructive hover:bg-white/90", onClick: toggleScreenShare, children: "Stop" })] })) })] }), _jsx("div", { className: "w-80 border-l border-border bg-card/50 backdrop-blur-sm", children: _jsx(ScrollArea, { className: "h-full", children: _jsxs("div", { className: "p-6 space-y-8", children: [_jsxs("div", { className: "text-center", children: [_jsx(Avatar, { className: "w-20 h-20 mx-auto border-4 border-background shadow-xl mb-4", children: _jsx(AvatarFallback, { className: "text-2xl font-bold", children: activeChat?.customerName.charAt(0) }) }), _jsx("h4", { className: "font-bold text-lg", children: activeChat?.customerName }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Premium Member Since 2024" }), _jsx("div", { className: "flex justify-center gap-1 mt-2", children: [1, 2, 3, 4, 5].map((i) => (_jsx(Star, { className: "w-3 h-3 fill-amber-500 text-amber-500" }, i))) })] }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsxs(Button, { variant: "outline", size: "sm", className: "text-xs py-5 flex flex-col gap-1", children: [_jsx(Package, { className: "w-4 h-4" }), "Re-route"] }), _jsxs(Button, { variant: "outline", size: "sm", className: "text-xs py-5 flex flex-col gap-1", children: [_jsx(Clock, { className: "w-4 h-4" }), "Schedule"] })] }), _jsxs(Card, { className: "border-border/50 bg-background/30 shadow-none", children: [_jsx(CardHeader, { className: "p-4", children: _jsxs(CardTitle, { className: "text-xs uppercase tracking-widest text-muted-foreground flex items-center justify-between", children: ["Current Shipment", _jsx(Badge, { variant: "outline", className: "text-[10px] border-primary/20 text-primary bg-primary/5", children: "Active" })] }) }), _jsxs(CardContent, { className: "p-4 pt-0 space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm font-mono", children: activeChat?.shipmentId || 'N/A' }), _jsx(Button, { variant: "ghost", size: "icon", className: "h-6 w-6", children: _jsx(ChevronRight, { className: "w-4 h-4" }) })] }), _jsx("div", { className: "space-y-3", children: _jsxs("div", { className: "flex gap-3", children: [_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("div", { className: "w-2 h-2 rounded-full bg-primary" }), _jsx("div", { className: "w-0.5 h-6 bg-border" }), _jsx("div", { className: "w-2 h-2 rounded-full bg-muted" })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "-mt-1", children: [_jsx("p", { className: "text-xs font-bold", children: "In Transit" }), _jsx("p", { className: "text-[10px] text-muted-foreground", children: "Central Distribution Hub" })] }), _jsxs("div", { className: "pt-1", children: [_jsx("p", { className: "text-xs font-bold text-muted-foreground", children: "Destination" }), _jsx("p", { className: "text-[10px] text-muted-foreground", children: "North District Office" })] })] })] }) }), _jsx(Separator, { className: "bg-border/30" }), _jsxs("div", { className: "flex items-center justify-between text-xs", children: [_jsx("span", { className: "text-muted-foreground", children: "Status:" }), _jsx("span", { className: "font-bold text-primary", children: SHIPMENT_STATUS.WAREHOUSE_RECEIVED_VERIFIED })] })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h5", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground", children: "Interaction Tags" }), _jsx("div", { className: "flex flex-wrap gap-2", children: ['Delivery Delay', 'Refund Req', 'Address Correction', 'COD Issue'].map((tag) => (_jsx(Badge, { variant: "secondary", className: "text-[10px] bg-muted/50", children: tag }, tag))) })] }), _jsx(Button, { variant: "destructive", className: "w-full text-xs font-bold uppercase tracking-widest", children: "Escalate to Supervisor" })] }) }) })] }));
}
