import { Shipment, User, ROUTE_PATHS, USER_ROLES } from "@/lib/index";
import {
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
  id: string; // auth.users.id
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
  legacyProfiles: "profiles", // auth linked, has must_change_password in your migrations
  enterpriseProfiles: "profiles_2026_02_19_13_00", // has user_id + branch_id + permissions jsonb
  permissions: "permissions",
  rolePermissions: "role_permissions",
} as const;

// Non-null supabase alias for TS (lib may export SupabaseClient | null)
const sb = supabase!;
function normalizeRole(value: unknown): AppRole | string {
  if (isAppRole(value)) return value;
  if (typeof value === "string" && value.trim()) return value.trim();
  return "STAFF";
}

function permissionsFromJson(permissions: any): PermissionCode[] {
  // supports {} object or [] array or string list
  if (!permissions) return [];
  if (Array.isArray(permissions)) return permissions.map(String).filter(Boolean);

  if (typeof permissions === "object") {
    // if it’s { "PERM_X": true } return keys where truthy
    return Object.entries(permissions)
      .filter(([, v]) => Boolean(v))
      .map(([k]) => k)
      .filter(Boolean);
  }
  
  return [];
}

/** Fetch legacy profile row (public.profiles) by auth uid. */
async function fetchLegacyProfile(userId: string): Promise<any | null> {
  const { data, error } = await sb
    .from(TABLES.legacyProfiles)
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.warn("[auth] legacy profile fetch failed", error);
    return null;
  }
  return data ?? null;
}

/** Fetch enterprise profile row (public.profiles_2026_02_19_13_00) by user_id = auth uid. */
async function fetchEnterpriseProfile(userId: string): Promise<any | null> {
  const { data, error } = await sb
    .from(TABLES.enterpriseProfiles)
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    // enterprise table may not exist in some envs; don’t hard fail
    const msg = String(error.message ?? "");
    const isMissing = /does not exist|relation .* does not exist|column .* does not exist/i.test(msg);
    if (!isMissing) console.warn("[auth] enterprise profile fetch failed", error);
    return null;
  }
  return data ?? null;
}

/**
 * Ensure a legacy profile exists (public.profiles).
 * This is the canonical auth-linked profile and is what clear_must_change_password() updates.
 */
async function ensureLegacyProfileExists(sessionUser: SupabaseUser): Promise<any | null> {
  const existing = await fetchLegacyProfile(sessionUser.id);
  if (existing) return existing;

  const role = normalizeRole(sessionUser.user_metadata?.role ?? "CUSTOMER");
  const fullName = (sessionUser.user_metadata?.full_name as string | undefined) ?? null;

  // minimal insert that works across your profile table variants
  const payload: any = {
    id: sessionUser.id,
    email: sessionUser.email ?? null,
    full_name: fullName,
    role,
    is_active: true,
    must_change_password: true,
  };

  // Try upsert; if column mismatch exists in some older variant, remove optional fields.
  let { data, error } = await sb
    .from(TABLES.legacyProfiles)
    .upsert(payload, { onConflict: "id" })
    .select("*")
    .maybeSingle();

  if (error) {
    // retry minimal
    const payload2: any = {
      id: sessionUser.id,
      email: sessionUser.email ?? null,
      role,
      must_change_password: true,
    };
    const res2 = await sb
      .from(TABLES.legacyProfiles)
      .upsert(payload2, { onConflict: "id" })
      .select("*")
      .maybeSingle();

    data = res2.data;
    error = res2.error;
  }

  if (error) {
    console.warn("[auth] legacy profile upsert failed", error);
    return null;
  }
  return data ?? null;
}

/**
 * Ensure an enterprise profile exists (optional, best-effort).
 * Enterprise table requires email + full_name NOT NULL in your schema export.
 */
