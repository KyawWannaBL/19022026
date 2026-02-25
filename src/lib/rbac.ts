 * © 2026 Britium Express Logistics System
 */

export const APP_ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  OPERATIONS: "OPERATIONS",
  FINANCE: "FINANCE",
  WAREHOUSE: "WAREHOUSE",
  RIDER: "RIDER",
  MERCHANT: "MERCHANT",
  CUSTOMER: "CUSTOMER",
  SUPERVISOR: "SUPERVISOR",
  STAFF: "STAFF",
} as const;

export type AppRole = (typeof APP_ROLES)[keyof typeof APP_ROLES];

// Fixed: Aligned with ROUTE_PATHS to resolve App.tsx routing errors
export const PANELS = {
  SUPER_ADMIN: "super-admin",
  OPERATIONS: "operations",
  FINANCE: "finance",
  RIDER: "rider",
  MERCHANT_CUSTOMER: "merchant-customer",
} as const;

export type PanelKey = keyof typeof PANELS;
export type PanelSlug = (typeof PANELS)[PanelKey];

export type Permission = `panel:${PanelSlug}` | `screen:${PanelSlug}/${string}`;

// Production Mapping: Defines which roles can access which UI panels
export const ROLE_PERMISSIONS: Record<AppRole, Permission[]> = {
  SUPER_ADMIN: [
    "panel:super-admin",
    "panel:operations",
    "panel:finance",
    "panel:rider",
    "panel:merchant-customer",
  ],
  OPERATIONS: ["panel:operations", "panel:rider", "panel:merchant-customer"],
  FINANCE: ["panel:finance"],
  WAREHOUSE: ["panel:operations"],
  RIDER: ["panel:rider"],
  MERCHANT: ["panel:merchant-customer"],
  CUSTOMER: ["panel:merchant-customer"],
  SUPERVISOR: ["panel:operations", "panel:finance", "panel:super-admin"],
  STAFF: ["panel:operations", "panel:merchant-customer"],
};

/**
 * Normalizes database role strings into valid AppRole constants.
 * Fixes "Invalid Role" errors during the login flow.
 */
export function normalizeRole(input: unknown): AppRole | null {
  const raw = String(input ?? "").trim();
  if (!raw) return null;

  // Exact match check
  if ((Object.values(APP_ROLES) as string[]).includes(raw)) return raw as AppRole;

  // Tolerant aliases for database compatibility
  const key = raw.toLowerCase().replace(/_/g, '-');
  const map: Record<string, AppRole> = {
    "super-admin": APP_ROLES.SUPER_ADMIN,
    "admin": APP_ROLES.SUPER_ADMIN,
    "operations": APP_ROLES.OPERATIONS,
    "finance": APP_ROLES.FINANCE,
    "accountant": APP_ROLES.FINANCE,
    "warehouse": APP_ROLES.WAREHOUSE,
    "rider": APP_ROLES.RIDER,
    "merchant": APP_ROLES.MERCHANT,
    "customer": APP_ROLES.CUSTOMER,
    "supervisor": APP_ROLES.SUPERVISOR,
    "manager": APP_ROLES.SUPERVISOR,
    "staff": APP_ROLES.STAFF,
  };

  return map[key] ?? null;
}

export function hasPermission(role: AppRole | null | undefined, perm: Permission): boolean {
  if (!role) return false;
  return ROLE_PERMISSIONS[role]?.includes(perm) ?? false;
}

export function canAccessPanel(role: AppRole | null | undefined, panel: PanelSlug): boolean {
  return hasPermission(role, `panel:${panel}`);
}

export {}; // Ensure file is treated as a module to fix TS2451