/**
 * Standalone login form used by src/pages/LoginPage.tsx.
 * Fixes runtime error: "TypeError: S is not a function" caused by missing/undefined onSubmit handler.
 */
export default function StandaloneLoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const res = await login(email.trim(), password);
      navigate(res.mustChangePassword ? "/force-password-reset" : postLoginPath(res.role), {
        replace: true,
      });
    } catch (err: any) {
      setError(err?.message ?? "Login failed. Please check your email and password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error ? (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm">
          <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
          <div className="text-destructive">{error}</div>
        </div>
      ) : null}

      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@britium.com"
          autoComplete="email"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Password</label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          autoComplete="current-password"
        />
      </div>

      <Button type="submit" className="w-full h-12" disabled={isLoading}>
        {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <ShieldCheck className="mr-2 h-5 w-5" />}
        Login to Dashboard
      </Button>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <Link className="hover:underline text-primary" to="/forgot-password">
          Forgot password?
        </Link>
        <Link className="hover:underline" to="/register">
          Create account
        </Link>
      </div>
    </form>
  );
}