async function ensureEnterpriseProfileExists(sessionUser: SupabaseUser): Promise<any | null> {
  const existing = await fetchEnterpriseProfile(sessionUser.id);
  if (existing) return existing;

  const email = sessionUser.email ?? null;
  const fullName = (sessionUser.user_metadata?.full_name as string | undefined) ?? email ?? "User";
  const role = normalizeRole(sessionUser.user_metadata?.role ?? "CUSTOMER");

  if (!email) return null;

  const payload: any = {
    user_id: sessionUser.id,
    email,
    full_name: fullName,
    role,
    status: "ACTIVE",
    permissions: {},
  };

  const { data, error } = await sb
    .from(TABLES.enterpriseProfiles)
    .insert(payload)
    .select("*")
    .maybeSingle();

  if (error) {
    // If insert fails due to constraints, don’t crash auth.
    const msg = String(error.message ?? "");
    const isMissing = /does not exist|relation .* does not exist|column .* does not exist/i.test(msg);
    if (!isMissing) console.warn("[auth] enterprise profile insert failed", error);
    return null;
  }

  return data ?? null;
}

/** Merge legacy + enterprise into one ProfileRow (auth uid is the id). */
async function fetchMergedProfile(authUser: SupabaseUser): Promise<ProfileRow | null> {
  const legacy = await ensureLegacyProfileExists(authUser);
  const enterprise = await ensureEnterpriseProfileExists(authUser);

  const role = normalizeRole(legacy?.role ?? enterprise?.role ?? authUser.user_metadata?.role ?? "STAFF");

  // branch_id may be in legacy OR enterprise
  const branch_id = (legacy?.branch_id ?? enterprise?.branch_id ?? null) as string | null;

  // must_change_password is stored in legacy profiles (function clear_must_change_password updates it)
  const must_change_password =
    legacy?.must_change_password ??
    authUser.user_metadata?.must_change_password ??
    true;

  return {
    id: authUser.id,
    email: legacy?.email ?? enterprise?.email ?? authUser.email ?? null,
    full_name:
      legacy?.full_name ??
      enterprise?.full_name ??
      (authUser.user_metadata?.full_name ?? null),
    role,
    branch_id,
    must_change_password: Boolean(must_change_password),
    is_active: legacy?.is_active ?? true,
    status: legacy?.status ?? enterprise?.status ?? null,
    permissions: legacy?.permissions ?? enterprise?.permissions ?? null,
    // keep raw rows if you want
    legacy_profile: legacy ?? null,
    enterprise_profile: enterprise ?? null,
  };
}

