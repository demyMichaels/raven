        // Calculate quiz score
        function calculateScore() {
            let correct = 0;
            currentQuestions.forEach((question, index) => {
                const correctIndex = question.answer.charCodeAt(0) - 97;
                if (userAnswers[index] === correctIndex) {
                    correct++;
                }
            });
            return {
                correct,
                total: currentQuestions.length,
                percentage: (correct / currentQuestions.length) * 100,
                timeSpent: Date.now() - quizStartTime
            };
        }
