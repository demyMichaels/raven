        function showQuizInterface() {
            hideAllViews();
            quizInterface.classList.remove('hidden');
            document.getElementById('quizResults').classList.add('hidden');
            document.querySelector('#quizInterface .material-card').classList.remove('hidden');
            
            // Show navigation buttons when starting quiz
            const navigationContainer = document.getElementById('quizNavigation');
            if (navigationContainer) {
                navigationContainer.classList.remove('hidden');
            }
            
            currentView = 'quiz';
            closeMobileMenuFunc(); // Close mobile menu when navigating
        }
