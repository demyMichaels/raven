// Analytics Storage Functions - Using localStorage as primary method
       function saveAnalyticsData() {
            try {
                const dataToSave = JSON.stringify(analyticsData);
                let savedSuccessfully = false;
                
                // Method 1: Try localStorage first (preferred)
                try {
                    if (typeof(Storage) !== "undefined" && localStorage) {
                        localStorage.setItem('ravenAnalytics', dataToSave);
                        console.log('✅ Data saved to localStorage');
                        savedSuccessfully = true;
                    }
                } catch (localStorageError) {
                    console.warn('⚠️ localStorage not available:', localStorageError.message);
                }
                
                // Method 2: Try sessionStorage as fallback
                if (!savedSuccessfully) {
                    try {
                        if (typeof(Storage) !== "undefined" && sessionStorage) {
                            sessionStorage.setItem('ravenAnalytics', dataToSave);
                            console.log('📋 Data saved to sessionStorage (fallback)');
                            savedSuccessfully = true;
                        }
                    } catch (sessionStorageError) {
                        console.warn('⚠️ sessionStorage not available:', sessionStorageError.message);
                    }
                }
                
                // Method 3: Cookie fallback
                if (!savedSuccessfully) {
                    try {
                        document.cookie = `ravenAnalytics=${encodeURIComponent(dataToSave)}; path=/; max-age=31536000; SameSite=Lax`;
                        console.log('🍪 Data saved to cookies (fallback)');
                        savedSuccessfully = true;
                    } catch (cookieError) {
                        console.warn('⚠️ Cookie storage failed:', cookieError.message);
                    }
                }
                
                // Method 4: Window object as last resort
                window.ravenAnalyticsBackup = analyticsData;
                
                if (savedSuccessfully) {
                    console.log('📊 Current quiz count:', analyticsData.quizResults.length);
                    console.log('📈 Topics tracked:', Object.keys(analyticsData.topicProgress).length);
                    
                    // Test localStorage availability explicitly
                    testLocalStorageAvailability();
                }
                
                return savedSuccessfully;
            } catch (error) {
                console.error('❌ Failed to save analytics data:', error);
                return false;
            }
        }
