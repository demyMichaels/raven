Perfect! I'll provide you with a comprehensive refactored architecture for your Raven app. Here's how to structure it for modularity and security:

📋 Architecture Overview
I'll show you a modular, scalable structure with proper separation of concerns and secure configuration management.

1. Project Structure
raven-app/
├── index.html                 # Main entry point
├── config/
│   └── config.js             # Configuration loader
├── services/
│   ├── supabase.js           # Supabase client
│   ├── auth.js               # Authentication logic
│   ├── database.js           # Database operations
│   ├── whatsapp.js           # WhatsApp messaging
│   └── eventBus.js           # Event system
├── modules/
│   ├── ui.js                 # UI management
│   ├── profile.js            # Profile management
│   ├── dashboard.js          # Dashboard logic
│   └── landing.js            # Landing page logic
├── utils/
│   ├── validators.js         # Validation helpers
│   ├── formatters.js         # Formatting helpers
│   └── logger.js             # Logging utility
└── styles/
    └── main.css              # All styles
2. Secure Configuration (Load from Supabase)
Step 1: Create a Supabase Edge Function
First, create an Edge Function in Supabase that returns your config:

# In Supabase dashboard, create a new Edge Function called "get-config"
supabase/functions/get-config/index.ts:

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 })
  }

  // Return configuration (the anon key is safe to expose)
  return new Response(
    JSON.stringify({
      supabase: {
        url: Deno.env.get('SUPABASE_URL'),
        anonKey: Deno.env.get('SUPABASE_ANON_KEY')
      },
      app: {
        productionDomain: 'examtutor.xyz',
        appName: 'Raven'
      }
    }),
    {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    }
  )
})
3. Refactored Code Structure
config/config.js - Configuration Loader
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
services/eventBus.js - Event System
/**
 * Simple Event Bus for decoupled communication
 */
class EventBus {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }

  once(event, callback) {
    const wrapper = (data) => {
      callback(data);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }
}

const eventBus = new EventBus();
services/supabase.js - Supabase Client
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
services/auth.js - Authentication Service
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
services/database.js - Database Service
/**
 * Database Service
 */
class DatabaseService {
  constructor(supabaseClient, eventBus) {
    this.client = supabaseClient;
    this.eventBus = eventBus;
  }

  async loadUserData(userId) {
    try {
      const { data, error } = await this.client
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // User doesn't exist
        }
        throw error;
      }

      return data;
    } catch (error) {
      this.eventBus.emit('db:error', error);
      throw error;
    }
  }

  async createUser(userData) {
    try {
      const { error } = await this.client
        .from('users')
        .insert([userData]);

      if (error) throw error;
      this.eventBus.emit('db:user-created', userData);
      return userData;
    } catch (error) {
      this.eventBus.emit('db:error', error);
      throw error;
    }
  }

  async updateUser(userId, updates) {
    try {
      const { error } = await this.client
        .from('users')
        .update(updates)
        .eq('id', userId);

      if (error) throw error;
      this.eventBus.emit('db:user-updated', { userId, updates });
      return updates;
    } catch (error) {
      this.eventBus.emit('db:error', error);
      throw error;
    }
  }

  async updateLoginCount(userId, currentCount) {
    return this.updateUser(userId, {
      last_login: new Date().toISOString(),
      login_count: (currentCount || 0) + 1,
      updated_at: new Date().toISOString()
    });
  }
}

const databaseService = new DatabaseService(null, eventBus); // Will be initialized
services/whatsapp.js - WhatsApp Service
/**
 * WhatsApp Service
 */
class WhatsAppService {
  constructor(supabaseConfig, eventBus) {
    this.config = supabaseConfig;
    this.eventBus = eventBus;
  }

