export type AppRole = 'admin' | 'merchant' | 'rider' | 'super_admin' | 'customer';
export const isAppRole = (role: string): role is AppRole => 
  ['admin', 'merchant', 'rider', 'super_admin', 'customer'].includes(role);
