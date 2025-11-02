        // App State
        let currentView = 'subjects';

        let subjects = {};
        
        let currentSubject = null;

        let currentTopic = null;
        
        let currentQuestions = [];
        
        let currentQuestionIndex = 0;
        
        let userAnswers = [];
        
        let quizStartTime = null;






        Here are several improvements for more granular analytics:

## **🎯 Enhanced Analytics Structure**

```javascript
let analyticsData = {
    // Session-level analytics
    quizSessions: [],
    
    // Granular topic mastery
    topicMastery: {},
    
    // Subject-level aggregates
    subjectAnalytics: {},
    
    // Time and engagement metrics
    engagementMetrics: {},
    
    // Learning behavior patterns
    learningPatterns: {},
    
    // Performance analytics
    performanceAnalytics: {}
};
```

## **📊 Detailed Implementation**

### **1. Session-Level Granularity**
```javascript
quizSessions: [
    {
        sessionId: 'session_123456',
        subjectId: 'mathematics',
        topicName: 'algebra',
        startTime: '2024-01-15T10:30:00Z',
        endTime: '2024-01-15T10:45:00Z',
        duration: 900, // seconds
        totalQuestions: 10,
        questions: [
            {
                questionId: 'alg_001',
                type: 'multiple_choice',
                difficulty: 'medium',
                timeSpent: 45, // seconds
                userAnswer: 'B',
                correctAnswer: 'B',
                isCorrect: true,
                confidence: 'high', // based on time spent vs average
                topicTags: ['equations', 'variables']
            }
        ],
        score: 85,
        correctAnswers: 8,
        incorrectAnswers: 2,
        accuracyByDifficulty: {
            easy: 1.0,   // 1/1 correct
            medium: 0.8, // 4/5 correct  
            hard: 0.75   // 3/4 correct
        },
        timePerQuestion: 45, // seconds average
        pace: 'steady', // fast, steady, slow
        device: 'desktop',
        browser: 'chrome'
    }
]
```

### **2. Topic Mastery Deep Dive**
```javascript
topicMastery: {
    'mathematics_algebra': {
        // Performance metrics
        overallScore: 82,
        bestScore: 95,
        worstScore: 65,
        scoreTrend: 'improving', // improving, declining, stable
        
        // Attempt analytics
        totalAttempts: 8,
        completedAttempts: 7,
        abandonedAttempts: 1,
        averageAttemptDuration: 720, // seconds
        
        // Question-level analytics
        questionPerformance: {
            'alg_001': {
                attempts: 3,
                correct: 2,
                averageTime: 30,
                mastery: 'proficient' // struggling, learning, proficient, mastered
            }
        },
        
        // Sub-topic proficiency
        subTopicProficiency: {
            'linear_equations': 0.85,
            'quadratic_equations': 0.72,
            'inequalities': 0.68,
            'polynomials': 0.91
        },
        
        // Learning curve
        learningCurve: [
            { attempt: 1, score: 65, date: '2024-01-10' },
            { attempt: 2, score: 72, date: '2024-01-12' },
            { attempt: 3, score: 85, date: '2024-01-14' }
        ],
        
        // Time-based metrics
        timeDistribution: {
            morning: 1800,  // seconds studied in morning
            afternoon: 2400,
            evening: 1500,
            weekend: 3200
        }
    }
}
```

### **3. Comprehensive Subject Analytics**
```javascript
subjectAnalytics: {
    'mathematics': {
        // Overall progress
        completion: 0.65, // 65% of topics attempted
        estimatedMastery: 0.72,
        
        // Topic distribution
        topicBreakdown: {
            mastered: ['algebra_basics', 'geometry_shapes'],
            proficient: ['calculus_derivatives', 'statistics_basics'],
            learning: ['trigonometry', 'probability'],
            notAttempted: ['advanced_calculus', 'number_theory']
        },
        
        // Performance by topic category
        performanceByCategory: {
            'algebra': { averageScore: 82, timeSpent: 5400 },
            'geometry': { averageScore: 78, timeSpent: 4200 },
            'calculus': { averageScore: 65, timeSpent: 6800 }
        },
        
        // Study patterns
        preferredStudyTimes: ['weekday_evening', 'saturday_morning'],
        averageSessionLength: 25, // minutes
        retentionRate: 0.88, // score maintenance over time
        
        // Progress trajectory
        weeklyProgress: [
            { week: '2024-W01', score: 68, time: 180 },
            { week: '2024-W02', score: 72, time: 210 },
            { week: '2024-W03', score: 79, time: 195 }
        ]
    }
}
```