  async sendWelcomeMessage(userData, templateName = 'jaspers_market_plain_text_v1') {
    try {
      const response = await fetch(
        `${this.config.supabase.url}/functions/v1/send-whatsapp-welcome`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.supabase.anonKey}`
          },
          body: JSON.stringify({
            whatsapp_number: userData.whatsapp_number,
            template: templateName,
            payload: {
              name: userData.name || 'Student',
              course: userData.course || '',
              institution: userData.institute || '',
              score: userData.target_score || ''
            }
          })
        }
      );

      const result = await response.json();
      this.eventBus.emit('whatsapp:message-sent', result);
      return result;
    } catch (error) {
      this.eventBus.emit('whatsapp:error', error);
      throw error;
    }
  }
}

const whatsappService = new WhatsAppService(null, eventBus); // Will be initialized
modules/ui.js - UI Management
/**
 * UI Module - Handles screen transitions and UI updates
 */
class UIModule {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.screens = ['landingPage', 'loadingScreen', 'loginScreen', 'profileScreen', 'dashboardScreen'];
  }

  showScreen(screenId) {
    if (!this.screens.includes(screenId)) {
      console.warn(`Unknown screen: ${screenId}`);
      return;
    }

    this.screens.forEach(screen => {
      const element = document.getElementById(screen);
      if (element) {
        element.classList.toggle('hidden', screen !== screenId);
      }
    });

    this.eventBus.emit('ui:screen-changed', screenId);
  }

  showError(message, elementId = 'errorDisplay') {
    const errorEl = document.getElementById(elementId);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.remove('hidden');
    }
    this.eventBus.emit('ui:error-shown', { message, elementId });
  }

  hideError(elementId = 'errorDisplay') {
    const errorEl = document.getElementById(elementId);
    if (errorEl) {
      errorEl.classList.add('hidden');
    }
  }

  showSuccess(message, elementId) {
    const successEl = document.getElementById(elementId);
    if (successEl) {
      successEl.textContent = message;
      successEl.classList.remove('hidden');
    }
  }

  updateLoading(message) {
    const loadingMsg = document.getElementById('loadingMessage');
    if (loadingMsg) {
      loadingMsg.textContent = message;
    }
  }

  setButtonLoading(buttonId, isLoading, originalText = '') {
    const btn = document.getElementById(buttonId);
    if (btn) {
      btn.disabled = isLoading;
      btn.textContent = isLoading ? 'Loading...' : originalText;
    }
  }
}

const uiModule = new UIModule(eventBus);
modules/profile.js - Profile Management
/**
 * Profile Module
 */
class ProfileModule {
  constructor(databaseService, uiModule, eventBus) {
    this.db = databaseService;
    this.ui = uiModule;
    this.eventBus = eventBus;
    this.selectedSubjects = [];
    this.SUBJECTS = [
      'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Economics',
      'Accounting', 'Commerce', 'Government', 'Literature', 'Geography',
      'Agricultural Science', 'CRS', 'History'
    ];
  }

  showProfileSetup(user) {
    document.getElementById('profileName').value = user.name || '';
    document.getElementById('profileEmail').value = user.email || '';
    
    this.renderSubjectsGrid();
    this.ui.showScreen('profileScreen');
  }

  renderSubjectsGrid() {
    const subjectsGrid = document.getElementById('subjectsGrid');
    subjectsGrid.innerHTML = '';
    
    this.SUBJECTS.forEach(subject => {
      const chip = document.createElement('div');
      chip.className = 'subject-chip';
      chip.textContent = subject;
      chip.dataset.subject = subject;
      chip.onclick = () => this.toggleSubject(chip);
      subjectsGrid.appendChild(chip);
    });
  }

  toggleSubject(chip) {
    const subject = chip.dataset.subject;
    const index = this.selectedSubjects.indexOf(subject);
    
    if (index > -1) {
      this.selectedSubjects.splice(index, 1);
      chip.classList.remove('selected');
    } else if (this.selectedSubjects.length < 3) {
      this.selectedSubjects.push(subject);
      chip.classList.add('selected');
    }
    
    this.updateSubjectMessage();
  }

  updateSubjectMessage() {
    const remaining = 3 - this.selectedSubjects.length;
    const messageEl = document.getElementById('subjectMessage');
    
    if (remaining > 0) {
      messageEl.textContent = `Select ${remaining} more subject${remaining !== 1 ? 's' : ''}`;
      messageEl.style.color = 'var(--text-secondary)';
    } else {
      messageEl.textContent = '✓ All subjects selected';
      messageEl.style.color = 'var(--success-color)';
    }
  }

  async handleSubmit(userId) {
    if (this.selectedSubjects.length !== 3) {
      this.ui.showError('Please select exactly 3 subjects', 'profileError');
      return false;
    }

    try {
      const targetScore = parseInt(document.getElementById('targetScore').value);
      if (targetScore < 180 || targetScore > 400) {
        throw new Error('Target score must be between 180 and 400');
      }

      const updateData = {
        name: document.getElementById('profileName').value.trim(),
        whatsapp_number: document.getElementById('whatsappNumber').value.trim(),
        institute: document.getElementById('institute').value,
        course: document.getElementById('course').value.trim(),
        target_score: targetScore,
        subjects: this.selectedSubjects,
        profile_complete: true,
        updated_at: new Date().toISOString()
      };

      await this.db.updateUser(userId, updateData);
      this.eventBus.emit('profile:completed', updateData);
      return true;
    } catch (error) {
      this.ui.showError('Error saving profile: ' + error.message, 'profileError');
      return false;
    }
  }

  reset() {
    this.selectedSubjects = [];
  }
}

const profileModule = new ProfileModule(databaseService, uiModule, eventBus);
modules/dashboard.js - Dashboard Module
/**
 * Dashboard Module
 */
class DashboardModule {
  constructor(uiModule, eventBus) {
    this.ui = uiModule;
    this.eventBus = eventBus;
  }

  show(userData) {
    if (!userData) return;

    // Update avatar
    const avatarEl = document.getElementById('userAvatar');
    if (userData.photo_url) {
      avatarEl.innerHTML = `<img src="${userData.photo_url}" alt="Avatar" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
    } else {
      avatarEl.textContent = this.getInitials(userData.name || 'U');
    }

    // Update user info
    document.getElementById('dashboardUserName').textContent = userData.name?.split(' ')[0] || 'User';
    document.getElementById('dashboardEmail').textContent = userData.email || '-';
    document.getElementById('dashboardInstitute').textContent = userData.institute || '-';
    document.getElementById('dashboardCourse').textContent = userData.course || '-';
    document.getElementById('dashboardTargetScore').textContent = userData.target_score || '-';
    document.getElementById('dashboardSubjects').textContent = userData.subjects?.join(', ') || '-';
    document.getElementById('dashboardWhatsApp').textContent = userData.whatsapp_number || '-';
    document.getElementById('dashboardLoginCount').textContent = userData.login_count || '1';

    this.ui.showScreen('dashboardScreen');
  }

