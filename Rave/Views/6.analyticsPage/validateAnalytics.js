        // Function to manually clear stored data (for debugging)

function validateAnalyticsData(data) {
            return data && 
                   typeof data === 'object' && 
                   Array.isArray(data.quizResults) &&
                   typeof data.topicProgress === 'object' &&
                   typeof data.subjectProgress === 'object';
        }
