/**
 * Virtual Lab AR - Global JavaScript
 * Handles navigation, interactions, and common functionality across all pages
 */

// Global utilities and constants
const VirtualLabAR = {
    // Configuration
    config: {
        animationDuration: 300,
        debounceDelay: 250,
        scrollOffset: 80
    },
    
    // Utility functions
    utils: {
        // Debounce function for performance optimization
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
        
        // Throttle function for scroll events
        throttle: function(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            }
        },
        
        // Get query parameters from URL
        getQueryParam: function(param) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
        },
        
        // Smooth scroll to element
        smoothScrollTo: function(elementId) {
            const element = document.getElementById(elementId);
            if (element) {
                const offsetTop = element.offsetTop - this.config.scrollOffset;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        },
        
        // Add fade-in animation to elements
        addFadeInAnimation: function(elements) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in-up');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            elements.forEach(el => observer.observe(el));
        },
        
        // Show loading state
        showLoading: function(element, text = 'Loading...') {
            const originalContent = element.innerHTML;
            element.innerHTML = `<span class="loading"></span> ${text}`;
            element.dataset.originalContent = originalContent;
            element.disabled = true;
        },
        
        // Hide loading state
        hideLoading: function(element) {
            if (element.dataset.originalContent) {
                element.innerHTML = element.dataset.originalContent;
                delete element.dataset.originalContent;
            }
            element.disabled = false;
        }
    },
    
    // Initialize all functionality
    init: function() {
        this.initNavigation();
        this.initAnimations();
        this.initFormHandlers();
        this.initExperimentFilters();
        this.initScrollEffects();
        this.initAccessibility();
        console.log('Virtual Lab AR initialized successfully');
    }
};

// Navigation functionality
VirtualLabAR.initNavigation = function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('mobile-menu-enter');
                setTimeout(() => {
                    mobileMenu.classList.remove('mobile-menu-enter');
                    mobileMenu.classList.add('mobile-menu-enter-active');
                }, 10);
                
                // Update button icon
                this.innerHTML = '<i class="fas fa-times text-xl"></i>';
            } else {
                mobileMenu.classList.add('mobile-menu-exit-active');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('mobile-menu-enter-active', 'mobile-menu-exit-active');
                }, VirtualLabAR.config.animationDuration);
                
                // Update button icon
                this.innerHTML = '<i class="fas fa-bars text-xl"></i>';
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenuBtn.click();
                }
            }
        });
    }
    
    // Add active class to current page nav link
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a[href]');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '/' && href === '/')) {
            link.classList.add('text-primary', 'bg-blue-100');
            link.classList.remove('text-gray-600');
        }
    });
};

// Animation initialization
VirtualLabAR.initAnimations = function() {
    // Add fade-in animations to cards and sections
    const animatedElements = document.querySelectorAll('.card, .experiment-card, section > div');
    this.utils.addFadeInAnimation(animatedElements);
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn, button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
};

// Form handling
VirtualLabAR.initFormHandlers = function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', this.handleContactForm.bind(this));
    }
    
    // Add real-time validation
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', this.validateField);
        input.addEventListener('input', this.utils.debounce(this.validateField, 300));
    });
};

// Contact form handler
VirtualLabAR.handleContactForm = function(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const successMsg = document.getElementById('form-success');
    const errorMsg = document.getElementById('form-error');
    
    // Hide previous messages
    successMsg?.classList.add('hidden');
    errorMsg?.classList.add('hidden');
    
    // Show loading state
    this.utils.showLoading(submitBtn, 'Sending...');
    
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Mock API call (replace with actual endpoint)
    this.submitContactForm(data)
        .then(response => {
            if (response.success) {
                successMsg?.classList.remove('hidden');
                form.reset();
                
                // Scroll to success message
                successMsg?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            } else {
                throw new Error(response.message || 'Submission failed');
            }
        })
        .catch(error => {
            console.error('Form submission error:', error);
            errorMsg?.classList.remove('hidden');
            
            // Scroll to error message
            errorMsg?.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        })
        .finally(() => {
            this.utils.hideLoading(submitBtn);
        });
};

