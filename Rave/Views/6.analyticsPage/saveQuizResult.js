        function saveQuizResult(score) {
            const result = {
                id: Date.now(),
                subject: currentSubject.id,
                subjectName: currentSubject.name,
                topic: currentTopic.name,
                score: score.percentage,
                correct: score.correct,
                total: score.total,
                timeSpent: score.timeSpent,
                date: new Date().toISOString(),
                questions: currentQuestions.length
            };

            analyticsData.quizResults.push(result);

            // Update topic progress - Fixed averaging calculation
            const topicKey = `${currentSubject.id}_${currentTopic.name}`;
            if (!analyticsData.topicProgress[topicKey]) {
                analyticsData.topicProgress[topicKey] = {
                    bestScore: 0,
                    attempts: 0,
                    averageScore: 0,
                    totalScore: 0,
                    averageTime: 0,
                    totalTime: 0
                };
            }

            const topicProgress = analyticsData.topicProgress[topicKey];
            topicProgress.attempts++;
            topicProgress.totalScore += score.percentage;
            topicProgress.averageScore = Math.round(topicProgress.totalScore / topicProgress.attempts * 100) / 100; // Fixed rounding
            topicProgress.bestScore = Math.max(topicProgress.bestScore, score.percentage);
            topicProgress.totalTime += score.timeSpent;
            topicProgress.averageTime = topicProgress.totalTime / topicProgress.attempts;

            // Update subject progress - Fixed averaging calculation
            if (!analyticsData.subjectProgress[currentSubject.id]) {
                analyticsData.subjectProgress[currentSubject.id] = {
                    bestScore: 0,
                    attempts: 0,
                    averageScore: 0,
                    totalScore: 0
                };
            }

            const subjectProgress = analyticsData.subjectProgress[currentSubject.id];
            subjectProgress.attempts++;
            subjectProgress.totalScore += score.percentage;
            subjectProgress.averageScore = Math.round(subjectProgress.totalScore / subjectProgress.attempts * 100) / 100; // Fixed rounding
            subjectProgress.bestScore = Math.max(subjectProgress.bestScore, score.percentage);

            // Save data with improved method
            const saveSuccess = saveAnalyticsData();
            if (saveSuccess) {
                console.log('✅ Quiz result saved and persisted');
            } else {
                console.warn('⚠️ Quiz result saved but persistence may have failed');
            }
            
            // Always refresh all views that might show progress data
            refreshAllProgressViews();

            // Debug logging
            console.log(`🎯 Quiz completed: ${score.percentage}%`);
            console.log(`📚 Topic progress for ${topicKey}:`, topicProgress);
        }
