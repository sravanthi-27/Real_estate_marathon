import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { ApiError } from './errors';

let client;

/** Service-role client. Server only - bypasses RLS, so ALWAYS validate input before using it. */
export function getAdminClient() {
  if (client) return client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new ApiError(500, 'Server is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
  client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  return client;
}

export const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'registration-docs';
