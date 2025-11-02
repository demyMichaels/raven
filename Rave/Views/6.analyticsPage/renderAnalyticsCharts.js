        function renderAnalyticsCharts() {
            if (analyticsData.quizResults.length === 0) return;

            // Trend Chart
            const trendCtx = document.getElementById('analyticsTrendChart').getContext('2d');
            const recentResults = analyticsData.quizResults.slice(-10);
            const trendLabels = recentResults.map((_, index) => `Quiz ${index + 1}`);
            const trendData = recentResults.map(result => result.score);

            new Chart(trendCtx, {
                type: 'line',
                data: {
                    labels: trendLabels,
                    datasets: [{
                        label: 'Score (%)',
                        data: trendData,
                        borderColor: '#009F9D',
                        backgroundColor: 'rgba(0, 159, 157, 0.1)',
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: '#009F9D',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 5
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        }
                    }
                }
            });

            // Subject Performance Chart
            const subjectCtx = document.getElementById('analyticsSubjectChart').getContext('2d');
            const subjectScores = {};
            
            analyticsData.quizResults.forEach(result => {
                if (!subjectScores[result.subjectName]) {
                    subjectScores[result.subjectName] = { total: 0, count: 0 };
                }
                subjectScores[result.subjectName].total += result.score;
                subjectScores[result.subjectName].count++;
            });

            const subjectLabels = Object.keys(subjectScores);
            const subjectData = subjectLabels.map(subject => 
                Math.round(subjectScores[subject].total / subjectScores[subject].count)
            );

            new Chart(subjectCtx, {
                type: 'doughnut',
                data: {
                    labels: subjectLabels,
                    datasets: [{
                        data: subjectData,
                        backgroundColor: [
                            '#EF4444', // Red
                            '#3B82F6', // Blue
                            '#F59E0B', // Yellow
                            '#10B981', // Green
                            '#2D3748'
                        ],
                        borderWidth: 2,
                        borderColor: '#ffffff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.label + ': ' + context.parsed + '%';
                                }
                            }
                        }
                    }
                }
            });
        }
