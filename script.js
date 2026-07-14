document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       1. Sticky Navbar
       ========================================================================== */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       2. Scroll Reveal Animations (Intersection Observer)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Run animation once
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    /* ==========================================================================
       3. Animated Counters
       ========================================================================== */
    const counters = document.querySelectorAll('.stat-number');
    let hasCounted = false;

    const countUp = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 100; // Speed adjustment

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => countUp(counter), 20);
        } else {
            counter.innerText = target;
        }
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasCounted) {
                counters.forEach(counter => countUp(counter));
                hasCounted = true; // Prevent recounting
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.getElementById('stats');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }

    /* ==========================================================================
       4. FAQ Accordion Logic
       ========================================================================== */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            // Toggle current item
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    /* ==========================================================================
       5. Smooth Scrolling for Anchor Links (Optional Enhancement)
       ========================================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only apply to links that exist on page and are not standard #
            const targetId = this.getAttribute('href');
            if (targetId !== "#" && document.querySelector(targetId)) {
                e.preventDefault();
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
