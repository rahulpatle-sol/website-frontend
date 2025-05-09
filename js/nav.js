//back navigate button
function goBack() {
    window.history.back();
}

//navigation script.........
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
});