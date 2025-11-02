        // Initialize the app
        async function init() {
            console.log('🚀 Initializing Raven Learning Platform...');
            
            loadAnalyticsData();
            
            renderSubjects();
            
            setupEventListeners();
            
            loadProgress();
            
            console.log('✅ App initialized successfully');
        }
