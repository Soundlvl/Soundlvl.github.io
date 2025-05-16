/**
 * Kevin McSharry Portfolio Website
 * Main JavaScript File
 */

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize project filtering if we're on the projects page
    initProjectFilter();
    
    // Initialize smooth scrolling for all pages
    initSmoothScroll();
});

/**
 * Initialize project filtering functionality
 * This function only runs its code if we're on the projects page
 */
function initProjectFilter() {
    const filterButtonsContainer = document.querySelector('.filter-buttons');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Only proceed if we're on the projects page
    if (!filterButtonsContainer || !projectCards.length) return;
    
    // Get all unique tags from projects
    const allTags = new Set();
    allTags.add('all'); // Always include "All" option
    
    // Collect all unique tags from projects
    document.querySelectorAll('.tag').forEach(tagSpan => {
        if (tagSpan.hasAttribute('data-tag')) {
            allTags.add(tagSpan.getAttribute('data-tag'));
        }
    });
    
    // Sort the tags alphabetically, keeping "all" as the first item
    const sortedTags = [...allTags].sort((a, b) => {
        if (a === 'all') return -1;
        if (b === 'all') return 1;
        return a.localeCompare(b);
    });
    
    // Create filter buttons for each unique tag
    sortedTags.forEach(tag => {
        const button = document.createElement('button');
        button.className = tag === 'all' ? 'filter-btn active' : 'filter-btn';
        button.setAttribute('data-filter', tag);
        button.textContent = tag === 'all' ? 'All' : tag;
        filterButtonsContainer.appendChild(button);
    });
    
    // Add click event to filter buttons using event delegation
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('filter-btn')) {
            // Remove active class from all buttons
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            event.target.classList.add('active');
            
            // Filter projects
            const filter = event.target.getAttribute('data-filter');
            filterProjects(filter, projectCards);
        }
    });
}

/**
 * Filter projects based on selected tag
 * @param {string} filter - The tag to filter by
 * @param {NodeList} projectCards - Collection of project card elements
 */
function filterProjects(filter, projectCards) {
    projectCards.forEach(card => {
        if (filter === 'all') {
            card.classList.remove('hidden');
        } else {
            // Check if the card has any tag that matches the filter
            const tagElements = card.querySelectorAll('.tag[data-tag]');
            let hasMatchingTag = false;
            
            tagElements.forEach(tagElement => {
                if (tagElement.getAttribute('data-tag') === filter) {
                    hasMatchingTag = true;
                }
            });
            
            if (hasMatchingTag) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        }
    });
}

/**
 * Initialize smooth scrolling for all anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault();
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}