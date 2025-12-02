// Dark mode support
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
});


// App State
let currentView = 'subjects';
let subjects = {};
let currentSubject = null;
let currentTopic = null;
let currentQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let quizStartTime = null;


// Analytics data
let analyticsData = {
    quizResults: [],
    topicProgress: {},
    subjectProgress: {},
    timeSpent: {}
};

// Swipe gesture state
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
let lastTapTime = 0;
let isMouseDown = false;
const DOUBLE_TAP_DELAY = 300;
const MIN_SWIPE_DISTANCE = 50;

const availableSubjects = [
    { id: 'mathematics', name: 'Mathematics', icon: 'calculate', file: 'data/mathematics.json' },
    { id: 'physics', name: 'Physics', icon: 'science', file: 'data/physics.json' },
    { id: 'chemistry', name: 'Chemistry', icon: 'science', file: 'data/chemistry.json' },
    { id: 'biology', name: 'Biology', icon: 'biotech', file: 'data/biology.json' },
    { id: 'english', name: 'English', icon: 'translate', file: 'data/english.json' },
    { id: 'economics', name: 'Economics', icon: 'trending_up', file: 'data/economics.json' },
    { id: 'accounting', name: 'Accounting', icon: 'receipt_long', file: 'data/accounting.json' },
    { id: 'commerce', name: 'Commerce', icon: 'store', file: 'data/commerce.json' },
    { id: 'computer', name: 'Computer', icon: 'computer', file: 'data/computer.json' },
    { id: 'crs', name: 'CRS', icon: 'church', file: 'data/crs.json' },
    { id: 'government', name: 'Government', icon: 'account_balance', file: 'data/government.json' },
    { id: 'islamic-studies', name: 'Islamic Studies', icon: 'mosque', file: 'data/irs.json' },
    { id: 'literature', name: 'Literature', icon: 'menu_book', file: 'data/literature.json' },
];


// DOM Elements
const subjectSelection = document.getElementById('subjectSelection');
const topicSelection = document.getElementById('topicSelection');
const quizInterface = document.getElementById('quizInterface');
const progressInterface = document.getElementById('progressInterface');
const tutorInterface = document.getElementById('tutorInterface');
const analyticsInterface = document.getElementById('analyticsInterface');
const loadingModal = document.getElementById('loadingModal');

// Mobile menu elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileMenu = document.getElementById('mobileMenu');
const closeMobileMenu = document.getElementById('closeMobileMenu');
const mobileMenuIcon = document.getElementById('mobileMenuIcon');

// ========== UTILITY FUNCTIONS ==========

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function showLoading() {
    loadingModal.classList.remove('hidden');
}

function hideLoading() {
    loadingModal.classList.add('hidden');
}

function showError(message) {
    const errorModal = document.createElement('div');
    errorModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    errorModal.innerHTML = `
        <div class="material-card bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-material-4 max-w-sm w-full mx-4">
            <div class="flex items-center space-x-3 mb-4">
                <span class="material-icons text-error">error</span>
                <h3 class="headline-6 text-neutral-800 dark:text-white">Error</h3>
            </div>
            <p class="body-1 text-neutral-600 dark:text-neutral-400 mb-4">${message}</p>
            <button class="material-button bg-primary hover:bg-primary-600 text-white px-6 py-3 rounded-lg button-text w-full">OK</button>
        </div>
    `;
    document.body.appendChild(errorModal);
    errorModal.querySelector('button').addEventListener('click', () => {
        document.body.removeChild(errorModal);
    });
}

// ========== NAVIGATION FUNCTIONS ==========

function showSubjectSelection() {
    currentView = 'subjects';
    subjectSelection.classList.remove('hidden');
    topicSelection.classList.add('hidden');
    quizInterface.classList.add('hidden');
    tutorInterface.classList.add('hidden');
    progressInterface.classList.add('hidden');
    analyticsInterface.classList.add('hidden');
}

function showTopicSelection() {
    currentView = 'topics';
    subjectSelection.classList.add('hidden');
    topicSelection.classList.remove('hidden');
    quizInterface.classList.add('hidden');
    tutorInterface.classList.add('hidden');
    progressInterface.classList.add('hidden');
    analyticsInterface.classList.add('hidden');
}

function showQuizInterface() {
    currentView = 'quiz';
    subjectSelection.classList.add('hidden');
    topicSelection.classList.add('hidden');
    quizInterface.classList.remove('hidden');
    tutorInterface.classList.add('hidden');
    progressInterface.classList.add('hidden');
    analyticsInterface.classList.add('hidden');
    document.getElementById('quizResults').classList.add('hidden');
    document.querySelector('#quizInterface .material-card').classList.remove('hidden');
    document.getElementById('quizNavigation').classList.remove('hidden');
}

function showTutorInterface() {
    currentView = 'tutor';
    subjectSelection.classList.add('hidden');
    topicSelection.classList.add('hidden');
    quizInterface.classList.add('hidden');
    tutorInterface.classList.remove('hidden');
    progressInterface.classList.add('hidden');
    analyticsInterface.classList.add('hidden');
}

