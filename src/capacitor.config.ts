// src/capacitor.config.ts
import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.example.app",
  appName: "Britium",
  webDir: "dist",
  // bundledWebRuntime: false, // remove (type mismatch)
};

export default config;