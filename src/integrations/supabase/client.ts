import { createClient } from '@supabase/supabase-js';

// Retrieve environment variables with fallback to empty strings
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Safety check to alert you in the browser console if config is missing
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials missing! Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your Vercel Environment Variables.');
}

// Export the client. It will no longer be 'null', preventing the runtime crash
export const supabase = createClient(supabaseUrl, supabaseAnonKey);