function showProgressInterface() {
    currentView = 'progress';
    subjectSelection.classList.add('hidden');
    topicSelection.classList.add('hidden');
    quizInterface.classList.add('hidden');
    tutorInterface.classList.add('hidden');
    progressInterface.classList.remove('hidden');
    analyticsInterface.classList.add('hidden');
    renderProgress();
}

function showAnalyticsInterface() {
    currentView = 'analytics';
    subjectSelection.classList.add('hidden');
    topicSelection.classList.add('hidden');
    quizInterface.classList.add('hidden');
    tutorInterface.classList.add('hidden');
    progressInterface.classList.add('hidden');
    analyticsInterface.classList.remove('hidden');
    renderAnalytics();
}

// ========== MOBILE MENU FUNCTIONS ==========

function toggleMobileMenu() {
    const isOpen = mobileMenuOverlay.classList.contains('open');
    if (isOpen) {
        closeMobileMenuFunc();
    } else {
        openMobileMenuFunc();
    }
}

function openMobileMenuFunc() {
    mobileMenuOverlay.classList.add('open');
    mobileMenu.classList.add('open');
    mobileMenuIcon.textContent = 'close';
    document.body.style.overflow = 'hidden';
}

function closeMobileMenuFunc() {
    mobileMenuOverlay.classList.remove('open');
    mobileMenu.classList.remove('open');
    mobileMenuIcon.textContent = 'menu';
    document.body.style.overflow = '';
}

// ========== TOPIC ICON MAPPING ==========

function getTopicIcon(topicName, category) {
    const name = topicName.toLowerCase();
    const cat = category.toLowerCase();

    // Mathematics topics
    if (cat.includes('algebra') || name.includes('algebra')) return 'functions';
    if (cat.includes('geometry') || name.includes('geometry')) return 'crop_free';
    if (cat.includes('trigonometry') || name.includes('trigonometry')) return 'change_history';
    if (cat.includes('calculus') || name.includes('calculus')) return 'show_chart';
    if (cat.includes('statistics') || name.includes('statistic')) return 'bar_chart';
    if (cat.includes('probability') || name.includes('probability')) return 'casino';
    if (name.includes('number') || name.includes('arithmetic')) return 'pin';

    // Physics topics
    if (name.includes('motion')) return 'sports_motorsports';
    if (name.includes('force') || name.includes('newton')) return 'fitness_center';
    if (name.includes('energy')) return 'bolt';
    if (name.includes('wave') || name.includes('sound')) return 'graphic_eq';
    if (name.includes('electric') || name.includes('magnetic')) return 'electric_bolt';
    if (name.includes('light') || name.includes('optic')) return 'highlight';
    if (name.includes('thermal') || name.includes('heat')) return 'whatshot';
    if (name.includes('quantum') || name.includes('atomic')) return 'scatter_plot';

    // Default icons by subject
    if (cat.includes('math')) return 'calculate';
    if (cat.includes('physics')) return 'science';
    if (cat.includes('chemistry')) return 'science';
    if (cat.includes('biology')) return 'biotech';
    if (cat.includes('english')) return 'translate';
    if (cat.includes('economic')) return 'trending_up';

    return 'quiz';
}

// ========== ANALYTICS STORAGE FUNCTIONS ==========

function saveAnalyticsData() {
    try {
        const dataToSave = JSON.stringify(analyticsData);
        let savedSuccessfully = false;

        try {
            if (typeof(Storage) !== "undefined" && localStorage) {
                localStorage.setItem('ravenAnalytics', dataToSave);
                savedSuccessfully = true;
            }
        } catch (localStorageError) {
            console.warn('localStorage not available:', localStorageError.message);
        }

        if (!savedSuccessfully) {
            try {
                if (typeof(Storage) !== "undefined" && sessionStorage) {
                    sessionStorage.setItem('ravenAnalytics', dataToSave);
                    savedSuccessfully = true;
                }
            } catch (sessionStorageError) {
                console.warn('sessionStorage not available:', sessionStorageError.message);
            }
        }

        window.ravenAnalyticsBackup = analyticsData;
        return savedSuccessfully;
    } catch (error) {
        console.error('Failed to save analytics data:', error);
        return false;
    }
}

function loadAnalyticsData() {
    try {
        let loadedData = null;

        try {
            if (typeof(Storage) !== "undefined" && localStorage) {
                const data = localStorage.getItem('ravenAnalytics');
                if (data) {
                    loadedData = JSON.parse(data);
                }
            }
        } catch (localStorageError) {
            console.warn('Failed to load from localStorage:', localStorageError.message);
        }

        if (!loadedData) {
            try {
                if (typeof(Storage) !== "undefined" && sessionStorage) {
                    const data = sessionStorage.getItem('ravenAnalytics');
                    if (data) {
                        loadedData = JSON.parse(data);
                    }
                }
            } catch (sessionStorageError) {
                console.warn('Failed to load from sessionStorage:', sessionStorageError.message);
            }
        }

        if (!loadedData && window.ravenAnalyticsBackup) {
            loadedData = window.ravenAnalyticsBackup;
        }

        if (loadedData && validateAnalyticsData(loadedData)) {
            analyticsData = loadedData;
            return true;
        }

        throw new Error('No valid data found');

    } catch (error) {
        analyticsData = {
            quizResults: [],
            topicProgress: {},
            subjectProgress: {},
            timeSpent: {}
        };
        return false;
    }
}

