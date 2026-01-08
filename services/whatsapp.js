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