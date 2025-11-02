        function getTopicProgress(subjectId, topicName) {
            const topicKey = `${subjectId}_${topicName}`;
            return analyticsData.topicProgress[topicKey] || {
                bestScore: 0,
                attempts: 0,
                averageScore: 0,
                averageTime: 0
            };
        }