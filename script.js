// DOM Elements
let navbar, navMenu, hamburger, navLinks, contactForm;

// Initialize DOM elements when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    navbar = document.querySelector('.navbar');
    navMenu = document.querySelector('.nav-menu');
    hamburger = document.querySelector('.hamburger');
    navLinks = document.querySelectorAll('.nav-link');
    contactForm = document.getElementById('contactForm');
    
    console.log('DOM Elements loaded:', { navbar, navMenu, hamburger, navLinks, contactForm });
    
    // Initialize all functionality
    initializeNavigation();
    initializeScrollAnimations();
    initializePortfolio();
    initializeContactForm();
    initializeLogoAnimations();
    initializeProgressIndicator();
    initializeMicroInteractions();
    initializeParticles();
    initializeAdvancedAnimations();
    initializeButtons();
});

// Mobile Navigation Toggle
function initializeNavigation() {
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    if (navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
            }
        }
    });

    // Smooth scrolling for navigation links
    if (navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                console.log('Navigation clicked:', targetId);
                
                // Check if it's an internal link
                if (targetId && targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetSection = document.querySelector(targetId);
                    console.log('Target section found:', targetSection);
                    
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 80;
                        console.log('Scrolling to:', offsetTop);
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    } else {
                        console.log('Section not found:', targetId);
                    }
                }
            });
        });
    }
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Counter animation for stats
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    const countUp = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => countUp(counter), 10);
        } else {
            counter.innerText = target;
        }
    };

    // Set up counter intersection observer
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.innerText === '0') {
                countUp(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Portfolio filtering
function initializePortfolio() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterBtns) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                if (portfolioItems) {
                    portfolioItems.forEach(item => {
                        if (filter === 'all' || item.getAttribute('data-category') === filter) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'scale(1)';
                            }, 10);
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'scale(0.8)';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    });
                }
            });
        });
    }
}

