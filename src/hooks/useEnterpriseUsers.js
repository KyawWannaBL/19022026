import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { TABLES } from "@/lib/db/tables";
import { USER_ROLES } from "@/lib/index";
function normalizeRole(role) {
    const r = String(role ?? USER_ROLES.CUSTOMER).toLowerCase();
    const allowed = new Set(Object.values(USER_ROLES));
    return (allowed.has(r) ? r : USER_ROLES.CUSTOMER);
}
async function fetchUsers() {
    if (!supabase)
        return [];
    const { data, error } = await supabase
        .from(TABLES.PROFILES)
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500);
    if (error)
        throw error;
    return (data ?? []).map((row) => ({
        id: String(row.user_id ?? row.id),
        email: String(row.email ?? ""),
        fullName: String(row.full_name ?? row.name ?? row.email ?? "User"),
        role: normalizeRole(row.role),
        branchId: row.branch_id ?? null,
        phoneNumber: row.phone ?? row.phone_number ?? null,
        avatarUrl: row.avatar_url ?? row.profile_image_url ?? null,
        merchantId: row.merchant_id ?? null,
        status: (String(row.status ?? "active").toLowerCase() === "inactive" ? "inactive" : "active"),
        createdAt: String(row.created_at ?? new Date().toISOString()),
    }));
}
export function useEnterpriseUsers() {
    return useQuery({
        queryKey: ["enterprise-users"],
        queryFn: fetchUsers,
        staleTime: 30_000,
    });
}
