```javascript

// Start quiz for selected topic
function startQuiz(topic) {
    // Check if the topic has no questions or an empty questions array
    // This prevents starting a quiz with no content
    if (!topic.questions || topic.questions.length === 0) {
        // Display an error message to the user indicating no questions are available
        showError('No questions available for this topic');
        // Exit the function early to prevent further execution
        return;
    }

    // Store the current topic in a global variable so other functions can access it
    // This preserves which topic the user selected throughout the quiz
    currentTopic = topic;
    
    // Create a copy of the topic's questions array using spread operator (...)
    // This prevents modifying the original questions array directly
    // The spread operator creates a new array with the same elements
    currentQuestions = [...topic.questions];
    
    // Reset the question index to 0 to start from the first question
    // This ensures the quiz always begins with question #1
    currentQuestionIndex = 0;
    
    // Initialize an empty array to store user's answers
    // This array will collect all answers as the user progresses through the quiz
    userAnswers = [];
    
    // Record the current timestamp when the quiz starts
    // Date.now() returns the number of milliseconds since January 1, 1970
    // This allows calculating total quiz duration later
    quizStartTime = Date.now();

    // Shuffle questions to randomize their order
    // This prevents users from memorizing question sequences
    // The shuffleArray function returns a new array with randomized order
    currentQuestions = shuffleArray(currentQuestions);

    // Render the first question to the screen
    // This function displays the current question and options to the user
    renderQuestion();
    
    // Switch the UI from topic selection to quiz interface
    // This typically hides topic cards and shows the question/answer interface
    showQuizInterface();
}