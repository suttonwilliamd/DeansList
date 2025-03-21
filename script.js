// Collapsible Sections
document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        content.style.maxHeight = 
            content.style.maxHeight ? null : `${content.scrollHeight}px`;
        btn.classList.toggle('active');
        
        // Pixel sound effect simulation
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(
            content.style.maxHeight ? 440 : 220, 
            audioContext.currentTime
        );
        
        const gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
    });
});

// Presence System
const presenceButton = document.getElementById('presence-button');
const visitorCount = document.getElementById('visitor-count');

const updateCounter = async () => {
    try {
        const response = await fetch('https://api.countapi.xyz/hit/deans-list/visits');
        const data = await response.json();
        
        visitorCount.textContent = String(data.value).padStart(4, '0');
        visitorCount.style.animation = 'none';
        void visitorCount.offsetWidth; // Trigger reflow
        visitorCount.style.animation = 'countPop 0.5s ease';
        
        presenceButton.textContent = '🌌 Presence Acknowledged';
        setTimeout(() => {
            presenceButton.textContent = '🌌 Acknowledge Transient Presence';
        }, 2000);
        
    } catch (error) {
        console.log('Counter currently in flux - your quantum state is noted');
        presenceButton.textContent = '🪐 Cosmic Interference Detected';
    }
};

presenceButton.addEventListener('click', updateCounter);

// Initial count fetch
(async () => {
    try {
        const response = await fetch('https://api.countapi.xyz/get/deans-list/visits');
        const data = await response.json();
        visitorCount.textContent = String(data.value).padStart(4, '0');
    } catch (error) {
        visitorCount.textContent = '????';
    }
})();