function validateAnalyticsData(data) {
    return data &&
           typeof data === 'object' &&
           Array.isArray(data.quizResults) &&
           typeof data.topicProgress === 'object' &&
           typeof data.subjectProgress === 'object';
}

function refreshAllProgressViews() {
    if (currentView === 'analytics') {
        renderAnalytics();
    }

    if (currentView === 'progress') {
        renderProgress();
    }

    renderSubjects();

    if (currentView === 'topics' && currentSubject && subjects[currentSubject.id]) {
        renderTopics(subjects[currentSubject.id].topics);
    }
}

function saveQuizResult(score) {
    const result = {
        id: Date.now(),
        subject: currentSubject.id,
        subjectName: currentSubject.name,
        topic: currentTopic.name,
        score: score.percentage,
        correct: score.correct,
        total: score.total,
        timeSpent: score.timeSpent,
        date: new Date().toISOString(),
        questions: currentQuestions.length
    };

    analyticsData.quizResults.push(result);

    const topicKey = `${currentSubject.id}_${currentTopic.name}`;
    if (!analyticsData.topicProgress[topicKey]) {
        analyticsData.topicProgress[topicKey] = {
            bestScore: 0,
            attempts: 0,
            averageScore: 0,
            totalScore: 0,
            averageTime: 0,
            totalTime: 0
        };
    }

    const topicProgress = analyticsData.topicProgress[topicKey];
    topicProgress.attempts++;
    topicProgress.totalScore += score.percentage;
    topicProgress.averageScore = Math.round(topicProgress.totalScore / topicProgress.attempts * 100) / 100;
    topicProgress.bestScore = Math.max(topicProgress.bestScore, score.percentage);
    topicProgress.totalTime += score.timeSpent;
    topicProgress.averageTime = topicProgress.totalTime / topicProgress.attempts;

    if (!analyticsData.subjectProgress[currentSubject.id]) {
        analyticsData.subjectProgress[currentSubject.id] = {
            bestScore: 0,
            attempts: 0,
            averageScore: 0,
            totalScore: 0
        };
    }

    const subjectProgress = analyticsData.subjectProgress[currentSubject.id];
    subjectProgress.attempts++;
    subjectProgress.totalScore += score.percentage;
    subjectProgress.averageScore = Math.round(subjectProgress.totalScore / subjectProgress.attempts * 100) / 100;
    subjectProgress.bestScore = Math.max(subjectProgress.bestScore, score.percentage);

    saveAnalyticsData();
    refreshAllProgressViews();
}

function getTopicProgress(subjectId, topicName) {
    const topicKey = `${subjectId}_${topicName}`;
    return analyticsData.topicProgress[topicKey] || {
        bestScore: 0,
        attempts: 0,
        averageScore: 0,
        averageTime: 0
    };
}

function getProgressBarColor(score) {
    if (score >= 80) return 'linear-gradient(90deg, #10B981, #059669)';
    if (score >= 60) return 'linear-gradient(90deg, #3B82F6, #1D4ED8)';
    if (score >= 40) return 'linear-gradient(90deg, #F59E0B, #D97706)';
    return 'linear-gradient(90deg, #EF4444, #DC2626)';
}

// ========== INITIALIZATION ==========

async function init() {
    loadAnalyticsData();
    renderSubjects();
    setupEventListeners();
    loadProgress();
    setupSwipeGestures();
}

// ========== SUBJECT RENDERING ==========

