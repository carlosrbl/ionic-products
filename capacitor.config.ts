import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.daw.ejemploproductos1',
  appName: 'Ionic Products',
  webDir: 'www',
  android: {
    allowMixedContent: true,
  },
  plugins: {
    StatusBar: {
      overlaysWebView: false,
      style: 'DARK',
      backgroundColor: '#0054e9',
    },
  },
};

export default config;
