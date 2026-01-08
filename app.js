/**
 * Main Application Initialization
 */
class RavenApp {
  constructor() {
    this.config = null;
    this.currentUser = null;
    this.currentUserData = null;
  }

  async initialize() {
    try {
      // 1. Load configuration
      this.config = await configService.load();
      console.log('✓ Configuration loaded');

      // 2. Initialize Supabase
      supabaseService.config = this.config;
      const supabaseClient = await supabaseService.initialize();
      console.log('✓ Supabase initialized');

      // 3. Initialize services with Supabase client
      authService.client = supabaseClient;
      databaseService.client = supabaseClient;
      whatsappService.config = this.config;

      // 4. Setup event listeners
      this.setupEventListeners();

      // 5. Setup auth listener
      await authService.setupAuthListener();
      console.log('✓ Auth listener setup');

    } catch (error) {
      console.error('Initialization error:', error);
      uiModule.showError('Failed to initialize app: ' + error.message);
    }
  }

  setupEventListeners() {
    // Auth events
    eventBus.on('auth:signed-in', (user) => this.handleUserSignedIn(user));
    eventBus.on('auth:user-loaded', (user) => this.handleUserLoaded(user));
    eventBus.on('auth:no-session', () => uiModule.showScreen('landingPage'));
    eventBus.on('auth:signed-out', () => this.handleUserSignedOut());
    eventBus.on('auth:error', (error) => uiModule.showError(error.message, 'loginError'));

    // Database events
    eventBus.on('db:user-created', (userData) => console.log('User created:', userData));
    eventBus.on('db:user-updated', (data) => console.log('User updated:', data));
    eventBus.on('db:error', (error) => console.error('Database error:', error));

    // Profile events
    eventBus.on('profile:completed', (profileData) => this.handleProfileCompleted(profileData));

    // UI events
    eventBus.on('ui:error-shown', (data) => console.log('Error shown:', data.message));

    // Setup button listeners
    document.getElementById('googleSignInBtn').onclick = () => this.handleGoogleSignIn();
    document.getElementById('profileForm').onsubmit = (e) => this.handleProfileSubmit(e);
  }

  async handleUserSignedIn(user) {
    this.currentUser = user;
    uiModule.updateLoading('Loading your data...');
    uiModule.showScreen('loadingScreen');
    await this.loadUserData(user);
  }

  async handleUserLoaded(user) {
    this.currentUser = user;
    await this.loadUserData(user);
  }

  async loadUserData(user) {
    try {
      let userData = await databaseService.loadUserData(user.id);

      if (!userData) {
        // Create new user
        userData = {
          id: user.id,
          email: user.email,
          name: user.user_metadata?.full_name || user.user_metadata?.name || 'User',
          photo_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
          whatsapp_number: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          login_count: 1,
          last_login: new Date().toISOString(),
          profile_complete: false
        };
        await databaseService.createUser(userData);
      } else {
        // Update login count
        await databaseService.updateLoginCount(user.id, userData.login_count);
      }

      this.currentUserData = userData;

      if (userData.profile_complete) {
        dashboardModule.show(userData);
      } else {
        profileModule.showProfileSetup(userData);
        uiModule.showScreen('profileScreen');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      uiModule.showError('Error loading data: ' + error.message);
      uiModule.showScreen('landingPage');
    }
  }

  async handleGoogleSignIn() {
    try {
      uiModule.setButtonLoading('googleSignInBtn', true);
      await authService.signInWithGoogle();
    } catch (error) {
      uiModule.showError('Sign in failed: ' + error.message, 'loginError');
      uiModule.setButtonLoading('googleSignInBtn', false);
    }
  }

  async handleProfileSubmit(e) {
    e.preventDefault();
    uiModule.setButtonLoading('profileForm', true);
    uiModule.hideError('profileError');

    try {
      const success = await profileModule.handleSubmit(this.currentUser.id);
      if (success) {
        // Reload user data to show dashboard
        await this.loadUserData(this.currentUser);
      }
    } finally {
      uiModule.setButtonLoading('profileForm', false);
    }
  }

  async handleProfileCompleted(profileData) {
    this.currentUserData = { ...this.currentUserData, ...profileData };
    
    // Send WhatsApp welcome message
    try {
      await whatsappService.sendWelcomeMessage(this.currentUserData);
    } catch (error) {
      console.warn('WhatsApp message failed:', error);
    }
  }

  handleUserSignedOut() {
    this.currentUser = null;
    this.currentUserData = null;
    profileModule.reset();
    uiModule.showScreen('landingPage');
  }

  async logout() {
    try {
      uiModule.updateLoading('Signing out...');
      uiModule.showScreen('loadingScreen');
      await authService.logout();
    } catch (error) {
      uiModule.showError('Logout failed: ' + error.message);
      uiModule.showScreen('landingPage');
    }
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new RavenApp();
  app.initialize();

  // Make logout available globally
  window.logout = () => app.logout();
});