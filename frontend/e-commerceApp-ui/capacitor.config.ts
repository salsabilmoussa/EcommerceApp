import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'nom_de_votre_projet',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