### **4. Engagement & Behavior Analytics**
```javascript
engagementMetrics: {
    // Usage patterns
    dailyActivity: {
        '2024-01-15': { sessions: 3, totalTime: 2700, subjects: ['math', 'physics'] },
        '2024-01-14': { sessions: 2, totalTime: 1800, subjects: ['math'] }
    },
    
    // Session patterns
    sessionPatterns: {
        averageSessionsPerDay: 2.3,
        preferredSessionLength: '15-30min',
        mostActiveDays: ['Monday', 'Wednesday', 'Saturday'],
        studyStreak: 7, // consecutive days
        longestStreak: 14
    },
    
    // Learning preferences
    learningPreferences: {
        preferredQuestionTypes: ['multiple_choice', 'interactive'],
        preferredDifficulty: 'adaptive', // or 'challenging', 'comfortable'
        studyIntensity: 'moderate', // light, moderate, intensive
        reviewFrequency: 'weekly' // daily, weekly, monthly
    },
    
    // Engagement scores
    engagementScore: 78, // 0-100 scale
    consistencyScore: 85,
    improvementMomentum: 'positive'
}
```

### **5. Learning Pattern Recognition**
```javascript
learningPatterns: {
    // Knowledge gaps
    identifiedGaps: [
        {
            topic: 'algebra_factoring',
            confidence: 'high',
            evidence: [
                'low_scores_on_factoring_questions',
                'high_time_spent_on_factoring_problems',
                'multiple_attempts_needed'
            ],
            recommendedActions: [
                'review_basic_factoring_rules',
                'practice_with_guided_examples',
                'watch_video_tutorials'
            ]
        }
    ],
    
    // Learning efficiency
    efficiencyMetrics: {
        questionsPerMinute: 1.2,
        accuracyVsSpeed: 'balanced', // accurate_but_slow, fast_but_inaccurate, balanced
        optimalPace: 45, // seconds per question for best accuracy
        fatigueThreshold: 25 // minutes before performance drops
    },
    
    // Study effectiveness
    studyEffectiveness: {
        spacedRepetitionEffectiveness: 0.82,
        practiceTestEffectiveness: 0.91,
        videoLearningEffectiveness: 0.76,
        readingEffectiveness: 0.68
    },
    
    // Behavioral insights
    behavioralInsights: {
        learnsBest: 'with_examples', // with_examples, through_practice, from_explanations
        retentionStyle: 'visual', // visual, auditory, kinesthetic
        challengePreference: 'gradual_increase', // immediate_challenge, gradual_increase
        feedbackResponse: 'positive' // thrives_on_positive, learns_from_mistakes
    }
}
```

### **6. Performance Analytics**
```javascript
performanceAnalytics: {
    // Comparative analytics
    percentileRanking: {
        subject: 75, // top 25%
        topic: 82,   // top 18%
        overall: 68  // top 32%
    },
    
    // Growth metrics
    improvementRate: {
        weekly: 2.3, // percentage points per week
        monthly: 8.7,
        overall: 15.2 // since starting
    },
    
    // Skill development
    skillDevelopment: {
        problemSolving: 72,
        conceptualUnderstanding: 85,
        application: 68,
        analysis: 79,
        speed: 65
    },
    
    // Predictive analytics
    predictions: {
        expectedMasteryDate: '2024-03-15',
        recommendedNextTopics: ['advanced_algebra', 'calculus_basics'],
        potentialScoreRange: [75, 90]
    }
}
```

## **🚀 Benefits of Granular Analytics**

### **For Users:**
- **Personalized learning paths** based on actual performance patterns
- **Early gap detection** before they become major obstacles
- **Motivational insights** showing clear progress and growth
- **Study optimization** based on most effective learning methods

### **For Educators:**
- **Detailed student understanding** beyond simple scores
- **Curriculum optimization** based on collective learning patterns
- **Early intervention** for struggling students
- **Personalized feedback** with specific improvement suggestions

### **For Developers:**
- **Rich data for AI/ML** training for adaptive learning systems
- **A/B testing capabilities** for different learning approaches
- **Feature validation** through detailed usage analytics
- **Performance optimization** based on actual user behavior

This granular approach transforms simple progress tracking into a comprehensive learning intelligence system that can genuinely accelerate learning outcomes through data-driven insights.