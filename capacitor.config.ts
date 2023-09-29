import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'coffee.app',
  appName: 'coffee-app',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
