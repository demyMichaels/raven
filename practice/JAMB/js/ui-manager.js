// js/ui-manager.js
import { SUBJECTS_META } from './config.js';

export class UIManager {
    constructor() {
        this.sections = [
            'subjectSelection', 
            'topicSelection', 
            'quizInterface', 
            'tutorInterface', 
            'progressInterface'
        ];
    }

    showSection(sectionId) {
        this.sections.forEach(id => {
            document.getElementById(id).classList.add('hidden');
        });
        document.getElementById(sectionId).classList.remove('hidden');
    }

    showLoading(show = true) {
        const modal = document.getElementById('loadingModal');
        modal.classList.toggle('hidden', !show);
    }

    showCustomModal(message, onConfirm, onCancel = null) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        
        const buttons = onCancel 
            ? `<button class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded mr-3" onclick="this.closest('.fixed').remove(); (${onCancel})()">Cancel</button>
               <button class="px-4 py-2 bg-primary text-white hover:bg-primary-dark rounded" onclick="this.closest('.fixed').remove(); (${onConfirm})()">Confirm</button>`
            : `<button class="px-4 py-2 bg-primary text-white hover:bg-primary-dark rounded" onclick="this.closest('.fixed').remove(); (${onConfirm})()">OK</button>`;

        modal.innerHTML = `
            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
                <p class="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-line">${message}</p>
                <div class="flex justify-end">${buttons}</div>
            </div>
        `;
        
        document.body.appendChild(modal);
        return modal;
    }

    renderSubjects(subjects, onSubjectSelect) {
        const grid = document.getElementById('subjectGrid');
        grid.innerHTML = '';

        Object.entries(subjects).forEach(([key, subject]) => {
            const topicCount = Object.keys(subject.topics).length;
            const totalQuestions = Object.values(subject.topics)
                .reduce((sum, topic) => sum + topic.questions.length, 0);
            
            const card = document.createElement('div');
            card.className = `subject-card ${subject.meta.color}`;
            card.innerHTML = `
                <div class="text-3xl mb-2">${subject.meta.icon}</div>
                <h3 class="text-xl font-bold mb-2">${subject.meta.name}</h3>
                <p class="text-sm opacity-90">${topicCount} topics • ${totalQuestions} questions</p>
            `;
            card.onclick = () => onSubjectSelect(key);
            grid.appendChild(card);
        });
    }

    renderTopics(subject, topics, onTopicSelect) {
        document.getElementById('selectedSubjectTitle').textContent = subject.meta.name;
        const grid = document.getElementById('topicGrid');
        grid.innerHTML = '';

        Object.entries(topics).forEach(([key, topic]) => {
            const card = document.createElement('div');
            card.className = 'topic-card';
            card.innerHTML = `
                <h3 class="text-lg font-bold mb-2">${topic.name}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">${topic.questions.length} questions</p>
            `;
            card.onclick = () => onTopicSelect(key);
            grid.appendChild(card);
        });
    }

    renderQuestion(question, questionIndex, totalQuestions, onAnswerSelect) {
        document.getElementById('currentQuestion').textContent = questionIndex + 1;
        document.getElementById('totalQuestions').textContent = totalQuestions;
        document.getElementById('questionMeta').textContent = 
            `${question.difficulty} • ${question.source} • ~${question.estimated_time}s`;
        document.getElementById('questionText').textContent = question.question;
        
        const optionsContainer = document.getElementById('questionOptions');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const label = document.createElement('label');
            label.className = 'option-label';
            label.innerHTML = `
                <input type="radio" name="answer" value="${String.fromCharCode(65 + index)}" class="mr-3">
                <span>${option}</span>
            `;
            label.querySelector('input').onchange = (e) => onAnswerSelect(e.target.value);
            optionsContainer.appendChild(label);
        });
    }
}