// Contact form handling
function initializeContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');

            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    `;

    // Set background color based on type
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
    }

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled * 0.001);
    }
});

// Mouse move effect for floating houses
const floatingHouses = document.querySelectorAll('.floating-house');
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    floatingHouses.forEach((house, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        house.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const spans = heroTitle.querySelectorAll('.animate-text');
        spans.forEach((span, index) => {
            setTimeout(() => {
                const text = span.textContent;
                typeWriter(span, text, 80);
            }, index * 1000);
        });
    }
});

// Add hover sound effects (optional - requires audio files)
function addHoverSounds() {
    const buttons = document.querySelectorAll('.btn, .nav-link, .service-card, .portfolio-item');
    
    buttons.forEach(element => {
        element.addEventListener('mouseenter', () => {
            // Add hover sound effect here if you have audio files
            // const hoverSound = new Audio('hover.mp3');
            // hoverSound.volume = 0.1;
            // hoverSound.play().catch(e => console.log('Audio play failed:', e));
        });
    });
}

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    // Scroll-related functions here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Service cards hover effect
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Portfolio item tilt effect
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Form input animations
const formInputs = document.querySelectorAll('input, textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Add CSS for focused inputs
const style = document.createElement('style');
style.textContent = `
    .form-group.focused input,
    .form-group.focused textarea {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is loaded

    window.addEventListener('scroll', debouncedScroll);

    // Loading animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Portfolio item tilt effect
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // Form input animations
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Add CSS for focused inputs
    const style = document.createElement('style');
    style.textContent = `
        .form-group.focused input,
        .form-group.focused textarea {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
    `;
    document.head.appendChild(style);

    // Initialize everything when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        addHoverSounds();
        console.log('Classy HOMES website initialized successfully!');
        initializeLogoAnimations();
    });

    // Logo animations
    function initializeLogoAnimations() {
        const logoImages = document.querySelectorAll('.logo-img');
        
        // Add entrance animation on page load
        logoImages.forEach((logo, index) => {
            logo.style.opacity = '0';
            logo.style.transform = 'scale(0.5) rotate(-180deg)';
            
            setTimeout(() => {
                logo.style.transition = 'all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                logo.style.opacity = '1';
                logo.style.transform = 'scale(1) rotate(0deg)';
            }, 500 + (index * 200));
        });
        
        // Add scroll-based parallax effect
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            logoImages.forEach(logo => {
                const speed = 0.5;
                logo.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
        
        // Add mouse interaction
        logoImages.forEach(logo => {
            logo.addEventListener('mouseenter', function() {
                this.style.animation = 'none';
                this.style.transform = 'scale(1.2) rotate(10deg)';
                this.style.filter = 'brightness(1.2) saturate(1.2)';
            });
            
            logo.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
                this.style.filter = 'brightness(1) saturate(1)';
                setTimeout(() => {
                    this.style.animation = 'logoFloat 3s ease-in-out infinite';
                }, 100);
            });
            
            // Add click animation
            logo.addEventListener('click', function() {
                this.style.animation = 'none';
                this.style.transform = 'scale(0.9) rotate(-5deg)';
                setTimeout(() => {
                    this.style.transform = 'scale(1.1) rotate(5deg)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1) rotate(0deg)';
                        setTimeout(() => {
                            this.style.animation = 'logoFloat 3s ease-in-out infinite';
                        }, 100);
                    }, 150);
                }, 100);
            });
        });
    }

    // Progress Indicator
    function initializeProgressIndicator() {
        const progressFill = document.querySelector('.progress-fill');
        const progressDots = document.querySelectorAll('.progress-dot');
        const sections = document.querySelectorAll('section[id]');
        
        // Update progress bar and dots on scroll
        window.addEventListener('scroll', () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPosition = window.pageYOffset;
            const progress = (scrollPosition / scrollHeight) * 100;
            
            if (progressFill) {
                progressFill.style.height = `${Math.min(progress, 100)}%`;
            }
            
            // Update active dot based on scroll position
            let currentSection = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = section.id;
                }
            });
            
            progressDots.forEach(dot => {
                dot.classList.remove('active');
                if (dot.getAttribute('data-section') === currentSection) {
                    dot.classList.add('active');
                }
            });
        });
        
        // Smooth scroll for progress dots
        progressDots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = dot.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Enhanced Micro-interactions
    function initializeMicroInteractions() {
        // Enhanced button interactions
        const buttons = document.querySelectorAll('.btn, .filter-btn, .view-project');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
            
            // Ripple effect on click
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    left: ${x}px;
                    top: ${y}px;
                    pointer-events: none;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
        
        // Enhanced portfolio card interactions
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'var(--shadow-md)';
            });
        });
        
        // Success message for form submissions
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Show success message
                showNotification('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
                
                // Reset form
                this.reset();
                
                // Add success animation to form
                this.style.animation = 'successPulse 0.6s ease';
                setTimeout(() => {
                    this.style.animation = '';
                }, 600);
            });
        }
        
        // Add CSS for ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            @keyframes successPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.02); }
            }
        `;
        document.head.appendChild(style);
    }

    // Particle System
    function initializeParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        // Create 50 particles
        for (let i = 0; i < 50; i++) {
            createParticle(particlesContainer);
        }
        
        // Continuously create new particles
        setInterval(() => {
            if (particlesContainer.children.length < 50) {
                createParticle(particlesContainer);
            }
        }, 2000);
    }

    function createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        
        // Random size
        const size = 2 + Math.random() * 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random color
        const colors = ['#f97316', '#2563eb', '#10b981'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        container.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 25000);
    }

    // Advanced Animations
    function initializeAdvancedAnimations() {
        // Parallax mouse effect
        document.addEventListener('mousemove', (e) => {
            const cards = document.querySelectorAll('.card');
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;
            
            cards.forEach((card, index) => {
                const depth = (index + 1) * 2;
                const moveX = mouseX * depth;
                const moveY = mouseY * depth;
                
                card.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
            });
        });
        
        // Staggered animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, observerOptions);
        
        // Observe all animated elements
        document.querySelectorAll('.card, .service-icon, .animate-text').forEach(el => {
            el.style.animationPlayState = 'paused';
            animationObserver.observe(el);
        });
        
        // Magnetic button effect
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translate(0, 0) scale(1)';
            });
        });
    }

    // Button Functionality
function initializeButtons() {
    console.log('Initializing buttons...');
    
    // Hero buttons
    const exploreBtn = document.querySelector('.hero-buttons .btn-primary');
    const quoteBtn = document.querySelector('.hero-buttons .btn-secondary');
    
    console.log('Hero buttons found:', exploreBtn, quoteBtn);
    
    if (exploreBtn) {
        exploreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Explore button clicked!');
            alert('Exploring our portfolio...');
            setTimeout(() => {
                const portfolio = document.querySelector('#portfolio');
                if (portfolio) {
                    portfolio.scrollIntoView({ behavior: 'smooth' });
                }
            }, 500);
        });
    }
    
    if (quoteBtn) {
        quoteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Quote button clicked!');
            alert('Redirecting to contact form...');
            setTimeout(() => {
                const contact = document.querySelector('#contact');
                if (contact) {
                    contact.scrollIntoView({ behavior: 'smooth' });
                }
            }, 500);
        });
    }
    
    // Service card buttons
    const serviceButtons = document.querySelectorAll('.card-footer .btn-primary');
    console.log('Service buttons found:', serviceButtons.length);
    
    serviceButtons.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Service button clicked!', index);
            const card = btn.closest('.card');
            const serviceName = card ? card.querySelector('h3').textContent : 'Service';
            alert(`Learning more about ${serviceName}...`);
            setTimeout(() => {
                const contact = document.querySelector('#contact');
                if (contact) {
                    contact.scrollIntoView({ behavior: 'smooth' });
                }
            }, 500);
        });
    });
    
    // Portfolio view buttons
    const portfolioButtons = document.querySelectorAll('.portfolio-grid .btn-primary');
    console.log('Portfolio buttons found:', portfolioButtons.length);
    
    portfolioButtons.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Portfolio button clicked!', index);
            const card = btn.closest('.card');
            const projectName = card ? card.querySelector('h4').textContent : 'Project';
            alert(`Opening ${projectName} details...\n\nDuration: 4-12 weeks\nStatus: Available\nContact us for more details!`);
        });
    });
    
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    console.log('Filter buttons found:', filterButtons.length);
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Filter button clicked!');
            const filter = btn.getAttribute('data-filter');
            
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter portfolio items
            const portfolioItems = document.querySelectorAll('.portfolio-grid .card');
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            
            alert(`Showing ${filter} projects`);
        });
    });
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    console.log('Nav links found:', navLinks.length);
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Nav link clicked!');
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const hamburger = document.querySelector('.hamburger');
                const navMenu = document.querySelector('.nav-menu');
                if (hamburger && hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    console.log('All buttons initialized successfully!');
}

// Export functions for potential external use
    window.ClassyHOMES = {
        showNotification,
        scrollToSection: (sectionId) => {
            const section = document.querySelector(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        },
        toggleMobileMenu: () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        },
        createParticle
    }
