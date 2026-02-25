import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useLanguageContext } from '@/lib/LanguageContext';
import { ROUTE_PATHS } from '@/lib/index';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const { login } = useAuth();
  const { t } = useLanguageContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // In production, this calls your actual backend API
      await login(email, password);
      navigate(ROUTE_PATHS.DASHBOARD);
    } catch (err) {
      alert(t('Invalid credentials', 'အကောင့်ဝင်ရန် အချက်အလက် မှားယွင်းနေပါသည်'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <div className="text-center">
          <h2 className="text-3xl font-black text-[#0d2c54] uppercase italic tracking-tighter">
            Britium <span className="text-[#ff6b00]">Logistics</span>
          </h2>
          <p className="mt-2 text-sm font-bold text-slate-400 uppercase tracking-widest">
            {t('Staff Portal', 'ဝန်ထမ်းများအတွက်')}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder={t('Email Address', 'အီးမေးလ် လိပ်စာ')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-xl border-slate-200 py-6"
            />
            <Input
              type="password"
              placeholder={t('Password', 'လျှို့ဝှက်နံပါတ်')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-xl border-slate-200 py-6"
            />
          </div>

          <Button 
            disabled={isSubmitting}
            className="w-full bg-[#0d2c54] hover:bg-[#1a3d6d] text-white font-black uppercase py-6 rounded-xl shadow-lg transition-all"
          >
            {isSubmitting ? t('Logging in...', 'ဝင်ရောက်နေပါသည်...') : t('Login', 'အကောင့်ဝင်မည်')}
          </Button>
        </form>
      </div>
    </div>
  );
}