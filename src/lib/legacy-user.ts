<<<<<<< HEAD
// Utility functions for backward compatibility with existing code
import { User as FirebaseUser } from 'firebase/auth';

// Legacy User interface for backward compatibility
=======
// Utility functions for backward compatibility with existing code (Supabase-only).
import type { User as SupabaseUser } from '@supabase/supabase-js';

>>>>>>> ec63336 (Initial enterprise logistics platform (Supabase))
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

<<<<<<< HEAD
// Convert Firebase User + UserData to Legacy User format
export const createLegacyUser = (firebaseUser: FirebaseUser | null, userData: any): LegacyUser | null => {
  if (!firebaseUser || !userData) return null;
  
  return {
    id: firebaseUser.uid,
    name: userData.displayName || firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
    email: firebaseUser.email || '',
    role: userData.role || 'CUSTOMER',
    permissions: userData.permissions || [],
    isActive: userData.isActive || true,
    createdAt: userData.createdAt || new Date(),
    lastLogin: userData.lastLoginAt || new Date(),
    batchId: userData.batchId || undefined
  };
};

// Hook for backward compatibility
export const useLegacyUser = () => {
  // This would be imported from the actual auth hook
  // For now, return null to prevent errors
  return null;
};
=======
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
>>>>>>> ec63336 (Initial enterprise logistics platform (Supabase))
