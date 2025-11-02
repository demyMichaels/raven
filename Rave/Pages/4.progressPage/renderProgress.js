        function renderProgress() {
            
            if (analyticsData.quizResults.length === 0) {
                document.getElementById('overallStats').innerHTML = '<p class="text-gray-600 dark:text-gray-400">No quiz data available yet. Complete some quizzes to see your progress!</p>';
                document.getElementById('subjectStats').innerHTML = '<p class="text-gray-600 dark:text-gray-400">Subject breakdown will appear here after completing quizzes.</p>';
                return;
            }

            // Basic progress stats
            const totalQuizzes = analyticsData.quizResults.length;
            const averageScore = Math.round(analyticsData.quizResults.reduce((sum, result) => sum + result.score, 0) / totalQuizzes);
            
            document.getElementById('overallStats').innerHTML = `
                <div class="space-y-2">

                    <div class="
                    flex 
                    justify-between">
                        <span>Total Quizzes:</span>
                        <span 
                        class="font-medium darK:text-white">${totalQuizzes}</span>
                    </div>

                    <div class="
                    flex 
                    justify-between">
                        <span>Average Score:</span>
                        <span class="font-medium darK:text-white">${averageScore}%</span>
                    </div>

                </div>
            `;

            // Subject breakdown
            const subjectBreakdown = {};
            analyticsData.quizResults.forEach(result => {
                if (!subjectBreakdown[result.subjectName]) {
                    subjectBreakdown[result.subjectName] = { total: 0, count: 0 };
                }
                subjectBreakdown[result.subjectName].total += result.score;
                subjectBreakdown[result.subjectName].count++;
            });

            const subjectStatsHTML = Object.entries(subjectBreakdown).map(([subject, data]) => {
                const avg = Math.round(data.total / data.count);
                return `
                    <div class="flex justify-between py-1">
                        <span>${subject}:</span>
                        <span class="font-medium">${avg}%</span>
                    </div>
                `;
            }).join('');

            document.getElementById('subjectStats').innerHTML = `<div class="space-y-2">${subjectStatsHTML}</div>`;
        }
