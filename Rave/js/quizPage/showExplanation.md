        // Show explanation for current question
        function showExplanation() {
            const question = currentQuestions[currentQuestionIndex];
            const explanationBox = document.getElementById('explanationBox');
            const explanationText = document.getElementById('explanationText');

            if (question.explanation) {
                explanationText.textContent = question.explanation;
                explanationBox.classList.remove('hidden');

                // Show correct/incorrect for all options
                const options = document.querySelectorAll('.option-btn');
                const correctIndex = question.answer.charCodeAt(0) - 97; // Convert 'a', 'b', 'c' to 0, 1, 2
                const userIndex = userAnswers[currentQuestionIndex];

                options.forEach((option, index) => {
                    option.classList.remove('selected');
                    if (index === correctIndex) {
                        option.classList.add('correct');
                    } else if (index === userIndex && index !== correctIndex) {
                        option.classList.add('incorrect');
                    }
                });
            }
        }
