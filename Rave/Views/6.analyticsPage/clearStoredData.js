        // Function to manually clear stored data (for debugging)
        function clearStoredData() {
            try {
                if (localStorage) localStorage.removeItem('ravenAnalytics');
                if (sessionStorage) sessionStorage.removeItem('ravenAnalytics');
                document.cookie = 'ravenAnalytics=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                window.ravenAnalyticsBackup = undefined;
                console.log('🗑️ All stored data cleared');
            } catch (error) {
                console.error('Failed to clear data:', error);
            }
        }
