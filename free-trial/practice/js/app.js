// js/app.js
import { DataManager } from './data-manager.js';
import { UIManager } from './ui-manager.js';
import { QuizManager } from './quiz-manager.js';
import { TutorManager } from './tutor-manager.js';
import { ProgressManager } from './progress-manager.js';

class EduHubApp {
    constructor() {
        this.dataManager = new DataManager();
        this.uiManager = new UIManager();
        this.progressManager = new ProgressManager();
        this.quizManager = new QuizManager(this.dataManager, this.uiManager, this.progressManager);
        this.tutorManager = new TutorManager(this.uiManager);
        
        this.init();
    }

    async init() {
        this.uiManager.showLoading(true);
        await this.dataManager.loadAllSubjects();
        this.uiManager.showLoading(false);
        
        this.setupEventListeners();
        this.loadSubjectsView();
    }

    setupEventListeners() {
        // Navigation
        document.getElementById('practiceBtn').onclick = () => this.loadSubjectsView();
        document.getElementById('tutorBtn').onclick = () => this.loadTutorView();
        document.getElementById('progressBtn').onclick = () => this.loadProgressView();
        
        // Back buttons
        document.getElementById('backToSubjects').onclick = () => this.loadSubjectsView();
        document.getElementById('backToTopics').onclick = () => this.loadTopicsView();
        
        // Quiz navigation
        document.getElementById('nextBtn').onclick = () => this.quizManager.nextQuestion();
        document.getElementById('prevBtn').onclick = () => this.quizManager.previousQuestion();
        document.getElementById('explainBtn').onclick = () => this.quizManager.explainCurrentQuestion();
    }

    loadSubjectsView() {
        this.uiManager.showSection('subjectSelection');
        const subjects = this.dataManager.getAllSubjects();
        this.uiManager.renderSubjects(subjects, (subjectKey) => this.selectSubject(subjectKey));
    }

    selectSubject(subjectKey) {
        const subject = this.dataManager.getSubject(subjectKey);
        this.uiManager.showSection('topicSelection');
        this.uiManager.renderTopics(subject, subject.topics, (topicKey) => this.selectTopic(subjectKey, topicKey));
    }

    selectTopic(subjectKey, topicKey) {
        this.quizManager.startQuiz(subjectKey, topicKey);
        this.tutorManager.updateContext(subjectKey, topicKey);
    }

    loadTopicsView() {
        if (this.quizManager.currentSubject) {
            this.selectSubject(this.quizManager.currentSubject);
        } else {
            this.loadSubjectsView();
        }
    }

    loadTutorView() {
        this.uiManager.showSection('tutorInterface');
    }

    loadProgressView() {
        this.uiManager.showSection('progressInterface');
        this.progressManager.renderProgress(this.dataManager);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new EduHubApp();
});