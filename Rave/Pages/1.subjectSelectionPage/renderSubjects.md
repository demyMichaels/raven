 
       ```javascript

    // Render subjects
        function renderSubjects() {
            const subjectGrid = document.getElementById('subjectGrid');
            subjectGrid.innerHTML = '';

            const subjectIcons = {
                'mathematics': 'functions',           // Math functions and operations

                'physics': 'bolt',                    // Electricity and energy

                'chemistry': 'science',               // Science experiments

                'biology': 'psychology',              // Brain and life sciences

                'english': 'auto_stories',            // Storytelling and literature

                'economics': 'show_chart',            // Data charts and trends

                'accounting': 'summarize',            // Financial summaries

                'agriculture': 'grass',               // Farming and crops

                'art': 'brush',                       // Painting and drawing

                'commerce': 'business_center',        // Business and trade

                'computer': 'code',                   // Programming and coding

                'crs': 'volunteer_activism',          // Faith and spirituality

                'geography': 'public',  
                            // Global studies
                'government': 'gavel',    
                            // Law and justice
                'history': 'history_edu',             // Historical education

                'home-economics': 'nutrition',        // Food and nutrition

                'islamic-studies': 'star',   
                        // Islamic symbol

                'literature': 'book',                 // Books and reading

                'phe': 'sports_gymnastics',           // Sports and gymnastics

                'music': 'piano'                      // Musical instruments
            };

              const subjectColors = {
                'mathematics': 'from-data-500 to-data-600',           // #5A7B9E to #4d6a87
                'physics': 'from-warning to-warning/80',              // #f59e0b to #f59e0b/80
                'chemistry': 'from-primary-500 to-primary-600',       // #0F2C59 to #0a2549
                'biology': 'from-success to-success/80',              // #22c55e to #22c55e/80
                'english': 'from-accent-500 to-accent-600',           // #009F9D to #008280
                'economics': 'from-premium-500 to-premium-600',       // #D2C1A7 to #c4b095
                'accounting': 'from-data-500 to-data-700',            // #5A7B9E to #405970
                'agriculture': 'from-success to-success-600',         // #22c55e to #16a34a (assuming 600)
                'art': 'from-accent-500 to-accent-700',               // #009F9D to #006663
                'commerce': 'from-primary-500 to-primary-700',        // #0F2C59 to #081e39
                'computer': 'from-data-500 to-data-600',              // #5A7B9E to #4d6a87
                'crs': 'from-premium-500 to-premium-700',             // #D2C1A7 to #b69f83
                'geography': 'from-accent-500 to-accent-600',         // #009F9D to #008280
                'government': 'from-primary-500 to-primary-600',      // #0F2C59 to #0a2549
                'history': 'from-premium-500 to-premium-600',         // #D2C1A7 to #c4b095
                'home-economics': 'from-warning to-warning-600',      // #f59e0b to #d97706 (assuming 600)
                'islamic-studies': 'from-primary-500 to-primary-700', // #0F2C59 to #081e39
                'literature': 'from-accent-500 to-accent-700',        // #009F9D to #006663
                'phe': 'from-data-500 to-data-600',,                 // #22c55e to #16a34a (assuming 600)
                'music': 'from-premium-500 to-premium-700'            // #D2C1A7 to #b69f83
            };

            /**
 * Renders subject cards in the subject selection interface
 * Iterates through available subjects and creates interactive card elements for each
 * 
 * @algorithm
 * 1. Iterate through each subject in availableSubjects array
 * 2. Create DOM element for subject card with Material Design styling
 * 3. Retrieve appropriate icon and color from configuration objects
 * 4. Calculate and display subject progress statistics
 * 5. Apply staggered animation delays for visual appeal
 * 6. Attach click event handlers for subject selection
 * 7. Append completed card to the subject grid container
 * 
 * @complexity O(n) where n is the number of subjects
 * @dependencies Requires subjectIcons, subjectColors, and analyticsData to be defined
 */
availableSubjects.forEach((subject, index) => {
    /**
     * Create a new DOM element for the subject card
     * This element serves as the interactive container for each subject
     */
    const subjectCard = document.createElement('div');
    
    /**
     * Apply comprehensive CSS classes for styling and behavior:
     * - material-card, material-button: Material Design component styling
     * - stagger-animation: Enables staggered entrance animations
     * - w-full: Full width responsiveness
     * - flex, items-center, space-x-4: Flexbox layout with centered alignment and spacing
     * - p-4 sm:p-6: Responsive padding (mobile: 1rem, small+: 1.5rem)
     * - border styles: Light/dark mode border colors with neutral palette
     * - text colors: Light/dark mode text colors for accessibility
     * - rounded-xl: Large border radius for modern appearance
     * - hover styles: Background color change on hover for interactivity feedback
     * - touch-target: Mobile-friendly minimum touch target size (44px)
     * - bg colors: Background colors supporting light/dark mode
     * - cursor-pointer: Visual indicator that element is clickable
     */
    subjectCard.className = `
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
    dark:bg-neutral-800 
    cursor-pointer`;
    
    /**
     * Retrieve subject-specific icon and color from configuration objects
     * Fallback to default values if subject not found in configuration
     * 
     * @constant {string} icon - Material Design icon name for visual representation
     * @constant {string} color - Tailwind gradient classes for card accent
     */
    const icon = subjectIcons[subject.id] || 'school'; // Default to 'school' icon if not found
    const color = subjectColors[subject.id] || 'from-primary to-primary-600'; // Default gradient
    
    /**
     * Calculate and format subject progress statistics for display
     * Retrieves progress data from analytics store and formats for UI
     * 
     * @constant {Object|null} subjectProgress - Progress data object or null if no data
     * @constant {string} progressText - Formatted progress string for display
     */
    const subjectProgress = analyticsData.subjectProgress[subject.id];
    const progressText = subjectProgress ? 
        `Avg: ${Math.round(subjectProgress.averageScore)}% | ${subjectProgress.attempts} attempts` : 
        'Not started'; // Default text for new subjects
    
    /**
     * Construct the HTML content for the subject card using template literals
     * Uses semantic structure with appropriate accessibility attributes
     */
    subjectCard.innerHTML = `
        <!-- Icon Container: Gradient background with Material icon -->

        <div class=
        "w-12 
        h-12 
        sm:w-14 
        sm:h-14 
        bg-gradient-to-br 
        ${color} 
        rounded-xl 
        flex 
        items-center 
        justify-center 
        shadow-material-1">
            <span class="material-icons text-white">${icon}</span>
        </div>
        
        <!-- Content Area: Flexible container for text content -->
        <div class="flex-1">
            <!-- Subject Name: Primary text with prominent styling -->
            <div class="
            button-text 
            text-neutral-800 d
            ark:text-white 
            mb-1">
            ${subject.name}</div>
            
            <!-- Progress Information: Secondary text with subtle styling -->
            <div class="
            caption 
            text-neutral-500 
            dark:text-neutral-400">
            ${progressText}</div>
        </div>
        
        <!-- Navigation Indicator: Right arrow showing interactivity -->
        <span class="
        material-icons 
        text-white">
        arrow_forward_ios
        </span>
    `;
    
    /**
     * Apply staggered animation delay based on card index
     * Creates cascading entrance effect for better visual experience
     * Each card animates in 0.1s after the previous one
     * 
     * @param {number} index - Current iteration index (0-based)
     */
    subjectCard.style.animationDelay = `${(index + 1) * 0.1}s`;
    
    /**
     * Attach click event listener to handle subject selection
     * Uses arrow function to maintain subject context in callback
     * 
     * @event click - Triggers when user clicks on subject card
     * @callback selectSubject - Navigation function to load subject topics
     */
    subjectCard.addEventListener('click', () => selectSubject(subject));
    
    /**
     * Append the completed subject card to the grid container
     * Adds the element to the DOM for user interaction
     */
    subjectGrid.appendChild(subjectCard);
});