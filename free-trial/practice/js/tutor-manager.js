// js/tutor-manager.js
import { CONFIG } from './config.js';

export class TutorManager {
    constructor(uiManager) {
        this.uiManager = uiManager;
        this.currentSubject = null;
        this.currentTopic = null;
        this.setupEventListeners();
        this.registerHandler();
    }

    setupEventListeners() {
        const input = document.getElementById('tutorInput');
        const sendBtn = document.getElementById('sendTutorBtn');
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        sendBtn.onclick = () => this.sendMessage();
    }

    registerHandler() {
        if (!window.Poe) return;
        
        window.Poe.registerHandler("tutor-handler", (result, context) => {
            this.handleResponse(result, context);
        });
    }

    handleResponse(result, context) {
        const msg = result.responses[0];
        const chatContainer = document.getElementById('tutorChat');
        let responseDiv = document.getElementById(`response-${context.messageId}`);
        
        if (!responseDiv) {
            responseDiv = this.createResponseElement(context.messageId);
            chatContainer.appendChild(responseDiv);
        }
        
        const contentDiv = responseDiv.querySelector('.response-content');
        
        if (msg.status === "error") {
            contentDiv.textContent = "Sorry, I encountered an error. Please try again.";
        } else {
            contentDiv.innerHTML = marked.parse(msg.content);
        }
        
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    createResponseElement(messageId) {
        const div = document.createElement('div');
        div.id = `response-${messageId}`;
        div.className = 'bg-blue-50 dark:bg-blue-900 p-4 rounded-lg';
        div.innerHTML = `
            <div class="font-medium text-blue-800 dark:text-blue-200 mb-2">🤖 AI Tutor</div>
            <div class="response-content text-gray-700 dark:text-gray-300"></div>
        `;
        return div;
    }

    async sendMessage() {
        const input = document.getElementById('tutorInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        this.addUserMessage(message);
        input.value = '';
        
        const context = this.buildContext(message);
        
        if (window.Poe) {
            try {
                await window.Poe.sendUserMessage(`${CONFIG.DEFAULT_BOT} ${context}`, {
                    handler: "tutor-handler",
                    stream: true,
                    openChat: false,
                    handlerContext: { messageId: Date.now() }
                });
            } catch (err) {
                this.addErrorMessage();
                console.error('Error sending tutor message:', err);
            }
        }
    }

    addUserMessage(message) {
        const chatContainer = document.getElementById('tutorChat');
        const userDiv = document.createElement('div');
        userDiv.className = 'bg-gray-100 dark:bg-gray-700 p-4 rounded-lg';
        userDiv.innerHTML = `
            <div class="font-medium text-gray-800 dark:text-gray-200 mb-2">👤 You</div>
            <div class="text-gray-700 dark:text-gray-300">${message}</div>
        `;
        chatContainer.appendChild(userDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    addErrorMessage() {
        const chatContainer = document.getElementById('tutorChat');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'bg-red-50 dark:bg-red-900 p-4 rounded-lg';
        errorDiv.innerHTML = `
            <div class="font-medium text-red-800 dark:text-red-200 mb-2">❌ Error</div>
            <div class="text-red-700 dark:text-red-300">Unable to reach AI tutor. Please try again.</div>
        `;
        chatContainer.appendChild(errorDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    buildContext(message) {
        let context = `You are an educational AI tutor. `;
        
        if (this.currentSubject && this.currentTopic) {
            context += `The student is currently studying ${this.currentSubject} - ${this.currentTopic}. `;
        }
        
        context += `Please provide helpful, encouraging responses. Student asks: ${message}`;
        return context;
    }

    updateContext(subjectKey, topicKey) {
        this.currentSubject = subjectKey;
        this.currentTopic = topicKey;
    }

    clearChat() {
        const chatContainer = document.getElementById('tutorChat');
        chatContainer.innerHTML = `
            <div class="text-gray-600 dark:text-gray-400 text-center py-8">
                Ask me anything about your studies! I can explain concepts, review your mistakes, or help with specific questions.
            </div>
        `;
    }
}