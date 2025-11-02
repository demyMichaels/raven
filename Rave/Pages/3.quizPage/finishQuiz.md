        // Finish quiz and show results
        function finishQuiz() {
            const score = calculateScore();
            saveQuizResult(score);
            showQuizResults(score);
        }
