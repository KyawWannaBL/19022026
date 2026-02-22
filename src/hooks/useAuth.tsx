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
  id: string;
  email?: string | null;
  full_name?: string | null;
  role?: AppRole | string | null;
  branch_id?: string | null;
  must_change_password?: boolean | null;
  is_active?: boolean | null;
  status?: string | null;
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

async function fetchProfile(userId: string): Promise<ProfileRow | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.warn("[auth] profile fetch failed", error);
    return null;
  }
  return (data as ProfileRow) ?? null;
}

function normalizeRole(value: unknown): AppRole | string {
  return isAppRole(value) ? value : (typeof value === "string" && value.trim() ? value : "STAFF");
}

async function ensureProfileExists(sessionUser: SupabaseUser): Promise<ProfileRow | null> {
  const existing = await fetchProfile(sessionUser.id);
  if (existing) return existing;

  const role = normalizeRole(sessionUser.user_metadata?.role);

  const insert: Partial<ProfileRow> = {
    id: sessionUser.id,
    email: sessionUser.email ?? null,
    role,
    full_name: sessionUser.user_metadata?.full_name ?? null,
    must_change_password: true,
    status: "active",
  };

  const { data, error } = await supabase
    .from("profiles")
    .upsert(insert, { onConflict: "id" })
    .select("*")
    .maybeSingle();

  if (error) {
    console.warn("[auth] profile upsert failed", error);
    return null;
  }
  return (data as ProfileRow) ?? null;
}

async function fetchPermissionCodes(role: string): Promise<PermissionCode[]> {
  // Superuser shortcut
  if (role === "APP_OWNER") {
    const { data, error } = await supabase.from("permissions").select("code").order("code");
    if (error) return [];
    return (data ?? []).map((p: any) => p?.code).filter(Boolean);
  }

  // Preferred: join
  const relational = await supabase
    .from("role_permissions")
    .select("permission_id, permissions ( code )")
    .eq("role", role);

  if (!relational.error && relational.data) {
    const codes = (relational.data as any[])
      .map((rp) => rp?.permissions?.code)
      .filter(Boolean);
    return Array.from(new Set(codes));
  }

  // Fallback: IDs then codes
  const { data: rpData } = await supabase
    .from("role_permissions")
    .select("permission_id")
    .eq("role", role);

  const ids = (rpData ?? []).map((r: any) => r?.permission_id).filter(Boolean);
  if (!ids.length) return [];

  const { data: permData } = await supabase.from("permissions").select("code").in("id", ids);
  const codes = (permData ?? []).map((p: any) => p?.code).filter(Boolean);
  return Array.from(new Set(codes));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<ProfileRow | null>(null);
  const [role, setRole] = useState<AppRole | string | null>(null);
  const [branchId, setBranchId] = useState<string | null>(null);
  const [permissions, setPermissions] = useState<PermissionCode[]>([]);
  const [mustChangePassword, setMustChangePassword] = useState(false);

  const hydrateFromSession = useCallback(async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) console.warn("[auth] getSession error", error);

    const sessionUser = data.session?.user;
    if (!sessionUser) {
      setUser(null);
      setRole(null);
      setBranchId(null);
      setPermissions([]);
      setMustChangePassword(false);
      return;
    }

    const profile =
      (await ensureProfileExists(sessionUser)) ?? (await fetchProfile(sessionUser.id));

    const resolvedRole = (profile?.role ?? sessionUser.user_metadata?.role ?? null) as any;
    const resolvedBranch = (profile?.branch_id ?? null) as any;

    setUser({
      ...profile,
      id: sessionUser.id,
      email: profile?.email ?? sessionUser.email ?? null,
      full_name: profile?.full_name ?? sessionUser.user_metadata?.full_name ?? null,
      role: resolvedRole,
    });

    setRole(resolvedRole);
    setBranchId(resolvedBranch);

    const must = Boolean(
      profile
        ? profile.must_change_password ?? true
        : sessionUser.user_metadata?.must_change_password ?? true
    );
    setMustChangePassword(must);

    if (resolvedRole) {
      setPermissions(await fetchPermissionCodes(String(resolvedRole)));
    } else {
      setPermissions([]);
    }
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
    } = supabase.auth.onAuthStateChange(async () => {
      await refresh();
    });

    return () => subscription.unsubscribe();
  }, [refresh]);

  const hasPermission = useCallback(
    (permission: PermissionCode) => {
      if (!user || !role) return false;
      if (role === "APP_OWNER") return true;
      return permissions.includes(permission);
    },
    [user, role, permissions]
  );

  const login = useCallback(
    async (email: string, password: string): Promise<LoginResult> => {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      const profile =
        (await ensureProfileExists(data.user)) ?? (await fetchProfile(data.user.id));

      const must = Boolean(
        profile
          ? profile.must_change_password ?? true
          : data.user.user_metadata?.must_change_password ?? true
      );

      const resolvedRole = (profile?.role ?? data.user.user_metadata?.role ?? null) as
        | AppRole
        | string
        | null;

      await refresh();
      return { mustChangePassword: must, role: resolvedRole };
    },
    [refresh]
  );

  const signUp = useCallback(
    async (email: string, password: string, fullName?: string) => {
      const { data, error } = await supabase.auth.signUp({
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
        await supabase.from("profiles").upsert({
          id: data.user.id,
          email,
          role: "CUSTOMER",
          full_name: fullName ?? null,
          must_change_password: true,
          status: "active",
        });
      }

      await refresh();
    },
    [refresh]
  );

  const requestPasswordReset = useCallback(async (email: string, redirectTo?: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectTo ?? `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  }, []);

  const clearMustChangePasswordFlag = useCallback(async (userId: string) => {
    try {
      const { error: rpcErr } = await supabase.rpc("clear_must_change_password");
      if (rpcErr) throw rpcErr;
    } catch {
      await supabase.from("profiles").update({ must_change_password: false }).eq("id", userId);
    }
  }, []);

  const resetPassword = useCallback(
    async (newPassword: string) => {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;

      if (user?.id) await clearMustChangePasswordFlag(user.id);
      await refresh();
    },
    [user?.id, clearMustChangePasswordFlag, refresh]
  );

  const changePassword = useCallback(
    async (newPassword: string) => {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;

      if (user?.id) await clearMustChangePasswordFlag(user.id);
      await refresh();
    },
    [user?.id, clearMustChangePasswordFlag, refresh]
  );

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    // optional local clear (listener will also refresh)
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
      must_change_password: mustChangePassword,
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
      createdAt: user?.created_at ? new Date(user.created_at) : new Date(),
      lastLogin: new Date(),
      batchId: user?.batch_id ?? undefined,
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

export function useAuth() { ... }
export default useAuth;
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}


