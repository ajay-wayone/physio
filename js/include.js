document.addEventListener("DOMContentLoaded", function () {
    const includeElements = document.querySelectorAll("[include-html]");
    includeElements.forEach(el => {
        const file = el.getAttribute("include-html");
        if (file) {
            fetch(file)
                .then(response => {
                    if (response.ok) {
                        return response.text();
                    }
                    throw new Error("Page not found: " + file);
                })
                .then(data => {
                    // Insert the loaded HTML
                    el.innerHTML = data;
                    // Remove the attribute so it doesn't try to load again
                    el.removeAttribute("include-html");

                    // If we just loaded the header, attach mobile menu and activate nav
                    if (file === "header.html") {
                        attachMobileMenu();
                        // --- MANUAL TRIGGER for active nav item ---
                        if (typeof window.setActiveNavItem === 'function') {
                            window.setActiveNavItem();
                        }
                    }
                })
                .catch(error => console.error("Error including HTML:", error));
        }
    });
});

// Function to attach mobile menu functionality
function attachMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const headerNavigation = document.querySelector('.header-navigation');
    const headerActionBtn = document.querySelector('.header-action-btn');

    if (mobileMenuBtn && headerNavigation) {
        mobileMenuBtn.addEventListener('click', function () {
            headerNavigation.classList.toggle('mobile-active');
            mobileMenuBtn.classList.toggle('active');
            // Also toggle the button visibility in mobile menu
            if (headerActionBtn) {
                headerActionBtn.classList.toggle('mobile-active');
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
        if (mobileMenuBtn && headerNavigation && headerActionBtn) {
            if (!mobileMenuBtn.contains(event.target) && !headerNavigation.contains(event.target)) {
                headerNavigation.classList.remove('mobile-active');
                mobileMenuBtn.classList.remove('active');
                headerActionBtn.classList.remove('mobile-active');
            }
        }
    });
}