function renderSubjects() {
    const subjectGrid = document.getElementById('subjectGrid');
    subjectGrid.innerHTML = '';

    const subjectIcons = {
        'english': 'auto_stories',
        'mathematics': 'functions',
        'physics': 'bolt',
        'chemistry': 'science',
        'biology': 'psychology',
        'computer': 'code',
        'agriculture': 'grass',
        'accounting': 'summarize',
        'commerce': 'business_center',
        'economics': 'show_chart',
        'art': 'brush',
        'music': 'piano',
        'literature': 'book',
        'crs': 'church',
        'islamic-studies': 'star',
        'geography': 'public',
        'government': 'gavel',
        'history': 'history_edu',
        'home-economics': 'home',
        'phe': 'sports_gymnastics'
    };

    const subjectColors = {
        'mathematics': 'from-data-500 to-data-600',
        'physics': 'from-warning to-warning/80',
        'chemistry': 'from-primary-500 to-primary-600',
        'biology': 'from-success to-success/80',
        'english': 'from-accent-500 to-accent-600',
        'economics': 'from-premium-500 to-premium-600',
        'accounting': 'from-data-500 to-data-700',
        'agriculture': 'from-success to-success/80',
        'art': 'from-accent-500 to-accent-700',
        'commerce': 'from-primary-500 to-primary-700',
        'computer': 'from-data-500 to-data-600',
        'crs': 'from-premium-500 to-premium-700',
        'geography': 'from-accent-500 to-accent-600',
        'government': 'from-primary-500 to-primary-600',
        'history': 'from-premium-500 to-premium-600',
        'home-economics': 'from-premium-500 to-premium-600',
        'islamic-studies': 'from-primary-500 to-primary-700',
        'literature': 'from-accent-500 to-accent-700',
        'phe': 'from-primary-500 to-primary-700',
        'music': 'from-premium-500 to-premium-700'
    };

    availableSubjects.forEach((subject, index) => {
        const subjectCard = document.createElement('div');
        subjectCard.className = `material-card stagger-animation material-button w-full flex items-center space-x-4 p-4 sm:p-6 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-700 touch-target bg-white dark:bg-neutral-800 cursor-pointer`;

        const icon = subjectIcons[subject.id] || 'school';
        const color = subjectColors[subject.id] || 'bg-primary-500';

        const subjectProgress = analyticsData.subjectProgress[subject.id];
        const progressText = subjectProgress ? `Avg: ${Math.round(subjectProgress.averageScore)}% | ${subjectProgress.attempts} attempts` : 'Not started';

        subjectCard.innerHTML = `
            <div class="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shadow-material-1">
                <span class="material-icons text-white">${icon}</span>
            </div>
            <div class="flex-1">
                <div class="button-text text-neutral-800 dark:text-white mb-1">${subject.name}</div>
                <div class="caption text-neutral-500 dark:text-neutral-400">${progressText}</div>
            </div>
            <span class="material-icons text-neutral-400">arrow_forward_ios</span>
        `;

        subjectCard.style.animationDelay = `${(index + 1) * 0.1}s`;
        subjectCard.addEventListener('click', () => selectSubject(subject));
        subjectGrid.appendChild(subjectCard);
    });
}

// ========== SUBJECT SELECTION ==========

async function selectSubject(subject) {
    showLoading();
    try {
        const response = await fetch(subject.file);
        if (!response.ok) {
            throw new Error(`Failed to load ${subject.name} data`);
        }
        const data = await response.json();
        subjects[subject.id] = data;
        currentSubject = subject;
        renderTopics(data.topics);
        showTopicSelection();
    } catch (error) {
        showError(`Error loading ${subject.name}: ${error.message}`);
    } finally {
        hideLoading();
    }
}

// ========== TOPIC RENDERING ==========

