export default function SignUpCustomer() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setError(null);

    if (pw !== pw2) return setError("Passwords do not match.");
    if (!strongPassword.test(pw)) return setError("Password is too weak.");

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password: pw,
      options: {
        data: { full_name: name, phone, role: "CUSTOMER" },
      },
    });

    if (error) {
      setLoading(false);
      return setError(error.message);
    }

    // Best-effort profile flag (don't block sign up if schema differs)
    const userId = data.user?.id;
    if (userId) {
      try {
        await supabase.from("profiles").upsert({
          id: userId,
          email,
          full_name: name || null,
          role: "CUSTOMER",
          must_change_password: false,
        });
      } catch {}
    }

    setLoading(false);
    nav("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background text-foreground">
      <Card className="w-full max-w-md border-border">
        <CardContent className="p-6 space-y-4">
          <h1 className="text-xl font-semibold">Customer Sign Up</h1>

          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />

          <Input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Password" />
          <Input type="password" value={pw2} onChange={(e) => setPw2(e.target.value)} placeholder="Confirm Password" />

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button disabled={loading} onClick={submit} className="w-full">
            {loading ? "Creating..." : "Create Account"}
          </Button>

          <div className="text-sm text-muted-foreground">
            Already have an account? <Link className="text-primary underline" to="/login">Login</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
