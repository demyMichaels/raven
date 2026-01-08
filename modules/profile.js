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