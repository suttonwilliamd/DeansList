document.addEventListener('DOMContentLoaded', () => {
    // **Load Resources Dynamically from JSON**
    const loadResources = async () => {
        try {
            const response = await fetch('./resources.json');
            if (response.ok) {
                const data = await response.json();
                
                // Process each section
                data.sections.forEach(section => {
                    const sectionElement = document.getElementById(section.id);
                    if (!sectionElement) return; // Skip if section doesn't exist in DOM
                    
                    // Clear existing content
                    sectionElement.innerHTML = '';
                    
                    // Add resources to the section
                    section.resources.forEach(resource => {
                        const resourceCard = document.createElement('article');
                        resourceCard.className = 'resource-card';
                        
                        // Create rating stars
                        const stars = '★'.repeat(resource.rating) + '☆'.repeat(5 - resource.rating);
                        
                        resourceCard.innerHTML = `
                            <h3>${resource.title}</h3>
                            <div class="resource-meta">
                                <span class="resource-type">${resource.type}</span>
                                <span class="resource-rating">${stars}</span>
                            </div>
                            <a href="${resource.url}" target="_blank" rel="noopener noreferrer" class="resource-link">
                                ${resource.description}
                                <span class="external-indicator">⤴</span>
                            </a>
                            <p class="resource-comment">${resource.comment}</p>
                        `;
                        
                        sectionElement.appendChild(resourceCard);
                    });
                });
            }
        } catch (error) {
            console.error('Error loading resources:', error);
        }
    };
    
    // Call the function to load resources
    loadResources();
    // **Visitor Counter**
    const presenceButton = document.getElementById('presence-button');
    const visitorCountElement = document.getElementById('visitor-count');
    
    // Function to update counter display with proper formatting
    const updateCounterDisplay = (count) => {
        visitorCountElement.textContent = String(count).padStart(4, '0');
    };
    
    // First try to get count from local counter.json, fallback to counterapi.dev
    const updateCounter = async () => {
        try {
            // Try local counter.json first
            const localResponse = await fetch('./counter.json');
            if (localResponse.ok) {
                const localData = await localResponse.json();
                updateCounterDisplay(localData.count);
                
                // Trigger GitHub workflow to increment counter
                // This would require setting up a server endpoint that triggers the workflow
                // For now, we'll use counterapi as a fallback
            } else {
                // Fallback to counterapi.dev
                const response = await fetch('https://counterapi.dev/hit/deans-list/visits');
                const data = await response.json();
                updateCounterDisplay(data.value);
            }
            
            // Update button text to show acknowledgment
            presenceButton.textContent = '🌌 Presence Acknowledged';
            setTimeout(() => {
                presenceButton.textContent = '🌌 Leave Digital Footprint';
            }, 2000);
        } catch (error) {
            console.error('Error updating counter:', error);
            presenceButton.textContent = '🌠 Cosmic Interference';
            setTimeout(() => {
                presenceButton.textContent = '🌌 Leave Digital Footprint';
            }, 2000);
        }
    };
    
    // Add click event listener to presence button
    presenceButton.addEventListener('click', updateCounter);

    // Initialize visitor count on page load
    (async () => {
        try {
            // Try local counter first
            const localResponse = await fetch('./counter.json');
            if (localResponse.ok) {
                const localData = await localResponse.json();
                updateCounterDisplay(localData.count);
            } else {
                // Fallback to counterapi.dev
                const response = await fetch('https://counterapi.dev/get/deans-list/visits');
                const data = await response.json();
                updateCounterDisplay(data.value);
            }
        } catch (error) {
            console.error('Error fetching initial count:', error);
            visitorCountElement.textContent = '????';
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
