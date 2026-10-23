(() => {
    const THEME_KEY = 'lifer-tools-theme';
    const toggleSelectors = ['#theme-toggle', '#darkModeToggle', '#ttsThemeToggle', '#asciiThemeToggle'];
    const labelSelectors = ['#theme-toggle-label', '#darkModeText', '#ttsThemeLabel', '#asciiThemeLabel'];
    const legacyKeys = [
        'unit_calc_pro_darkMode',
        'random_password_tool_darkMode',
        'pro_rich_text_analyzer_notebook_darkMode'
    ];

    function readTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;

        for (const key of legacyKeys) {
            const legacyValue = localStorage.getItem(key);
            if (legacyValue === 'enabled' || legacyValue === 'disabled') {
                const theme = legacyValue === 'enabled' ? 'dark' : 'light';
                localStorage.setItem(THEME_KEY, theme);
                return theme;
            }
        }

        return 'light';
    }

    function applyTheme(theme) {
        const isDark = theme === 'dark';
        document.documentElement.dataset.theme = theme;
        document.documentElement.style.colorScheme = theme;
        document.body.classList.toggle('dark', isDark);

        const themeColor = document.querySelector('meta[name="theme-color"]');
        if (themeColor) themeColor.content = isDark ? '#151a27' : '#f5f7fb';

        for (const selector of toggleSelectors) {
            const button = document.querySelector(selector);
            if (!button) continue;
            button.setAttribute('aria-pressed', String(isDark));
            if (button.id !== 'theme-toggle') {
                const label = button.querySelector('span');
                if (label) label.textContent = `${isDark ? '淺色' : '深色'}模式`;
            }
            if (button.id === 'theme-toggle') {
                button.setAttribute('aria-label', `切換${isDark ? '淺色' : '深色'}模式`);
            }
        }

        for (const selector of labelSelectors) {
            const label = document.querySelector(selector);
            if (label) label.textContent = `${isDark ? '淺色' : '深色'}模式`;
        }
    }

    function setTheme(theme) {
        localStorage.setItem(THEME_KEY, theme);
        applyTheme(theme);
    }

    applyTheme(readTheme());

    for (const selector of toggleSelectors) {
        const button = document.querySelector(selector);
        button?.addEventListener('click', () => {
            setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
        });
    }

    window.addEventListener('storage', event => {
        if (event.key === THEME_KEY && (event.newValue === 'dark' || event.newValue === 'light')) {
            applyTheme(event.newValue);
        }
    });
})();
