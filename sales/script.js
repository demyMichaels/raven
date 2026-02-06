// Global variables
let geminiAI = null;
let chatSession = null;
let currentScenario = null;
let messages = [];
let apiKey = null;

// Scenarios data
const scenarios = [
    {
        id: 'emma',
        name: 'Emma Richardson',
        role: 'CFO',
        difficulty: 'Intermediate',
        difficultyLevel: 'medium',
        description: 'Emma is the CFO of a mid-sized tech company. She\'s budget-conscious and needs convincing on ROI.',
        emotionalTriggers: ['Budget concerns', 'ROI skepticism', 'Risk aversion'],
        systemInstruction: `You are Emma Richardson, the CFO of TechGrowth Inc. You're skeptical about new software purchases unless they show clear ROI within 12 months. You're polite but direct. You value data over promises. Your company is currently using outdated CRM software but you're worried about implementation costs and training time.`,
        avatarColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        initialGreeting: "I'm listening to your pitch, but I need to be clear upfront - unless you can show me a clear ROI within 12 months and minimal disruption to our current workflow, this won't be an easy sell. What makes your solution worth our investment?"
    },
    {
        id: 'david',
        name: 'David Chen',
        role: 'IT Director',
        difficulty: 'Hard',
        difficultyLevel: 'hard',
        description: 'David is overwhelmed with tech solutions and hates sales jargon. He wants practical solutions.',
        emotionalTriggers: ['Jargon aversion', 'Time constraints', 'Integration fears'],
        systemInstruction: `You are David Chen, IT Director at RetailCorp. You're tired of salespeople using buzzwords. You want concrete facts, integration capabilities with existing systems, and minimal maintenance. You're currently dealing with 5 different vendors and it's a nightmare. Be blunt but not rude.`,
        avatarColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        initialGreeting: "Let's skip the sales talk. I've heard it all before. Tell me exactly how this integrates with our existing Azure infrastructure and what the maintenance overhead is. We can't afford another system that needs constant babysitting."
    },
    {
        id: 'sarah',
        name: 'Sarah Johnson',
        role: 'Marketing Manager',
        difficulty: 'Easy',
        difficultyLevel: 'easy',
        description: 'Sarah is excited about new tech but needs help convincing her team about adoption.',
        emotionalTriggers: ['Team adoption', 'Learning curve', 'Feature relevance'],
        systemInstruction: `You are Sarah Johnson, Marketing Manager at a growing e-commerce brand. You're excited about tools that can help your team but worried about adoption. Your team is resistant to change. You need something intuitive that clearly benefits daily workflows.`,
        avatarColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        initialGreeting: "This looks interesting! My team is always looking for ways to work smarter. But they're a bit resistant to new tools. How would this actually fit into our daily workflow? I need something that won't require weeks of training."
    }
];

// Initial greetings mapping
const INITIAL_GREETINGS = {
    emma: "I'm listening to your pitch, but I need to be clear upfront - unless you can show me a clear ROI within 12 months and minimal disruption to our current workflow, this won't be an easy sell. What makes your solution worth our investment?",
    david: "Let's skip the sales talk. I've heard it all before. Tell me exactly how this integrates with our existing Azure infrastructure and what the maintenance overhead is. We can't afford another system that needs constant babysitting.",
    sarah: "This looks interesting! My team is always looking for ways to work smarter. But they're a bit resistant to new tools. How would this actually fit into our daily workflow? I need something that won't require weeks of training."
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Initialize icons
    lucide.createIcons();
    
    // Load saved API key
    apiKey = localStorage.getItem('gemini_api_key');
    if (apiKey) {
        document.getElementById('apiKeyInput').value = '••••••••••••••••';
    }
    
    // Render scenarios
    renderScenarios();
    
    // Initialize Gemini AI if key exists
    if (apiKey) {
        initializeGemini();
    }
});

