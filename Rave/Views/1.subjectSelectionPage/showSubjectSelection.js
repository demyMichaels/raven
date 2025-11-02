        // Navigation functions
        function showSubjectSelection() {
            hideAllViews();
            subjectSelection.classList.remove('hidden');
            currentView = 'subjects';
            closeMobileMenuFunc(); // Close mobile menu when navigating
        }