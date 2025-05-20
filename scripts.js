/**
 * Kevin McSharry Portfolio Website
 * Main JavaScript File
 * 
 * This file provides interactive functionality for the portfolio website:
 * - Project filtering system
 * - Smooth scrolling
 * - Accessibility enhancements
 * - Copyright year updates
 */

// Wait for the DOM to fully load before running scripts
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all major functionality
    initProjectFilter();
    initSmoothScroll();
    updateCopyrightYear();
    enhanceAccessibility();
});

/**
 * Initialize project filtering functionality
 * Creates filter buttons dynamically based on project tags
 * and handles filtering of project cards
 */
function initProjectFilter() {
    const filterButtonsContainer = document.querySelector('.filter-buttons');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Only proceed if we're on the projects page
    if (!filterButtonsContainer || !projectCards.length) return;
    
    // Get all unique tags from projects
    const allTags = new Set(['all']); // Always include "All" option
    
    // Collect all unique tags from projects
    document.querySelectorAll('.project-tags').forEach(tagContainer => {
        if (tagContainer.dataset.tags) {
            tagContainer.dataset.tags.split(',').forEach(tag => allTags.add(tag.trim()));
        }
    });
    
    // Sort the tags alphabetically, keeping "all" as the first item
    const sortedTags = [...allTags].sort((a, b) => {
        if (a === 'all') return -1;
        if (b === 'all') return 1;
        return a.localeCompare(b);
    });
    
    // Create filter buttons for each unique tag
    const buttonFragment = document.createDocumentFragment();
    
    sortedTags.forEach((tag, index) => {
        const button = document.createElement('button');
        button.className = tag === 'all' ? 'filter-btn active' : 'filter-btn';
        button.setAttribute('data-filter', tag);
        button.textContent = tag === 'all' ? 'All' : tag;
        button.setAttribute('aria-label', `Filter by ${tag === 'all' ? 'All Projects' : tag}`);
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-selected', tag === 'all' ? 'true' : 'false');
        button.setAttribute('id', `filter-${tag.toLowerCase().replace(/\s+/g, '-')}`);
        button.setAttribute('tabindex', tag === 'all' ? '0' : '-1');
        buttonFragment.appendChild(button);
    });
    
    filterButtonsContainer.appendChild(buttonFragment);
    
    // Add click event to filter buttons using event delegation
    filterButtonsContainer.addEventListener('click', e => {
        const target = e.target;
        
        if (target.classList.contains('filter-btn')) {
            // Get the filter value
            const filter = target.getAttribute('data-filter');
            
            // Update button states
            updateFilterButtonStates(target);
            
            // Filter projects
            filterProjects(filter, projectCards);
            
            // Announce filter change for screen readers
            announceFilterChange(filter);
        }
    });
    
    // Add keyboard navigation for filter buttons
    filterButtonsContainer.addEventListener('keydown', e => {
        if (e.target.classList.contains('filter-btn')) {
            // Get all buttons
            const buttons = [...filterButtonsContainer.querySelectorAll('.filter-btn')];
            const currentIndex = buttons.indexOf(e.target);
            let nextIndex;
            
            switch (e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                    nextIndex = (currentIndex + 1) % buttons.length;
                    e.preventDefault();
                    focusFilterButton(buttons, nextIndex);
                    break;
                    
                case 'ArrowLeft':
                case 'ArrowUp':
                    nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
                    e.preventDefault();
                    focusFilterButton(buttons, nextIndex);
                    break;
                    
                case 'Home':
                    e.preventDefault();
                    focusFilterButton(buttons, 0);
                    break;
                    
                case 'End':
                    e.preventDefault();
                    focusFilterButton(buttons, buttons.length - 1);
                    break;
                    
                case 'Enter':
                case ' ': // Space
                    e.preventDefault();
                    e.target.click();
                    break;
                    
                default:
                    break;
            }
        }
    });
}

/**
 * Focus a filter button and update ARIA attributes
 * @param {Array} buttons - Array of filter buttons
 * @param {number} index - Index of button to focus
 */
function focusFilterButton(buttons, index) {
    buttons.forEach(btn => {
        btn.setAttribute('tabindex', '-1');
        btn.setAttribute('aria-selected', 'false');
    });
    
    buttons[index].setAttribute('tabindex', '0');
    buttons[index].focus();
}

