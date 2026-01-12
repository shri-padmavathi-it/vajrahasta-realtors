document.addEventListener('DOMContentLoaded', function() {
      const slides = document.querySelectorAll('.slide');
      const dots = document.querySelectorAll('.dot');
      const prevBtn = document.querySelector('.prev');
      const nextBtn = document.querySelector('.next');
      const heroSlider = document.querySelector('.hero-slider');
      
      let currentSlide = 0;
      let slideInterval;
      const slideDelay = 5000;

      // Show specific slide
      function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        if (n >= slides.length) {
          currentSlide = 0;
        } else if (n < 0) {
          currentSlide = slides.length - 1;
        } else {
          currentSlide = n;
        }

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
      }

      // Next slide
      function nextSlide() {
        showSlide(currentSlide + 1);
      }

      // Previous slide
      function prevSlide() {
        showSlide(currentSlide - 1);
      }

      // Auto play slides
      function startSlideShow() {
        slideInterval = setInterval(nextSlide, slideDelay);
      }

      // Stop auto play
      function stopSlideShow() {
        clearInterval(slideInterval);
      }

      // Arrow button handlers
      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          stopSlideShow();
          prevSlide();
          startSlideShow();
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          stopSlideShow();
          nextSlide();
          startSlideShow();
        });
      }

      // Dot click handlers
      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          stopSlideShow();
          showSlide(index);
          startSlideShow();
        });
      });

      // Pause on hover
      heroSlider.addEventListener('mouseenter', stopSlideShow);
      heroSlider.addEventListener('mouseleave', startSlideShow);

      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          stopSlideShow();
          prevSlide();
          startSlideShow();
        } else if (e.key === 'ArrowRight') {
          stopSlideShow();
          nextSlide();
          startSlideShow();
        }
      });

      // Touch/Swipe support
      let touchStartX = 0;
      let touchEndX = 0;

      heroSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopSlideShow();
      });

      heroSlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startSlideShow();
      });

      function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
          if (diff > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }
      }

      // Pause when tab not visible
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          stopSlideShow();
        } else {
          startSlideShow();
        }
      });

      // Initialize
      showSlide(0);
      startSlideShow();

      // Smooth scroll for Learn More button
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });
    });