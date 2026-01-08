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
