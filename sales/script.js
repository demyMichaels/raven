// script.js - Main application logic
let geminiAI = null;
let chatSession = null;
let coachChatSession = null;
let currentScenario = null;
let messages = [];
let coachMessages = [];

// Scenarios data
const scenarios = [
    {
        id: 'emma',
        name: 'Emma Richardson',
        role: 'CFO',
        difficulty: 'Medium',
        avatarColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        description: 'CFO of TechGrowth Inc. Skeptical about software purchases without clear ROI within 12 months.',
        emotionalTriggers: ['Budget concerns', 'ROI skepticism', 'Risk aversion'],
        systemInstruction: `You are Emma Richardson, CFO of TechGrowth Inc. You're skeptical about new software purchases unless they show clear ROI within 12 months. You're polite but direct. You value data over promises. Your company is using outdated CRM software but you're worried about implementation costs and training time.`,
        initialGreeting: "I'm listening to your pitch, but I need to be clear upfront - unless you can show me a clear ROI within 12 months and minimal disruption to our current workflow, this won't be an easy sell. What makes your solution worth our investment?"
    },
    {
        id: 'david',
        name: 'David Chen',
        role: 'IT Director',
        difficulty: 'Hard',
        avatarColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        description: 'IT Director at RetailCorp. Overwhelmed with tech solutions and hates sales jargon.',
        emotionalTriggers: ['Jargon aversion', 'Time constraints', 'Integration fears'],
        systemInstruction: `You are David Chen, IT Director at RetailCorp. You're tired of salespeople using buzzwords. You want concrete facts, integration capabilities with existing systems, and minimal maintenance. You're currently dealing with 5 different vendors and it's a nightmare. Be blunt but not rude.`,
        initialGreeting: "Let's skip the sales talk. I've heard it all before. Tell me exactly how this integrates with our existing Azure infrastructure and what the maintenance overhead is. We can't afford another system that needs constant babysitting."
    },
    {
        id: 'sarah',
        name: 'Sarah Johnson',
        role: 'Marketing Manager',
        difficulty: 'Easy',
        avatarColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        description: 'Marketing Manager at a growing e-commerce brand. Excited about new tech but needs help with team adoption.',
        emotionalTriggers: ['Team adoption', 'Learning curve', 'Feature relevance'],
        systemInstruction: `You are Sarah Johnson, Marketing Manager at a growing e-commerce brand. You're excited about tools that can help your team but worried about adoption. Your team is resistant to change. You need something intuitive that clearly benefits daily workflows.`,
        initialGreeting: "This looks interesting! My team is always looking for ways to work smarter. But they're a bit resistant to new tools. How would this actually fit into our daily workflow? I need something that won't require weeks of training."
    },
    {
        id: 'michael',
        name: 'Michael Rodriguez',
        role: 'Operations Director',
        difficulty: 'Medium',
        avatarColor: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        description: 'Operations Director in manufacturing. Focused on efficiency and process improvement.',
        emotionalTriggers: ['Process disruption', 'Training time', 'Scalability'],
        systemInstruction: `You are Michael Rodriguez, Operations Director at a manufacturing company. You're focused on efficiency and hate downtime. Any new system must integrate smoothly with existing processes and show immediate productivity gains. You're data-driven and practical.`,
        initialGreeting: "We're considering several solutions for our workflow management. Before we proceed, I need to understand how your system handles real-time data synchronization with our legacy systems and what the expected productivity gains are."
    }
];

// Initialize application
async function initializeApp() {
    try {
        // Load configuration
        if (!CONFIG || !CONFIG.GEMINI_API_KEY) {
            throw new Error('API key not found in config.js');
        }

        // Initialize Gemini AI
        geminiAI = new googleGenerativeAI(CONFIG.GEMINI_API_KEY);
        
        // Initialize coach chat
        await initializeCoach();
        
        // Load scenarios
        renderScenarios();
        
        // Hide loading screen
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
            document.querySelector('.app-container').style.display = 'flex';
            
            // Add welcome message to coach chat
            addCoachMessage('Hello! I\'m your AI Sales Coach. I\'m here to help you practice sales conversations. Select a scenario to begin, or ask me any sales-related questions!', 'received');
            
            // Initialize icons
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }, 1000);
        
    } catch (error) {
        console.error('Failed to initialize app:', error);
        document.getElementById('loadingScreen').innerHTML = `
            <div class="loading-content">
                <i data-lucide="alert-circle" style="font-size: 3rem; color: #f44336; margin-bottom: 1rem;"></i>
                <h2>Initialization Failed</h2>
                <p>${error.message}</p>
                <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.75rem 1.5rem; background: #4361ee; color: white; border: none; border-radius: 8px; cursor: pointer;">
                    Retry
                </button>
            </div>
        `;
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
}

