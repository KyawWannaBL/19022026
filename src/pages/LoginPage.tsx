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
  
  switch (role) {
    case USER_ROLES.SUPER_ADMIN:
    case USER_ROLES.ADMIN:
    case USER_ROLES.MANAGER:
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