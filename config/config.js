/**
 * Configuration Service
 * Loads config from Supabase Edge Function
 */
class ConfigService {
  constructor() {
    this.config = null;
    this.isLoaded = false;
  }

  async load() {
    try {
      // Load from Edge Function instead of hardcoding
      const response = await fetch(
        'https://kwicenbmgllolchbrjve.supabase.co/functions/v1/get-config'
      );
      
      if (!response.ok) {
        throw new Error(`Config load failed: ${response.status}`);
      }

      this.config = await response.json();
      this.isLoaded = true;
      return this.config;
    } catch (error) {
      console.error('Failed to load config:', error);
      // Fallback for development
      this.config = this.getDevConfig();
      this.isLoaded = true;
      return this.config;
    }
  }

  getDevConfig() {
    // Only used in development
    return {
      supabase: {
        url: 'https://kwicenbmgllolchbrjve.supabase.co',
        anonKey: process.env.SUPABASE_ANON_KEY || ''
      },
      app: {
        productionDomain: 'examtutor.xyz',
        appName: 'Raven'
      }
    };
  }

  get(path) {
    return path.split('.').reduce((obj, key) => obj?.[key], this.config);
  }
}

const configService = new ConfigService();