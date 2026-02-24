import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { TABLES } from "@/lib/db/tables";
async function fetchBranches() {
    if (!supabase)
        return [];
    const { data, error } = await supabase
        .from(TABLES.BRANCHES)
        .select("*")
        .order("name", { ascending: true });
    if (error)
        throw error;
    return (data ?? []);
}
export function useEnterpriseBranches() {
    return useQuery({
        queryKey: ["enterprise-branches"],
        queryFn: fetchBranches,
        staleTime: 60_000,
    });
}
