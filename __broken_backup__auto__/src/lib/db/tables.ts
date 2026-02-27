  SHIPMENT_TRACKING: "shipment_tracking_2026_02_19_13_00",
  CUSTOMERS: "customers_2026_02_19_13_00",
  MERCHANTS: "merchants_2026_02_19_13_00",
  VEHICLES: "vehicles_2026_02_19_13_00",
  VEHICLE_TRACKING: "vehicle_tracking_2026_02_19_13_00",
} as const;

export type TableName = typeof TABLES[keyof typeof TABLES];
