// Utility functions for backward compatibility with existing code (Supabase-only).
import type { User as SupabaseUser } from '@supabase/supabase-js';

export interface LegacyUser {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions?: string[];
  isActive: boolean;
  createdAt: Date;
  lastLogin: Date;
  batchId?: string;
}

// Convert Supabase User + profile/userData to a legacy shape used by older components.
export const createLegacyUser = (user: SupabaseUser | null, userData: any): LegacyUser | null => {
  if (!user) return null;

  const email = user.email || userData?.email || '';
  const name =
    userData?.full_name ||
    userData?.displayName ||
    user.user_metadata?.full_name ||
    (email ? email.split('@')[0] : 'User');

  return {
    id: user.id,
    name,
    email,
    role: (userData?.role || 'CUSTOMER') as string,
    permissions: userData?.permissions || [],
    isActive: userData?.is_active ?? true,
    createdAt: userData?.created_at ? new Date(userData.created_at) : new Date(),
    lastLogin: new Date(),
    batchId: userData?.batch_id || undefined,
  };
};

export const useLegacyUser = () => null;
