        // Navigate to next question or finish quiz
        function nextQuestion() {
            if (currentQuestionIndex < currentQuestions.length - 1) {
                currentQuestionIndex++;
                renderQuestion();
            } else {
                finishQuiz();
            }
        }
