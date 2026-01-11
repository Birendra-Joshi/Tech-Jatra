// Page Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.loader').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.loader').style.display = 'none';
        }, 500);
    }, 1500);
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    follower.style.left = e.clientX + 'px';
    follower.style.top = e.clientY + 'px';
});

// Scroll Progress
window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector('.scroll-progress').style.width = scrolled + '%';
});

// Particles - Constellation Effect
const particlesContainer = document.getElementById('particles');
const particles = [];
const numParticles = 80;

// Create stars and particles
for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement('div');
    const isStar = Math.random() > 0.3;
    particle.className = isStar ? 'particle star' : 'particle';
    
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    particle.style.left = x + '%';
    particle.style.top = y + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    
    particlesContainer.appendChild(particle);
    particles.push({ element: particle, x, y });
}

// Create constellation lines between nearby particles
particles.forEach((p1, i) => {
    particles.slice(i + 1).forEach(p2 => {
        const distance = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
        
        if (distance < 15 && Math.random() > 0.7) {
            const line = document.createElement('div');
            line.className = 'constellation-line';
            
            const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
            const length = distance;
            
            line.style.left = p1.x + '%';
            line.style.top = p1.y + '%';
            line.style.width = length + '%';
            line.style.transform = `rotate(${angle}deg)`;
            
            particlesContainer.appendChild(line);
        }
    });
});

// Countdown Timer (Event Date: March 15, 2026)
const countdownDate = new Date('March 15, 2026 09:00:00').getTime();

const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.querySelector('.countdown').innerHTML = '<h2 style="color: var(--neon-blue);">EVENT IS LIVE! 🚀</h2>';
    }
};

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.event-card, .timeline-item').forEach(el => {
    observer.observe(el);
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});