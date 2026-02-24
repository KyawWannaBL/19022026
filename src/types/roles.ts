export const APP_ROLES = [
  'APP_OWNER',
  'SUPER_ADMIN',

  'OPERATIONS_ADMIN',
  'FINANCE_USER',
  'FINANCE_STAFF',
  'MARKETING_ADMIN',
  'HR_ADMIN',
  'CUSTOMER_SERVICE',

  'SUPERVISOR',
  'WAREHOUSE_MANAGER',
  'SUBSTATION_MANAGER',

  'STAFF',
  'DATA_ENTRY',

  'RIDER',
  'DRIVER',
  'HELPER',

  'MERCHANT',
  'CUSTOMER',
] as const;
<<<<<<< HEAD

export type AppRole = typeof APP_ROLES[number];
=======
import { isAppRole, type AppRole } from "@/types/roles";
// src/types/roles.ts

// 1. Define the valid roles in your system
export type AppRole = 'admin' | 'staff' | 'driver' | 'seller' | 'customer';

// 2. Create the missing helper function
export const isAppRole = (role: any): role is AppRole => {
  const validRoles: AppRole[] = ['admin', 'staff', 'driver', 'seller', 'customer'];
  return validRoles.includes(role);
};
>>>>>>> add-supabase-user-script
