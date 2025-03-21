document.addEventListener('DOMContentLoaded', () => {
    // Collapsible Sections Initialization
    document.querySelectorAll('.category-section').forEach(section => {
        const toggle = section.querySelector('.section-toggle');
        const content = toggle.nextElementSibling;
        const savedState = localStorage.getItem(`section-${section.id}-open`);
        
        content.style.transition = 'max-height 0.3s ease-out';
        content.style.overflow = 'hidden';
        
        if (savedState !== null) {
            content.style.maxHeight = savedState;
            if (savedState !== '0px') toggle.classList.add('active');
        } else {
            content.style.maxHeight = '0px';
        }
    });

    // Collapsible Toggle Handler
    document.querySelectorAll('.section-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            const isCollapsed = content.style.maxHeight === '0px';
            
            content.style.maxHeight = isCollapsed 
                ? `${content.scrollHeight}px` 
                : '0px';
                
            toggle.classList.toggle('active', isCollapsed);
            toggle.setAttribute('aria-expanded', isCollapsed);
            localStorage.setItem(`section-${toggle.closest('.category-section').id}-open`, content.style.maxHeight);
        });
    });

    // Visitor Counter
    const presenceButton = document.getElementById('presence-button');
    const updateCounter = async () => {
        try {
            const response = await fetch('https://counterapi.dev/hit/deans-list/visits');
            const data = await response.json();
            document.getElementById('visitor-count').textContent = String(data.value).padStart(4, '0');
            presenceButton.textContent = '🌌 Presence Acknowledged';
            setTimeout(() => {
                presenceButton.textContent = '🌌 Leave Digital Footprint';
            }, 2000);
        } catch (error) {
            presenceButton.textContent = '🌠 Cosmic Interference';
        }
    };
    presenceButton.addEventListener('click', updateCounter);

    // Initialize visitor count
    (async () => {
        try {
            const response = await fetch('https://counterapi.dev/get/deans-list/visits');
            const data = await response.json();
            document.getElementById('visitor-count').textContent = String(data.value).padStart(4, '0');
        } catch (error) {
            document.getElementById('visitor-count').textContent = '????';
        }
    })();

    // Theme Toggler
    window.toggleTheme = () => {
        const current = document.body.getAttribute('data-theme') || 'dark';
        const newTheme = current === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('siteTheme', newTheme);
        document.getElementById('theme-icon').textContent = 
            newTheme === 'dark' ? '🌑' : '☀️';
    };

    // Initialize theme
    const savedTheme = localStorage.getItem('siteTheme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    document.getElementById('theme-icon').textContent = 
        savedTheme === 'dark' ? '🌑' : '☀️';

    // External Links
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (!link.href.includes(window.location.host)) {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }
    });
});
