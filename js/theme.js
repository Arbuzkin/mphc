(function() {
    const LOGO_DARK = 'img/logo_dark.png';
    const LOGO_LIGHT = 'img/logo_light.png';
    const BIG_LOGO_DARK = 'img/big_logo_dark.png';
    const BIG_LOGO_LIGHT = 'img/big_logo_light.png';

    function setLogo(theme) {
        const logoImg = document.getElementById('logo-img');
        const bigLogoImg = document.getElementById('big-logo-img');
        if (logoImg) logoImg.src = theme === 'light' ? LOGO_LIGHT : LOGO_DARK;
        if (bigLogoImg) bigLogoImg.src = theme === 'light' ? BIG_LOGO_LIGHT : BIG_LOGO_DARK;
    }

    function applyTheme(theme) {
        if (theme === 'light') {
            document.body.classList.add('light');
        } else {
            document.body.classList.remove('light');
        }
        localStorage.setItem('mfc-theme', theme);
        setLogo(theme);
        const btn = document.querySelector('.theme-toggle');
        if (btn) btn.textContent = theme === 'light' ? 'dark' : 'light';
    }

    function initTheme() {
        const saved = localStorage.getItem('mfc-theme');
        if (saved) {
            applyTheme(saved);
        } else {
            const prefers = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
            applyTheme(prefers);
        }
        const btn = document.querySelector('.theme-toggle');
        if (btn) {
            btn.addEventListener('click', () => {
                const isLight = document.body.classList.contains('light');
                applyTheme(isLight ? 'dark' : 'light');
            });
        }
    }

    function initStarRating() {
        const starsRow = document.getElementById('starsRow');
        if (!starsRow) return;
        const stars = starsRow.querySelectorAll('span');
        let selected = 0;
        stars.forEach((star, i) => {
            star.addEventListener('mouseenter', () => {
                stars.forEach((s, j) => s.classList.toggle('active', j <= i));
            });
            star.addEventListener('mouseleave', () => {
                stars.forEach((s, j) => s.classList.toggle('active', j <= selected - 1));
            });
            star.addEventListener('click', () => {
                selected = i + 1;
                stars.forEach((s, j) => s.classList.toggle('active', j <= i));
            });
        });
    }

    function initVoting() {
        document.querySelectorAll('.vote-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const isUp = this.textContent.trim() === '↑';
                this.style.background = isUp ? '#2a4a2a' : '#4a2a2a';
                setTimeout(() => { this.style.background = ''; }, 400);
            });
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        initTheme();
        initStarRating();
        initVoting();
    });
})();