import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.britium.express',
  appName: 'Britium Express',
  webDir: 'dist', // This MUST match the folder Vite creates
  bundledWebRuntime: false
};

export default config;