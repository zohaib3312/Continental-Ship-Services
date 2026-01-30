// ---------------------------------------Navbar functionality -----------------------------------------------------------------
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

// ------------navbar end  -------------------------------------------------------------------------------------------------------------------


// WhatsApp button shaking effect
setInterval(function () {
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    whatsappBtn.style.animation = 'shake 0.5s';
    setTimeout(function () {
        whatsappBtn.style.animation = '';
    }, 500);
}, 3000);

 


