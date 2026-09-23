/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }
    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // ======================
    // Testimonial Carousel
    // ======================
    const track = document.querySelector('.carousel-track');
    if (track) {
        const testimonials = Array.from(document.querySelectorAll('.testimonial-card'));
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const testimonialDots = Array.from(document.querySelectorAll('.testimonial-dots .dot'));
        let startIndex = 0;

        const getVisibleCount = () => {
            if (window.innerWidth <= 767) return 1;
            if (window.innerWidth <= 991) return 2;
            return 3;
        };

        function updateCarousel() {
            const visibleCount = getVisibleCount();
            const maxStart = Math.max(testimonials.length - visibleCount, 0);
            startIndex = Math.min(startIndex, maxStart);

            testimonials.forEach((card, index) => {
                const isVisible = index >= startIndex && index < startIndex + visibleCount;
                card.classList.toggle('hidden', !isVisible);
            });

            testimonialDots.forEach((dot, index) => {
                const isActive = index === startIndex;
                dot.classList.toggle('active', isActive);
                dot.setAttribute('aria-current', isActive ? 'true' : 'false');
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const visibleCount = getVisibleCount();
                startIndex = (startIndex + 1) % Math.max(testimonials.length - visibleCount + 1, 1);
                updateCarousel();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const visibleCount = getVisibleCount();
                const maxStart = Math.max(testimonials.length - visibleCount, 0);
                startIndex = startIndex <= 0 ? maxStart : startIndex - 1;
                updateCarousel();
            });
        }

        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                const visibleCount = getVisibleCount();
                startIndex = Math.min(index, Math.max(testimonials.length - visibleCount, 0));
                updateCarousel();
            });
        });

        window.addEventListener('resize', updateCarousel);
        updateCarousel();
    }

    const videoWrap = document.querySelector('.featured-video');
    if (videoWrap) {
        const overlay = videoWrap.querySelector('.featured-video-overlay');
        const iframe = videoWrap.querySelector('iframe');
        if (overlay && iframe) {
            overlay.addEventListener('click', () => {
                const src = iframe.getAttribute('src');
                if (src && !src.includes('autoplay=1')) {
                    iframe.setAttribute('src', src + '&autoplay=1');
                }
                videoWrap.classList.add('is-playing');
            });
        }
    }

    // =====================
    // Featured Carousel
    // =====================
    document.querySelectorAll('.youtube-preview').forEach((preview) => {
        const overlay = preview.querySelector('.youtube-preview-overlay');
        const iframe = preview.querySelector('iframe');
        if (!iframe) return;

        const loadVideo = () => {
            const videoSrc = preview.dataset.videoSrc || iframe.getAttribute('src');
            if (videoSrc && videoSrc !== 'about:blank') {
                const autoplaySrc = videoSrc.includes('autoplay=1') ? videoSrc : videoSrc + (videoSrc.includes('?') ? '&autoplay=1' : '?autoplay=1');
                iframe.setAttribute('src', autoplaySrc);
            }
            preview.classList.add('is-playing');
        };

        if (overlay) {
            overlay.addEventListener('click', loadVideo);
        }

        iframe.addEventListener('click', loadVideo);
    });

    const featuredTrack = document.querySelector('.featured-track');
    if (featuredTrack) {
        const featuredCards = Array.from(featuredTrack.querySelectorAll('.featured-card'));
        const featuredPrevBtn = document.getElementById('featuredPrevBtn');
        const featuredNextBtn = document.getElementById('featuredNextBtn');
        let featuredStartIndex = 0;

        const getFeaturedVisibleCount = () => window.innerWidth <= 767 ? 1 : 3;

        function updateFeaturedCarousel() {
            const visibleCount = getFeaturedVisibleCount();
            const maxStart = Math.max(featuredCards.length - visibleCount, 0);
            featuredStartIndex = Math.min(featuredStartIndex, maxStart);

            featuredCards.forEach((card, index) => {
                const isVisible = index >= featuredStartIndex && index < featuredStartIndex + visibleCount;
                card.classList.toggle('hidden', !isVisible);
            });
        }

        featuredNextBtn?.addEventListener('click', () => {
            const maxStart = Math.max(featuredCards.length - getFeaturedVisibleCount(), 0);
            featuredStartIndex = featuredStartIndex >= maxStart ? 0 : featuredStartIndex + 1;
            updateFeaturedCarousel();
        });

        featuredPrevBtn?.addEventListener('click', () => {
            const maxStart = Math.max(featuredCards.length - getFeaturedVisibleCount(), 0);
            featuredStartIndex = featuredStartIndex <= 0 ? maxStart : featuredStartIndex - 1;
            updateFeaturedCarousel();
        });

        window.addEventListener('resize', updateFeaturedCarousel);
        updateFeaturedCarousel();
    }

});