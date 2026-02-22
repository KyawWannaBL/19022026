import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { getMyProfile } from "@/lib/profile";

export default function ProtectedRoute({
  children,
  requireAuth = true,
  requirePasswordOk = true,
}: {
  children: JSX.Element;
  requireAuth?: boolean;
  requirePasswordOk?: boolean;
}) {
  const [loading, setLoading] = useState(true);
  const [sessionUserId, setSessionUserId] = useState<string | null>(null);
  const [mustChangePassword, setMustChangePassword] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      const uid = data.session?.user?.id ?? null;
      setSessionUserId(uid);

      if (uid) {
        const { profile } = await getMyProfile();
        setMustChangePassword(Boolean(profile?.must_change_password));
      }

      setLoading(false);
    })();
  }, []);

  if (loading) return null;

  if (requireAuth && !sessionUserId) return <Navigate to="/login" replace />;
  if (requireAuth && requirePasswordOk && mustChangePassword) {
    return <Navigate to="/force-password-reset" replace />;
  }

  return children;
}