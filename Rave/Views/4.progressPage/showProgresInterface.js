        function showProgressInterface() {
            hideAllViews();
            progressInterface.classList.remove('hidden');
            currentView = 'progress';
            renderProgress();
            closeMobileMenuFunc(); // Close mobile menu when navigating
        }
