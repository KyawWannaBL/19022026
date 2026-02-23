<<<<<<< HEAD
import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useFirebaseAuth';
import { useLanguageContext, LanguageToggle } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { IMAGES } from '@/assets/images';
import { ROUTE_PATHS, USER_ROLES } from '@/lib/index';

// Helper function to pick safe redirect based on user role
function pickSafeRedirect(fromPath: string | undefined, role: string | undefined): string {
  if (fromPath && fromPath !== '/login') {
    return fromPath;
  }
  
=======
import React, { useEffect } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { LoginForm } from '@/components/Forms';
import { IMAGES } from '@/assets/images';
import { ROUTE_PATHS, USER_ROLES } from '@/lib/index';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useAuth } from '@/hooks/useAuth';

function pickSafeRedirect(fromPath: string | undefined, role: string | undefined): string {
  if (fromPath && fromPath !== '/login') return fromPath;

>>>>>>> ec63336 (Initial enterprise logistics platform (Supabase))
  switch (role) {
    case USER_ROLES.SUPER_ADMIN:
    case USER_ROLES.ADMIN:
    case USER_ROLES.MANAGER:
<<<<<<< HEAD
=======
    case USER_ROLES.SUPERVISOR:
>>>>>>> ec63336 (Initial enterprise logistics platform (Supabase))
      return ROUTE_PATHS.DASHBOARD;
    case USER_ROLES.CUSTOMER:
      return ROUTE_PATHS.CUSTOMER_DASHBOARD;
    case USER_ROLES.MERCHANT:
      return ROUTE_PATHS.MERCHANT_DASHBOARD;
    case USER_ROLES.RIDER:
      return ROUTE_PATHS.RIDER_DASHBOARD;
    case USER_ROLES.WAREHOUSE:
      return ROUTE_PATHS.WAREHOUSE_DASHBOARD;
    default:
      return ROUTE_PATHS.HOME;
  }
}

<<<<<<< HEAD
// Helper function to humanize Firebase auth errors
function humanizeFirebaseAuthError(error: any): string {
  const code = error?.code || '';
  switch (code) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Invalid email or password';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    case 'auth/invalid-email':
      return 'Invalid email address.';
    default:
      return error?.message || 'An error occurred during login';
  }
}

