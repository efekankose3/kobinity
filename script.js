// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    const authButtons = document.querySelector('.auth-buttons');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            // Toggle navigation menu
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            // Toggle auth buttons
            authButtons.style.display = authButtons.style.display === 'flex' ? 'none' : 'flex';
            
            // Change icon based on state
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default anchor click behavior
            e.preventDefault();
            
            // Get the target element
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                // Scroll smoothly to the target
                window.scrollTo({
                    top: target.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth < 768) {
                    nav.style.display = 'none';
                    authButtons.style.display = 'none';
                    
                    // Reset icon
                    const icon = mobileMenuBtn.querySelector('i');
                    if (icon.classList.contains('fa-times')) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validate form data (basic validation)
            if (!name || !email || !subject || !message) {
                alert('Lütfen tüm alanları doldurun.');
                return;
            }
            
            // Here you would typically send the data to a server
            // For demo purposes, we'll show a success message
            alert('Mesajınız için teşekkürler! En kısa sürede size dönüş yapacağız.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Animate counter numbers in stats section
    const counters = document.querySelectorAll('.counter');
    let hasAnimated = false;

    // Function to start counter animation
    function animateCounters() {
        if (hasAnimated) return;
        
        counters.forEach(counter => {
            const target = counter.innerText;
            const suffix = target.includes('+') ? '+' : (target.includes('/') ? '/5' : '');
            const targetNumber = parseFloat(target.replace(/[^\d.-]/g, ''));
            let count = 0;
            const duration = 2000; // Animation duration in milliseconds
            const interval = duration / targetNumber;
            const increment = targetNumber / (duration / 15); // Update every 15ms
            
            const timer = setInterval(() => {
                count += increment;
                if (count >= targetNumber) {
                    clearInterval(timer);
                    counter.innerText = target;
                } else {
                    counter.innerText = Math.floor(count) + suffix;
                }
            }, 15);
        });
        
        hasAnimated = true;
    }

    // Check if stats section is in viewport and animate
    function checkVisible() {
        const statsSection = document.querySelector('.stats');
        if (statsSection) {
            const position = statsSection.getBoundingClientRect();
            
            // Check if stats section is in viewport
            if (position.top < window.innerHeight && position.bottom >= 0) {
                animateCounters();
            }
        }
    }

    // Check visibility on scroll
    window.addEventListener('scroll', checkVisible);
    
    // Check visibility on initial load
    checkVisible();

    // Add hover effect to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Testimonial slider (if there are many testimonials)
    // This is a simple manual testimonial rotation, you can replace with a carousel library
    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length > 3) {
        let currentIndex = 0;
        const testimonialsContainer = document.querySelector('.testimonials');
        
        // Show only first 3 testimonials
        testimonials.forEach((testimonial, index) => {
            if (index > 2) {
                testimonial.style.display = 'none';
            }
        });
        
        // Add navigation buttons
        const navButtons = document.createElement('div');
        navButtons.className = 'testimonial-nav';
        navButtons.innerHTML = `
            <button class="prev-btn"><i class="fas fa-chevron-left"></i></button>
            <button class="next-btn"><i class="fas fa-chevron-right"></i></button>
        `;
        
        testimonialsContainer.after(navButtons);
        
        // Add event listeners to buttons
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        prevBtn.addEventListener('click', () => {
            testimonials[currentIndex].style.display = 'none';
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            testimonials[currentIndex].style.display = 'block';
        });
        
        nextBtn.addEventListener('click', () => {
            testimonials[currentIndex].style.display = 'none';
            currentIndex = (currentIndex + 1) % testimonials.length;
            testimonials[currentIndex].style.display = 'block';
        });
    }
    
    // Add sticky header on scroll
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > headerHeight) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
}); 