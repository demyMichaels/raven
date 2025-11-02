        // Function to get progress bar color based on score
        function getProgressBarColor(score) {
            if (score >= 80) return 'linear-gradient(90deg, #10B981, #059669)'; // Green - Excellent
            if (score >= 60) return 'linear-gradient(90deg, #3B82F6, #1D4ED8)'; // Blue - Good  
            if (score >= 40) return 'linear-gradient(90deg, #F59E0B, #D97706)'; // Yellow - Average
            return 'linear-gradient(90deg, #EF4444, #DC2626)'; // Red - Weak
        }