function renderTopics(topics) {
    const topicGrid = document.getElementById('topicGrid');
    const selectedSubjectTitle = document.getElementById('selectedSubjectTitle');

    selectedSubjectTitle.textContent = currentSubject.name;
    topicGrid.innerHTML = '';

    const colorSchemes = [
        { primary: 'from-blue-500 to-blue-600', accent: 'blue' },
        { primary: 'from-orange-500 to-orange-600', accent: 'orange' },
        { primary: 'from-green-500 to-green-600', accent: 'green' },
        { primary: 'from-red-500 to-red-600', accent: 'red' },
        { primary: 'from-purple-500 to-purple-600', accent: 'purple' },
        { primary: 'from-amber-500 to-amber-600', accent: 'amber' },
        { primary: 'from-teal-500 to-teal-600', accent: 'teal' },
        { primary: 'from-pink-500 to-pink-600', accent: 'pink' },
        { primary: 'from-indigo-500 to-indigo-600', accent: 'indigo' },
        { primary: 'from-lime-500 to-lime-600', accent: 'lime' }
    ];

    const categories = {};
    Object.entries(topics).forEach(([topicId, topic]) => {
        if (!categories[topic.category]) {
            categories[topic.category] = [];
        }
        categories[topic.category].push({ id: topicId, ...topic });
    });

    const categoryNames = Object.keys(categories);
    const categoryColors = {};

    categoryNames.forEach((category, index) => {
        const colorIndex = index % 2 === 0
            ? (index * 2) % colorSchemes.length
            : (index * 2 + 1) % colorSchemes.length;

        categoryColors[category] = colorSchemes[colorIndex];
    });

    Object.entries(categories).forEach(([category, categoryTopics]) => {
        const colors = categoryColors[category];

        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'col-span-full mt-8 mb-2';
        categoryDiv.innerHTML = `
            <div class="flex items-center space-x-3 mb-4">
                <div class="w-1 h-6 bg-gradient-to-b ${colors.primary} rounded-full"></div>
                <h3 class="text-xl font-semibold text-${colors.accent}-600 dark:text-${colors.accent}-400 font-roboto">${category}</h3>
                <div class="flex-1 h-px bg-gradient-to-r from-neutral-300 to-transparent dark:from-neutral-600"></div>
            </div>
        `;
        topicGrid.appendChild(categoryDiv);

        categoryTopics.forEach((topic, index) => {
            const topicCard = document.createElement('div');
            const questionCount = topic.questions ? topic.questions.length : 0;
            const progressData = getTopicProgress(currentSubject.id, topic.name);

            topicCard.className = `material-card stagger-animation material-button w-full flex items-start space-x-4 p-5 sm:p-6 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-2xl hover:border-${colors.accent}-300 dark:hover:border-${colors.accent}-400 hover:shadow-material-2 transition-all duration-300 bg-white dark:bg-neutral-800/50 backdrop-blur-sm ${questionCount > 0 ? 'cursor-pointer hover:scale-[1.02]' : 'opacity-60 cursor-not-allowed'}`;

            const topicIcon = getTopicIcon(topic.name, topic.category);

            topicCard.innerHTML = `
                <div class="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${colors.primary} rounded-xl flex items-center justify-center shadow-material-1 group-hover:shadow-material-2 transition-shadow duration-300 mt-1">
                    <span class="material-icons text-white text-base sm:text-lg">${topicIcon}</span>
                </div>
                <div class="flex-1 min-w-0 overflow-hidden">
                    <div class="button-text text-neutral-800 dark:text-white mb-1 font-roboto break-words whitespace-normal">${topic.name}</div>
                    <div class="caption text-neutral-500 dark:text-neutral-400 mb-2 font-roboto">${questionCount} questions</div>
                    ${progressData.attempts > 0 ?
                        `<div class="space-y-2">
                            <div class="flex justify-between items-center text-xs font-roboto">
                                <span class="text-neutral-500 dark:text-neutral-400">Progress</span>
                                <span class="font-medium text-${colors.accent}-600 dark:text-${colors.accent}-400">${Math.round(progressData.averageScore)}%</span>
                            </div>
                            <div class="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1.5">
                                <div class="h-1.5 rounded-full transition-all duration-500 ease-out" style="width: ${progressData.averageScore}%; background: ${getProgressBarColor(progressData.averageScore)}"></div>
                            </div>
                            <div class="flex justify-between text-xs text-neutral-400 dark:text-neutral-500 font-roboto">
                                <span>Best: ${Math.round(progressData.bestScore)}%</span>
                                <span>Avg: ${Math.round(progressData.averageScore)}%</span>
                                <span>${progressData.attempts} attempts</span>
                            </div>
                        </div>` :
                        `<div class="text-xs text-neutral-400 dark:text-neutral-500 italic font-roboto">Not attempted yet</div>`
                    }
                </div>
                <span class="material-icons text-neutral-300 dark:text-neutral-500 group-hover:text-${colors.accent}-600 dark:group-hover:text-${colors.accent}-400 transition-colors duration-300 flex-shrink-0 mt-1 ${questionCount === 0 ? 'opacity-50' : ''}">arrow_forward_ios</span>
            `;

            topicCard.style.animationDelay = `${(index + 1) * 0.08}s`;

            if (questionCount > 0) {
                topicCard.addEventListener('click', () => startQuiz(topic));
                topicCard.title = `Start ${topic.name} quiz`;
                topicCard.classList.add('group');
            } else {
                topicCard.title = 'No questions available for this topic';
            }

            topicGrid.appendChild(topicCard);
        });
    });
}

// ========== QUIZ FUNCTIONS ==========

function startQuiz(topic) {
    if (!topic.questions || topic.questions.length === 0) {
        showError('No questions available for this topic');
        return;
    }

    currentTopic = topic;
    currentQuestions = [...topic.questions];
    currentQuestionIndex = 0;
    userAnswers = [];
    quizStartTime = Date.now();

    currentQuestions = shuffleArray(currentQuestions);

    renderQuestion();
    showQuizInterface();
}

function renderQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    if (!question) return;

    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('totalQuestions').textContent = currentQuestions.length;
    document.getElementById('questionMeta').textContent = `${currentTopic.name} - ${currentTopic.category}`;
    document.getElementById('questionText').textContent = question.question;

    const progress = ((currentQuestionIndex) / currentQuestions.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;

    const optionsContainer = document.getElementById('questionOptions');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionBtn = document.createElement('div');
        optionBtn.className = 'option-btn material-button p-4 rounded-lg border-2 border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white cursor-pointer touch-target';
        optionBtn.innerHTML = `
            <div class="flex items-center space-x-3">
                <span class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-medium text-sm">${String.fromCharCode(65 + index)}</span>
                <span class="body-1 flex-1">${option}</span>
            </div>
        `;

        const isSelected = userAnswers[currentQuestionIndex] === index;
        if (isSelected) {
            optionBtn.classList.add('selected');
        }

        optionBtn.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionBtn);
    });

    updateNavigationButtons();
    document.getElementById('explanationBox').classList.add('hidden');
}

function selectOption(optionIndex) {
    userAnswers[currentQuestionIndex] = optionIndex;

    const options = document.querySelectorAll('.option-btn');
    options.forEach((option, index) => {
        option.classList.remove('selected');
        if (index === optionIndex) {
            option.classList.add('selected');
        }
    });

    updateNavigationButtons();
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const explainBtn = document.getElementById('explainBtn');

    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.disabled = userAnswers[currentQuestionIndex] === undefined;
    explainBtn.disabled = userAnswers[currentQuestionIndex] === undefined;

    if (currentQuestionIndex === currentQuestions.length - 1) {
        nextBtn.textContent = 'Finish Quiz';
    } else {
        nextBtn.textContent = 'Next';
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    }
}

