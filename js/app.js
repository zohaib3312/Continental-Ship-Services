// Get navbar elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const mobileOverlay = document.getElementById('mobileOverlay');
const dropdownParent = document.querySelector('.dropdown-item-parent');
const locationsDropdown = document.getElementById('locationsDropdown');

// Function to close mobile menu
function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Function to open mobile menu
function openMobileMenu() {
    hamburger.classList.add('active');
    navMenu.classList.add('active');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Add scroll event listener
window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger menu toggle
hamburger.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (navMenu.classList.contains('active')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
});

// Close menu when overlay is clicked
mobileOverlay.addEventListener('click', function () {
    closeMobileMenu();
});

// Mobile dropdown toggle - works on all devices
function setupDropdown() {
    // Remove any existing event listeners
    const newLocationsDropdown = locationsDropdown.cloneNode(true);
    locationsDropdown.parentNode.replaceChild(newLocationsDropdown, locationsDropdown);

    // Get the new element
    const dropdown = document.getElementById('locationsDropdown');
    const parent = dropdown.closest('.dropdown-item-parent');

    if (window.innerWidth <= 768) {
        dropdown.style.cursor = 'pointer';

        // Add click event for mobile
        dropdown.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            parent.classList.toggle('dropdown-open');
        });

        // Add touch event for better mobile support
        dropdown.addEventListener('touchstart', function (e) {
            e.preventDefault();
            e.stopPropagation();
            parent.classList.toggle('dropdown-open');
        }, { passive: false });
    } else {
        dropdown.style.cursor = 'default';
        parent.classList.remove('dropdown-open');
    }
}

// Initialize dropdown
setupDropdown();

// Reapply on window resize
let resizeTimer;
window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
        setupDropdown();

        // Close mobile menu if window is resized to desktop
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    }, 250);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close mobile menu if open
            closeMobileMenu();

            // Small delay to ensure menu closes before scrolling
            setTimeout(function () {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    });
});

// Prevent body scroll when menu is open
navMenu.addEventListener('touchmove', function (e) {
    if (navMenu.classList.contains('active')) {
        e.stopPropagation();
    }
}, { passive: true });

// Close dropdown when clicking outside
document.addEventListener('click', function (e) {
    if (window.innerWidth <= 768) {
        const parent = document.querySelector('.dropdown-item-parent');
        if (parent && !parent.contains(e.target)) {
            parent.classList.remove('dropdown-open');
        }
    }
});




// Smooth scroll animations on load
window.addEventListener('load', function () {
    document.body.style.opacity = '1';
});

// Button click handlers
function exploreServices() {
    console.log('Explore Services clicked');
    // Add your navigation logic here
    alert('Navigating to Services page...');
}

function talkToTeam() {
    console.log('Talk to Team clicked');
    // Add your contact logic here
    alert('Opening contact form...');
}

// Parallax effect on mouse move
document.addEventListener('mousemove', function (e) {
    const logoCard = document.querySelector('.logo-card');
    if (window.innerWidth > 992) {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        logoCard.style.transform = `perspective(1000px) rotateY(${-5 + x}deg) rotateX(${y}deg)`;
    }
});

// WhatsApp button pulse effect
setInterval(function () {
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    whatsappBtn.style.transform = 'scale(1.1)';
    setTimeout(function () {
        whatsappBtn.style.transform = 'scale(1)';
    }, 200);
}, 3000);




// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards
document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

// Add click event for cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function () {
        // Add pulse animation on click
        this.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 500);
    });

    // Add keyboard accessibility
    card.setAttribute('tabindex', '0');
    card.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            this.click();
        }
    });
});

// Parallax effect on mouse move
document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) {
        const cards = document.querySelectorAll('.service-card');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        cards.forEach((card, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;

            card.style.transform += ` translate(${x}px, ${y}px)`;
        });
    }
});

// Icon rotation on hover
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        const icon = this.querySelector('.service-icon');
        icon.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        icon.style.transform = 'rotate(360deg) scale(1.2)';
    });

    card.addEventListener('mouseleave', function () {
        const icon = this.querySelector('.service-icon');
        icon.style.transform = 'rotate(0deg) scale(1)';
    });
});

