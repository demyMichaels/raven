// js/config.js
export const CONFIG = {
    PRIMARY_COLOR: '#5cb9deff',
    PRIMARY_DARK: '#c5ae49ff',
    DEFAULT_BOT: '@Claude-Sonnet-4',
    QUESTION_SHUFFLE: true,
    ANIMATION_DURATION: 300
};

export const SUBJECTS_META = {
    mathematics: { 
        name: "Mathematics", 
        icon: "🔢", 
        color: "bg-blue-500",
        dataFile: "data/mathematics"
    },
    physics: { 
        name: "Physics", 
        icon: "⚛️", 
        color: "bg-green-500",
        dataFile: "data/physics.json"
    },
    chemistry: { 
        name: "Chemistry", 
        icon: "🧪", 
        color: "bg-purple-500",
        dataFile: "data/chemistry.json"
    }
};

// Dark mode setup
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    document.documentElement.classList.toggle('dark', event.matches);
});

// Tailwind configuration
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: CONFIG.PRIMARY_COLOR,
                'primary-dark': CONFIG.PRIMARY_DARK
            }
        }
    }
};