// Mock contact form submission
VirtualLabAR.submitContactForm = function(data) {
    return new Promise((resolve) => {
        // Simulate API call delay
        setTimeout(() => {
            // Mock successful submission
            console.log('Contact form data:', data);
            resolve({ success: true, message: 'Message sent successfully' });
            
            // In a real application, you would make an actual API call:
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(resolve)
            .catch(reject);
            */
        }, 2000);
    });
};

// Field validation
VirtualLabAR.validateField = function(event) {
    const field = event.target;
    const value = field.value.trim();
    
    // Remove existing validation classes
    field.classList.remove('border-green-500', 'border-red-500');
    
    // Check if field is required and empty
    if (field.hasAttribute('required') && !value) {
        field.classList.add('border-red-500');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('border-red-500');
            return false;
        }
    }
    
    // If validation passes
    if (value) {
        field.classList.add('border-green-500');
    }
    
    return true;
};

// Experiment filters (for experiments page)
VirtualLabAR.initExperimentFilters = function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const experimentCards = document.querySelectorAll('.experiment-card');
    
    if (filterBtns.length === 0 || experimentCards.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active button
            filterBtns.forEach(b => {
                b.classList.remove('active', 'bg-primary', 'text-white');
                b.classList.add('bg-gray-200', 'text-gray-700');
            });
            
            this.classList.add('active', 'bg-primary', 'text-white');
            this.classList.remove('bg-gray-200', 'text-gray-700');
            
            // Filter experiments
            VirtualLabAR.filterExperiments(category, experimentCards);
        });
    });
};

// Filter experiments function
VirtualLabAR.filterExperiments = function(category, cards) {
    cards.forEach(card => {
        const cardCategory = card.dataset.category;
        const shouldShow = category === 'all' || cardCategory === category;
        
        if (shouldShow) {
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            // Animate in
            setTimeout(() => {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        } else {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '0';
            card.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
};

// Scroll effects
VirtualLabAR.initScrollEffects = function() {
    // Header scroll effect
    const header = document.querySelector('nav');
    let lastScrollY = window.scrollY;
    
    const handleScroll = this.utils.throttle(() => {
        const currentScrollY = window.scrollY;
        
        if (header) {
            if (currentScrollY > 100) {
                header.classList.add('shadow-lg');
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            } else {
                header.classList.remove('shadow-lg');
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        }
        
        lastScrollY = currentScrollY;
    }, 100);
    
    window.addEventListener('scroll', handleScroll);
    
    // Scroll to top button (if exists)
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', this.utils.throttle(() => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.remove('hidden');
            } else {
                scrollTopBtn.classList.add('hidden');
            }
        }, 100));
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
};

// Accessibility improvements
VirtualLabAR.initAccessibility = function() {
    // Keyboard navigation for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
    
    interactiveElements.forEach(element => {
        element.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                if (this.tagName === 'BUTTON' || (this.tagName === 'A' && this.href)) {
                    event.preventDefault();
                    this.click();
                }
            }
        });
    });
    
    // Focus management for mobile menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                if (!mobileMenu.classList.contains('hidden')) {
                    this.click();
                    this.focus();
                }
            }
        });
    }
    
    // Announce dynamic content changes to screen readers
    this.createAriaLiveRegion();
};

// Create ARIA live region for announcements
VirtualLabAR.createAriaLiveRegion = function() {
    if (!document.getElementById('aria-live-region')) {
        const liveRegion = document.createElement('div');
        liveRegion.id = 'aria-live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.position = 'absolute';
        liveRegion.style.left = '-10000px';
        liveRegion.style.width = '1px';
        liveRegion.style.height = '1px';
        liveRegion.style.overflow = 'hidden';
        document.body.appendChild(liveRegion);
    }
};

// Announce message to screen readers
VirtualLabAR.announce = function(message) {
    const liveRegion = document.getElementById('aria-live-region');
    if (liveRegion) {
        liveRegion.textContent = message;
        
        // Clear after announcement
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 1000);
    }
};

// Error handling
window.addEventListener('error', function(event) {
    console.error('Global error caught:', event.error);
    
    // You could send error reports to your analytics service here
    // analytics.track('JavaScript Error', { message: event.error.message });
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const timing = performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
            
            // You could send performance data to your analytics service here
            // analytics.track('Page Performance', { loadTime });
        }, 0);
    });
}

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => VirtualLabAR.init());
} else {
    VirtualLabAR.init();
}

// Export for use in other scripts
window.VirtualLabAR = VirtualLabAR;