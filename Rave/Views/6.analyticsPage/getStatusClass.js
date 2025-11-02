        function getStatusClass(score, attempts) {
            if (attempts === 0) return 'status-unstarted';
            if (score >= 80) return 'status-excellent';
            if (score >= 60) return 'status-good';
            if (score >= 40) return 'status-average';
            return 'status-weak';
        }
