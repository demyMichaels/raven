        function showTopicSelection() {
            hideAllViews();
            topicSelection.classList.remove('hidden');
            currentView = 'topics';
            closeMobileMenuFunc(); // Close mobile menu when navigating
        }
