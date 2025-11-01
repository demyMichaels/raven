        // Render topics for selected subject
        function renderTopics(topics) {
            const topicGrid = document.getElementById('topicGrid');
            const selectedSubjectTitle = document.getElementById('selectedSubjectTitle');
            
            selectedSubjectTitle.textContent = currentSubject.name;
            topicGrid.innerHTML = '';


            // Group topics by category
            const categories = {};
            Object.entries(topics).forEach(([topicId, topic]) => {
                if (!categories[topic.category]) {
                    categories[topic.category] = [];
                }
                categories[topic.category].push({ id: topicId, ...topic });
            });

            
            // Render each category
            Object.entries(categories).forEach(([category, categoryTopics]) => {
                const categoryDiv = document.createElement('div');
                categoryDiv.className = 'col-span-full mb-6';
                categoryDiv.innerHTML = `<h3 class="text-xl font-semibold mb-3 text-primary dark:text-white">${category}</h3>`;
                topicGrid.appendChild(categoryDiv);

                categoryTopics.forEach((topic, index) => {
                    const topicCard = document.createElement('div');
                    const questionCount = topic.questions ? topic.questions.length : 0;
                    const progressData = getTopicProgress(currentSubject.id, topic.name);
                    
                    topicCard.className = `material-card stagger-animation material-button w-full flex items-center space-x-4 p-4 sm:p-6 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-700 touch-target bg-white dark:bg-neutral-800 ${questionCount > 0 ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`;
                    
                    // Get appropriate icon for topic
                    const topicIcon = getTopicIcon(topic.name, topic.category);
                    
                    topicCard.innerHTML = `
                        <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent to-accent-600 rounded-lg flex items-center justify-center shadow-material-1">
                            <span class="material-icons text-white text-sm sm:text-base">${topicIcon}</span>
                        </div>
                        <div class="flex-1">
                            <div class="button-text text-neutral-800 dark:text-white mb-1">${topic.name}</div>
                            <div class="caption text-neutral-500 dark:text-neutral-400">${questionCount} questions available</div>
                            ${progressData.attempts > 0 ? 
                                `<div class="mt-2">
                                    <div class="caption text-neutral-400">Best: ${Math.round(progressData.bestScore)}% | Avg: ${Math.round(progressData.averageScore)}% | ${progressData.attempts} attempts</div>
                                    <div class="progress-bar mt-1 h-1">
                                        <div class="h-full rounded transition-all duration-300" style="width: ${progressData.averageScore}%; background: ${getProgressBarColor(progressData.averageScore)}"></div>
                                    </div>
                                </div>` : ''
                            }
                        </div>
                        <span class="material-icons text-neutral-400 ${questionCount === 0 ? 'opacity-50' : ''}">arrow_forward_ios</span>
                    `;
                    
                    topicCard.style.animationDelay = `${(index + 1) * 0.1}s`;
                    
                    if (questionCount > 0) {
                        topicCard.addEventListener('click', () => startQuiz(topic));
                        topicCard.title = `Start ${topic.name} quiz`;
                    } else {
                        topicCard.title = 'No questions available for this topic';
                    }
                    
                    topicGrid.appendChild(topicCard);
                });
            });
        }
