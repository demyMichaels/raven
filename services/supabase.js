/**
 * Supabase Client Service
 */
class SupabaseService {
  constructor(config) {
    this.config = config;
    this.client = null;
  }

  async initialize() {
    const { url, anonKey } = this.config.supabase;
    
    this.client = window.supabase.createClient(url, anonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        flowType: 'pkce',
        redirectTo: this.getAppUrl()
      }
    });

    return this.client;
  }
 getAppUrl() {
    const currentOrigin = window.location.origin;
    const currentHostname = window.location.hostname;
    
    const productionDomains = ['examtutor.xyz', 'www.examtutor.xyz'];
    const developmentDomains = ['localhost', '127.0.0.1', '0.0.0.0'];

    if (productionDomains.includes(currentHostname)) {
      return currentOrigin;
    }
    if (developmentDomains.includes(currentHostname)) {
      return currentOrigin;
    }
    return `https://${this.config.app.productionDomain}`;
  }

  getClient() {
    return this.client;
  }
}

const supabaseService = new SupabaseService(null); // Will be initialized with config