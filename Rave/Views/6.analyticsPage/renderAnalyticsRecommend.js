        function renderAnalyticsRecommendations() {
            const container = document.getElementById('analyticsRecommendations');
            
            if (Object.keys(analyticsData.topicProgress).length === 0) {
                container.innerHTML = '<p class="col-span-full text-neutral-600 dark:text-neutral-400">Complete some quizzes to get personalized recommendations!</p>';
                return;
            }

            // Get weak areas (< 60% average score)
            const weakAreas = Object.entries(analyticsData.topicProgress)
                .filter(([_, progress]) => progress.averageScore < 60 && progress.attempts > 0)
                .sort((a, b) => a[1].averageScore - b[1].averageScore)
                .slice(0, 3);

            // Get areas for review (last attempted > 7 days ago) - simulate with random selection for demo
            const reviewAreas = Object.entries(analyticsData.topicProgress)
                .filter(([_, progress]) => progress.attempts > 0 && progress.averageScore >= 60)
                .slice(0, 3);

            // Get strong areas (>= 80% best score)
            const strongAreas = Object.entries(analyticsData.topicProgress)
                .filter(([_, progress]) => progress.bestScore >= 80)
                .sort((a, b) => b[1].bestScore - a[1].bestScore)
                .slice(0, 3);

            container.innerHTML = `
                <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <div class="flex items-center space-x-3 mb-3">
                        <span class="material-icons text-red-600 dark:text-red-400">warning</span>
                        <h3 class="font-semibold text-red-800 dark:text-red-300 text-sm sm:text-base">Priority Focus</h3>
                    </div>
                    <ul class="space-y-2">
                        ${weakAreas.length > 0 ? weakAreas.map(([key, progress]) => {
                            const topicName = key.split('_')[1];
                            return `<li class="text-xs sm:text-sm text-red-700 dark:text-red-300">• ${topicName} (${Math.round(progress.averageScore)}%)</li>`;
                        }).join('') : '<li class="text-xs sm:text-sm text-red-700 dark:text-red-300">No weak areas identified</li>'}
                    </ul>
                    <button class="material-button w-full mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm">
                        Start Practice
                    </button>
                </div>

                <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <div class="flex items-center space-x-3 mb-3">
                        <span class="material-icons text-yellow-600 dark:text-yellow-400">schedule</span>
                        <h3 class="font-semibold text-yellow-800 dark:text-yellow-300 text-sm sm:text-base">Due for Review</h3>
                    </div>
                    <ul class="space-y-2">
                        ${reviewAreas.length > 0 ? reviewAreas.map(([key, progress]) => {
                            const topicName = key.split('_')[1];
                            return `<li class="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300">• ${topicName} (${Math.round(progress.averageScore)}%)</li>`;
                        }).join('') : '<li class="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300">No topics due for review</li>'}
                    </ul>
                    <button class="material-button w-full mt-4 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 text-sm">
                        Review Now
                    </button>
                </div>

                <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <div class="flex items-center space-x-3 mb-3">
                        <span class="material-icons text-green-600 dark:text-green-400">emoji_events</span>
                        <h3 class="font-semibold text-green-800 dark:text-green-300 text-sm sm:text-base">Strong Areas</h3>
                    </div>
                    <ul class="space-y-2">
                        ${strongAreas.length > 0 ? strongAreas.map(([key, progress]) => {
                            const topicName = key.split('_')[1];
                            return `<li class="text-xs sm:text-sm text-green-700 dark:text-green-300">• ${topicName} (${Math.round(progress.bestScore)}%)</li>`;
                        }).join('') : '<li class="text-xs sm:text-sm text-green-700 dark:text-green-300">No strong areas yet</li>'}
                    </ul>
                    <button class="material-button w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm">
                        Advanced Practice
                    </button>
                </div>
            `;
        }
