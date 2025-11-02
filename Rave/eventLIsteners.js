
        // Setup event listeners
        function setupEventListeners() {
            // Desktop navigation buttons
            document.getElementById('practiceBtn').addEventListener('click', showSubjectSelection);
            document.getElementById('tutorBtn').addEventListener('click', showTutorInterface);
            document.getElementById('progressBtn').addEventListener('click', showProgressInterface);
            document.getElementById('analyticsBtn').addEventListener('click', showAnalyticsInterface);

            // Mobile navigation buttons
            document.getElementById('mobilePracticeBtn').addEventListener('click', showSubjectSelection);
            document.getElementById('mobileTutorBtn').addEventListener('click', showTutorInterface);
            document.getElementById('mobileProgressBtn').addEventListener('click', showProgressInterface);
            document.getElementById('mobileAnalyticsBtn').addEventListener('click', showAnalyticsInterface);

            // Mobile menu functionality
            mobileMenuBtn.addEventListener('click', toggleMobileMenu);
            closeMobileMenu.addEventListener('click', closeMobileMenuFunc);
            
            // Close mobile menu when clicking on overlay
            mobileMenuOverlay.addEventListener('click', (e) => {
                if (e.target === mobileMenuOverlay) {
                    closeMobileMenuFunc();
                }
            });

            // Back buttons
            document.getElementById('backToSubjects').addEventListener('click', showSubjectSelection);
            document.getElementById('backToTopics').addEventListener('click', showTopicSelection);
            document.getElementById('backToTopicsFromResults').addEventListener('click', showTopicSelection);

            // Quiz navigation
            document.getElementById('prevBtn').addEventListener('click', previousQuestion);
            document.getElementById('nextBtn').addEventListener('click', nextQuestion);
            document.getElementById('explainBtn').addEventListener('click', showExplanation);
            document.getElementById('retakeBtn').addEventListener('click', () => startQuiz(currentTopic));

            // Tutor interface
            document.getElementById('sendTutorBtn').addEventListener('click', sendTutorMessage);
            document.getElementById('tutorInput').addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendTutorMessage();
                }
            });

            // Close mobile menu on window resize if it becomes desktop size
            window.addEventListener('resize', () => {
                if (window.innerWidth >= 768) { // md breakpoint
                    closeMobileMenuFunc();
                }
            });

            // Prevent body scroll when mobile menu is open
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('open')) {
                    closeMobileMenuFunc();
                }
            });
        }