function renderScenarios() {
    const container = document.getElementById('scenariosContainer');
    container.innerHTML = '';
    
    scenarios.forEach(scenario => {
        const card = document.createElement('div');
        card.className = `scenario-card ${scenario.difficultyLevel}`;
        card.innerHTML = `
            <div class="scenario-header">
                <div class="avatar" style="background: ${scenario.avatarColor}">
                    <i data-lucide="user"></i>
                </div>
                <div class="scenario-info">
                    <h3>${scenario.name}</h3>
                    <p>${scenario.role} • ${scenario.difficulty}</p>
                </div>
            </div>
            <p class="scenario-description">${scenario.description}</p>
            <div class="triggers-container">
                ${scenario.emotionalTriggers.map(trigger => 
                    `<span class="trigger-tag">${trigger}</span>`
                ).join('')}
            </div>
        `;
        
        card.addEventListener('click', () => startScenario(scenario));
        container.appendChild(card);
    });
    
    // Refresh icons
    setTimeout(() => lucide.createIcons(), 100);
}

function saveApiKey() {
    const input = document.getElementById('apiKeyInput');
    const key = input.value;
    
    if (key && !key.startsWith('••••')) {
        apiKey = key;
        localStorage.setItem('gemini_api_key', key);
        input.value = '••••••••••••••••';
        alert('API key saved successfully!');
        initializeGemini();
    }
}

function initializeGemini() {
    try {
        // Using Google Generative AI JavaScript SDK for browser
        geminiAI = new googleGenerativeAI(apiKey);
        console.log('Gemini AI initialized');
    } catch (error) {
        console.error('Failed to initialize Gemini AI:', error);
        alert('Failed to initialize Gemini AI. Please check your API key.');
    }
}

function startScenario(scenario) {
    if (!apiKey) {
        alert('Please enter your Google AI API key first.');
        return;
    }
    
    if (!geminiAI) {
        initializeGemini();
    }
    
    currentScenario = scenario;
    messages = [];
    
    // Update UI
    document.getElementById('scenarioScreen').style.display = 'none';
    document.getElementById('chatScreen').style.display = 'flex';
    
    // Update persona info
    document.getElementById('personaName').textContent = scenario.name;
    document.getElementById('personaDetails').textContent = `${scenario.role} • ${scenario.difficulty}`;
    document.getElementById('chatHeader').style.background = scenario.avatarColor;
    document.getElementById('personaAvatar').style.background = scenario.avatarColor.replace('gradient', 'linear-gradient');
    
    // Update emotional triggers
    const triggersContainer = document.getElementById('emotionalTriggers');
    triggersContainer.innerHTML = scenario.emotionalTriggers.map(trigger => 
        `<span class="trigger-badge">${trigger}</span>`
    ).join('');
    
    // Initialize chat
    initializeChat(scenario);
    
    // Add initial greeting
    addMessage(INITIAL_GREETINGS[scenario.id], 'ai');
    
    // Refresh icons
    setTimeout(() => lucide.createIcons(), 100);
}

function initializeChat(scenario) {
    try {
        const model = geminiAI.getGenerativeModel({ 
            model: 'gemini-pro',
            generationConfig: {
                temperature: 0.9,
                maxOutputTokens: 300,
            }
        });
        
        // Start a chat session with system instruction
        chatSession = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: `System instruction: ${scenario.systemInstruction}` }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I will roleplay as specified." }],
                }
            ],
            generationConfig: {
                temperature: 0.9,
            },
        });
        
        console.log('Chat session initialized');
    } catch (error) {
        console.error('Failed to initialize chat:', error);
        addMessage('Error initializing chat. Please check your API key and try again.', 'ai');
    }
}

