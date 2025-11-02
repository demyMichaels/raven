        // Analytics data
        let analyticsData = {

            quizResults: [],
            
            topicProgress: {},
            
            subjectProgress: {},
            
            timeSpent: {}
        };





Here are the strategic reasons for each analytics data structure and their specific defaults:

## **📊 Analytics Data Structure Design**

### **`quizResults: []`**
**Why empty array:**
- **First-user optimization**: New users have no quiz history to display
- **Progressive data accumulation**: Naturally grows as user completes quizzes
- **Chronological integrity**: Array order preserves timeline of learning progress
- **Statistical safety**: Empty array prevents division by zero in average calculations
- **Memory efficiency**: No placeholder data consuming storage space
- **Iteration readiness**: Arrays are perfect for mapping to progress charts and history views

**Expected structure when populated:**
```javascript
quizResults: [
    {
        subjectId: 'mathematics',
        topicName: 'algebra',
        score: 85,
        totalQuestions: 10,
        correctAnswers: 8,
        timeSpent: 420, // seconds
        date: '2024-01-15T10:30:00Z',
        answers: [{questionId: 1, correct: true, userAnswer: 'A'}, ...]
    }
]
```

### **`topicProgress: {}`**
**Why empty object:**
- **Dynamic key generation**: Topics are discovered as users explore, no pre-configuration needed
- **O(1) lookup efficiency**: Object key access provides instant topic progress retrieval
- **Memory optimization**: Only stores data for topics user actually interacts with
- **Flexible schema**: Accommodates any subject/topic structure without schema changes
- **Natural grouping**: Perfect for organizing progress by `subjectId_topicName` keys

**Expected structure when populated:**
```javascript
topicProgress: {
    'mathematics_algebra': {
        attempts: 5,
        bestScore: 95,
        averageScore: 82,
        totalTime: 2100, // seconds
        lastAttempt: '2024-01-15T10:30:00Z',
        improvementTrend: 'increasing'
    },
    'physics_mechanics': {
        attempts: 3,
        bestScore: 88,
        averageScore: 76,
        totalTime: 1800,
        lastAttempt: '2024-01-14T15:20:00Z',
        improvementTrend: 'stable'
    }
}
```

### **`subjectProgress: {}`**
**Why empty object:**
- **Derived data principle**: Calculated from topic progress, not stored redundantly
- **Cache optimization**: Compute on-demand rather than pre-computing all subjects
- **Storage minimalism**: Avoids duplicating data already available in topic progress
- **Real-time accuracy**: Always reflects current topic progress when calculated
- **Scalability**: Works with unlimited subjects without configuration overhead

**Expected structure when calculated:**
```javascript
subjectProgress: {
    'mathematics': {
        totalTopics: 15,
        completedTopics: 8,
        averageScore: 78,
        totalTime: 15600,
        masteryLevel: 'intermediate'
    }
}
```

### **`timeSpent: {}`**
**Why empty object:**
- **Accumulative design philosophy**: Only tracks time for actual study sessions
- **Storage efficiency**: No zero-time entries for untouched subjects/topics
- **Engagement focus**: Records meaningful learning time, not idle browsing
- **Analytical clarity**: Empty object clearly distinguishes new vs returning users
- **Flexible time tracking**: Can track at subject, topic, or session granularity

**Expected structure when populated:**
```javascript
timeSpent: {
    'mathematics': 15600, // seconds
    'mathematics_algebra': 2100,
    'physics': 8400,
    'total': 24000,
    'sessions': [
        {date: '2024-01-15', duration: 1800, subject: 'mathematics'},
        {date: '2024-01-14', duration: 2700, subject: 'physics'}
    ]
}
```

## **🎯 Strategic Design Decisions**

### **Separation of Concerns**
- **`quizResults`**: Raw session data for detailed analysis and review
- **`topicProgress`**: Aggregated metrics for performance tracking
- **`subjectProgress`**: High-level overview for progress visualization
- **`timeSpent`**: Engagement metrics for habit formation analysis

### **Performance Optimization**
- **Lazy computation**: `subjectProgress` calculated from `topicProgress` avoids duplication
- **Efficient storage**: Objects for key-based access, arrays for sequential data
- **Minimal memory footprint**: Empty defaults until user actually generates data

### **Analytical Capabilities**
- **Trend analysis**: `quizResults` array enables time-series progress tracking
- **Comparative metrics**: `topicProgress` allows strength/weakness identification
- **Engagement insights**: `timeSpent` supports study habit optimization
- **Mastery tracking**: Combined data enables personalized learning paths

### **User Experience Benefits**
- **Progressive profiling**: Analytics grow naturally with user learning journey
- **Personalized feedback**: Rich data enables tailored recommendations
- **Motivational tracking**: Clear progress visualization encourages continued learning
- **Adaptive learning**: Data-driven insights can power smart content recommendations

### **Developer Experience**
- **Clear data flow**: Obvious relationships between different data structures
- **Easy serialization**: Simple objects/arrays serialize cleanly to JSON for storage
- **Flexible queries**: Multiple access patterns supported (by subject, by topic, by time)
- **Maintainable structure**: Self-documenting organization makes code intuitive

These analytics structures are designed to be both minimal initially and infinitely scalable as users progress through their learning journey, providing comprehensive insights while maintaining performance and simplicity.