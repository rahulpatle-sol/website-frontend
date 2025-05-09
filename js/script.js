
//=======================Navigation script===========================

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const navItems = document.querySelectorAll('.nav-item');
    const overlay = document.getElementById('overlay');
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
    const bottomNavPanels = document.querySelectorAll('.bottom-nav-panel');
    const panelCloseButtons = document.querySelectorAll('.panel-close');
    const panelLinks = document.querySelectorAll('.panel-links a');

    // Toggle mobile menu
    menuToggle.addEventListener('click', function () {
        mainNav.classList.toggle('active');
        overlay.classList.toggle('active');

        // Close any open bottom panels when opening the main menu
        bottomNavPanels.forEach(panel => {
            panel.classList.remove('active');
        });

        // Change icon based on menu state
        const icon = menuToggle.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Mobile dropdown toggle
    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            // Only in mobile view
            if (window.innerWidth <= 768) {
                // If clicking on the item itself (not a child link)
                if (e.target === item.querySelector('a')) {
                    e.preventDefault();

                    // Close other dropdowns
                    navItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });

                    // Toggle current dropdown
                    item.classList.toggle('active');
                }
            }
        });
    });

    // Close menu when clicking overlay
    overlay.addEventListener('click', function () {
        mainNav.classList.remove('active');
        overlay.classList.remove('active');
        bottomNavPanels.forEach(panel => {
            panel.classList.remove('active');
        });
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });

    // Bottom navigation active state and panel toggle
    bottomNavItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation(); // Prevent event bubbling

            // Update active state
            bottomNavItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            item.classList.add('active');

            // Get the panel id from data attribute
            const panelId = item.getAttribute('data-panel') + '-panel';
            const targetPanel = document.getElementById(panelId);

            // Close any open panels first
            bottomNavPanels.forEach(panel => {
                if (panel.id !== panelId) {
                    panel.classList.remove('active');
                }
            });

            // Toggle the target panel
            targetPanel.classList.toggle('active');

            // Show overlay when panel is open
            if (targetPanel.classList.contains('active')) {
                overlay.classList.add('active');

                // Close main nav if it's open
                mainNav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                overlay.classList.remove('active');
            }
        });
    });

    // Make panel links clickable by stopping propagation
    panelLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.stopPropagation(); // This prevents the click from bubbling up
            // The link will now navigate normally
        });
    });

    // Close panel buttons
    panelCloseButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent event bubbling
            const panel = this.closest('.bottom-nav-panel');
            panel.classList.remove('active');
            overlay.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            document.querySelector('.mobile-header').classList.add('scrolled');
        } else {
            document.querySelector('.mobile-header').classList.remove('scrolled');
        }
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            mainNav.classList.remove('active');
            overlay.classList.remove('active');
            bottomNavPanels.forEach(panel => {
                panel.classList.remove('active');
            });
            navItems.forEach(item => {
                item.classList.remove('active');
            });

            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Set the first bottom nav item as active by default
    if (bottomNavItems.length > 0) {
        bottomNavItems[0].classList.add('active');
    }

    // Notice and News Content
    createDummyContent();

    // Update visible cards for event slider
    updateVisibleCards();
});


// =========================Notice and News Content==========================

function createDummyContent() {
    // Create dummy notifications
    const noticeContent = document.getElementById('noticeContent');
    const firstNotification = noticeContent.children[0].cloneNode(true);

    // Sample notifications
    const notifications = [
        "Admission for 2025-26 academic year now open. Last date to apply is March 15, 2025.",
        "Scholarship applications for SC/ST students are now being accepted until February 28, 2025.",
        "Special workshop on 'Industry 4.0' scheduled for January 25, 2025 in the Main Auditorium.",
        "Results for Semester V examinations have been declared. Check the college portal.",
        "Campus recruitment drive by TCS scheduled for February 10, 2025. Register by February 5.",
        "Results for Semester V examinations have been declared. Check the college portal.",
        "Campus recruitment drive by TCS scheduled for February 10, 2025. Register by February 5.",
        "Results for Semester V examinations have been declared. Check the college portal.",
        "Campus recruitment drive by TCS scheduled for February 10, 2025. Register by February 5."
    ];

    notifications.forEach(text => {
        const notification = firstNotification.cloneNode(true);
        notification.querySelector('span').textContent = text;
        noticeContent.appendChild(notification);
    });

    // Create dummy news items
    const newsContent = document.getElementById('newsContent');
    const firstNewsItem = newsContent.children[0].cloneNode(true);

    // Sample news
    const newsItems = [
        "College secured 3rd rank in state-level technical competition.",
        "MOU signed with Microsoft for student skill development program.",
        "New Computer Lab inaugurated with latest hardware and software.",
        "Students developed innovative water conservation project.",
        "Faculty research paper published in international journal.",
        "New Computer Lab inaugurated with latest hardware and software.",
        "Students developed innovative water conservation project.",
        "Faculty research paper published in international journal.",
        "New Computer Lab inaugurated with latest hardware and software.",
        "Students developed innovative water conservation project.",
        "Faculty research paper published in international journal."
    ];

    newsItems.forEach(text => {
        const newsItem = firstNewsItem.cloneNode(true);
        newsItem.querySelector('p').textContent = text;
        newsContent.appendChild(newsItem);
    });
}

// =====================Event Slider=======================

const slider = document.querySelector('.event-slider');
const prevButton = document.querySelector('.slider-button-prev');
const nextButton = document.querySelector('.slider-button-next');
const cards = document.querySelectorAll('.event-card');
let cardWidth = cards[0].offsetWidth + 20; // Including margin
let currentIndex = 0;
let visibleCards = 3;

function updateVisibleCards() {
    if (window.innerWidth <= 768) {
        visibleCards = 1;
    } else if (window.innerWidth <= 1200) {
        visibleCards = 2;
    } else {
        visibleCards = 3;
    }

    cardWidth = cards[0].offsetWidth + 20;
    updateSliderPosition();
}

function updateSliderPosition() {
    slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

function nextSlide() {
    const maxIndex = cards.length - visibleCards;
    currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    updateSliderPosition();
}

function prevSlide() {
    const maxIndex = cards.length - visibleCards;
    currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    updateSliderPosition();
}

nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

// Auto slide every 5 seconds
let autoSlideInterval = setInterval(nextSlide, 1000);

// Pause auto slide on hover
slider.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

slider.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(nextSlide, 1000);
});

// Handle window resize
window.addEventListener('resize', function () {
    updateVisibleCards();

    // Reset mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        menuToggle.innerHTML = '☰';
        document.querySelectorAll('.nav-menu li').forEach(item => {
            item.classList.remove('active');
        });
    }
});


// Initialize
createDummyContent();
updateVisibleCards();