async function sendMessage(event) {
    event.preventDefault();
    
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (!message || !chatSession) return;
    
    // Add user message
    addMessage(message, 'user');
    input.value = '';
    autoResize(input);
    
    // Disable send button
    document.getElementById('sendButton').disabled = true;
    
    // Show typing indicator
    document.getElementById('typingIndicator').style.display = 'flex';
    
    try {
        // Send to Gemini
        const result = await chatSession.sendMessage(message);
        const response = await result.response;
        const text = response.text();
        
        // Add AI response
        addMessage(text, 'ai');
        
        // Analyze the interaction
        analyzeInteraction(message, text);
        
    } catch (error) {
        console.error('Error sending message:', error);
        addMessage('Sorry, I encountered an error. Please try again.', 'ai');
    } finally {
        // Hide typing indicator
        document.getElementById('typingIndicator').style.display = 'none';
        
        // Re-enable send button
        document.getElementById('sendButton').disabled = false;
    }
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('messagesContainer');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.innerHTML = `
        <div class="message-text">${escapeHtml(text)}</div>
        <div class="message-time">${time}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Add to messages array
    messages.push({
        text,
        sender,
        timestamp: new Date()
    });
}

function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    
    // Enable/disable send button
    document.getElementById('sendButton').disabled = !textarea.value.trim();
    document.getElementById('sendButton').disabled = !textarea.value.trim();
}

async function analyzeInteraction(userMessage, aiResponse) {
    if (!currentScenario || !geminiAI) return;
    
    const prompt = `
        You are a world-class Sales Coach. Analyze the following interaction between a salesperson (User) and a potential customer (Persona).
        
        Scenario Context: ${currentScenario.description}
        
        User said: "${userMessage}"
        Persona (Customer) replied: "${aiResponse}"
        
        Analyze the User's sales technique based on:
        1. Empathy (Did they acknowledge the persona's emotion?)
        2. Persuasion (Did they address the specific objection?)
        3. Clarity (Was the pitch clear?)

        Return a JSON object with:
        - score (0-100 integer)
        - feedback (1 sentence summary)
        - detectedEmotion (The emotion the persona is currently feeling)
        - suggestion (1 specific tip to improve the next reply)
        
        Format your response as valid JSON only.
    `;
    
    try {
        const model = geminiAI.getGenerativeModel({ model: 'gemini-pro' });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Parse JSON from response
        const jsonStart = text.indexOf('{');
        const jsonEnd = text.lastIndexOf('}') + 1;
        const jsonString = text.substring(jsonStart, jsonEnd);
        
        const analysis = JSON.parse(jsonString);
        
        // Display analysis
        displayAnalysis(analysis);
        
    } catch (error) {
        console.error('Analysis failed:', error);
        // Fallback analysis
        displayAnalysis({
            score: 50,
            feedback: "Could not analyze at this moment.",
            detectedEmotion: "Neutral",
            suggestion: "Keep trying to address their core needs."
        });
    }
}

function displayAnalysis(analysis) {
    const panel = document.getElementById('analysisPanel');
    const scoreBadge = document.getElementById('scoreBadge');
    
    // Update analysis content
    document.getElementById('detectedEmotion').textContent = analysis.detectedEmotion;
    document.getElementById('feedbackText').textContent = analysis.feedback;
    document.getElementById('suggestionText').textContent = analysis.suggestion;
    
    // Update score badge with color
    scoreBadge.textContent = `Score: ${analysis.score}/100`;
    scoreBadge.style.background = analysis.score > 70 ? '#dcfce7' : '#fee2e2';
    scoreBadge.style.color = analysis.score > 70 ? '#166534' : '#991b1b';
    
    // Show panel with animation
    panel.style.display = 'block';
    
    // Scroll to analysis
    setTimeout(() => {
        panel.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 100);
}

function goBackToScenarios() {
    document.getElementById('chatScreen').style.display = 'none';
    document.getElementById('scenarioScreen').style.display = 'block';
    document.getElementById('analysisPanel').style.display = 'none';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Make functions available globally
window.saveApiKey = saveApiKey;
window.startScenario = startScenario;
window.sendMessage = sendMessage;
window.autoResize = autoResize;
window.goBackToScenarios = goBackToScenarios;