        // Tutor functionality
        async function sendTutorMessage() {
            
            const input = document.getElementById('tutorInput');
            
            const message = input.value.trim();
            if (!message) return;

            const chat = document.getElementById('tutorChat');
            
            // Add user message
            addChatMessage(chat, message, 'user');
            input.value = '';

            // Add loading message
            const loadingDiv = addChatMessage(chat, 'Thinking...', 'bot');

            try {
                // Use Poe API to get response from Claude
                if (window.Poe && window.Poe.sendUserMessage) {
                    window.Poe.registerHandler('tutor-handler', (result) => {
                        const response = result.responses[0];

                        if (response.status === 'complete') {
                            loadingDiv.innerHTML = `<div 
                            class="
                            bg-blue-100 
                            dark:bg-blue-900 
                            p-3 
                            rounded-lg 
                            max-w-xs">
                            ${response.content}</div>`;

                        } else if (response.status === 'incomplete') {
                            loadingDiv.innerHTML = `<div 
                            class="
                            bg-blue-100 
                            dark:bg-blue-900 
                            p-3 rounded-lg 
                            max-w-xs">
                            ${response.content}</div>`;

                        } else if (response.status === 'error') {
                            loadingDiv.innerHTML = `<div 
                            class="
                            bg-red-100 
                            dark:bg-red-900 
                            p-3 rounded-lg 
                            max-w-xs">
                            Error: ${response.statusText}
                            </div>`;
                        }
                    });

                    await window.Poe.sendUserMessage(`@Claude-Sonnet-4 You are a helpful tutor. Please answer this question: ${message}`, {
                        handler: 'tutor-handler',
                        stream: true,
                        openChat: false
                    });
                } else {
                    // Fallback response
                    loadingDiv.innerHTML = `<div class="
                    bg-blue-100 
                    dark:bg-blue-900 
                    p-3 
                    rounded-lg 
                    max-w-xs">
                    I'm a helpful tutor! However, I need the Poe API to provide detailed answers. 
                    You can ask me about any topic and I'll do my best to help you understand the concepts.
                    </div>`;
                }
            } catch (error) {
                loadingDiv.innerHTML = `<div class="
                bg-red-100 
                dark:bg-red-900 
                p-3 rounded-lg 
                max-w-xs">
                Sorry, I couldn't process your question right now. 
                Please try again.</div>`;
            }
        }
