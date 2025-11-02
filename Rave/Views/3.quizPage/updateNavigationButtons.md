

        // Update navigation button states
        function updateNavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const explainBtn = document.getElementById('explainBtn');

            prevBtn.disabled = currentQuestionIndex === 0;
            nextBtn.disabled = userAnswers[currentQuestionIndex] === undefined;
            explainBtn.disabled = userAnswers[currentQuestionIndex] === undefined;

            if (currentQuestionIndex === currentQuestions.length - 1) {
                nextBtn.textContent = 'Finish Quiz';
            } else {
                nextBtn.textContent = 'Next';
            }
        }