// Add ripple effect on click
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function (e) {
        const ripple = document.createElement('div');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(94, 179, 246, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);

// Log card interactions
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.addEventListener('click', () => {
        console.log(`Service card ${index + 1} clicked:`, card.querySelector('.service-title').textContent);
    });
});




// Observe all service cards
document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

// Ripple effect on click
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function (e) {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Card tilt effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.card-image').forEach((img, index) => {
        const speed = 0.5 + (index * 0.1);
        img.style.transform = `translateY(${scrolled * speed * 0.02}px) scale(1)`;
    });
});

// Counter animation for service numbers (if you want to add stats)
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.innerHTML = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Add click event to cards for navigation (optional)
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function () {
        const service = this.getAttribute('data-service');
        console.log(`Navigating to ${service} service page`);
        // Add your navigation logic here
    });
});

// Add shimmer effect on page load
window.addEventListener('load', () => {
    document.querySelectorAll('.service-card').forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
        }, index * 100);
    });
});



// Simple button click handler
const button = document.getElementById('ctaButton');

button.addEventListener('click', function (e) {
    console.log('Button clicked');
});








 // Get cursor elements
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        const cursorGlow = document.querySelector('.cursor-glow');

        // Mouse position
        let mouseX = 0;
        let mouseY = 0;

        // Cursor position (with delay for smooth follow)
        let cursorX = 0;
        let cursorY = 0;

        // Outline position (with more delay)
        let outlineX = 0;
        let outlineY = 0;

        // Update mouse position
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Update glow position immediately
            cursorGlow.style.left = mouseX + 'px';
            cursorGlow.style.top = mouseY + 'px';

            // Create trail effect
            createTrail(mouseX, mouseY);

            // Create sparkles occasionally
            if (Math.random() > 0.9) {
                createSparkle(mouseX, mouseY);
            }
        });

        // Smooth cursor follow animation
        function animateCursor() {
            // Smooth follow for dot (faster)
            cursorX += (mouseX - cursorX) * 0.3;
            cursorY += (mouseY - cursorY) * 0.3;

            // Smooth follow for outline (slower)
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;

            // Update positions
            cursorDot.style.left = cursorX + 'px';
            cursorDot.style.top = cursorY + 'px';

            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';

            requestAnimationFrame(animateCursor);
        }

        animateCursor();

        // Trail effect
        let trailTimeout;
        function createTrail(x, y) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.left = x + 'px';
            trail.style.top = y + 'px';
            document.body.appendChild(trail);

            setTimeout(() => {
                trail.remove();
            }, 800);
        }

        // Sparkle effect
        function createSparkle(x, y) {
            const sparkle = document.createElement('div');
            sparkle.className = 'cursor-sparkle';
            
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 50 + 20;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            sparkle.style.left = x + 'px';
            sparkle.style.top = y + 'px';
            sparkle.style.setProperty('--tx', tx + 'px');
            sparkle.style.setProperty('--ty', ty + 'px');
            
            document.body.appendChild(sparkle);

            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }

        // Ripple effect on click
        document.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            ripple.className = 'cursor-ripple';
            ripple.style.left = e.clientX + 'px';
            ripple.style.top = e.clientY + 'px';
            document.body.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        // Hover effect on interactive elements
        const interactiveElements = document.querySelectorAll('button, a, .demo-card');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('hover');
                cursorOutline.classList.add('hover');
            });

            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('hover');
                cursorOutline.classList.remove('hover');
            });
        });

        // Hide cursor when mouse leaves window
        document.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = '0';
            cursorOutline.style.opacity = '0';
            cursorGlow.style.opacity = '0';
        });

        // Show cursor when mouse enters window
        document.addEventListener('mouseenter', () => {
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
            cursorGlow.style.opacity = '1';
        });

        // Pulse effect on cursor dot
        setInterval(() => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.2)';
            setTimeout(() => {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 200);
        }, 3000);

        // Log message
        console.log('Custom mouse follower animation loaded! 🎨');