export default function LoginPage() {
  const { t } = useLanguageContext();
  const { loading, user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as any;
  
  // ✅ hooks MUST be first
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // ✅ now safe to redirect
  if (!loading && user) {
    const fromPath = location?.state?.from?.pathname ?? location?.state?.from;
    const to = pickSafeRedirect(fromPath, user.role);
    return <Navigate to={to} replace />;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    setInfo(null);
    
    try {
      const result = await login(email.trim(), password);
      if (result.success && result.user) {
        const fromPath = location?.state?.from?.pathname ?? location?.state?.from;
        navigate(pickSafeRedirect(fromPath, result.user.role), { replace: true });
      } else {
        setErr(result.error || 'Login failed');
      }
    } catch (e: unknown) {
      setErr(humanizeFirebaseAuthError(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen grandeur-hero flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950/90 via-navy-900/80 to-navy-800/90" />
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-gold-500/20 to-gold-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-gold-600/15 to-gold-500/5 rounded-full blur-3xl" />
      
      {/* Language Toggle - Top Right */}
      <div className="absolute top-6 right-6 z-10">
        <LanguageToggle />
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="lotus-card border-gold-400/30 shadow-2xl shadow-gold-500/10">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="relative lotus-glow">
                <img 
                  src={IMAGES.BRITIUM_LOGO_55} 
                  alt="Britium Express" 
                  className="h-16 w-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/20 to-gold-400/10 rounded-xl blur-xl opacity-50" />
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent">
                Britium Express
              </CardTitle>
              <CardDescription className="text-gold-300 mt-2">
                {t('nav.login')} - Premium Logistics Platform
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {err && (
              <Alert variant="destructive" className="border-red-500/50 bg-red-500/10">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{err}</AlertDescription>
              </Alert>
            )}

            {info && (
              <Alert className="border-gold-500/50 bg-gold-500/10">
                <AlertCircle className="h-4 w-4 text-gold-500" />
                <AlertDescription className="text-gold-200">{info}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gold-200">
                  {t('form.email')}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gold-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('form.placeholder.email')}
                    className="pl-10 bg-navy-800/50 border-gold-400/30 text-white placeholder:text-gold-300/50 focus:border-gold-400 focus:ring-gold-400/20"
                    required
                    disabled={busy}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gold-200">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gold-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 bg-navy-800/50 border-gold-400/30 text-white placeholder:text-gold-300/50 focus:border-gold-400 focus:ring-gold-400/20"
                    required
                    disabled={busy}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gold-400 hover:text-gold-300 transition-colors"
                    disabled={busy}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full luxury-button text-lg py-3"
                disabled={busy || !email.trim() || !password}
              >
                {busy ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  t('nav.login')
                )}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-gold-300 text-sm">
                Premium logistics platform for Myanmar
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
=======
/**
 * Enterprise Logistics Platform Login Page
 * Design Theme: Industrial Neo-minimalism (2026)
 */
export default function LoginPage() {
  const { t } = useLanguage();
  const { user, loading, role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as any;

  const springConfig = {
    type: "spring",
    stiffness: 300,
    damping: 30,
    mass: 1
  };

  // Redirect after login
  if (!loading && user) {
    const fromPath = location?.state?.from?.pathname ?? location?.state?.from;
    return <Navigate to={pickSafeRedirect(fromPath, String(role ?? ''))} replace />;
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-background overflow-hidden">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher />
      </div>

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.SCREENSHOT6534_126}
          alt="Britium Express Logistics Background"
          className="w-full h-full object-cover opacity-30 grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/90" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 0)', backgroundSize: '40px 40px' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springConfig}
        className="relative z-10 w-full max-w-[460px] px-6"
      >
        {/* Brand Header */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ ...springConfig, delay: 0.1 }}
            className="inline-flex items-center justify-center p-4 mb-6 rounded-[1.5rem] bg-primary text-primary-foreground shadow-xl shadow-primary/20"
          >
            <img
              src={IMAGES.BRITIUM_LOGO_66}
              alt="Britium Express Logo"
              className="w-12 h-12 object-contain"
            />
          </motion.div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground font-heading">
            {t('brand.name').split(' ')[0]} <span className="text-primary">{t('brand.name').split(' ')[1] || ''}</span>
          </h1>

          <div className="mt-4 flex items-center justify-center gap-3 text-muted-foreground">
            <div className="h-px w-8 bg-border" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">{t('brand.tagline')}</span>
            <div className="h-px w-8 bg-border" />
          </div>
        </div>

        {/* Auth Card */}
        <div className="bg-card border border-border rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-10 backdrop-blur-xl bg-card/95 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />

          <div className="flex flex-col gap-2 mb-8">
            <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              {t('auth.signInToDashboard')}
            </div>
            <h2 className="text-xl font-semibold text-foreground tracking-tight">
              {t('auth.login')}
            </h2>
          </div>

          <LoginForm />

          <div className="mt-10 pt-8 border-t border-border/50">
            <div className="flex flex-col gap-4">
              <button className="flex items-center justify-between w-full px-4 py-3 text-xs font-medium text-muted-foreground bg-muted/30 rounded-xl hover:bg-muted/50 hover:text-foreground transition-colors group" type="button">
                <span>SSO Provider Login</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="text-center space-y-3">
                <Link
                  to={ROUTE_PATHS.REGISTER}
                  className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                >
                  {t('auth.createDemoAccount')}
                </Link>

                <p className="text-xs text-muted-foreground">
                  {t('auth.dontHaveAccount')}{' '}
                  <Link to={ROUTE_PATHS.REGISTER} className="text-primary font-semibold hover:underline transition-all underline-offset-4">
                    {t('auth.signUpHere')}
                  </Link>
                </p>

                <p className="text-xs text-muted-foreground">
                  Need help? <a href="#" className="text-primary font-semibold hover:underline transition-all underline-offset-4">Contact Support</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Getting Started */}
        <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border/50">
          <h4 className="text-sm font-semibold mb-3 text-center">{t('gettingStarted.title')}</h4>
          <div className="text-xs text-center space-y-3">
            <div className="p-3 bg-primary/10 rounded-lg text-primary">
              <strong>{t('gettingStarted.quickStart')}</strong>
            </div>
            <div className="space-y-2 text-muted-foreground">
              <p><strong>{t('gettingStarted.step1')}</strong></p>
              <p><strong>{t('gettingStarted.step2')}</strong></p>
              <p><strong>{t('gettingStarted.step3')}</strong></p>
              <p><strong>{t('gettingStarted.step4')}</strong></p>
              <p><strong>{t('gettingStarted.step5')}</strong></p>
              <p><strong>{t('gettingStarted.step6')}</strong></p>
            </div>
            <div className="text-xs text-muted-foreground/80 mt-2">
              <em>{t('gettingStarted.noVerification')}</em>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-[11px] text-muted-foreground/60">
            {t('brand.copyright')}
          </p>
        </footer>
      </motion.div>

      {/* Decorative orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
    </div>
  );
}
>>>>>>> ec63336 (Initial enterprise logistics platform (Supabase))
