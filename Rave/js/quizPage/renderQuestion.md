
        ```javascript

        // Render current question with fixed option formatting

        function renderQuestion() {
            const question = currentQuestions[currentQuestionIndex];
            if (!question) return;

            document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;

            document.getElementById('totalQuestions').textContent = currentQuestions.length;

            document.getElementById('questionMeta').textContent = `${currentTopic.name} - ${currentTopic.category}`;

            document.getElementById('questionText').textContent = question.question;

            // Update progress bar
            const progress = ((currentQuestionIndex) / currentQuestions.length) * 100;
            document.getElementById('progressFill').style.width = `${progress}%`;

            // Render options with proper formatting
            const optionsContainer = document.getElementById('questionOptions');
            optionsContainer.innerHTML = '';

            question.options.forEach((option, index) => {
                const optionBtn = document.createElement('div');
                optionBtn.className = '
                option-btn material-button p-4 rounded-lg border-2 border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white cursor-pointer touch-target';
                optionBtn.innerHTML = `
                    <div class="flex items-center space-x-3">
                        <span class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-medium text-sm">${String.fromCharCode(65 + index)}</span>
                        <span class="body-1 flex-1">${option}</span>
                    </div>
                `;
                
                const isSelected = userAnswers[currentQuestionIndex] === index;
                if (isSelected) {
                    optionBtn.classList.add('selected');
                }

                optionBtn.addEventListener('click', () => selectOption(index));
                optionsContainer.appendChild(optionBtn);
            });

            // Update button states
            updateNavigationButtons();
            
            // Hide explanation
            document.getElementById('explanationBox').classList.add('hidden');
        }
