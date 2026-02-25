import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Britium Express - Supabase Client Configuration
 * © 2026 Britium Express Logistics System - Production Final
 */

// 1. Environment Variable Mapping
const supabaseUrl = 
  (import.meta.env.VITE_SUPABASE_PROJECT_URL as string) || 
  (import.meta.env.VITE_SUPABASE_URL as string);

const supabaseKey =
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string) ||
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ||
  (import.meta.env.VITE_SUPABASE_KEY as string);

// 2. Client Initialization
let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseKey) {
  // Production setting: persistSession and autoRefreshToken are essential for RequireRole stability
  supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
} else {
  // If variables are missing, the app will trigger "safe mode" logs to help debug Vercel Env settings
  console.warn(
    '[Supabase] Missing environment variables. Verify VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel Dashboard.'
  );
}

// 3. Export as a singleton
export { supabase };