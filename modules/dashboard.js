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