function nextQuestion() {
    if (currentQuestionIndex < currentQuestions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        finishQuiz();
    }
}

function showExplanation() {
    const question = currentQuestions[currentQuestionIndex];
    const explanationBox = document.getElementById('explanationBox');
    const explanationText = document.getElementById('explanationText');

    if (question.explanation) {
        explanationText.textContent = question.explanation;
        explanationBox.classList.remove('hidden');

        const options = document.querySelectorAll('.option-btn');
        const correctIndex = question.answer.charCodeAt(0) - 97;
        const userIndex = userAnswers[currentQuestionIndex];

        options.forEach((option, index) => {
            option.classList.remove('selected');
            if (index === correctIndex) {
                option.classList.add('correct');
            } else if (index === userIndex && index !== correctIndex) {
                option.classList.add('incorrect');
            }
        });
    }
}

function finishQuiz() {
    const score = calculateScore();
    saveQuizResult(score);
    showQuizResults(score);
}

function calculateScore() {
    let correct = 0;
    currentQuestions.forEach((question, index) => {
        const correctIndex = question.answer.charCodeAt(0) - 97;
        if (userAnswers[index] === correctIndex) {
            correct++;
        }
    });
    return {
        correct,
        total: currentQuestions.length,
        percentage: (correct / currentQuestions.length) * 100,
        timeSpent: Date.now() - quizStartTime
    };
}

function showQuizResults(score) {
    document.getElementById('finalScore').textContent = `${Math.round(score.percentage)}%`;
    document.getElementById('scoreDetails').textContent = `${score.correct} out of ${score.total} correct`;

    document.getElementById('quizResults').classList.remove('hidden');
    document.querySelector('#quizInterface .material-card').classList.add('hidden');

    const navigationContainer = document.getElementById('quizNavigation');
    if (navigationContainer) {
        navigationContainer.classList.add('hidden');
    }
}

// ========== SWIPE GESTURE FUNCTIONS ==========

function setupSwipeGestures() {
    const quizCard = document.getElementById('quizCard');
    if (!quizCard) return;

    quizCard.addEventListener('touchstart', handleTouchStart, { passive: true });
    quizCard.addEventListener('touchmove', handleTouchMove, { passive: true });
    quizCard.addEventListener('touchend', handleTouchEnd, { passive: true });

    quizCard.addEventListener('mousedown', handleMouseDown);
    quizCard.addEventListener('mousemove', handleMouseMove);
    quizCard.addEventListener('mouseup', handleMouseUp);
    quizCard.addEventListener('dblclick', handleDoubleClick);
}

function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;

    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTapTime;
    if (tapLength < DOUBLE_TAP_DELAY && tapLength > 0) {
        handleDoubleTap(e);
        e.preventDefault();
    }
    lastTapTime = currentTime;
}

function handleTouchMove(e) {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;

    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    if (Math.abs(diffX) > 30) {
        if (diffX > 0) {
            document.getElementById('swipeIndicatorRight').classList.add('active');
            document.getElementById('swipeIndicatorLeft').classList.remove('active');
        } else {
            document.getElementById('swipeIndicatorLeft').classList.add('active');
            document.getElementById('swipeIndicatorRight').classList.remove('active');
        }
    }
}

function handleTouchEnd(e) {
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    document.getElementById('swipeIndicatorLeft').classList.remove('active');
    document.getElementById('swipeIndicatorRight').classList.remove('active');

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > MIN_SWIPE_DISTANCE) {
        if (diffX > 0) {
            nextQuestion();
        } else {
            previousQuestion();
        }
    }
}

function handleMouseDown(e) {
    isMouseDown = true;
    touchStartX = e.screenX;
    touchStartY = e.screenY;
}

function handleMouseMove(e) {
    if (!isMouseDown) return;

    touchEndX = e.screenX;
    touchEndY = e.screenY;

    const diffX = touchStartX - touchEndX;

    if (Math.abs(diffX) > 30) {
        if (diffX > 0) {
            document.getElementById('swipeIndicatorRight').classList.add('active');
            document.getElementById('swipeIndicatorLeft').classList.remove('active');
        } else {
            document.getElementById('swipeIndicatorLeft').classList.add('active');
            document.getElementById('swipeIndicatorRight').classList.remove('active');
        }
    }
}

function handleMouseUp(e) {
    if (!isMouseDown) return;
    isMouseDown = false;

    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    document.getElementById('swipeIndicatorLeft').classList.remove('active');
    document.getElementById('swipeIndicatorRight').classList.remove('active');

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > MIN_SWIPE_DISTANCE) {
        if (diffX > 0) {
            nextQuestion();
        } else {
            previousQuestion();
        }
    }
}

function handleDoubleTap(e) {
    showExplanation();
    createDoubleTapFeedback(e);
}

function handleDoubleClick(e) {
    showExplanation();
    createDoubleTapFeedback(e);
}

