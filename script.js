document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const themeSwitcher = document.querySelector('.theme-switcher');
    const sunIcon = document.getElementById('sun-icon');

    // Check for saved theme preference, default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    body.classList.add(`${currentTheme}-theme`);

    // Update theme switcher aria-label based on current theme
    const updateThemeSwitcherLabel = () => {
        const isDark = body.classList.contains('dark-theme');
        themeSwitcher.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    };

    const toggleTheme = () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark');
        }
        updateThemeSwitcherLabel();

        // Announce theme change to screen readers
        const announcement = body.classList.contains('dark-theme') ? 'Dark theme activated' : 'Light theme activated';
        announceToScreenReader(announcement);
    };

    // Keyboard navigation support
    themeSwitcher.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleTheme();
        }
    });

    themeSwitcher.addEventListener('click', toggleTheme);

    // Initialize theme switcher label
    updateThemeSwitcherLabel();

    // Add keyboard navigation for collection cards
    const collectionCards = document.querySelectorAll('.collection-card');
    collectionCards.forEach((card, index) => {
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });

        // Add focus management
        card.addEventListener('focus', () => {
            card.style.transform = 'scale(1.02)';
        });

        card.addEventListener('blur', () => {
            card.style.transform = '';
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Screen reader announcement utility
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;

        document.body.appendChild(announcement);

        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // Add reduced motion support
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--transition-fast', 'none');
        document.documentElement.style.setProperty('--transition-normal', 'none');
        document.documentElement.style.setProperty('--transition-slow', 'none');
    }

    // Mobile-specific optimizations
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;

    // Viewport height fix for mobile browsers
    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', () => {
        setTimeout(setVH, 100);
    });

    // Performance optimization: Lazy load images
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('fade-in');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Add loading states
    const addLoadingStates = () => {
        const interactiveElements = document.querySelectorAll('button, a, .theme-switcher');

        interactiveElements.forEach(el => {
            el.addEventListener('click', () => {
                el.classList.add('loading');
                setTimeout(() => el.classList.remove('loading'), 300);
            });
        });
    };

    addLoadingStates();
});
