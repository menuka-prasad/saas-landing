// /lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

// Note: You *do not* need to check for the env variables here.
// The createBrowserClient function handles it.
// If they are missing, the app will fail at runtime, which is fine.

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)