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
