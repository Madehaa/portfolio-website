document.addEventListener('DOMContentLoaded', () => {
    // Burger Menu Toggle
    const burger = document.getElementById('burger');
    const menu = document.getElementById('menu');  // Ensure this ID matches with your HTML

    // Prevent multiple event listeners from being attached
    if (!burger || !menu) {
        console.error("Burger or Menu element not found!");
        return;
    }

    // Check if event listener is already added
    if (!burger.hasEventListener) {
        burger.addEventListener('click', () => {
            // Toggle 'active' class to show/hide the menu
            menu.classList.toggle('active');
            console.log("Hamburger clicked!");
            console.log("Menu active class toggled:", menu.classList.contains('active'));
        });
        burger.hasEventListener = true; // Flag to prevent adding multiple listeners
    }

    // Video Slider Functionality
    const prevButton = document.querySelector('.video-button.prev');
    const nextButton = document.querySelector('.video-button.next');
    const videoSlides = document.querySelectorAll('.video-slide');
    let activeIndex = 0;

    if (prevButton && nextButton && videoSlides.length > 0) {
        function updateSlider(newIndex) {
            videoSlides.forEach((slide, index) => {
                slide.classList.remove('active');
                slide.style.transform = '';
                slide.style.opacity = '';

                if (index === newIndex) {
                    slide.classList.add('active');
                    slide.style.transform = 'scale(1)';
                    slide.style.opacity = '1';
                } else {
                    slide.style.transform = 'scale(0.7)';
                    slide.style.opacity = '0.5';
                }
            });

            videoSlides[(newIndex - 1 + videoSlides.length) % videoSlides.length].style.transform =
                'translateX(-120%) scale(0.7)';
            videoSlides[(newIndex + 1) % videoSlides.length].style.transform =
                'translateX(120%) scale(0.7)';
        }

        prevButton.addEventListener('click', () => {
            activeIndex = (activeIndex - 1 + videoSlides.length) % videoSlides.length;
            updateSlider(activeIndex);
        });

        nextButton.addEventListener('click', () => {
            activeIndex = (activeIndex + 1) % videoSlides.length;
            updateSlider(activeIndex);
        });

        updateSlider(activeIndex);
    }

    // Item Toggle
    window.toggleItem = function (selectedItem) {
        if (selectedItem.classList.contains('active')) {
            selectedItem.classList.remove('active');
        } else {
            document.querySelectorAll('.carousel .item').forEach(item => item.classList.remove('active'));
            selectedItem.classList.add('active');
        }
    };

    // Reels Video Play/Pause
    const reels = document.querySelectorAll('.reel-item');

    if (reels.length > 0) {
        reels.forEach(reel => {
            reel.addEventListener('click', () => {
                document.querySelectorAll('.reel-video').forEach(video => video.pause());
                const video = reel.querySelector('.reel-video');
                if (video) {
                    video.paused ? video.play() : video.pause();
                }
            });
        });
    }

    // Initialize Lightbox
    $(document).ready(function () {
        $('[data-toggle="lightbox"]').on('click', function (event) {
            event.preventDefault();
            $(this).ekkoLightbox();
        });
    });

    // Testimonial Slider
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dot');

    // Function to Change Slides (Previous or Next)
    function changeTestimonialSlide(direction) {
        // Remove 'active' class from current slide and dot
        if (slides[currentSlideIndex]) {
            slides[currentSlideIndex].classList.remove('active');
        }
        if (dots[currentSlideIndex]) {
            dots[currentSlideIndex].classList.remove('active');
        }

        // Update the current index (circular behavior)
        currentSlideIndex = (currentSlideIndex + direction + slides.length) % slides.length;

        // Update Slider with new active slide
        updateTestimonialSlider();
    }

    // Jump to a Specific Slide (via dot click)
    function jumpToTestimonialSlide(index) {
        // Remove 'active' class from current slide and dot
        if (slides[currentSlideIndex]) {
            slides[currentSlideIndex].classList.remove('active');
        }
        if (dots[currentSlideIndex]) {
            dots[currentSlideIndex].classList.remove('active');
        }

        // Update to the clicked dot's index
        currentSlideIndex = index;

        // Update Slider with new active slide
        updateTestimonialSlider();
    }

    // Update the Slider Display (Add 'active' class to the current slide and dot)
    function updateTestimonialSlider() {
        if (slides[currentSlideIndex] && dots[currentSlideIndex]) {
            slides[currentSlideIndex].classList.add('active');
            dots[currentSlideIndex].classList.add('active');
        }
    }

    // Attach Event Listeners for Buttons
    document.querySelector('.button-prev').addEventListener('click', () => changeTestimonialSlide(-1)); // Previous slide
    document.querySelector('.button-next').addEventListener('click', () => changeTestimonialSlide(1)); // Next slide

    // Attach Event Listeners for Dots (to jump to specific slides)
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => jumpToTestimonialSlide(index));
    });

    // Initialize the Slider
    updateTestimonialSlider();

});
