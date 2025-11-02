       
        // Function to refresh all views that show progress data
       
       function refreshAllProgressViews() {
            // Update analytics if currently viewing
            if (currentView === 'analytics') {
                renderAnalytics();
            }
            
            // Update progress if currently viewing
            if (currentView === 'progress') {
                renderProgress();
            }
            
            // Always refresh the subject selection to show updated progress
            renderSubjects();
            
            // If currently viewing topics, refresh those too
            if (currentView === 'topics' && currentSubject && subjects[currentSubject.id]) {
                renderTopics(subjects[currentSubject.id].topics);
            }
        }