function createDoubleTapFeedback(e) {
    const quizCard = document.getElementById('quizCard');
    const feedback = document.createElement('div');
    feedback.className = 'double-tap-feedback';

    const rect = quizCard.getBoundingClientRect();
    const x = (e.clientX || e.changedTouches[0].clientX) - rect.left - 50;
    const y = (e.clientY || e.changedTouches[0].clientY) - rect.top - 50;

    feedback.style.left = `${x}px`;
    feedback.style.top = `${y}px`;

    quizCard.appendChild(feedback);
    setTimeout(() => {
        quizCard.removeChild(feedback);
    }, 600);
}

// ========== PROGRESS RENDERING ==========

function renderProgress() {
    const overallStats = document.getElementById('overallStats');
    const subjectStats = document.getElementById('subjectStats');

    if (analyticsData.quizResults.length === 0) {
        overallStats.innerHTML = '<p class="text-neutral-500 dark:text-neutral-400 text-center py-4">No quiz data yet. Start practicing!</p>';
        subjectStats.innerHTML = '<p class="text-neutral-500 dark:text-neutral-400 text-center py-4">Complete quizzes to see your progress.</p>';
        return;
    }

    const totalQuizzes = analyticsData.quizResults.length;
    const averageScore = analyticsData.quizResults.reduce((sum, result) => sum + result.score, 0) / totalQuizzes;
    const bestScore = Math.max(...analyticsData.quizResults.map(r => r.score));

    overallStats.innerHTML = `
        <div class="space-y-4">
            <div class="flex justify-between items-center">
                <span class="text-neutral-600 dark:text-neutral-400">Total Quizzes:</span>
                <span class="font-bold text-neutral-800 dark:text-white">${totalQuizzes}</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-neutral-600 dark:text-neutral-400">Average Score:</span>
                <span class="font-bold text-accent">${Math.round(averageScore)}%</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-neutral-600 dark:text-neutral-400">Best Score:</span>
                <span class="font-bold text-success">${Math.round(bestScore)}%</span>
            </div>
        </div>
    `;

    const subjectScores = {};
    analyticsData.quizResults.forEach(result => {
        if (!subjectScores[result.subjectName]) {
            subjectScores[result.subjectName] = [];
        }
        subjectScores[result.subjectName].push(result.score);
    });

    let subjectHTML = '<div class="space-y-3">';
    Object.entries(subjectScores).forEach(([subject, scores]) => {
        const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
        subjectHTML += `
            <div>
                <div class="flex justify-between mb-1">
                    <span class="text-sm text-neutral-600 dark:text-neutral-400">${subject}</span>
                    <span class="text-sm font-medium text-neutral-800 dark:text-white">${Math.round(avg)}%</span>
                </div>
                <div class="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                    <div class="h-2 rounded-full" style="width: ${avg}%; background: ${getProgressBarColor(avg)}"></div>
                </div>
            </div>
        `;
    });
    subjectHTML += '</div>';
    subjectStats.innerHTML = subjectHTML;
}

function loadProgress() {
    // Placeholder for loading progress
}

// ========== ANALYTICS RENDERING ==========

function renderAnalytics() {
    if (analyticsData.quizResults.length === 0) {
        document.getElementById('analyticsOverallScore').textContent = '--%';
        document.getElementById('analyticsMasteredCount').textContent = '--/--';
        document.getElementById('analyticsWeakCount').textContent = '--';
        document.getElementById('analyticsAvgTime').textContent = '--min';
        document.getElementById('analyticsHeatmap').innerHTML = '<p class="text-neutral-500 dark:text-neutral-400 text-center py-8">No data available. Start practicing!</p>';
        document.getElementById('analyticsRecommendations').innerHTML = '<p class="text-neutral-500 dark:text-neutral-400 text-center py-4 col-span-full">Complete quizzes to get personalized recommendations.</p>';
        return;
    }

    const avgScore = analyticsData.quizResults.reduce((sum, r) => sum + r.score, 0) / analyticsData.quizResults.length;
    document.getElementById('analyticsOverallScore').textContent = `${Math.round(avgScore)}%`;
    document.getElementById('analyticsProgressText').textContent = `${Math.round(avgScore)}%`;

    const topicKeys = Object.keys(analyticsData.topicProgress);
    const masteredTopics = topicKeys.filter(key => analyticsData.topicProgress[key].averageScore >= 80).length;
    const weakTopics = topicKeys.filter(key => analyticsData.topicProgress[key].averageScore < 60).length;

    document.getElementById('analyticsMasteredCount').textContent = `${masteredTopics}/${topicKeys.length}`;
    document.getElementById('analyticsWeakCount').textContent = weakTopics;

    const avgTime = analyticsData.quizResults.reduce((sum, r) => sum + r.timeSpent, 0) / analyticsData.quizResults.length;
    document.getElementById('analyticsAvgTime').textContent = `${Math.round(avgTime / 60000)}min`;

    renderHeatmap();
    renderCharts();
    renderRecommendations();
}

