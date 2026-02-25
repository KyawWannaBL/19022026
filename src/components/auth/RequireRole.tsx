import { PanelSlug, normalizeRole, canAccessPanel } from "@/lib/rbac";

/**
 * Prop Definitions for RBAC Protection
 */
type Props = {
  panel: PanelSlug;
  children: React.ReactNode;
  redirectTo?: string;
};

/**
 * Production Guard: Protects panel routes based on normalized User Roles.
 * Ensures that specific dashboards (e.g., FINANCE, RIDER) are only accessible
 * to authorized staff.
 */
export default function RequireRole({ panel, children, redirectTo = "/login" }: Props) {
  const { user, loading } = useAuth(); // Enhanced with loading state to prevent loops
  const location = useLocation();

  // 1. Loading State: Wait for Supabase session to initialize
  // Prevents "White Screen" or redirect flicker
  if (loading || typeof user === "undefined") {
    return null; // Or a <Loader2 className="animate-spin" />
  }

  // 2. Authentication Check: Redirect to login if no user is found
  if (!user) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  // 3. Normalization: Map database role strings to AppRole constants
  const userRole = normalizeRole((user as any)?.role || (user as any)?.user_metadata?.role);

  // 4. Permission Check: Verify if normalized role has access to the target panel
  if (!canAccessPanel(userRole, panel)) {
    console.warn(`Access Denied: Role [${userRole}] attempted to access [${panel}]`);
    
    // Redirect unauthorized users to the login page with a return path
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  // 5. Authorized: Render the protected dashboard/content
  return <>{children}</>;
}