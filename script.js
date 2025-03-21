document.addEventListener('DOMContentLoaded', () => {
  // Collapsible Sections
  document.querySelectorAll('.section-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const content = toggle.nextElementSibling;
      content.style.maxHeight = 
        content.style.maxHeight ? null : `${content.scrollHeight}px`;
      toggle.classList.toggle('active');
      
      // Save state
      const section = toggle.closest('.category-section');
      localStorage.setItem(`section-${section.id}-open`, content.style.maxHeight);
    });
  });

  // Visitor Counter
  const presenceButton = document.getElementById('presence-button');
  const updateCounter = async () => {
    try {
      const response = await fetch('https://api.countapi.xyz/hit/deans-list/visits');
      const data = await response.json();
      document.getElementById('visitor-count').textContent = 
        String(data.value).padStart(4, '0');
      
      presenceButton.textContent = '🌌 Presence Acknowledged';
      setTimeout(() => {
        presenceButton.textContent = '🌌 Leave Digital Footprint';
      }, 2000);
      
    } catch (error) {
      presenceButton.textContent = '🌠 Cosmic Interference';
    }
  };
  presenceButton.addEventListener('click', updateCounter);

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
      link.rel = 'noopener';
    }
  });

  // Initialize visitor count
  (async () => {
    try {
      const response = await fetch('https://api.countapi.xyz/get/deans-list/visits');
      const data = await response.json();
      document.getElementById('visitor-count').textContent = 
        String(data.value).padStart(4, '0');
    } catch (error) {
      document.getElementById('visitor-count').textContent = '????';
    }
  })();
});