async function fetchPermissionCodes(role: string, mergedProfile?: ProfileRow | null): Promise<PermissionCode[]> {
  // APP_OWNER = all permissions (if table exists)
  if (role === "APP_OWNER") {
    const { data, error } = await sb.from(TABLES.permissions).select("code").order("code");
    if (!error && data) return (data ?? []).map((p: any) => p?.code).filter(Boolean);
    // fallback
    return permissionsFromJson(mergedProfile?.permissions);
  }

  // Try RBAC tables
  try {
    const relational = await sb
      .from(TABLES.rolePermissions)
      .select("permission_id, permissions ( code )")
      .eq("role", role);

    if (!relational.error && relational.data) {
      const codes = (relational.data as any[]).map((rp) => rp?.permissions?.code).filter(Boolean);
      return Array.from(new Set(codes));
    }

    const { data: rpData } = await sb
      .from(TABLES.rolePermissions)
      .select("permission_id")
      .eq("role", role);

    const ids = (rpData ?? []).map((r: any) => r?.permission_id).filter(Boolean);
    if (!ids.length) return permissionsFromJson(mergedProfile?.permissions);

    const { data: permData } = await sb.from(TABLES.permissions).select("code").in("id", ids);
    const codes = (permData ?? []).map((p: any) => p?.code).filter(Boolean);
    return Array.from(new Set(codes));
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
    const { data, error } = await sb.auth.getSession();
    if (error) console.warn("[auth] getSession error", error);

    const authUser = data.session?.user;
    if (!authUser) {
      setUser(null);
      setRole(null);
      setBranchId(null);
      setPermissions([]);
      setMustChangePassword(false);
      return;
    }

    const merged = await fetchMergedProfile(authUser);
    const resolvedRole = normalizeRole(merged?.role ?? authUser.user_metadata?.role ?? "STAFF");

    setUser(merged);
    setRole(resolvedRole);
    setBranchId((merged?.branch_id ?? null) as string | null);
    setMustChangePassword(Boolean(merged?.must_change_password ?? true));

    setPermissions(await fetchPermissionCodes(String(resolvedRole), merged));
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      await hydrateFromSession();
    } finally {
      setLoading(false);
    }
  }, [hydrateFromSession]);

  useEffect(() => {
    refresh();
    const {
      data: { subscription },
    } = sb.auth.onAuthStateChange(async () => {
      await refresh();
    });
    return () => subscription.unsubscribe();
  }, [refresh]);

  const hasPermission = useCallback(
    (permission: PermissionCode) => {
      if (!user || !role) return false;
      if (String(role) === "APP_OWNER") return true;
      return permissions.includes(permission);
    },
    [user, role, permissions]
  );

  const login = useCallback(
    async (email: string, password: string): Promise<LoginResult> => {
      const { data, error } = await sb.auth.signInWithPassword({ email, password });
      if (error) throw error;

      // Ensure profiles exist
      await ensureLegacyProfileExists(data.user);
      await ensureEnterpriseProfileExists(data.user);

      await refresh();

      const merged = await fetchMergedProfile(data.user);
      const must = Boolean(merged?.must_change_password ?? true);
      const resolvedRole = normalizeRole(merged?.role ?? data.user.user_metadata?.role ?? null);

      return { mustChangePassword: must, role: resolvedRole };
    },
    [refresh]
  );

  const signUp = useCallback(
    async (email: string, password: string, fullName?: string) => {
      const { data, error } = await sb.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName ?? null,
            role: "CUSTOMER",
            must_change_password: true,
          },
        },
      });
      if (error) throw error;

      if (data.user) {
        await ensureLegacyProfileExists(data.user);
        await ensureEnterpriseProfileExists(data.user);
      }

      await refresh();
    },
    [refresh]
  );

  const requestPasswordReset = useCallback(async (email: string, redirectTo?: string) => {
    const { error } = await sb.auth.resetPasswordForEmail(email, {
      redirectTo: redirectTo ?? `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  }, []);

  const clearMustChangePasswordFlag = useCallback(async () => {
    // your migration defines clear_must_change_password() for public.profiles
    try {
      const { error } = await sb.rpc("clear_must_change_password");
      if (!error) return;
    } catch {
      // ignore and try direct update
    }

    const { data } = await sb.auth.getSession();
    const uid = data.session?.user?.id;
    if (!uid) return;

    await sb
      .from(TABLES.legacyProfiles)
      .update({ must_change_password: false })
      .eq("id", uid);
  }, []);

  const resetPassword = useCallback(
    async (newPassword: string) => {
      const { error } = await sb.auth.updateUser({ password: newPassword });
      if (error) throw error;

      await clearMustChangePasswordFlag();
      await refresh();
    },
    [clearMustChangePasswordFlag, refresh]
  );

  const changePassword = useCallback(
    async (newPassword: string) => {
      const { error } = await sb.auth.updateUser({ password: newPassword });
      if (error) throw error;

      await clearMustChangePasswordFlag();
      await refresh();
    },
    [clearMustChangePasswordFlag, refresh]
  );

  const logout = useCallback(async () => {
    await sb.auth.signOut();
    setUser(null);
    setRole(null);
    setBranchId(null);
    setPermissions([]);
    setMustChangePassword(false);
  }, []);

  const userData: UserData | null = useMemo(() => {
    if (!user) return null;
    const map: Record<PermissionCode, true> = {};
    for (const p of permissions) map[p] = true;

    return {
      id: user.id,
      email: user.email ?? null,
      full_name: user.full_name ?? null,
      role: user.role ?? null,
      branch_id: user.branch_id ?? null,
      permissions: map,
      must_change_password: Boolean(user.must_change_password ?? mustChangePassword),
    };
  }, [user, permissions, mustChangePassword]);

  const legacyUser = useMemo(() => {
    if (!userData) return null;
    return {
      id: userData.id,
      name: userData.full_name ?? (userData.email?.split("@")[0] ?? "User"),
      email: userData.email ?? "",
      role: userData.role ?? "",
      permissions: Object.keys(userData.permissions),
      isActive: Boolean(user?.is_active ?? true),
      createdAt: user?.createdAt ? new Date(user.createdAt) : new Date(),
      lastLogin: new Date(),
    };
  }, [user, userData]);

  const value: AuthContextValue = {
    loading,
    user,
    role,
    branch_id: branchId,
    mustChangePassword,
    permissions,
    userData,
    legacyUser,
    login,
    signUp,
    requestPasswordReset,
    resetPassword,
    logout,
    changePassword,
    hasPermission,
    refresh,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

export default useAuth;