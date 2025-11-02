        function testLocalStorageAvailability() {
            try {
                if (typeof(Storage) !== "undefined") {
                    // Test if localStorage is actually working
                    const testKey = 'ravenTest_' + Date.now();
                    localStorage.setItem(testKey, 'test');
                    const retrieved = localStorage.getItem(testKey);
                    localStorage.removeItem(testKey);
                    
                    if (retrieved === 'test') {
                        console.log('✅ localStorage is working properly');
                        return true;
                    } else {
                        console.warn('⚠️ localStorage test failed - data not retrieved correctly');
                        return false;
                    }
                } else {
                    console.warn('⚠️ Web Storage not supported');
                    return false;
                }
            } catch (error) {
                console.warn('⚠️ localStorage test error:', error.message);
                return false;
            }
        }
