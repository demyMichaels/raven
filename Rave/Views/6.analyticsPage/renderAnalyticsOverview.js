        function renderAnalyticsOverview() {
            if (analyticsData.quizResults.length === 0) {
                document.getElementById('analyticsOverallScore').textContent = '--';
                document.getElementById('analyticsProgressText').textContent = '--';
                document.getElementById('analyticsMasteredCount').textContent = '--/--';
                document.getElementById('analyticsWeakCount').textContent = '--';
                document.getElementById('analyticsAvgTime').textContent = '--min';
                return;
            }

            // Calculate overall statistics
            const totalQuizzes = analyticsData.quizResults.length;
            const averageScore = analyticsData.quizResults.reduce((sum, result) => sum + result.score, 0) / totalQuizzes;
            const averageTime = analyticsData.quizResults.reduce((sum, result) => sum + result.timeSpent, 0) / totalQuizzes / 60000; // Convert to minutes

            // Count mastered topics (>= 80% best score)
            const topicProgressEntries = Object.values(analyticsData.topicProgress);
            const masteredTopics = topicProgressEntries.filter(progress => progress.bestScore >= 80).length;
            const totalTopics = topicProgressEntries.length;

            // Count weak areas (< 60% average score)
            const weakTopics = topicProgressEntries.filter(progress => progress.averageScore < 60 && progress.attempts > 0).length;

            // Update UI
            document.getElementById('analyticsOverallScore').textContent = `${Math.round(averageScore)}%`;
            document.getElementById('analyticsProgressText').textContent = `${Math.round(averageScore)}%`;
            document.getElementById('analyticsMasteredCount').textContent = `${masteredTopics}/${totalTopics}`;
            document.getElementById('analyticsWeakCount').textContent = weakTopics;
            document.getElementById('analyticsAvgTime').textContent = `${averageTime.toFixed(1)}min`;

            // Update progress circle
            const progressCircle = document.getElementById('analyticsProgressCircle');
            const circumference = 2 * Math.PI * 40;
            const offset = circumference - (averageScore / 100) * circumference;
            progressCircle.style.strokeDashoffset = offset;
        }
