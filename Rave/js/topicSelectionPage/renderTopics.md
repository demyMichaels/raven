```javascript
        
        // Render topics for selected subject
        function renderTopics(topics) {
            // Get reference to the HTML element where topics will be displayed
            const topicGrid = document.getElementById('topicGrid');
            
            // Get reference to the element that shows the selected subject title
            const selectedSubjectTitle = document.getElementById('selectedSubjectTitle');
            
            // Update the subject title to show which subject user is viewing
            selectedSubjectTitle.textContent = currentSubject.name;
            
            // Clear any existing content in the topic grid to prepare for new content
            topicGrid.innerHTML = '';


            // Group topics by category to organize them visually
            // Create an empty object to store categories and their topics
            const categories = {};
            // Loop through each topic in the topics object
            // Object.entries converts object to array of [key, value] pairs
            Object.entries(topics).forEach(([topicId, topic]) => {
                // If this category doesn't exist in our categories object yet, create it
                if (!categories[topic.category]) {
                    // Initialize this category with an empty array
                    categories[topic.category] = [];
                }
                // Add the current topic to its category array
                // Spread operator (...) copies all properties from topic and adds the id
                categories[topic.category].push({ id: topicId, ...topic });
            });

            
            // Render each category as a separate section in the UI
            // Loop through each category in our grouped categories object
            Object.entries(categories).forEach(([category, categoryTopics]) => {
            
                // Create a new div element to contain this entire category
                const categoryDiv = document.createElement('div');
               
                // Apply CSS classes for full column width and bottom margin
                // col-span-full: spans all columns in grid
                // mb-6: margin bottom of 1.5rem (6 * 0.25rem)
                categoryDiv.className = 'col-span-full mb-6';
                
                // Set the inner HTML of the category div to include a category title
                // Uses template literal to dynamically insert the category name
                categoryDiv.innerHTML = `<h3 class="text-xl font-semibold mb-3 text-primary dark:text-white">${category}</h3>`;
                
                // Add the category div to the main topic grid container
                topicGrid.appendChild(categoryDiv);

                
                
                // Loop through each topic within this category
                // index parameter tracks the position for animation timing
                categoryTopics.forEach((topic, index) => {
                    
                    // Create a new div element for this individual topic card
                    const topicCard = document.createElement('div');
                    
                    // Calculate how many questions are available for this topic
                    // If topic.questions exists, get its length, otherwise 0
                    const questionCount = topic.questions ? topic.questions.length : 0;
                    
                    // Get user's progress data for this specific topic
                    // currentSubject.id and topic.name identify which topic to get progress for
                    const progressData = getTopicProgress(currentSubject.id, topic.name);
                    
                    // Set CSS classes for the topic card with dynamic conditions
                    topicCard.className = `
                    material-card 
                    stagger-animation 
                    material-button 
                    w-full 
                    flex 
                    items-center 
                    space-x-4 
                    p-4 
                    sm:p-6 
                    border 
                    border-neutral-300 
                    dark:border-neutral-600 
                    text-neutral-700 
                    dark:text-neutral-300 
                    rounded-xl 
                    hover:bg-neutral-50 
                    dark:hover:bg-neutral-700 
                    touch-target 
                    bg-white 
                    dark:bg-neutral-800 ${questionCount > 0 ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`;
                    // Classes breakdown:
                    // - material-card, material-button: Material Design styling
                    // - stagger-animation: Enables staggered entrance animations
                    // - w-full: Full width of container
                    // - flex items-center space-x-4: Flexbox layout with centered items and spacing
                    // - p-4 sm:p-6: Padding (4 on mobile, 6 on small screens and up)
                    // - border styles: Light/dark mode border colors
                    // - text colors: Light/dark mode text colors
                    // - rounded-xl: Extra large border radius
                    // - hover styles: Background color change on hover
                    // - touch-target: Mobile-friendly touch target size
                    // - bg colors: Background colors for light/dark mode
                    // - Conditional: cursor-pointer if questions available, else cursor-not-allowed with opacity
                    
                    // Get appropriate Material Design icon for this topic based on name and category
                    const topicIcon = getTopicIcon(topic.name, topic.category);
                    
                    // Set the HTML content for the topic card using template literals
                    topicCard.innerHTML = `
                        <!-- Icon container with gradient background -->
                        <div class="
                        w-10 
                        h-10 
                        sm:w-12 
                        sm:h-12 
                        bg-gradient-to-br 
                        from-accent to-accent-600 
                        rounded-lg 
                        flex items-center 
                        justify-center 
                        shadow-material-1">

                            <!-- Material icon with responsive sizing -->
                            <span 
                            class="
                            material-icons 
                            text-white 
                            text-sm 
                            sm:text-base">${topicIcon}</span>
                        </div>

                        <!-- Main content area that grows to fill available space -->
                        <div class="flex-1">

                            <!-- Topic name with appropriate text styling -->
                            <div 
                            class="
                            button-text 
                            text-neutral-800 
                            dark:text-white 
                            mb-1">${topic.name}</div>
                            
                           
                            <!-- Question count display with smaller, lighter text -->
                            <div class="
                            caption 
                            text-neutral-500 
                            dark:text-neutral-400">
                            ${questionCount} questions available</div>
                            
                            
                            <!-- Progress section - only shown if user has attempted this topic -->
                            ${progressData.attempts > 0 ? 
                                `<div class="mt-2">

                                    <!-- Progress statistics: best score, average score, and attempt count -->
                                    <div 
                                    class="
                                    caption 
                                    text-neutral-400">
                                    Best: ${Math.round(progressData.bestScore)}% | Avg: ${Math.round(progressData.averageScore)}% | ${progressData.attempts} attempts</div>
                                   
                                   
                                    <!-- Visual progress bar container -->
                                    <div class="
                                    progress-bar 
                                    mt-1 
                                    h-1">
                                        <!-- Actual progress bar that fills based on average score -->
                                        <!-- Inline style sets width percentage and dynamic color based on performance -->
                                        <div class="
                                        h-full 
                                        rounded 
                                        transition-all 
                                        duration-300" 
                                        style="width: ${progressData.averageScore}%; 
                                        background: ${getProgressBarColor(progressData.averageScore)}">
                                        </div>

                                    </div>

                                </div>` : 
                                // Empty string if no attempts (progress section not shown)
                                ''
                            }
                        </div>


                        <!-- Right arrow icon indicating this is clickable -->
                        <!-- Conditionally reduced opacity if no questions available -->
                        <span 
                        
                        class="
                        material-icons 
                        text-neutral-400 ${questionCount === 0 ? 'opacity-50' : ''}">
                        arrow_forward_ios

                        </span>
                    `;
                    
                    // Set animation delay for staggered entrance effect
                    // Each subsequent topic card animates in 0.1s after the previous one
                    // Creates a cascading animation effect down the list
                    topicCard.style.animationDelay = `${(index + 1) * 0.1}s`;
                    
                    
                    // Add click event listener only if questions are available
                    if (questionCount > 0) {
                        // When clicked, call startQuiz function with this topic as parameter
                        topicCard.addEventListener('click', () => startQuiz(topic));
                        // Set tooltip text for better UX
                        topicCard.title = `Start ${topic.name} quiz`;
                    } else {
                        // If no questions, set disabled state tooltip
                        topicCard.title = 'No questions available for this topic';
                    }
                    
                    // Add the completed topic card to the topic grid container
                    topicGrid.appendChild(topicCard);
                });
            });
        }