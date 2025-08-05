// js/config.js
export const CONFIG = {
    PRIMARY_COLOR: 'var(--primary)',
    PRIMARY_DARK: 'var(--primary-600)',
    DEFAULT_BOT: '@Claude-Sonnet-4',
    QUESTION_SHUFFLE: true,
    ANIMATION_DURATION: 300
};

export const SUBJECTS_META = {
    mathematics: { 
        name: "Mathematics", 
        icon: "🔢", 
        color: "bg-primary-500",
        dataFile: "data/mathematics.json"
    },
    physics: { 
        name: "Physics", 
        icon: "⚛️", 
        color: "bg-accent",
        dataFile: "data/physics.json"
    },
    chemistry: { 
        name: "Chemistry", 
        icon: "🧪", 
        color: "bg-primary",
        dataFile: "data/chemistry.json"
    },
    biology: { 
        name: "Biology", 
        icon: "🧬", 
        color: "bg-success",
        dataFile: "data/biology.json"
    },
    english: { 
        name: "English", 
        icon: "📚", 
        color: "bg-warning",
        dataFile: "data/english.json"
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
                primary: {
                    50: 'var(--primary-50)',
                    100: 'var(--primary-100)',
                    500: 'var(--primary)',
                    600: 'var(--primary-600)',
                    700: 'var(--primary-700)',
                    DEFAULT: 'var(--primary)'
                },
                accent: {
                    50: 'var(--accent-50)',
                    100: 'var(--accent-100)',
                    500: 'var(--accent)',
                    600: 'var(--accent-600)',
                    700: 'var(--accent-700)',
                    DEFAULT: 'var(--accent)'
                },
                neutral: {
                    25: 'var(--neutral-25)',
                    50: 'var(--neutral-50)',
                    100: 'var(--neutral-100)',
                    200: 'var(--neutral-200)',
                    300: 'var(--neutral-300)',
                    400: 'var(--neutral-400)',
                    500: 'var(--neutral-500)',
                    600: 'var(--neutral-600)',
                    700: 'var(--neutral-700)',
                    800: 'var(--neutral-800)',
                    900: 'var(--neutral-900)'
                }
            }
        }
    }
};