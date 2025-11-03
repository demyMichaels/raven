        function openMobileMenuFunc() {
            mobileMenuOverlay.classList.add('open');
            mobileMenu.classList.add('open');
            mobileMenuIcon.textContent = 'close';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }