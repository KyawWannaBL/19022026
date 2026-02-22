/**
 * Supabase client (env-safe).
 * Uses Vercel/Vite env vars:
 * - VITE_SUPABASE_PROJECT_URL (preferred) or VITE_SUPABASE_URL
 * - VITE_SUPABASE_ANON_KEY
 */
export { supabase } from "@/lib/supabase";
