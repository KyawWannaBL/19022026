import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { strongPassword } from "@/lib/password";
import { useAuth } from "@/hooks/useAuth";

export default function ForcePasswordReset() {
  const nav = useNavigate();
  const { changePassword } = useAuth();

  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function update() {
    setError(null);
    setOk(null);

    if (pw !== pw2) return setError("Passwords do not match.");
    if (!strongPassword.test(pw)) return setError("Password is too weak.");

    setLoading(true);
    try {
      await changePassword(pw);
      setOk("Password updated.");
      nav("/panel"); // will redirect to role default
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
          <h1 className="text-xl font-semibold">Set New Password</h1>
          <p className="text-sm text-muted-foreground">
            Your admin has required you to change your password before continuing.
          </p>

          <Input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="New password" />
          <Input type="password" value={pw2} onChange={(e) => setPw2(e.target.value)} placeholder="Confirm new password" />

          {error && <p className="text-sm text-destructive">{error}</p>}
          {ok && <p className="text-sm text-emerald-600">{ok}</p>}

          <Button disabled={loading} onClick={update} className="w-full">
            {loading ? "Updating..." : "Update password"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
