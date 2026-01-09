/**
 * Authentication Service
 */
class AuthService {
  constructor(supabaseClient, eventBus) {
    this.client = supabaseClient;
    this.eventBus = eventBus;
    this.currentUser = null;
  }

  async setupAuthListener() {
    try {
      const { data: { session }, error } = await this.client.auth.getSession();
      
      if (error) throw error;

      if (session?.user) {
        this.currentUser = session.user;
        this.eventBus.emit('auth:user-loaded', session.user);
      } else {
        this.eventBus.emit('auth:no-session');
      }

      // Listen for auth changes
      this.client.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          this.currentUser = session.user;
          this.eventBus.emit('auth:signed-in', session.user);
        } else if (event === 'SIGNED_OUT') {
          this.currentUser = null;
          this.eventBus.emit('auth:signed-out');
        }
      });
    } catch (error) {
      this.eventBus.emit('auth:error', error);
    }
  }
  
  async signInWithGoogle() {
    try {
      const appUrl = supabaseService.getAppUrl();
      const { error } = await this.client.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: appUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });
      if (error) throw error;
    } catch (error) {
      this.eventBus.emit('auth:error', error);
      throw error;
    }
  }

  async logout() {
    try {
      const { error } = await this.client.auth.signOut();
      if (error) throw error;
      this.currentUser = null;
      this.eventBus.emit('auth:signed-out');
    } catch (error) {
      this.eventBus.emit('auth:error', error);
      throw error;
    }
  }
    getCurrentUser() {
    return this.currentUser;
  }
}

const authService = new AuthService(null, eventBus); // Will be initialized