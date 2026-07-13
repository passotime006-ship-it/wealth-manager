// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// NOTE: The values below are read from the Vite env variables.
// You must create a .env file (see .env.example) with your Supabase project URL and public anon key.
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL ?? '',
  import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''
);
