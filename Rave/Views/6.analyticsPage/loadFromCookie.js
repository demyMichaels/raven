        function tryLoadFromCookie(cookieName) {
            try {
                const cookies = document.cookie.split(';').map(cookie => cookie.trim());
                const targetCookie = cookies.find(cookie => cookie.startsWith(cookieName + '='));
                
                if (targetCookie) {
                    const encodedData = targetCookie.split('=')[1];
                    const decodedData = decodeURIComponent(encodedData);
                    return JSON.parse(decodedData);
                }
                return null;
            } catch (error) {
                console.warn(`Failed to load from ${cookieName}:`, error);
                return null;
            }
        }