  getInitials(name) {
    return (name || 'U').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }
}

const dashboardModule = new DashboardModule(uiModule, eventBus);
index.html - Main Entry Point (Simplified)
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Raven</title>
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <link rel="stylesheet" href="styles/main.css">
</head>
<body>
    <!-- All your HTML screens here (same as before) -->
    
    <!-- Scripts in order -->
    <script src="config/config.js"></script>
    <script src="services/eventBus.js"></script>
    <script src="services/supabase.js"></script>
    <script src="services/auth.js"></script>
    <script src="services/database.js"></script>
    <script src="services/whatsapp.js"></script>
    <script src="modules/ui.js"></script>
    <script src="modules/profile.js"></script>
    <script src="modules/dashboard.js"></script>
    <script src="app.js"></script>
</body>
</html>
app.js - Application Initialization
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
4. Key Benefits of This Architecture
✅ Modularity: Each service/module has a single responsibility
✅ Scalability: Easy to add new features (just create new modules)
✅ Security: Keys loaded from Supabase, not hardcoded
✅ Testability: Services can be tested independently
✅ Maintainability: Clear separation of concerns
✅ Reusability: Services can be used across multiple modules
✅ Event-Driven: Loose coupling between modules

5. How to Add New Features
Example: Add a "Study Plans" Module
// modules/studyPlans.js
class StudyPlansModule {
  constructor(databaseService, uiModule, eventBus) {
    this.db = databaseService;
    this.ui = uiModule;
    this.eventBus = eventBus;
  }

  async loadStudyPlans(userId) {
    try {
      const { data, error } = await this.db.client
        .from('study_plans')
        .select('*')
        .eq('user_id', userId);
      
      if (error) throw error;
      this.eventBus.emit('studyPlans:loaded', data);
      return data;
    } catch (error) {
      this.eventBus.emit('studyPlans:error', error);
    }
  }

  async createStudyPlan(planData) {
    // Implementation
  }
}

const studyPlansModule = new StudyPlansModule(databaseService, uiModule, eventBus);
Then just add it to index.html and use it!

6. Environment Variables (Optional but Recommended)
Create a .env file:

SUPABASE_URL=https://kwicenbmgllolchbrjve.supabase.co
SUPABASE_ANON_KEY=your_key_here
Use with a build tool like Vite or Webpack to inject at build time.



This architecture is production-ready, scalable, and secure! Would you like me to help you implement any specific part or add additional features?