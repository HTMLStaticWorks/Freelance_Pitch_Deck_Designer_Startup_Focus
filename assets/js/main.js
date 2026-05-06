document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS Animation
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
            easing: 'ease-out-cubic',
        });
    }

    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Check local storage for theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-bs-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-bs-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            htmlElement.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeToggleBtn) return;
        const icon = themeToggleBtn.querySelector('i');
        if (icon) {
            if (theme === 'dark') {
                icon.className = 'ph ph-sun';
            } else {
                icon.className = 'ph ph-moon';
            }
        }
    }

    // Sticky Navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-sm');
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                if (htmlElement.getAttribute('data-bs-theme') === 'dark') {
                    navbar.style.background = 'rgba(15, 23, 42, 0.98)';
                }
            } else {
                navbar.classList.remove('shadow-sm');
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                if (htmlElement.getAttribute('data-bs-theme') === 'dark') {
                    navbar.style.background = 'rgba(15, 23, 42, 0.95)';
                }
            }
        });
    }

    // RTL Toggle Logic
    const rtlToggleBtn = document.getElementById('rtlToggle');
    if (rtlToggleBtn) {
        // Check local storage for RTL
        const savedRtl = localStorage.getItem('rtl') === 'true';
        if (savedRtl) {
            htmlElement.setAttribute('dir', 'rtl');
        }

        rtlToggleBtn.addEventListener('click', () => {
            const isRtl = htmlElement.getAttribute('dir') === 'rtl';
            const nextRtl = !isRtl;
            htmlElement.setAttribute('dir', nextRtl ? 'rtl' : 'ltr');
            localStorage.setItem('rtl', nextRtl);
        });
    }

    // Close mobile menu on link click
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            });
        });
    }
});
