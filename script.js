function toggleMenu() {
    console.log('Hamburger clicked'); // Debug log
    const dropdown = document.querySelector('.dropdown-menu');
    dropdown.classList.toggle('show');
}

// Fade-in animation for menu items
document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    menuItems.forEach(item => {
        observer.observe(item);
    });

    // Slider functionality
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slider .slide');
    const dots = document.querySelectorAll('.slider .dot');
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            dots[i].classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
                dots[i].classList.add('active');
            }
        });
    }

    function changeSlide(n) {
        slideIndex = (slideIndex + n + slides.length) % slides.length;
        showSlide(slideIndex);
        resetInterval();
    }

    function currentSlide(n) {
        slideIndex = n;
        showSlide(slideIndex);
        resetInterval();
    }

    function autoSlide() {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlide(slideIndex);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(autoSlide, 5000);
    }

    // Initialize slider
    showSlide(slideIndex);
    slideInterval = setInterval(autoSlide, 5000);
});
