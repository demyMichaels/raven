        function showTutorInterface() {
            hideAllViews();
            tutorInterface.classList.remove('hidden');
            currentView = 'tutor';
            closeMobileMenuFunc(); // Close mobile menu when navigating
        }
