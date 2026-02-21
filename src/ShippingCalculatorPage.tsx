import React from 'react';
import { motion } from 'framer-motion';
import {
  Calculator,
  Info,
  HelpCircle,
  ArrowRight,
  Globe,
  Truck,
  ShieldCheck,
  Clock,
  Package
} from 'lucide-react';
import { ShippingCalculator } from '@/components/ShippingCalculator';
import { IMAGES } from '@/assets/images';
import { fadeInUp, staggerContainer, springPresets } from '@/lib/motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * ShippingCalculatorPage
 * 
 * A comprehensive shipping calculation page supporting domestic and international rates,
 * volume weight calculations, and bilingual (English-Myanmar) support.
 * Accessible to Customers, Merchants, and Riders.
 * Current Year: 2026
 */
export default function ShippingCalculatorPage() {
  const { language, setLanguage } = useLanguage();
  const isEn = language === 'en';

  const t = {
    title: isEn ? 'Shipping Calculator' : 'ပို့ဆောင်ခ တွက်ချက်ရန်',
    subtitle: isEn 
      ? 'Calculate delivery charges for local and international shipments with precision.' 
      : 'ပြည်တွင်းနှင့် ပြည်ပ ပို့ဆောင်ခများကို တိကျစွာ တွက်ချက်ပါ။',
    quickStats: {
      domestic: isEn ? 'Domestic Coverage' : 'ပြည်တွင်း ဝန်ဆောင်မှု',
      international: isEn ? 'Global Reach' : 'ကမ္ဘာအနှံ့ ပို့ဆောင်မှု',
      accuracy: isEn ? '99.9% Accuracy' : '၉၉.၉% တိကျမှု'
    },
    featuresTitle: isEn ? 'Why use our calculator?' : 'ကျွန်ုပ်တို့၏ တွက်ချက်စက်ကို အဘယ်ကြောင့် အသုံးပြုသင့်သနည်း?',
    features: [
      {
        title: isEn ? 'Myanmar State & Division Support' : 'မြန်မာပြည်အနှံ့ မြို့နယ်များ',
        desc: isEn ? 'All townships in Myanmar states and divisions are programmed for accurate local rates.' : 'မြန်မာနိုင်ငံရှိ ပြည်နယ်နှင့် တိုင်းဒေသကြီးအားလုံး၏ မြို့နယ်များကို ထည့်သွင်းထားပါသည်။',
        icon: Truck
      },
      {
        title: isEn ? 'Global Air Cargo Volume' : 'ကမ္ဘာလုံးဆိုင်ရာ လေကြောင်းကုန်စည်',
        desc: isEn ? 'Calculate volume weight based on international airline requirements worldwide.' : 'နိုင်ငံတကာ လေကြောင်းလိုင်းများ၏ သတ်မှတ်ချက်အတိုင်း ထုထည်အလေးချိန်ကို တွက်ချက်ပေးပါသည်။',
        icon: Globe
      },
      {
        title: isEn ? 'Real-time Rate Updates' : 'အချိန်နှင့်တပြေးညီ နှုန်းထားများ',
        desc: isEn ? 'Get the most up-to-date shipping rates based on current fuel and logistics indices.' : 'လက်ရှိ စက်သုံးဆီနှင့် ထောက်ပံ့ပို့ဆောင်ရေး နှုန်းထားများကို အခြေခံ၍ တွက်ချက်ပေးပါသည်။',
        icon: Clock
      }
    ],
    helpTitle: isEn ? 'Need help with calculations?' : 'တွက်ချက်ရာတွင် အကူအညီ လိုအပ်ပါသလား?',
    helpAction: isEn ? 'Contact Support' : 'အကူအညီရယူရန် ဆက်သွယ်ပါ'
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="hero-background">
          <img 
            src={IMAGES.CARGO_CONTAINERS_1} 
            alt="Shipping Background" 
            className="w-full h-full object-cover"
          />
          <div className="hero-overlay" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="outline" className="mb-6 border-primary/50 text-primary py-1 px-4 backdrop-blur-sm">
                <Calculator className="w-3 h-3 mr-2" />
                {isEn ? 'Logistics Toolkit' : 'ပို့ဆောင်ရေး ကိရိယာစု'}
              </Badge>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold mb-6 font-sans text-foreground"
            >
              {t.title}
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground mb-8"
            >
              {t.subtitle}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex justify-center gap-4">
              <Button 
                onClick={() => setLanguage(isEn ? 'my' : 'en')}
                variant="secondary"
                className="rounded-full px-8 luxury-glass border-white/10 hover:bg-white/5"
              >
                {isEn ? 'မြန်မာဘာသာဖြင့် ကြည့်မည်' : 'Switch to English'}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Calculator Interface */}
      <section className="w-full max-w-5xl mx-auto px-4 -mt-24 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springPresets.gentle}
          className="luxury-glass rounded-[2rem] p-4 md:p-8"
        >
          <ShippingCalculator embedded={false} />
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="w-full max-w-7xl mx-auto px-4 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="luxury-card h-full overflow-hidden">
                <CardContent className="pt-8">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <feature.icon className="text-primary w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Information Panel */}
      <section className="w-full max-w-7xl mx-auto px-4 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-sans">{t.featuresTitle}</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="mt-1 shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <ShieldCheck className="text-primary w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">{isEn ? 'State-wide Coverage' : 'ပြည်နယ်အနှံ့ လွှမ်းခြုံမှု'}</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {isEn 
                      ? 'Comprehensive database including Yangon, Mandalay, Nay Pyi Taw and all ethnic states in Myanmar for 2026 operations.' 
                      : 'ရန်ကုန်၊ မန္တလေး၊ နေပြည်တော် အပါအဝင် ၂၀၂၆ ခုနှစ်အတွက် ပြည်နယ်နှင့် တိုင်းအားလုံး၏ ဒေတာများ ပါဝင်ပါသည်။'}
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="mt-1 shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Info className="text-primary w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">{isEn ? 'International Standard' : 'နိုင်ငံတကာ စံနှုန်း'}</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {isEn 
                      ? 'Compliant with IATA volume weight standards for air cargo worldwide, updated for 2026 global trade lanes.' 
                      : 'ကမ္ဘာတစ်ဝှမ်း လေကြောင်းကုန်စည်များအတွက် IATA ထုထည်အလေးချိန် စံနှုန်းများနှင့် ကိုက်ညီပါသည်။'}
                  </p>
                </div>
              </div>
            </div>

            <Button className="mt-10 luxury-button group">
              {t.helpAction} <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            <img 
              src={IMAGES.DASHBOARD_ANALYTICS_2} 
              alt="Logistics Analytics"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="luxury-glass p-6 rounded-2xl border-white/10">
                <p className="text-sm italic leading-relaxed text-foreground/90">
                  "{isEn ? 'The most reliable shipping calculator for our business growth in 2026. Precision matters when scaling.' : 'ကျွန်ုပ်တို့၏ ၂၀၂၆ စီးပွားရေး တိုးတက်မှုအတွက် အားထားရဆုံး ပို့ဆောင်ခ တွက်ချက်စက် ဖြစ်ပါသည်။'}"
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-8 h-8 rounded-full bg-primary/30" />
                  <div>
                    <p className="text-xs font-bold text-primary uppercase tracking-widest">Merchant Partner</p>
                    <p className="text-[10px] text-muted-foreground">Yangon Logistics Hub</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Support Section */}
      <section className="w-full max-w-7xl mx-auto px-4 mt-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary/5 rounded-[3rem] p-12 md:p-20 text-center border border-primary/10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Package className="w-48 h-48 text-primary" />
          </div>
          
          <HelpCircle className="w-16 h-16 text-primary mx-auto mb-8" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.helpTitle}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12 text-lg">
            {isEn 
              ? 'Our customer service team is available 24/7 in 2026 to assist with your complex logistics requirements and bulk shipment pricing.'
              : 'သင်၏ ရှုပ်ထွေးသော ထောက်ပံ့ပို့ဆောင်ရေး လိုအပ်ချက်များနှင့် အမြောက်အမြား ပို့ဆောင်ခများအတွက် ကျွန်ုပ်တို့၏ ဝန်ဆောင်မှုအဖွဲ့သည် ၂၄ နာရီပတ်လုံး အသင့်ရှိနေပါသည်။'}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button variant="outline" className="rounded-full px-10 border-primary/30 hover:bg-primary/5 h-12">
              {isEn ? 'View Rate Cards' : 'နှုန်းထားဇယားများကို ကြည့်မည်'}
            </Button>
            <Button className="rounded-full bg-primary text-primary-foreground px-12 h-12 font-bold shadow-lg shadow-primary/20">
              {isEn ? 'Call Support' : 'အကူအညီ ဖုန်းခေါ်ဆိုပါ'}
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
