  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { isAppRole, type AppRole } from "@/types/roles";

type PermissionCode = string;

export type ProfileRow = {
  id: string; 
  email?: string | null;
  full_name?: string | null;
  role?: AppRole | string | null;
  branch_id?: string | null;
  must_change_password?: boolean | null;
  is_active?: boolean | null;
  status?: string | null;
  permissions?: any;
  [k: string]: any;
};

type UserData = {
  id: string;
  email?: string | null;
  full_name?: string | null;
  role?: AppRole | string | null;
  branch_id?: string | null;
  permissions: Record<PermissionCode, true>;
  must_change_password: boolean;
};

export type LoginResult = {
  mustChangePassword: boolean;
  role: AppRole | string | null;
};

type AuthContextValue = {
  loading: boolean;
  user: ProfileRow | null;
  role: AppRole | string | null;
  branch_id: string | null;
  mustChangePassword: boolean;
  permissions: PermissionCode[];
  userData: UserData | null;
  legacyUser: any | null;

  login: (email: string, password: string) => Promise<LoginResult>;
  signUp: (email: string, password: string, fullName?: string) => Promise<void>;
  requestPasswordReset: (email: string, redirectTo?: string) => Promise<void>;
  resetPassword: (newPassword: string) => Promise<void>;

  logout: () => Promise<void>;
  changePassword: (newPassword: string) => Promise<void>;
  hasPermission: (permission: PermissionCode) => boolean;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const TABLES = {
  legacyProfiles: "profiles", 
  enterpriseProfiles: "profiles_2026_02_19_13_00", 
  permissions: "permissions",
  rolePermissions: "role_permissions",
} as const;

const sb = supabase!;

function normalizeRole(value: unknown): AppRole | string {
  if (isAppRole(value)) return value;
  if (typeof value === "string" && value.trim()) return value.trim();
  return "STAFF";
}

function permissionsFromJson(permissions: any): PermissionCode[] {
  if (!permissions) return [];
  if (Array.isArray(permissions)) return permissions.map(String).filter(Boolean);
  if (typeof permissions === "object") {
    return Object.entries(permissions)
      .filter(([, v]) => Boolean(v))
      .map(([k]) => k)
      .filter(Boolean);
  }
  return [];
}

async function fetchLegacyProfile(userId: string): Promise<any | null> {
  const { data, error } = await sb
    .from(TABLES.legacyProfiles)
    .select("*")
    .eq("id", userId)
    .maybeSingle();
  if (error) return null;
  return data ?? null;
}

async function fetchEnterpriseProfile(userId: string): Promise<any | null> {
  const { data, error } = await sb
    .from(TABLES.enterpriseProfiles)
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) return null;
  return data ?? null;
}

async function ensureLegacyProfileExists(sessionUser: SupabaseUser): Promise<any | null> {
  const existing = await fetchLegacyProfile(sessionUser.id);
  if (existing) return existing;

  const payload = {
    id: sessionUser.id,
    email: sessionUser.email ?? null,
    role: normalizeRole(sessionUser.user_metadata?.role ?? "CUSTOMER"),
    must_change_password: true,
  };

  const { data, error } = await sb.from(TABLES.legacyProfiles).upsert(payload).select("*").maybeSingle();
  if (error) return null;
  return data;
}

async function ensureEnterpriseProfileExists(sessionUser: SupabaseUser): Promise<any | null> {
  const existing = await fetchEnterpriseProfile(sessionUser.id);
  if (existing) return existing;

  const payload = {
    user_id: sessionUser.id,
    email: sessionUser.email,
    full_name: (sessionUser.user_metadata?.full_name as string) ?? "User",
    role: normalizeRole(sessionUser.user_metadata?.role ?? "CUSTOMER"),
    status: "ACTIVE",
    permissions: {},
  };

  const { data, error } = await sb.from(TABLES.enterpriseProfiles).insert(payload).select("*").maybeSingle();
  if (error) return null;
  return data;
}

