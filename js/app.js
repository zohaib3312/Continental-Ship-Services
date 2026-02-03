  // ---------------------------------------Navbar functionality -----------------------------------------------------------------
// Get navbar elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const mobileOverlay = document.getElementById('mobileOverlay');
const dropdownParent = document.querySelector('.dropdown-item-parent');
const locationsDropdown = document.getElementById('locationsDropdown');

// Track if we're on mobile
let isMobile = window.innerWidth <= 768;

// Function to close mobile menu
function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
    // Close any open dropdowns when closing mobile menu
    if (dropdownParent) {
        dropdownParent.classList.remove('dropdown-open');
    }
    document.body.style.overflow = '';
}

// Function to open mobile menu
function openMobileMenu() {
    hamburger.classList.add('active');
    navMenu.classList.add('active');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}


// Hamburger menu toggle
if (hamburger) {
    hamburger.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (navMenu.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
}

// Close menu when overlay is clicked
if (mobileOverlay) {
    mobileOverlay.addEventListener('click', function () {
        closeMobileMenu();
    });
}

// Mobile dropdown toggle functionality
function initMobileDropdown() {
    if (!locationsDropdown || !dropdownParent) return;

    isMobile = window.innerWidth <= 768;

    if (isMobile) {
        // Mobile: Click to toggle dropdown
        locationsDropdown.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle the dropdown-open class
            dropdownParent.classList.toggle('dropdown-open');
            
            console.log('Dropdown toggled:', dropdownParent.classList.contains('dropdown-open'));
        });
    } else {
        // Desktop: Remove mobile class if it exists
        dropdownParent.classList.remove('dropdown-open');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initMobileDropdown();
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
        const wasNotMobile = !isMobile;
        isMobile = window.innerWidth <= 768;
        
        // If we switched from desktop to mobile or vice versa, reinitialize
        if ((wasNotMobile && isMobile) || (!wasNotMobile && !isMobile)) {
            initMobileDropdown();
        }
        
        // Close mobile menu if resizing to desktop
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    }, 250);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" 
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        // For dropdown items, just close the menu
        if (this.classList.contains('dropdown-item')) {
            e.preventDefault();
            closeMobileMenu();
            return;
        }
        
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
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

// Prevent dropdown from closing when clicking inside it on mobile
if (dropdownParent) {
    const dropdownMenu = dropdownParent.querySelector('.dropdown-menu');
    if (dropdownMenu) {
        dropdownMenu.addEventListener('click', function (e) {
            // Only stop propagation on mobile
            if (isMobile) {
                e.stopPropagation();
            }
        });
    }
}

// Close dropdown when clicking outside on mobile
document.addEventListener('click', function (e) {
    if (isMobile && dropdownParent && !dropdownParent.contains(e.target)) {
        dropdownParent.classList.remove('dropdown-open');
    }
});

// Prevent body scroll when mobile menu is open
window.addEventListener('touchmove', function(e) {
    if (navMenu.classList.contains('active') && !navMenu.contains(e.target)) {
        e.preventDefault();
    }
}, { passive: false });

// ------------navbar end  -------------------------------------------------------------------------------------------------------------------


// WhatsApp button shaking effect
setInterval(function () {
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    whatsappBtn.style.animation = 'shake 0.5s';
    setTimeout(function () {
        whatsappBtn.style.animation = '';
    }, 500);
}, 3000);

 


