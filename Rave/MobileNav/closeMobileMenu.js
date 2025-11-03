        function closeMobileMenuFunc() {
            mobileMenuOverlay.classList.remove('open');
            mobileMenu.classList.remove('open');
            mobileMenuIcon.textContent = 'menu';
            document.body.style.overflow = ''; // Restore scrolling
        }
