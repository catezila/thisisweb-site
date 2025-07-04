document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const sunIcon = document.getElementById('sun-icon');

    // Check for saved theme preference, default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    body.classList.add(`${currentTheme}-theme`);

    const toggleTheme = () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark');
        }
    };

    sunIcon.addEventListener('click', toggleTheme);
});
