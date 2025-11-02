        function renderAnalyticsHeatmap() {
            const container = document.getElementById('analyticsHeatmap');
            container.innerHTML = '';

            if (Object.keys(analyticsData.topicProgress).length === 0) {
                container.innerHTML = '<p class="text-neutral-600 dark:text-neutral-400">No quiz data available. Complete some quizzes to see your heatmap!</p>';
                return;
            }

            const heatmapGrid = document.createElement('div');
            heatmapGrid.className = 'heatmap-grid';

            Object.entries(analyticsData.topicProgress).forEach(([topicKey, progress]) => {
                const [subjectId, topicName] = topicKey.split('_');
                const subject = availableSubjects.find(s => s.id === subjectId);
                
                const cell = document.createElement('div');
                cell.className = `heatmap-cell ${getStatusClass(progress.bestScore, progress.attempts)} material-1`;
                
                cell.innerHTML = `
                    <div class="text-xs font-medium text-white mb-1 text-center leading-tight">${topicName}</div>
                    <div class="text-lg font-bold text-white">${progress.attempts > 0 ? Math.round(progress.bestScore) + '%' : 'Not Started'}</div>
                    <div class="text-xs text-white opacity-75">${progress.attempts} attempts</div>
                `;
                
                heatmapGrid.appendChild(cell);
            });

            container.appendChild(heatmapGrid);
        }
