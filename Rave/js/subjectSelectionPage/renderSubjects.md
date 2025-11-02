        // Render subjects
        function renderSubjects() {
            const subjectGrid = document.getElementById('subjectGrid');
            subjectGrid.innerHTML = '';

            const subjectIcons = {
                'mathematics': 'calculate',
                'physics': 'tungsten', 
                'chemistry': 'science',
                'biology': 'bubble_chart',
                'english': 'translate',
                'english-2': 'menu_book'
            };

            const subjectColors = {
                'mathematics': 'from-data-500 to-data-600',
                'physics': 'from-warning to-warning/80',
                'chemistry': 'from-primary to-primary-600',
                'biology': 'from-success to-success/80',
                'english': 'from-accent to-accent-600',
                'english-2': 'from-premium to-premium-600'
            };

            availableSubjects.forEach((subject, index) => {
                const subjectCard = document.createElement('div');
                subjectCard.className = `material-card stagger-animation material-button w-full flex items-center space-x-4 p-4 sm:p-6 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-700 touch-target bg-white dark:bg-neutral-800 cursor-pointer`;
                
                const icon = subjectIcons[subject.id] || 'school';
                const color = subjectColors[subject.id] || 'from-primary to-primary-600';
                
                // Get subject progress for display
                const subjectProgress = analyticsData.subjectProgress[subject.id];
                const progressText = subjectProgress ? `Avg: ${Math.round(subjectProgress.averageScore)}% | ${subjectProgress.attempts} attempts` : 'Not started';
                
                subjectCard.innerHTML = `
                    <div class="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shadow-material-1">
                        <span class="material-icons text-white">${icon}</span>
                    </div>
                    <div class="flex-1">
                        <div class="button-text text-neutral-800 dark:text-white mb-1">${subject.name}</div>
                        <div class="caption text-neutral-500 dark:text-neutral-400">${progressText}</div>
                    </div>
                    <span class="material-icons text-neutral-400">arrow_forward_ios</span>
                `;
                
                subjectCard.style.animationDelay = `${(index + 1) * 0.1}s`;
                subjectCard.addEventListener('click', () => selectSubject(subject));
                subjectGrid.appendChild(subjectCard);
            });
        }
