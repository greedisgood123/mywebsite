/**
 * Main JavaScript file - Modern ES6+ with best practices
 * Demonstrates proper event handling, DOM manipulation, and accessibility
 */

// Use strict mode for better error catching
'use strict';

// DOM Content Loaded - Ensure DOM is ready before manipulating
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 WebDev Pro website loaded successfully!');

    // Initialize all modules
    initMobileMenu();
    initSmoothScrolling();
    initFormValidation();
    initScrollEffects();
    initKeyboardNavigation();
    initLazyLoading();
    preloadCriticalResources();
});

/**
 * Mobile Menu Toggle Functionality
 * Handles hamburger menu for mobile devices
 */
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!mobileMenuToggle || !navMenu) return;

    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function() {
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';

        // Update aria-expanded attribute
        mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);

        // Toggle menu visibility
        navMenu.classList.toggle('mobile-menu-open');

        // Update hamburger animation
        updateHamburgerIcon(mobileMenuToggle, !isExpanded);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenuToggle.contains(event.target) && !navMenu.contains(event.target)) {
            closeMobileMenu();
        }
    });

    // Close mobile menu on window resize if desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
}

/**
 * Update hamburger menu icon animation
 */
function updateHamburgerIcon(toggle, isOpen) {
    const lines = toggle.querySelectorAll('.hamburger-line');

    if (isOpen) {
        // Animate to X
        lines[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
        // Reset to hamburger
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
    }
}

/**
 * Close mobile menu helper function
 */
function closeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('mobile-menu-open');
        updateHamburgerIcon(mobileMenuToggle, false);
    }
}

/**
 * Smooth Scrolling for Navigation Links
 * Provides smooth scrolling to sections
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate offset for fixed header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL without triggering scroll
                history.pushState(null, null, targetId);

                // Close mobile menu if open
                closeMobileMenu();

                // Update active navigation link
                updateActiveNavLink(targetId);
            }
        });
    });
}

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNavLink(activeId) {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === activeId) {
            link.classList.add('active');
        }
    });
}

/**
 * Scroll Effects and Active Section Detection
 * Updates navigation based on scroll position
 */
function initScrollEffects() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('header');

    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Header hide/show on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;

        // Update active section in navigation
        const currentSection = getCurrentSection(sections);
        if (currentSection) {
            updateActiveNavLink('#' + currentSection.id);
        }

        // Add scroll effects to elements
        addScrollAnimations();
    });
}

/**
 * Get current section based on scroll position
 */
function getCurrentSection(sections) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const headerHeight = document.querySelector('header').offsetHeight;

    for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionTop = section.offsetTop - headerHeight - 100;

        if (scrollTop >= sectionTop) {
            return section;
        }
    }

    return null;
}

/**
 * Add scroll animations to elements
 */
function addScrollAnimations() {
    const elements = document.querySelectorAll('.feature-card, .service-item, .portfolio-item');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight * 0.8 && elementBottom > 0) {
            element.classList.add('animate-in');
        }
    });
}

/**
 * Form Validation with Modern JavaScript
 * Client-side validation with proper error handling
 */
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        const errors = validateForm(formData);

        // Clear previous errors
        clearFormErrors();

        if (errors.length === 0) {
            // Form is valid, simulate submission
            handleFormSubmission(formData);
        } else {
            // Display errors
            displayFormErrors(errors);
        }
    });

    // Real-time validation
    const inputs = contactForm.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

/**
 * Validate form data
 */
function validateForm(formData) {
    const errors = [];

    const name = formData.get('name').trim();
    const email = formData.get('email').trim();

    // Name validation
    if (!name) {
        errors.push({ field: 'name', message: 'Name is required' });
    } else if (name.length < 2) {
        errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
    }

    // Email validation
    if (!email) {
        errors.push({ field: 'email', message: 'Email is required' });
    } else if (!isValidEmail(email)) {
        errors.push({ field: 'email', message: 'Please enter a valid email address' });
    }

    return errors;
}

/**
 * Validate individual field
 */
function validateField(field) {
    const value = field.value.trim();
    let error = null;

    if (field.type === 'text' && field.name === 'name') {
        if (!value) {
            error = 'Name is required';
        } else if (value.length < 2) {
            error = 'Name must be at least 2 characters';
        }
    } else if (field.type === 'email') {
        if (!value) {
            error = 'Email is required';
        } else if (!isValidEmail(value)) {
            error = 'Please enter a valid email address';
        }
    }

    if (error) {
        displayFieldError(field, error);
    } else {
        clearFieldError(field);
    }
}

/**
 * Email validation helper
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Display field error
 */
function displayFieldError(field, message) {
    clearFieldError(field);

    const errorElement = document.createElement('span');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.setAttribute('role', 'alert');
    errorElement.setAttribute('aria-live', 'polite');

    field.parentNode.appendChild(errorElement);
    field.setAttribute('aria-invalid', 'true');
}

/**
 * Clear field error
 */
function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.removeAttribute('aria-invalid');
}

/**
 * Display form errors
 */
