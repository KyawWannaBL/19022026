import { canAccessPanel, normalizeRole, type PanelSlug } from "@/lib/rbac";
import { useAuth } from "@/hooks/useAuth";

type Props = {
  panel: PanelSlug;
  children: React.ReactNode;
  redirectTo?: string;
};

export default function RequireRole({ panel, children, redirectTo = "/login" }: Props) {
  const { user } = useAuth();
  const location = useLocation();

  // Treat undefined as "loading" to avoid login-loop flicker.
  if (typeof user === "undefined") return null;

  const role = normalizeRole((user as any)?.role ?? null);

  if (!canAccessPanel(role, panel)) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return <>{children}</>;
}