import { useAuth } from "@/hooks/useAuth";

export default function ForgotPassword() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSent(false);

    try {
      await requestPasswordReset(email, `${window.location.origin}/reset-password`);
      setSent(true);
    } catch (err: any) {
      setError(err?.message ?? "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md p-8 rounded-2xl border border-border bg-card shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center">
            {error}
          </div>
        )}
        {sent && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 text-emerald-300 text-sm text-center">
            Reset link sent. Please check your email.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-xl bg-background text-foreground border border-border outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button type="submit" disabled={loading} className="w-full h-12">
            {loading ? "Sending..." : "Send reset link"}
          </Button>
        </form>

        <div className="mt-6 text-sm text-center text-muted-foreground">
          <Link to="/login" className="text-primary underline">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
