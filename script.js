document.addEventListener('DOMContentLoaded', () => {
    // **Visitor Counter**
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

    // Initialize visitor count on page load
    (async () => {
        try {
            const response = await fetch('https://counterapi.dev/get/deans-list/visits');
            const data = await response.json();
            document.getElementById('visitor-count').textContent = String(data.value).padStart(4, '0');
        } catch (error) {
            document.getElementById('visitor-count').textContent = '????';
        }
    })();

    // **Theme Toggler**
    window.toggleTheme = () => {
        const current = document.body.getAttribute('data-theme') || 'dark';
        const newTheme = current === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('siteTheme', newTheme);
        document.getElementById('theme-icon').textContent = 
            newTheme === 'dark' ? '🌑' : '☀️';
    };

    // Initialize theme based on saved preference or default to dark
    const savedTheme = localStorage.getItem('siteTheme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    document.getElementById('theme-icon').textContent = 
        savedTheme === 'dark' ? '🌑' : '☀️';

    // **External Links**
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (!link.href.includes(window.location.host)) {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }
    });

    // **Category Tags Logic**
    const categoryTags = document.querySelectorAll('.category-tag');
    const categoryContents = document.querySelectorAll('.category-content');

    function showCategory(categoryId) {
        // Remove 'active' class from all tags
        categoryTags.forEach(tag => tag.classList.remove('active'));

        // Add 'active' class to the clicked tag
        const selectedTag = document.querySelector(`.category-tag[data-category="${categoryId}"]`);
        if (selectedTag) selectedTag.classList.add('active');

        // Hide all content sections with a fade-out effect
        categoryContents.forEach(content => {
            if (content.classList.contains('active')) {
                content.classList.remove('active');
                setTimeout(() => {
                    content.style.display = 'none';
                }, 300); // Matches the CSS transition duration of 0.3s
            } else {
                content.style.display = 'none';
            }
        });

        // Show the selected content with a fade-in effect
        const selectedContent = document.getElementById(categoryId);
        if (selectedContent) {
            selectedContent.style.display = 'block';
            setTimeout(() => {
                selectedContent.classList.add('active');
            }, 10); // Small delay to trigger the CSS transition
        }
    }

    // Add click event listeners to all category tags
    categoryTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const categoryId = tag.getAttribute('data-category');
            showCategory(categoryId);
        });
    });

    // Show the first category by default when the page loads
    if (categoryTags.length > 0) {
        const firstCategory = categoryTags[0].getAttribute('data-category');
        showCategory(firstCategory);
    }
});
