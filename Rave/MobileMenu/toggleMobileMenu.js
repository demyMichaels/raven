        // Mobile menu functionality
        function toggleMobileMenu() {
            const isOpen = mobileMenuOverlay.classList.contains('open');
            
            if (isOpen) {
                closeMobileMenuFunc();
            } else {
                openMobileMenuFunc();
            }
        }