function displayFormErrors(errors) {
    errors.forEach(error => {
        const field = document.querySelector(`[name="${error.field}"]`);
        if (field) {
            displayFieldError(field, error.message);
        }
    });
}

/**
 * Clear all form errors
 */
function clearFormErrors() {
    const errorElements = document.querySelectorAll('.field-error');
    errorElements.forEach(error => error.remove());

    const invalidFields = document.querySelectorAll('[aria-invalid="true"]');
    invalidFields.forEach(field => field.removeAttribute('aria-invalid'));
}

/**
 * Handle form submission
 */
function handleFormSubmission(formData) {
    const submitButton = document.querySelector('.contact-form button[type="submit"]');
    const originalText = submitButton.textContent;

    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Show success message
        showNotification('Thank you! Your message has been sent successfully.', 'success');

        // Reset form
        document.querySelector('.contact-form').reset();

        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;

        // Clear any remaining errors
        clearFormErrors();
    }, 2000);
}

/**
 * Show notification message
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'assertive');
    notification.innerHTML = `
        <span class="notification-message">${message}</span>
        <button class="notification-close" aria-label="Close notification">&times;</button>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Add close functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.remove();
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

/**
 * Keyboard Navigation Enhancements
 * Improve accessibility with keyboard shortcuts
 */
function initKeyboardNavigation() {
    // Keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        // Escape key closes mobile menu
        if (event.key === 'Escape') {
            closeMobileMenu();

            // Close any open notifications
            const notification = document.querySelector('.notification');
            if (notification) {
                notification.remove();
            }
        }

        // Ctrl/Cmd + K focuses search (if we had a search)
        if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
            event.preventDefault();
            // Focus search input if it exists
        }
    });

    // Enhanced focus management for mobile menu
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        // Trap focus in mobile menu when open
        mobileMenuToggle.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        });

        // Focus management for menu items
        const menuItems = navMenu.querySelectorAll('.nav-link');
        menuItems.forEach((item, index) => {
            item.addEventListener('keydown', function(event) {
                if (event.key === 'ArrowDown' && index < menuItems.length - 1) {
                    event.preventDefault();
                    menuItems[index + 1].focus();
                } else if (event.key === 'ArrowUp' && index > 0) {
                    event.preventDefault();
                    menuItems[index - 1].focus();
                }
            });
        });
    }
}

/**
 * Performance Optimization: Debounce function
 * Useful for scroll events and resize events
 */
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

/**
 * Error Handling
 * Global error handler for better debugging
 */
window.addEventListener('error', function(event) {
    console.error('JavaScript Error:', event.error);
    // In production, you might want to send this to an error tracking service
});

/**
 * Performance Monitoring
 * Core Web Vitals and performance metrics
 */
window.addEventListener('load', function() {
    // Measure page load performance
    if (window.performance) {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('📊 Page Load Performance:');
        console.log('  DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart, 'ms');
        console.log('  Load Complete:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');

        // Log Core Web Vitals if available
        logCoreWebVitals();
    }
});

/**
 * Log Core Web Vitals metrics
 */
function logCoreWebVitals() {
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
        try {
            new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    console.log('🎯 LCP:', entry.startTime, 'ms');
                }
            }).observe({entryTypes: ['largest-contentful-paint']});

            // First Input Delay (FID)
            new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    console.log('🎯 FID:', entry.processingStart - entry.startTime, 'ms');
                }
            }).observe({entryTypes: ['first-input']});

            // Cumulative Layout Shift (CLS)
            let clsValue = 0;
            new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                }
                console.log('🎯 CLS:', clsValue);
            }).observe({entryTypes: ['layout-shift']});
        } catch (e) {
            console.log('Performance monitoring not fully supported');
        }
    }
}

/**
 * Lazy Loading Implementation
 * Load images only when they come into viewport
 */
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        // Observe all lazy images
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

/**
 * Resource Loading Optimization
 * Preload critical resources
 */
function preloadCriticalResources() {
    // Preload critical fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    fontLink.as = 'style';
    document.head.appendChild(fontLink);

    // Preload critical images for above-the-fold content
    const heroImages = document.querySelectorAll('.hero img');
    heroImages.forEach(img => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = img.src;
        link.as = 'image';
        document.head.appendChild(link);
    });
}

/**
 * Memory Management
 * Clean up event listeners and observers
 */
function cleanup() {
    // Remove event listeners when not needed
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.removeEventListener('click', () => {});
    }

    // Clear any intervals or timeouts
    // Add cleanup for any setTimeout/setInterval used in the code
}

/**
 * Error Boundary
 * Catch and handle JavaScript errors gracefully
 */
window.addEventListener('error', function(event) {
    console.error('🚨 JavaScript Error:', event.error);
    console.error('File:', event.filename);
    console.error('Line:', event.lineno);

    // In production, send to error tracking service
    // reportError(event.error, event.filename, event.lineno);
});

/**
 * Unhandled Promise Rejection Handler
 */
window.addEventListener('unhandledrejection', function(event) {
    console.error('🚨 Unhandled Promise Rejection:', event.reason);

    // Prevent the default handler from running
    event.preventDefault();
});