/**
 * Update filter button states (active class, ARIA attributes)
 * @param {Element} activeButton - The button to set as active
 */
function updateFilterButtonStates(activeButton) {
    // Get all buttons
    const allButtons = document.querySelectorAll('.filter-btn');
    
    // Remove active class from all buttons
    allButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
        btn.setAttribute('tabindex', '-1');
    });
    
    // Add active class to clicked button
    activeButton.classList.add('active');
    activeButton.setAttribute('aria-selected', 'true');
    activeButton.setAttribute('tabindex', '0');
}

/**
 * Filter projects based on selected tag
 * @param {string} filter - The tag to filter by
 * @param {NodeList} projectCards - Collection of project card elements
 */
function filterProjects(filter, projectCards) {
    projectCards.forEach(card => {
        const tagsContainer = card.querySelector('.project-tags');
        
        if (filter === 'all') {
            card.classList.remove('hidden');
            card.setAttribute('aria-hidden', 'false');
            setTimeout(() => {
                card.style.display = '';
            }, 10);
        } else if (tagsContainer && tagsContainer.dataset.tags) {
            const cardTags = tagsContainer.dataset.tags.split(',').map(tag => tag.trim());
            
            if (cardTags.includes(filter)) {
                card.classList.remove('hidden');
                card.setAttribute('aria-hidden', 'false');
                setTimeout(() => {
                    card.style.display = '';
                }, 10);
            } else {
                card.classList.add('hidden');
                card.setAttribute('aria-hidden', 'true');
                setTimeout(() => {
                    if (card.classList.contains('hidden')) {
                        card.style.display = 'none';
                    }
                }, 300); // Match this with CSS transition duration
            }
        }
    });
}

/**
 * Announce filter change for screen readers
 * Creates or updates a live region to announce the current filter
 * @param {string} filter - The selected filter
 */
function announceFilterChange(filter) {
    // Create or update the live region
    let liveRegion = document.getElementById('filter-announcement');
    if (!liveRegion) {
        liveRegion = document.createElement('div');
        liveRegion.id = 'filter-announcement';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.classList.add('sr-only'); // Screen reader only
        document.body.appendChild(liveRegion);
    }
    
    liveRegion.textContent = `Filtered by ${filter === 'all' ? 'All Projects' : filter}`;
}

/**
 * Initialize smooth scrolling for all anchor links
 * Provides a smooth scrolling experience for internal page links
 * with respect for user motion preferences
 */
function initSmoothScroll() {
    // Only apply smooth scrolling if the user hasn't set a preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) return;
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault();
                
                // Use native smooth scrolling if supported
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update focus to the target for accessibility
                targetSection.setAttribute('tabindex', '-1');
                targetSection.focus({ preventScroll: true });
                
                // Update URL without triggering a scroll
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * Updates the copyright year to the current year
 * Finds all elements with the ID 'current-year' and sets their content
 * to the current year
 */
function updateCopyrightYear() {
    const yearElements = document.querySelectorAll('#current-year');
    if (yearElements.length) {
        const currentYear = new Date().getFullYear();
        yearElements.forEach(el => {
            el.textContent = currentYear;
        });
    }
}

/**
 * Add various accessibility enhancements
 * Improves the website's accessibility with ARIA attributes, roles,
 * and performance optimizations
 */
function enhanceAccessibility() {
    // Add 'aria-current="page"' to active navigation links
    const currentPageLinks = document.querySelectorAll('nav a.active');
    currentPageLinks.forEach(link => {
        link.setAttribute('aria-current', 'page');
    });
    
    // Ensure all images have alt text
    document.querySelectorAll('img').forEach(img => {
        if (!img.hasAttribute('alt')) {
            img.setAttribute('alt', '');
        }
    });
    
    // Add roles to improve landmark navigation
    const mainElement = document.querySelector('main');
    if (mainElement && !mainElement.hasAttribute('role')) {
        mainElement.setAttribute('role', 'main');
    }
    
    // Add loading="lazy" to images below the fold
    document.querySelectorAll('img').forEach(img => {
        if (!img.hasAttribute('loading') && !isElementInViewport(img)) {
            img.setAttribute('loading', 'lazy');
        }
    });
}

/**
 * Check if an element is in the viewport
 * Used to determine which images should have lazy loading applied
 * @param {Element} el - The element to check
 * @returns {boolean} - Whether the element is in the viewport
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}