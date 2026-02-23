
import { createClient, SupabaseClient } from '@supabase/supabase-js'

<<<<<<< HEAD
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
=======
const supabaseUrl = (import.meta.env.VITE_SUPABASE_PROJECT_URL as string | undefined) || (import.meta.env.VITE_SUPABASE_URL as string | undefined)
>>>>>>> ec63336 (Initial enterprise logistics platform (Supabase))

const supabaseKey =
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ||
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ||
  (import.meta.env.VITE_SUPABASE_KEY as string | undefined)

let supabase: SupabaseClient | null = null

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  })
} else {
  console.warn(
    '[Supabase] Missing environment variables. App running in safe mode without backend connection.'
  )
}

export { supabase }
