/**
 * Highlights the correct navigation item based on the current URL.
 * Handles extensionless URLs, index.html as root, and dynamic header injection.
 */
(function() {
  'use strict';

  /**
   * Normalises a path by removing trailing slash and .html extension.
   * @param {string} path - The raw pathname.
   * @returns {string} Normalised path.
   */
  function normalisePath(path) {
    // Remove trailing slash unless it's the root
    let normalised = path.replace(/\/$/, '') || '/';
    // Remove .html extension if present
    if (normalised.endsWith('.html')) {
      normalised = normalised.slice(0, -5);
    }
    return normalised;
  }

  /**
   * Returns an array of possible path variations for a link.
   * For example, '/about/index' also matches '/about'.
   * @param {string} path - The normalised link path.
   * @returns {string[]} Array of path variations.
   */
  function getPathVariations(path) {
    const variations = [path];
    // If the path ends with '/index', also consider the parent directory
    if (path.endsWith('/index')) {
      variations.push(path.slice(0, -6) || '/'); // remove '/index'
    }
    // Special case: '/index' alone should also match '/'
    if (path === '/index') {
      variations.push('/');
    }
    return variations;
  }

  function setActiveNavItem() {
    const navItems = document.querySelectorAll('.header-navigation .nav-item');
    if (!navItems.length) return false; // not yet in DOM

    // Get current path and normalise it
    const currentPath = normalisePath(window.location.pathname);

    navItems.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;

      // Resolve the link's full path (handles relative URLs)
      const linkUrl = new URL(href, window.location.origin);
      const linkPath = normalisePath(linkUrl.pathname);

      // Get all possible representations of the link's target
      const linkVariations = getPathVariations(linkPath);

      // Check if currentPath matches any variation
      const isActive = linkVariations.includes(currentPath);

      if (isActive) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
    return true;
  }

  // Try immediately (in case header is already in DOM)
  if (!setActiveNavItem()) {
    // Otherwise observe document for changes (header injected by include.js)
    const observer = new MutationObserver((mutations, obs) => {
      if (setActiveNavItem()) {
        obs.disconnect(); // stop once successful
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Expose globally for manual calls from include.js
  window.setActiveNavItem = setActiveNavItem;
})();