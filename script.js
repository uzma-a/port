
// Loading screen
window.addEventListener('load', () => {
    const loadingOverlay = document.getElementById('loadingOverlay');
    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
    }, 1000);
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
let isMenuOpen = false;

mobileMenuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = isMenuOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        isMenuOpen = false;
    });
});

// Smooth scrolling for navigation links
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

// Enhanced scroll animations with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 150); // Stagger animation
        }
    });
}, observerOptions);

// Observe all animation elements
document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-up').forEach(el => {
    observer.observe(el);
});

// Header background and hide/show on scroll
let lastScrollY = window.scrollY;
let ticking = false;

function updateHeader() {
    const header = document.querySelector('header');
    const scrollY = window.scrollY;

    if (scrollY > 100) {
        header.style.background = 'rgba(10, 10, 31, 0.98)';
        header.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.6)';

        if (scrollY > lastScrollY && scrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
    } else {
        header.style.background = 'rgba(10, 10, 31, 0.95)';
        header.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4)';
        header.style.transform = 'translateY(0)';
    }

    lastScrollY = scrollY;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
    }
});

// Scroll to top button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Enhanced form submission
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const button = this.querySelector('.cta-button');
    const originalHTML = button.innerHTML;

    // Loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    button.style.opacity = '0.7';
    button.style.pointerEvents = 'none';

    // Simulate form submission
    setTimeout(() => {
        // Success state
        button.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
        button.style.background = 'linear-gradient(135deg, var(--success-green), #059669)';

        setTimeout(() => {
            // Reset
            button.innerHTML = originalHTML;
            button.style.opacity = '1';
            button.style.pointerEvents = 'auto';
            button.style.background = '';
            this.reset();
        }, 3000);
    }, 2000);
});

// Parallax effect for hero section
let heroParallax = false;

function updateParallax() {
    if (!heroParallax) {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');

        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
        }

        heroParallax = false;
    }
}

window.addEventListener('scroll', () => {
    if (!heroParallax) {
        requestAnimationFrame(updateParallax);
        heroParallax = true;
    }
});

// Mouse move parallax effect
let mouseParallax = false;

function updateMouseParallax(e) {
    if (!mouseParallax) {
        const mouseX = (e.clientX / window.innerWidth) - 0.5;
        const mouseY = (e.clientY / window.innerHeight) - 0.5;

        const elements = document.querySelectorAll('.skill-item, .project-card, .experience-item');
        elements.forEach((el, index) => {
            const speed = (index % 3 + 1) * 2;
            const x = mouseX * speed;
            const y = mouseY * speed;

            el.style.transform += ` translate3d(${x}px, ${y}px, 0)`;
        });

        mouseParallax = false;
    }
}

document.addEventListener('mousemove', (e) => {
    if (!mouseParallax) {
        requestAnimationFrame(() => updateMouseParallax(e));
        mouseParallax = true;
    }
});

// Dynamic stats counter animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const targets = ['7+', '50+', '100%', '15%'];

    statNumbers.forEach((stat, index) => {
        const target = targets[index];
        let current = 0;
        const increment = target.includes('%') ? 5 : 1;
        const isPercentage = target.includes('%');
        const isPlus = target.includes('+');
        const targetNumber = parseInt(target);

        const timer = setInterval(() => {
            current += increment;
            if (current >= targetNumber) {
                current = targetNumber;
                clearInterval(timer);
            }

            let displayValue = current;
            if (isPercentage) displayValue += '%';
            if (isPlus && current === targetNumber) displayValue += '+';

            stat.textContent = displayValue;
        }, 100);
    });
}

// Trigger stats animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
});

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing animation on load
setTimeout(() => {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
}, 1500);

// Floating particles animation
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '0';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(139, 92, 246, ${Math.random() * 0.3 + 0.1})`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 20 + 10}s linear infinite`;
        particle.style.animationDelay = Math.random() * 20 + 's';

        particlesContainer.appendChild(particle);
    }
}

// Add floating particles
setTimeout(createParticles, 2000);

// Smooth reveal animations for project cards
function revealProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('animate-reveal');
    });
}

// Add reveal animation CSS
const style = document.createElement('style');
style.textContent = `
            .animate-reveal {
                animation: revealCard 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }
            
            @keyframes revealCard {
                from {
                    opacity: 0;
                    transform: translateY(50px) scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            @keyframes floatParticle {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);

// Observe project section for reveal animation
const projectsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            revealProjectCards();
            projectsObserver.unobserve(entry.target);
        }
    });
});

const projectsSection = document.querySelector('#projects');
if (projectsSection) {
    projectsObserver.observe(projectsSection);
}

// Add smooth hover effects for navigation
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });

    link.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Enhanced scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.width = '0%';
    progressBar.style.height = '3px';
    progressBar.style.background = 'linear-gradient(90deg, var(--accent-electric), var(--accent-violet), var(--accent-cyan))';
    progressBar.style.zIndex = '9999';
    progressBar.style.transition = 'width 0.3s ease';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Add scroll progress indicator
createScrollProgress();

// Dynamic theme based on time of day
function setTimeBasedTheme() {
    const hour = new Date().getHours();
    const root = document.documentElement;

    if (hour >= 6 && hour < 18) {
        // Day theme - slightly brighter
        root.style.setProperty('--primary-deep-blue', '#0f0f2f');
        root.style.setProperty('--glass-bg', 'rgba(15, 15, 47, 0.85)');
    } else {
        // Night theme - darker
        root.style.setProperty('--primary-deep-blue', '#0a0a1f');
        root.style.setProperty('--glass-bg', 'rgba(10, 10, 31, 0.85)');
    }
}

// Apply time-based theme
setTimeBasedTheme();

// Add Easter egg - konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up, Up, Down, Down, Left, Right, Left, Right, B, A

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s infinite';

        const style = document.createElement('style');
        style.textContent = `
                    @keyframes rainbow {
                        0% { filter: hue-rotate(0deg); }
                        100% { filter: hue-rotate(360deg); }
                    }
                `;
        document.head.appendChild(style);

        setTimeout(() => {
            document.body.style.animation = '';
            style.remove();
        }, 10000);

        konamiCode = [];
    }
});

// Performance optimization - lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add CPU-friendly animation controls
let isTabVisible = true;

document.addEventListener('visibilitychange', () => {
    isTabVisible = !document.hidden;

    if (!isTabVisible) {
        // Pause expensive animations when tab is not visible
        document.querySelectorAll('*').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations when tab becomes visible
        document.querySelectorAll('*').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
});

// Initialize all features after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Preload critical assets
    const criticalAssets = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
    ];

    criticalAssets.forEach(asset => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = asset;
        link.as = 'style';
        document.head.appendChild(link);
    });

    // Add smooth transitions to all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .skill-item, .project-card, .experience-item, .contact-item');
    interactiveElements.forEach(el => {
        el.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

console.log('🚀 Adeel Chishty Portfolio Loaded Successfully!');
console.log('💫 Enhanced with modern animations and interactions');
console.log('⚡ Optimized for performance and accessibility');
