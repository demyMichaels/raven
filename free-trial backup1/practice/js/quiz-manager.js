// js/quiz-manager.js
import { CONFIG } from './config.js';

export class QuizManager {
    constructor(dataManager, uiManager, progressManager) {
        this.dataManager = dataManager;
        this.uiManager = uiManager;
        this.progressManager = progressManager;
        this.reset();
    }

    reset() {
        this.currentSubject = null;
        this.currentTopic = null;
        this.currentQuestions = [];
        this.currentQuestionIndex = 0;
        this.selectedAnswer = null;
    }

    startQuiz(subjectKey, topicKey) {
        this.currentSubject = subjectKey;
        this.currentTopic = topicKey;
        this.currentQuestions = [...this.dataManager.getQuestions(subjectKey, topicKey)];
        this.currentQuestionIndex = 0;
        
        if (CONFIG.QUESTION_SHUFFLE) {
            this.currentQuestions.sort(() => Math.random() - 0.5);
        }
        
        this.loadCurrentQuestion();
        this.uiManager.showSection('quizInterface');
    }

    loadCurrentQuestion() {
        if (this.currentQuestionIndex >= this.currentQuestions.length) {
            this.finishQuiz();
            return;
        }

        const question = this.currentQuestions[this.currentQuestionIndex];
        this.uiManager.renderQuestion(
            question, 
            this.currentQuestionIndex, 
            this.currentQuestions.length, 
            (answer) => this.selectAnswer(answer)
        );
        
        this.updateButtons();
        this.selectedAnswer = null;
    }

    selectAnswer(answer) {
        this.selectedAnswer = answer;
        this.updateButtons();
    }

    nextQuestion() {
        if (!this.selectedAnswer) return;
        
        this.recordAnswer();
        this.currentQuestionIndex++;
        this.loadCurrentQuestion();
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.loadCurrentQuestion();
        }
    }

    recordAnswer() {
        const question = this.currentQuestions[this.currentQuestionIndex];
        const isCorrect = this.selectedAnswer === question.answer;
        
        this.progressManager.recordAttempt({
            questionId: question.id,
            subjectKey: this.currentSubject,
            isCorrect: isCorrect,
            timeTaken: question.estimated_time
        });
    }

    async explainCurrentQuestion() {
        if (!this.selectedAnswer) return;
        
        const question = this.currentQuestions[this.currentQuestionIndex];
        const isCorrect = this.selectedAnswer === question.answer;
        const subject = this.dataManager.getSubject(this.currentSubject);
        
        const prompt = this.buildExplanationPrompt(question, isCorrect, subject);
        
        if (window.Poe) {
            try {
                await window.Poe.sendUserMessage(`${CONFIG.DEFAULT_BOT} ${prompt}`, {
                    openChat: true
                });
            } catch (err) {
                console.error('Error getting explanation:', err);
            }
        }
    }

    buildExplanationPrompt(question, isCorrect, subject) {
        return `Explain this ${subject.meta.name.toLowerCase()} question step by step:

Question: ${question.question}
Correct Answer: ${question.options[question.answer.charCodeAt(0) - 65]} (${question.answer})
Student's Answer: ${question.options[this.selectedAnswer.charCodeAt(0) - 65]} (${this.selectedAnswer})
Student was: ${isCorrect ? 'CORRECT' : 'INCORRECT'}

Explanation: ${question.explanation}

Please provide a clear, step-by-step explanation that helps the student understand the concept.`;
    }

    updateButtons() {
        document.getElementById('nextBtn').disabled = !this.selectedAnswer;
        document.getElementById('explainBtn').disabled = !this.selectedAnswer;
        document.getElementById('prevBtn').disabled = this.currentQuestionIndex === 0;
    }

    finishQuiz() {
        const stats = this.progressManager.getOverallStats();
        this.uiManager.showCustomModal(
            `Quiz Complete! 🎉\n\nYou answered ${stats.correct} out of ${stats.total} questions correctly.\n\nReady to try another topic?`,
            () => this.uiManager.showSection('topicSelection')
        );
    }
}