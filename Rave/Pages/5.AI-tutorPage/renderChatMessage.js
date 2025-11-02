        function addChatMessage(container, message, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `mb-3 flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`;
            
            const bgColor = sender === 'user' ? 'bg-primary text-white' : 'bg-blue-100 dark:bg-blue-900';
            messageDiv.innerHTML = `<div class="${bgColor} p-3 rounded-lg max-w-xs">${message}</div>`;
            
            container.appendChild(messageDiv);
            container.scrollTop = container.scrollHeight;
            
            return messageDiv;
        }