// Initialize AI Coach
async function initializeCoach() {
    try {
        const model = geminiAI.getGenerativeModel({ 
            model: 'gemini-pro',
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 500,
            }
        });
        
        const coachPrompt = `You are an expert sales coach with 20+ years of experience. Your role is to:
        1. Guide users through sales practice scenarios
        2. Provide real-time feedback on their sales techniques
        3. Suggest improvements and strategies
        4. Answer sales-related questions
        
        Be supportive but honest. Focus on practical, actionable advice.
        Keep responses clear and concise.`;
        
        coachChatSession = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: coachPrompt }],
                },
                {
                    role: "model",
                    parts: [{ text: "I understand. I'm ready to help as your AI Sales Coach. I'll provide expert guidance on sales techniques, communication strategies, and help you practice effectively." }],
                }
            ],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 500,
            },
        });
        
        console.log('AI Coach initialized');
    } catch (error) {
        console.error('Failed to initialize coach:', error);
    }
}

// Render scenarios
function renderScenarios() {
    const container = document.getElementById('scenariosContainer');
    container.innerHTML = '';
    
    scenarios.forEach(scenario => {
        const card = document.createElement('div');
        card.className = 'scenario-card';
        card.innerHTML = `
            <div class="scenario-header">
                <div class="scenario-avatar" style="background: ${scenario.avatarColor}">
                    <i data-lucide="user"></i>
                </div>
                <div class="scenario-info">
                    <h3>${scenario.name}</h3>
                    <p>${scenario.role} • ${scenario.difficulty}</p>
                </div>
            </div>
            <p class="scenario-description">${scenario.description}</p>
            <div class="scenario-tags">
                ${scenario.emotionalTriggers.map(trigger => 
                    `<span class="tag">${trigger}</span>`
                ).join('')}
                <span class="tag difficulty-${scenario.difficulty.toLowerCase()}">${scenario.difficulty}</span>
            </div>
        `;
        
        card.addEventListener('click', () => startScenario(scenario));
        container.appendChild(card);
    });
    
    // Refresh icons
    if (typeof lucide !== 'undefined') {
        setTimeout(() => lucide.createIcons(), 100);
    }
}

// Start a scenario
async function startScenario(scenario) {
    if (!geminiAI) {
        alert('Please wait for AI to initialize');
        return;
    }
    
    currentScenario = scenario;
    messages = [];
    
    // Update UI
    document.getElementById('scenarioSection').style.display = 'none';
    document.getElementById('chatSection').style.display = 'flex';
    
    // Update persona info
    document.getElementById('personaName').textContent = scenario.name;
    document.getElementById('personaRole').textContent = scenario.role;
    document.getElementById('personaDifficulty').textContent = scenario.difficulty;
    document.getElementById('personaDifficulty').className = `tag difficulty-${scenario.difficulty.toLowerCase()}`;
    
    const avatar = document.getElementById('personaAvatarLarge');
    avatar.style.background = scenario.avatarColor;
    avatar.innerHTML = '<i data-lucide="user"></i>';
    
    // Clear chat
    document.getElementById('chatMessages').innerHTML = '';
    
    // Add initial greeting
    addMessage(scenario.initialGreeting, 'ai');
    
    // Initialize chat session with persona
    await initializePersonaChat(scenario);
    
    // Update coach chat with scenario info
    const coachMessage = `You're now practicing with ${scenario.name}, the ${scenario.role}. ${scenario.description} I'll help you navigate this conversation.`;
    addCoachMessage(coachMessage, 'received');
    
    // Refresh icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Initialize persona chat
async function initializePersonaChat(scenario) {
    try {
        const model = geminiAI.getGenerativeModel({ 
            model: 'gemini-pro',
            generationConfig: {
                temperature: 0.8,
                maxOutputTokens: 300,
            }
        });
        
        chatSession = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: `System instruction: ${scenario.systemInstruction}\n\nStart the conversation with: "${scenario.initialGreeting}"` }],
                },
                {
                    role: "model",
                    parts: [{ text: scenario.initialGreeting }],
                }
            ],
            generationConfig: {
                temperature: 0.8,
                maxOutputTokens: 300,
            },
        });
        
        console.log('Persona chat initialized');
    } catch (error) {
        console.error('Failed to initialize persona chat:', error);
        addMessage('Error initializing conversation. Please try again.', 'ai');
    }
}

