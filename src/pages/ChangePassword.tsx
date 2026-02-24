import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function ChangePassword() {
  const { changePassword } = useAuth();
  const nav = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setOk(null);

    if (password !== confirm) return setError("Passwords do not match");
    if (password.length < 8) return setError("Minimum 8 characters required");

    try {
      setLoading(true);
      await changePassword(password);
      setOk("Password updated.");
      nav("/panel");
    } catch (err: any) {
      setError(err?.message ?? String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md border-border">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-center">Change Password</h2>

          {error && <div className="text-sm text-destructive">{error}</div>}
          {ok && <div className="text-sm text-emerald-600">{ok}</div>}

          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
            <Button disabled={loading} className="w-full" type="submit">
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
