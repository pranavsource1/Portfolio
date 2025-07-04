// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
let isLightMode = false;

themeToggle.addEventListener('click', () => {
    isLightMode = !isLightMode;
    
    if (isLightMode) {
        document.body.classList.add('light-mode');
        themeIcon.textContent = '☀️';
        playClickSound();
    } else {
        document.body.classList.remove('light-mode');
        themeIcon.textContent = '🌙';
        playClickSound();
    }
    
    // Add a fun rotation effect
    themeToggle.style.transform = 'scale(1.2) rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = '';
    }, 300);
});

// Make windows draggable
const windows = document.querySelectorAll('.window');
let isDragging = false;
let currentWindow = null;
let offset = { x: 0, y: 0 };

windows.forEach(window => {
    window.addEventListener('mousedown', startDrag);
});

function startDrag(e) {
    isDragging = true;
    currentWindow = e.currentTarget;
    const rect = currentWindow.getBoundingClientRect();
    offset.x = e.clientX - rect.left;
    offset.y = e.clientY - rect.top;
    
    currentWindow.style.zIndex = '1000';
    currentWindow.style.position = 'relative';
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
}

function drag(e) {
    if (!isDragging || !currentWindow) return;
    
    const x = e.clientX - offset.x;
    const y = e.clientY - offset.y;
    
    currentWindow.style.transform = `translate(${x}px, ${y}px) rotate(0deg)`;
}

function stopDrag() {
    isDragging = false;
    currentWindow = null;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
}

// Color cycling for floating elements
const colors = ['#ff90e8', '#ffc900', '#ff7051', '#3ecfc1', '#90a8ed'];
let colorIndex = 0;

document.querySelectorAll('.floating-element').forEach(element => {
    element.addEventListener('click', () => {
        colorIndex = (colorIndex + 1) % colors.length;
        element.style.backgroundColor = colors[colorIndex];
    });
});

// Skill tag color cycling
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('click', () => {
        const currentColor = tag.style.backgroundColor;
        const newColor = colors[Math.floor(Math.random() * colors.length)];
        tag.style.backgroundColor = newColor;
    });
});

// Add some interactive sound effects (optional)
function playClickSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Add click sounds to interactive elements
document.querySelectorAll('.skill-tag, .floating-element, .project-card').forEach(element => {
    element.addEventListener('click', playClickSound);
});

// Konami code easter egg
let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 10000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// Rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);
const resumeButton = document.querySelector('.resume-button');

if (resumeButton) {
    // Add click sound effect
    resumeButton.addEventListener('click', () => {
        playClickSound();
        
        // Add a fun download animation
        resumeButton.style.animation = 'resumeShake 0.5s ease-in-out';
        setTimeout(() => {
            resumeButton.style.animation = 'resumeFloat 3s ease-in-out infinite, resumeGlow 2s ease-in-out infinite alternate';
        }, 500);
    });
    
    // Add hover sound effect
    resumeButton.addEventListener('mouseenter', () => {
        // Create a subtle hover sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 600;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.05);
    });
    
    // Add dynamic color cycling on double click
    resumeButton.addEventListener('dblclick', (e) => {
        e.preventDefault();
        const colors = ['var(--pink)', 'var(--yellow)', 'var(--cyan)', 'var(--coral)'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        resumeButton.style.backgroundColor = randomColor;
        
        // Reset to original color after 2 seconds
        setTimeout(() => {
            resumeButton.style.backgroundColor = '';
        }, 2000);
    });
}