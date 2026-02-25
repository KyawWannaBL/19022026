function normalizeRole(role: any): User["role"] {
  const r = String(role ?? USER_ROLES.CUSTOMER).toLowerCase();
  const allowed = new Set(Object.values(USER_ROLES));
  return (allowed.has(r) ? r : USER_ROLES.CUSTOMER) as any;
}

async function fetchUsers(): Promise<User[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from(TABLES.PROFILES)
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(500);

  if (error) throw error;
  return (data ?? []).map((row: any) => ({
    id: String(row.user_id ?? row.id),
    email: String(row.email ?? ""),
    fullName: String(row.full_name ?? row.name ?? row.email ?? "User"),
    role: normalizeRole(row.role),
    branchId: row.branch_id ?? null,
    phoneNumber: row.phone ?? row.phone_number ?? null,
    avatarUrl: row.avatar_url ?? row.profile_image_url ?? null,
    merchantId: row.merchant_id ?? null,
    status: (String(row.status ?? "active").toLowerCase() === "inactive" ? "inactive" : "active") as any,
    createdAt: String(row.createdAt ?? new Date().toISOString()),
  }));
}

export function useEnterpriseUsers() {
  return useQuery({
    queryKey: ["enterprise-users"],
    queryFn: fetchUsers,
    staleTime: 30_000,
  });
}