// Send message to persona
async function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (!message || !chatSession) return;
    
    // Add user message
    addMessage(message, 'user');
    input.value = '';
    autoResize(input);
    document.getElementById('sendButton').disabled = true;
    
    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message ai typing';
    typingIndicator.innerHTML = `
        <div class="typing-indicator">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
    `;
    document.getElementById('chatMessages').appendChild(typingIndicator);
    typingIndicator.scrollIntoView({ behavior: 'smooth' });
    
    try {
        // Send to Gemini
        const result = await chatSession.sendMessage(message);
        const response = await result.response;
        const text = response.text();
        
        // Remove typing indicator
        typingIndicator.remove();
        
        // Add AI response
        addMessage(text, 'ai');
        
        // Analyze interaction
        analyzeInteraction(message, text);
        
        // Ask coach for feedback
        askCoachForFeedback(message, text);
        
    } catch (error) {
        console.error('Error sending message:', error);
        typingIndicator.remove();
        addMessage('Sorry, I encountered an error. Please try again.', 'ai');
    }
}

// Add message to chat
function addMessage(text, sender) {
    const container = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const time = new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    messageDiv.innerHTML = `
        <p>${escapeHtml(text)}</p>
        <span class="message-time">${time}</span>
    `;
    
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
    
    // Add to messages array
    messages.push({
        text,
        sender,
        timestamp: new Date()
    });
}

// Analyze interaction
async function analyzeInteraction(userMessage, aiResponse) {
    if (!currentScenario || !geminiAI) return;
    
    const prompt = `
        Analyze this sales conversation interaction:
        
        Scenario: ${currentScenario.description}
        Persona: ${currentScenario.name}, ${currentScenario.role}
        
        Salesperson said: "${userMessage}"
        Customer replied: "${aiResponse}"
        
        Provide analysis in this exact JSON format:
        {
            "score": 0-100,
            "detectedEmotion": "emotion name",
            "feedback": "one sentence feedback",
            "suggestion": "one specific improvement tip"
        }
        
        Focus on:
        1. Empathy shown
        2. Clarity of message
        3. Addressing customer concerns
        4. Persuasion technique
    `;
    
    try {
        const model = geminiAI.getGenerativeModel({ model: 'gemini-pro' });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Parse JSON
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const analysis = JSON.parse(jsonMatch[0]);
            displayAnalysis(analysis);
        }
    } catch (error) {
        console.error('Analysis failed:', error);
        // Fallback analysis
        displayAnalysis({
            score: 50,
            detectedEmotion: "Neutral",
            feedback: "Keep the conversation going.",
            suggestion: "Try to address their main concern directly."
        });
    }
}

// Display analysis
function displayAnalysis(analysis) {
    const container = document.getElementById('analysisContainer');
    const scoreDisplay = document.getElementById('scoreDisplay');
    
    document.getElementById('scoreValue').textContent = analysis.score;
    document.getElementById('detectedEmotion').textContent = analysis.detectedEmotion;
    document.getElementById('feedbackText').textContent = analysis.feedback;
    document.getElementById('suggestionText').textContent = analysis.suggestion;
    
    // Update score color
    if (analysis.score >= 80) {
        scoreDisplay.style.background = '#d1fae5';
        scoreDisplay.style.color = '#065f46';
    } else if (analysis.score >= 60) {
        scoreDisplay.style.background = '#fef3c7';
        scoreDisplay.style.color = '#92400e';
    } else {
        scoreDisplay.style.background = '#fee2e2';
        scoreDisplay.style.color = '#991b1b';
    }
    
    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth' });
}

