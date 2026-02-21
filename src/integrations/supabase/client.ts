import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lppxrrrbkkzcdjovpbsp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwcHhycnJia2t6Y2Rqb3ZwYnNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwMzg3MjcsImV4cCI6MjA4NTYxNDcyN30.2_QI4Z1ggNRzaWrWB6jAWK_8dpzWUHPohmYDq2S-580'

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Import the supabase client like this:
// For React:
// import { supabase } from "@/integrations/supabase/client";
// For React Native:
// import { supabase } from "@/src/integrations/supabase/client";
