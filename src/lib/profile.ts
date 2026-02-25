    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  return { userId, profile };
}