async function fetchMergedProfile(authUser: SupabaseUser): Promise<ProfileRow | null> {
  const legacy = await ensureLegacyProfileExists(authUser);
  const enterprise = await ensureEnterpriseProfileExists(authUser);

  return {
    id: authUser.id,
    email: legacy?.email ?? enterprise?.email ?? authUser.email ?? null,
    full_name: legacy?.full_name ?? enterprise?.full_name ?? authUser.user_metadata?.full_name ?? null,
    role: normalizeRole(legacy?.role ?? enterprise?.role ?? authUser.user_metadata?.role ?? "STAFF"),
    branch_id: legacy?.branch_id ?? enterprise?.branch_id ?? null,
    must_change_password: Boolean(legacy?.must_change_password ?? true),
    is_active: legacy?.is_active ?? true,
    status: legacy?.status ?? enterprise?.status ?? null,
    permissions: legacy?.permissions ?? enterprise?.permissions ?? null,
  };
}

async function fetchPermissionCodes(role: string, mergedProfile?: ProfileRow | null): Promise<PermissionCode[]> {
  try {
    const { data } = await sb.from(TABLES.rolePermissions).select("permissions(code)").eq("role", role);
    if (data) return (data as any[]).map(rp => rp?.permissions?.code).filter(Boolean);
    return permissionsFromJson(mergedProfile?.permissions);
  } catch {
    return permissionsFromJson(mergedProfile?.permissions);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<ProfileRow | null>(null);
  const [role, setRole] = useState<AppRole | string | null>(null);
  const [branchId, setBranchId] = useState<string | null>(null);
  const [permissions, setPermissions] = useState<PermissionCode[]>([]);
  const [mustChangePassword, setMustChangePassword] = useState(false);

  const hydrateFromSession = useCallback(async () => {
    const { data } = await sb.auth.getSession();
    const authUser = data.session?.user;
    
    if (!authUser) {
      setUser(null);
      setRole(null);
      setPermissions([]);
      setMustChangePassword(false);
      return;
    }

    const merged = await fetchMergedProfile(authUser);
    const resolvedRole = normalizeRole(merged?.role ?? "STAFF");

    setUser(merged);
    setRole(resolvedRole);
    setBranchId(merged?.branch_id ?? null);
    setMustChangePassword(merged?.must_change_password ?? true);
    setPermissions(await fetchPermissionCodes(String(resolvedRole), merged));
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    try { await hydrateFromSession(); } 
    finally { setLoading(false); }
  }, [hydrateFromSession]);

  useEffect(() => {
    refresh();
    const { data: { subscription } } = sb.auth.onAuthStateChange(async () => { await refresh(); });
    return () => subscription.unsubscribe();
  }, [refresh]);

  const hasPermission = useCallback((perm: PermissionCode) => permissions.includes(perm), [permissions]);

  const login = useCallback(async (email: string, password: string) => {
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    if (error) throw error;
    await refresh();
    const merged = await fetchMergedProfile(data.user);
    return { mustChangePassword: Boolean(merged?.must_change_password), role: merged?.role ?? null };
  }, [refresh]);

  const signUp = useCallback(async (email: string, password: string, fullName?: string) => {
    const { data, error } = await sb.auth.signUp({ 
      email, password, options: { data: { full_name: fullName, role: "CUSTOMER" } } 
    });
    if (error) throw error;
    if (data.user) await refresh();
  }, [refresh]);

  const logout = useCallback(async () => {
    await sb.auth.signOut();
    setUser(null);
    setRole(null);
    setLoading(false);
  }, []);

  const userData = useMemo(() => user ? { ...user, permissions: hasPermission } : null, [user, hasPermission]);
  const legacyUser = useMemo(() => user ? { ...user, name: user.full_name || "User" } : null, [user]);

  const value = {
    loading,
    user,
    role,
    branch_id: branchId,
    mustChangePassword,
    permissions,
    userData: userData as any,
    legacyUser,
    login,
    signUp,
    logout,
    refresh,
    requestPasswordReset: async () => {}, // Implement if needed
    resetPassword: async () => {},
    changePassword: async () => {},
    hasPermission
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
export default useAuth;