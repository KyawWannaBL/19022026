  LOGIN: "/login",

  // Panel roots
  SUPER_ADMIN: "/admin",
  OPERATIONS: "/operations",
  FINANCE: "/finance",
  RIDER: "/rider",
  MERCHANT_CUSTOMER: "/merchant-customer",

  // Public
  PUBLIC_TRACKING: "/tracking",
  SERVICES: "/services",
  GET_QUOTE: "/get-quote",
  ABOUT: "/about",
  NEWS: "/news",
  CONTACT: "/contact",

  // Common app pages (used in nav/layouts)
  SHIPMENTS: "/shipments",
  FLEET: "/fleet",
  WAY_PLANNING: "/way-planning",
  SETTINGS: "/settings",
} as const;

export type RouteKey = keyof typeof ROUTE_PATHS;
export type RoutePath = (typeof ROUTE_PATHS)[RouteKey];