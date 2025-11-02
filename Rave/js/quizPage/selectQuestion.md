        // Select an option
        function selectOption(optionIndex) {
            userAnswers[currentQuestionIndex] = optionIndex;
            
            // Update option styles
            const options = document.querySelectorAll('.option-btn');
            options.forEach((option, index) => {
                option.classList.remove('selected');
                if (index === optionIndex) {
                    option.classList.add('selected');
                }
            });

            updateNavigationButtons();
        }
