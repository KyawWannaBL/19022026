export type EnterpriseBranch = {
  id: string;
  name: string;
  code?: string | null;
  city?: string | null;
  address?: string | null;
  status?: string | null;
  [k: string]: any;
};

async function fetchBranches(): Promise<EnterpriseBranch[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from(TABLES.BRANCHES)
    .select("*")
    .order("name", { ascending: true });

  if (error) throw error;
  return (data ?? []) as any[];
}

export function useEnterpriseBranches() {
  return useQuery({
    queryKey: ["enterprise-branches"],
    queryFn: fetchBranches,
    staleTime: 60_000,
  });
}
