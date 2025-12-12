// js/progress-manager.js
export class ProgressManager {
    constructor() {
        this.userProgress = {
            questionsAttempted: {},
            subjectStats: {},
            overallStats: { correct: 0, total: 0, timeSpent: 0 }
        };
        this.loadProgress();
    }

    recordAttempt({ questionId, subjectKey, isCorrect, timeTaken }) {
        // Record individual attempt
        this.userProgress.questionsAttempted[questionId] = {
            correct: isCorrect,
            timeTaken: timeTaken,
            attemptedAt: new Date().toISOString()
        };
        
        // Update overall stats
        this.updateOverallStats(isCorrect, timeTaken);
        
        // Update subject stats
        this.updateSubjectStats(subjectKey, isCorrect);
        
        this.saveProgress();
    }

    updateOverallStats(isCorrect, timeTaken) {
        this.userProgress.overallStats.total++;
        if (isCorrect) this.userProgress.overallStats.correct++;
        this.userProgress.overallStats.timeSpent += timeTaken;
    }

    updateSubjectStats(subjectKey, isCorrect) {
        if (!this.userProgress.subjectStats[subjectKey]) {
            this.userProgress.subjectStats[subjectKey] = { correct: 0, total: 0 };
        }
        
        this.userProgress.subjectStats[subjectKey].total++;
        if (isCorrect) this.userProgress.subjectStats[subjectKey].correct++;
    }

    getOverallStats() {
        return this.userProgress.overallStats;
    }

    getSubjectStats() {
        return this.userProgress.subjectStats;
    }

    getAccuracy() {
        const { correct, total } = this.userProgress.overallStats;
        return total > 0 ? Math.round((correct / total) * 100) : 0;
    }

    getSubjectAccuracy(subjectKey) {
        const stats = this.userProgress.subjectStats[subjectKey];
        if (!stats || stats.total === 0) return 0;
        return Math.round((stats.correct / stats.total) * 100);
    }

    renderProgress(dataManager) {
        this.renderOverallProgress();
        this.renderSubjectProgress(dataManager);
    }

    renderOverallProgress() {
        const overallDiv = document.getElementById('overallStats');
        const stats = this.userProgress.overallStats;
        const accuracy = this.getAccuracy();
        
        overallDiv.innerHTML = `
            <div class="mb-3">
                <div class="flex justify-between mb-1">
                    <span>Questions Answered</span>
                    <span class="font-bold">${stats.total}</span>
                </div>
                <div class="flex justify-between mb-1">
                    <span>Accuracy</span>
                    <span class="font-bold">${accuracy}%</span>
                </div>
                <div class="flex justify-between">
                    <span>Time Spent</span>
                    <span class="font-bold">${Math.round(stats.timeSpent / 60)}m</span>
                </div>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                <div class="bg-primary h-3 rounded-full transition-all duration-300" style="width: ${accuracy}%"></div>
            </div>
        `;
    }

    renderSubjectProgress(dataManager) {
        const subjectDiv = document.getElementById('subjectStats');
        subjectDiv.innerHTML = '';
        
        Object.entries(this.userProgress.subjectStats).forEach(([subjectKey, stats]) => {
            const subject = dataManager.getSubject(subjectKey);
            if (!subject) return;
            
            const accuracy = this.getSubjectAccuracy(subjectKey);
            const colorClass = subject.meta.color.replace('bg-', '');
            
            const statDiv = document.createElement('div');
            statDiv.className = 'mb-4';
            statDiv.innerHTML = `
                <div class="flex justify-between mb-2">
                    <span>${subject.meta.name}</span>
                    <span class="font-bold">${accuracy}%</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div class="bg-${colorClass} h-2 rounded-full" style="width: ${accuracy}%"></div>
                </div>
            `;
            subjectDiv.appendChild(statDiv);
        });
    }

    saveProgress() {
        // In a real app, this would save to a backend
        // For now, we'll use localStorage if available
        try {
            localStorage.setItem('eduHub_progress', JSON.stringify(this.userProgress));
        } catch (e) {
            console.log('Unable to save progress - localStorage not available');
        }
    }

    loadProgress() {
        try {
            const saved = localStorage.getItem('eduHub_progress');
            if (saved) {
                this.userProgress = JSON.parse(saved);
            }
        } catch (e) {
            console.log('Unable to load progress - localStorage not available');
        }
    }

    resetProgress() {
        this.userProgress = {
            questionsAttempted: {},
            subjectStats: {},
            overallStats: { correct: 0, total: 0, timeSpent: 0 }
        };
        this.saveProgress();
    }
}