        // Show quiz results - Fixed to properly hide navigation

        function showQuizResults(score) {
            document.getElementById('finalScore').textContent = `${Math.round(score.percentage)}%`;
            
            document.getElementById('scoreDetails').textContent = `${score.correct} out of ${score.total} correct`;
            
            // Hide the main quiz elements
            document.getElementById('quizResults').classList.remove('hidden');
            document.querySelector('#quizInterface .material-card').classList.add('hidden');
            
            // Hide navigation buttons container
            const navigationContainer = document.getElementById('quizNavigation');
            if (navigationContainer) {
                navigationContainer.classList.add('hidden');
            }
        }
