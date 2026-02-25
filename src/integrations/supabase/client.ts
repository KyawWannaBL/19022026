const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Prevents 'null' crash
export const supabase = createClient(supabaseUrl, supabaseAnonKey);