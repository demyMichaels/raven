        function loadAnalyticsData() {
            try {
                console.log('🔄 Loading analytics data...');
                let loadedData = null;
                
                // Method 1: Try localStorage first
                try {
                    if (typeof(Storage) !== "undefined" && localStorage) {
                        const data = localStorage.getItem('ravenAnalytics');
                        if (data) {
                            loadedData = JSON.parse(data);
                            console.log('✅ Data loaded from localStorage');
                        }
                    }
                } catch (localStorageError) {
                    console.warn('⚠️ Failed to load from localStorage:', localStorageError.message);
                }
                
                // Method 2: Try sessionStorage if localStorage failed
                if (!loadedData) {
                    try {
                        if (typeof(Storage) !== "undefined" && sessionStorage) {
                            const data = sessionStorage.getItem('ravenAnalytics');
                            if (data) {
                                loadedData = JSON.parse(data);
                                console.log('📋 Data loaded from sessionStorage');
                            }
                        }
                    } catch (sessionStorageError) {
                        console.warn('⚠️ Failed to load from sessionStorage:', sessionStorageError.message);
                    }
                }
                
                // Method 3: Try cookies if storage APIs failed
                if (!loadedData) {
                    loadedData = tryLoadFromCookie('ravenAnalytics');
                    if (loadedData) {
                        console.log('🍪 Data loaded from cookies');
                    }
                }
                
                // Method 4: Try window backup
                if (!loadedData && window.ravenAnalyticsBackup) {
                    loadedData = window.ravenAnalyticsBackup;
                    console.log('💾 Data loaded from window backup');
                }
                
                if (loadedData && validateAnalyticsData(loadedData)) {
                    analyticsData = loadedData;
                    console.log('📊 Loaded quiz count:', analyticsData.quizResults.length);
                    console.log('📈 Loaded topics:', Object.keys(analyticsData.topicProgress).length);
                    return true;
                }
                
                throw new Error('No valid data found');
                
            } catch (error) {
                console.log('⚠️ Initializing with empty analytics data:', error.message);
                analyticsData = {
                    quizResults: [],
                    topicProgress: {},
                    subjectProgress: {},
                    timeSpent: {}
                };
                return false;
            }
        }
