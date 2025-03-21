document.addEventListener('DOMContentLoaded', () => {
    // Section Toggles
    document.querySelectorAll('.section-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            const content = toggle.nextElementSibling;
            content.style.maxHeight = 
                content.style.maxHeight ? null : `${content.scrollHeight}px`;
            
            // Play modulation effect
            const freq = content.style.maxHeight ? 523.25 : 261.63;
            playModulation(freq);
        });
    });

    // Presence System
    const presenceButton = document.getElementById('presence-button');
    const updateCounter = async () => {
        try {
            const response = await fetch('https://api.countapi.xyz/hit/deans-list/visits');
            const data = await response.json();
            document.getElementById('visitor-count').textContent = 
                String(data.value).padStart(4, '0');
            
            presenceButton.textContent = '🌀 Presence Quantized';
            setTimeout(() => {
                presenceButton.textContent = '🌠 Acknowledge Digital Presence';
            }, 2000);
            
        } catch (error) {
            presenceButton.textContent = '🌌 Quantum Interference Detected';
        }
    };
    presenceButton.addEventListener('click', updateCounter);

    // External Link Handler
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', (e) => {
            if (!link.href.includes(window.location.host)) {
                e.preventDefault();
                const leave = confirm(`Venturing to ${new URL(link.href).hostname}\n\nRemember to support the creator!`);
                if (leave) window.open(link.href, '_blank');
            }
        });
    });
});

// Chiptune Sound Effects
function playModulation(frequency) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3);
}
