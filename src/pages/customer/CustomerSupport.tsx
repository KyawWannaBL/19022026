import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, MessageSquare, Ticket, Package as ShipmentIcon, AlertCircle,
  CheckCircle2, Clock, ChevronRight, Send, Plus, Star, ThumbsUp, Phone, Mail, HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from '@/components/ui/accordion';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useLanguageContext } from '@/lib/LanguageContext'; // Fixed: Missing context injection

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  lastUpdate: string;
}

export default function CustomerSupport() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { user } = useAuth(); // Standardized auth hook
  const { t } = useLanguageContext(); // Fixed: Resolved all 't' is not defined errors
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [isSurveyVisible, setIsSurveyVisible] = useState(false);

  // Mock Tickets Aligned with 2026 Schema
  const tickets: SupportTicket[] = [
    {
      id: 'TK-8821',
      subject: t('Delayed shipment from North District', 'မြောက်ပိုင်းခရိုင်မှ ပစ္စည်းရောက်ရှိမှု ကြန့်ကြာနေခြင်း'),
      category: 'Logistics',
      status: 'In Progress',
      lastUpdate: '2026-02-11 14:20',
    }
  ];

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    toast({
      title: t('Message Sent', 'မက်ဆေ့ခ်ျ ပေးပို့ပြီးပါပြီ'),
      description: t('A support agent will be with you shortly.', 'ဝန်ဆောင်မှုပေးသူမှ မကြာမီ ဆက်သွယ်ပေးပါမည်။'),
    });
    setChatMessage('');
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-8 space-y-8">
      {/* Header Section / ခေါင်းစဉ်ပိုင်း */}
      <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('Support Center', 'အကူအညီပေးရေး ဗဟိုဌာန')}</h1>
          <p className="text-muted-foreground mt-1">
            {t('Welcome back,', 'ပြန်လည်ကြိုဆိုပါတယ်၊')} {user?.name}. {t('How can we assist you today?', 'ယနေ့ ဘာများ ကူညီပေးရမလဲခင်ဗျာ?')}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline"><Phone className="w-4 h-4 mr-2 text-primary" /> {t('Call Support', 'ဖုန်းဖြင့် ဆက်သွယ်မည်')}</Button>
          <Button className="bg-primary text-primary-foreground"><Plus className="w-4 h-4 mr-2" /> {t('New Ticket', 'အသစ်တင်ပြမည်')}</Button>
        </div>
      </motion.div>

      {/* Search Bar / ရှာဖွေမှု */}
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="relative max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input 
          placeholder={t('Search help topics or tickets...', 'အကူအညီများ သို့မဟုတ် တင်ပြချက်များကို ရှာဖွေမည်...')}
          className="pl-12 h-14 bg-card border shadow-lg rounded-2xl text-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Quick Assistance / အမြန်လုပ်ဆောင်ချက်များ */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="luxury-card p-6">
            <h3 className="text-lg font-semibold mb-4">{t('Quick Assistance', 'အမြန်အကူအညီ')}</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center p-4 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-all">
                <ShipmentIcon className="w-8 h-8 text-primary mb-2" />
                <span className="text-sm font-medium">{t('Track Package', 'ပါဆယ်ခြေရာခံရန်')}</span>
              </button>
              <button className="flex flex-col items-center p-4 rounded-xl bg-destructive/5 border border-destructive/10 hover:bg-destructive/10 transition-all">
                <AlertCircle className="w-8 h-8 text-destructive mb-2" />
                <span className="text-sm font-medium">{t('Report Issue', 'ပြဿနာတင်ပြရန်')}</span>
              </button>
            </div>
          </Card>

          <Card className="luxury-card p-6">
            <h3 className="text-lg font-semibold mb-4">{t('FAQ', 'အမေးများသော မေးခွန်းများ')}</h3>
            <Accordion type="single" collapsible>
              <AccordionItem value="q1">
                <AccordionTrigger>{t('How to track in real-time?', 'အချိန်နှင့်တပြေးညီ ဘယ်လိုခြေရာခံမလဲ?')}</AccordionTrigger>
                <AccordionContent>{t('Use the tracking dashboard in your portal.', 'လူကြီးမင်း၏ portal ရှိ dashboard တွင် ကြည့်ရှုနိုင်ပါသည်။')}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </div>

        {/* Ticket Management / တင်ပြချက်များ စီမံမှု */}
        <div className="lg:col-span-5">
          <Card className="luxury-card h-full overflow-hidden">
            <CardHeader className="border-b bg-muted/20">
              <CardTitle>{t('My Tickets', 'ကျွန်ုပ်၏ တင်ပြချက်များ')}</CardTitle>
            </CardHeader>
            <ScrollArea className="h-[400px]">
              <div className="divide-y">
                {tickets.map(ticket => (
                  <div key={ticket.id} className="p-5 hover:bg-muted/30 transition-all cursor-pointer">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-mono text-muted-foreground">{ticket.id}</span>
                      <Badge variant="secondary">{t(ticket.status, ticket.status)}</Badge>
                    </div>
                    <h4 className="font-semibold">{ticket.subject}</h4>
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {t('Last update', 'နောက်ဆုံးအပ်ဒိတ်')}: {ticket.lastUpdate}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>

        {/* Live Chat / တိုက်ရိုက်စကားပြောခြင်း */}
        <div className="lg:col-span-3">
          <Card className="luxury-card h-full flex flex-col border-none">
            <CardHeader className="bg-primary text-primary-foreground rounded-t-xl">
              <CardTitle className="text-sm flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> {t('Live Support', 'တိုက်ရိုက်အကူအညီ')}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-4 text-sm bg-muted/5 italic opacity-60 flex items-center justify-center">
              {t('Start a conversation above.', 'အပေါ်တွင် စတင်မေးမြန်းနိုင်ပါသည်။')}
            </CardContent>
            <CardFooter className="p-4 border-t">
              <div className="relative w-full flex gap-2">
                <Input 
                  placeholder={t('Type message...', 'မက်ဆေ့ခ်ျ ရိုက်ပါ...')}
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                />
                <Button size="icon" onClick={handleSendMessage}><Send className="w-4 h-4" /></Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}