function renderHeatmap() {
    const heatmapContainer = document.getElementById('analyticsHeatmap');
    heatmapContainer.innerHTML = '<div class="heatmap-grid"></div>';
    const grid = heatmapContainer.querySelector('.heatmap-grid');

    Object.entries(analyticsData.topicProgress).forEach(([key, data]) => {
        const [subjectId, topicName] = key.split('_');
        const score = data.averageScore;

        let statusClass = 'status-unstarted';
        if (score >= 80) statusClass = 'status-excellent';
        else if (score >= 60) statusClass = 'status-good';
        else if (score >= 40) statusClass = 'status-average';
        else if (score > 0) statusClass = 'status-weak';

        const cell = document.createElement('div');
        cell.className = `heatmap-cell ${statusClass} text-white`;
        cell.innerHTML = `
            <div class="font-semibold text-sm mb-1">${topicName.substring(0, 20)}${topicName.length > 20 ? '...' : ''}</div>
            <div class="text-2xl font-bold">${Math.round(score)}%</div>
            <div class="text-xs opacity-90">${data.attempts} attempts</div>
        `;
        grid.appendChild(cell);
    });
}

function renderCharts() {
    // Placeholder for chart rendering
    const trendCanvas = document.getElementById('analyticsTrendChart');
    const subjectCanvas = document.getElementById('analyticsSubjectChart');

    if (trendCanvas && subjectCanvas) {
        // You can implement Chart.js charts here
    }
}

function renderRecommendations() {
    const recommendationsContainer = document.getElementById('analyticsRecommendations');
    recommendationsContainer.innerHTML = '<p class="text-neutral-500 dark:text-neutral-400 text-center py-4 col-span-full">Keep practicing to improve your scores!</p>';
}

// ========== EVENT LISTENERS ==========

function setupEventListeners() {
    // Mobile menu
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    closeMobileMenu.addEventListener('click', closeMobileMenuFunc);
    mobileMenuOverlay.addEventListener('click', (e) => {
        if (e.target === mobileMenuOverlay) {
            closeMobileMenuFunc();
        }
    });

    // Desktop navigation
    document.getElementById('practiceBtn').addEventListener('click', showSubjectSelection);
    document.getElementById('tutorBtn').addEventListener('click', showTutorInterface);
    document.getElementById('progressBtn').addEventListener('click', showProgressInterface);
    document.getElementById('analyticsBtn').addEventListener('click', showAnalyticsInterface);

    // Mobile navigation
    document.getElementById('mobilePracticeBtn').addEventListener('click', () => {
        showSubjectSelection();
        closeMobileMenuFunc();
    });
    document.getElementById('mobileTutorBtn').addEventListener('click', () => {
        showTutorInterface();
        closeMobileMenuFunc();
    });
    document.getElementById('mobileProgressBtn').addEventListener('click', () => {
        showProgressInterface();
        closeMobileMenuFunc();
    });
    document.getElementById('mobileAnalyticsBtn').addEventListener('click', () => {
        showAnalyticsInterface();
        closeMobileMenuFunc();
    });

    // Quiz navigation
    document.getElementById('backToSubjects').addEventListener('click', showSubjectSelection);
    document.getElementById('backToTopics').addEventListener('click', () => {
        if (currentSubject && subjects[currentSubject.id]) {
            renderTopics(subjects[currentSubject.id].topics);
            showTopicSelection();
        } else {
            showSubjectSelection();
        }
    });

    document.getElementById('prevBtn').addEventListener('click', previousQuestion);
    document.getElementById('nextBtn').addEventListener('click', nextQuestion);
    document.getElementById('explainBtn').addEventListener('click', showExplanation);

    document.getElementById('retakeBtn').addEventListener('click', () => {
        if (currentTopic) {
            startQuiz(currentTopic);
        }
    });

    document.getElementById('backToTopicsFromResults').addEventListener('click', () => {
        if (currentSubject && subjects[currentSubject.id]) {
            renderTopics(subjects[currentSubject.id].topics);
            showTopicSelection();
        } else {
            showSubjectSelection();
        }
    });

    // Tutor input
    document.getElementById('sendTutorBtn').addEventListener('click', sendTutorMessage);
    document.getElementById('tutorInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendTutorMessage();
        }
    });
}

function sendTutorMessage() {
    const input = document.getElementById('tutorInput');
    const chat = document.getElementById('tutorChat');
    const message = input.value.trim();

    if (!message) return;

    // Clear the placeholder if it exists
    if (chat.querySelector('p.text-center')) {
        chat.innerHTML = '';
    }

    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'mb-4 p-3 bg-primary text-white rounded-lg max-w-[80%] ml-auto';
    userMsg.textContent = message;
    chat.appendChild(userMsg);

    // Add bot response (placeholder)
    const botMsg = document.createElement('div');
    botMsg.className = 'mb-4 p-3 bg-neutral-200 dark:bg-neutral-600 text-neutral-800 dark:text-white rounded-lg max-w-[80%]';
    botMsg.textContent = 'This is a demo. AI Tutor functionality would be integrated here using the Poe Embed API.';
    chat.appendChild(botMsg);

    // Scroll to bottom
    chat.scrollTop = chat.scrollHeight;

    // Clear input
    input.value = '';
}

// Initialize the app
init();