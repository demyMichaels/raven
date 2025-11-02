
        function showAnalyticsInterface() {
            hideAllViews();
            analyticsInterface.classList.remove('hidden');
            currentView = 'analytics';
            renderAnalytics();
            closeMobileMenuFunc(); // Close mobile menu when navigating
        }
