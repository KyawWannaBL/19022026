import { useAuth } from "@/hooks/useAuth";

export default function ResetPassword() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const nav = useNavigate();
  const { resetPassword } = useAuth();

  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setError(null);
    setOk(null);

    if (pw.length < 8) return setError("Password must be at least 8 characters.");
    if (pw !== pw2) return setError("Passwords do not match.");

    setLoading(true);
    try {
      await resetPassword(pw);
      setOk("Password updated. You can now login.");
      nav("/login");
    } catch (e: any) {
      setError(e?.message ?? "Failed to update password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background text-foreground">
      <Card className="w-full max-w-md border-border">
        <CardContent className="p-6 space-y-4">
          <h1 className="text-xl font-semibold">Reset Password</h1>
          <p className="text-sm text-muted-foreground">
            Enter a new password for your account.
          </p>

          <Input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="New password" />
          <Input type="password" value={pw2} onChange={(e) => setPw2(e.target.value)} placeholder="Confirm new password" />

          {error && <p className="text-sm text-destructive">{error}</p>}
          {ok && <p className="text-sm text-emerald-600">{ok}</p>}

          <Button disabled={loading} onClick={submit} className="w-full">
            {loading ? "Updating..." : "Update password"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