// Ask coach for feedback
async function askCoachForFeedback(userMessage, aiResponse) {
    if (!coachChatSession) return;
    
    const prompt = `
        The user just had this exchange with ${currentScenario.name}:
        
        User: "${userMessage}"
        ${currentScenario.name}: "${aiResponse}"
        
        Give brief, actionable feedback for the user's next move. Focus on one key improvement.
        Keep it under 2 sentences.
    `;
    
    try {
        const result = await coachChatSession.sendMessage(prompt);
        const response = await result.response;
        const text = response.text();
        
        addCoachMessage(text, 'received');
    } catch (error) {
        console.error('Coach feedback failed:', error);
    }
}

// Ask coach question
async function askCoach(type) {
    const input = document.getElementById('coachQuery');
    let prompt = '';
    
    switch(type) {
        case 'strategy':
            prompt = `What's the best strategy for dealing with ${currentScenario.name}'s ${currentScenario.emotionalTriggers[0]}?`;
            break;
        case 'objection':
            prompt = `How should I handle objections about ${currentScenario.emotionalTriggers[1]}?`;
            break;
        case 'question':
            prompt = `What's a good question to ask ${currentScenario.name} to better understand their needs?`;
            break;
        case 'close':
            prompt = `How can I move this conversation toward closing with ${currentScenario.name}?`;
            break;
        case 'custom':
            prompt = input.value;
            input.value = '';
            break;
        default:
            prompt = 'How can I improve my sales technique?';
    }
    
    if (!prompt.trim()) return;
    
    // Add user message
    addCoachMessage(prompt, 'sent');
    
    // Show typing
    const coachChat = document.getElementById('coachChat');
    const typing = document.createElement('div');
    typing.className = 'coach-message received typing';
    typing.innerHTML = `
        <div class="coach-avatar">
            <i data-lucide="brain"></i>
        </div>
        <div class="message-bubble">
            <div class="typing-indicator">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        </div>
    `;
    coachChat.appendChild(typing);
    coachChat.scrollTop = coachChat.scrollHeight;
    
    try {
        const result = await coachChatSession.sendMessage(prompt);
        const response = await result.response;
        const text = response.text();
        
        typing.remove();
        addCoachMessage(text, 'received');
    } catch (error) {
        console.error('Coach query failed:', error);
        typing.remove();
        addCoachMessage('Sorry, I encountered an error. Please try again.', 'received');
    }
}

// Add message to coach chat
function addCoachMessage(text, type) {
    const container = document.getElementById('coachChat');
    const messageDiv = document.createElement('div');
    messageDiv.className = `coach-message ${type}`;
    
    const time = new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    const avatar = type === 'received' 
        ? '<div class="coach-avatar"><i data-lucide="brain"></i></div>'
        : '<div class="coach-avatar"><i data-lucide="user"></i></div>';
    
    messageDiv.innerHTML = `
        ${avatar}
        <div class="message-bubble">
            <p>${escapeHtml(text)}</p>
            <span class="timestamp">${time}</span>
        </div>
    `;
    
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
    
    // Add to messages array
    coachMessages.push({
        text,
        type,
        timestamp: new Date()
    });
}

// Utility functions
function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    document.getElementById('sendButton').disabled = !textarea.value.trim();
}

function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function insertTemplate(type) {
    const input = document.getElementById('messageInput');
    const templates = {
        question: "That's a great point. Can you tell me more about your current process?",
        value: "Based on what you've shared, our solution could save you approximately 15 hours per week by...",
        objection: "I understand your concern about [objection]. Many of our clients felt the same way initially, but they found that..."
    };
    
    if (templates[type]) {
        input.value = templates[type];
        autoResize(input);
        document.getElementById('sendButton').disabled = false;
    }
}

function toggleCoachPanel() {
    const panel = document.getElementById('coachPanel');
    panel.style.display = panel.style.display === 'none' ? 'flex' : 'none';
}

function goBackToScenarios() {
    document.getElementById('chatSection').style.display = 'none';
    document.getElementById('analysisContainer').style.display = 'none';
    document.getElementById('scenarioSection').style.display = 'block';
    document.getElementById('coachPanel').style.display = 'none';
}

function showAnalytics() {
    alert('Analytics dashboard coming soon!');
}

function showSettings() {
    alert('Settings panel coming soon!');
}

function showPrivacy() {
    alert('Privacy policy information');
}

function showTerms() {
    alert('Terms of service information');
}

function showHelp() {
    alert('Help documentation');
}

// Initialize app when page loads
window.addEventListener('load', initializeApp);