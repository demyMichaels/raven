
```javascript
// Function to get progress bar color based on score
function getProgressBarColor(score) {
    // Check if the score is 80 or higher (Excellent performance)
    // This represents the highest achievement tier
    if (score >= 80) 
        // Return a green gradient for excellent scores
        // Linear gradient creates a smooth color transition from light to dark green
        // #10B981 is a vibrant emerald green, #059669 is a deeper forest green
        return 'linear-gradient(90deg, #10B981, #059669)'; // Green - Excellent

    // Check if the score is 60 or higher (but less than 80) - Good performance
    // This represents solid above-average performance
    if (score >= 60) 
        // Return a blue gradient for good scores
        // Blue conveys competence and reliability
        // #3B82F6 is a bright cobalt blue, #1D4ED8 is a deeper royal blue
        return 'linear-gradient(90deg, #3B82F6, #1D4ED8)'; // Blue - Good  

    // Check if the score is 40 or higher (but less than 60) - Average performance
    // This represents basic understanding but room for improvement
    if (score >= 40) 
        // Return an orange/yellow gradient for average scores
        // Yellow/Orange suggests caution and the need for improvement
        // #F59E0B is a warm amber, #D97706 is a deeper burnt orange
        return 'linear-gradient(90deg, #F59E0B, #D97706)'; // Yellow - Average

    // If all above conditions fail, score must be below 40 - Weak performance
    // This is the default case that catches all scores under 40
    // Return a red gradient for poor scores
    // Red immediately signals attention is needed and performance is below expectations
    // #EF4444 is a bright warning red, #DC2626 is a deeper crimson red
    return 'linear-gradient(90deg, #EF4444, #DC2626)'; // Red - Weak
}