// Image Slider
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
}

function startSlider() {
    slideInterval = setInterval(nextSlide, 5000);
}

function resetInterval() {
    clearInterval(slideInterval);
    startSlider();
}

// Event Listeners
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
        resetInterval();
    });
});

// Start auto-slide
startSlider();

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close mobile menu if open
            const nav = document.querySelector('.nav');
            const mobileBtnIcon = document.querySelector('.mobile-menu-btn i');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileBtnIcon.classList.remove('fa-times');
                mobileBtnIcon.classList.add('fa-bars');
            }

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Intersection Observer for fade-in animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.menu-card').forEach(card => {
    observer.observe(card);
});

// Add Share Buttons to All Menu Cards
function addShareButtonsToCards() {
    const menuCards = document.querySelectorAll('.menu-card');

    menuCards.forEach(card => {
        const cardImage = card.querySelector('.card-image');

        // Skip if share buttons already exist
        if (cardImage.querySelector('.share-buttons')) {
            return;
        }

        const shareButtons = document.createElement('div');
        shareButtons.className = 'share-buttons';
        shareButtons.innerHTML = `
            <button class="share-btn" data-platform="facebook" aria-label="Share on Facebook">
                <i class="fab fa-facebook-f"></i>
            </button>
            <button class="share-btn" data-platform="x" aria-label="Share on X">
                <i class="fab fa-x-twitter"></i>
            </button>
            <button class="share-btn" data-platform="instagram" aria-label="Share on Instagram">
                <i class="fab fa-instagram"></i>
            </button>
            <button class="share-btn" data-platform="whatsapp" aria-label="Share on WhatsApp">
                <i class="fab fa-whatsapp"></i>
            </button>
        `;

        cardImage.appendChild(shareButtons);
    });
}

// Social Share Functionality
function shareOnSocialMedia(platform, dishName, dishPrice) {
    const url = window.location.href;
    const text = `Check out ${dishName} at Uyghur Kitchen for ${dishPrice}!`;

    let shareUrl = '';

    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
            break;
        case 'x':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
            break;
        case 'instagram':
            // Instagram doesn't support direct web sharing, so we'll copy the text
            navigator.clipboard.writeText(text + ' ' + url).then(() => {
                alert('Link copied! You can now paste it on Instagram.');
            });
            return;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
            break;
    }

    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Initialize features after DOM loads
document.addEventListener('DOMContentLoaded', function () {
    // Share Buttons
    addShareButtonsToCards();

    document.addEventListener('click', function (e) {
        if (e.target.closest('.share-btn')) {
            const button = e.target.closest('.share-btn');
            const platform = button.getAttribute('data-platform');
            const card = button.closest('.menu-card');
            const dishName = card.querySelector('.dish-name').textContent;
            const dishPrice = card.querySelector('.dish-price').textContent;

            shareOnSocialMedia(platform, dishName, dishPrice);
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Search Functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const menuCards = document.querySelectorAll('.menu-card');

            menuCards.forEach(card => {
                const dishName = card.querySelector('.dish-name').textContent.toLowerCase();
                const dishDesc = card.querySelector('.dish-description').textContent.toLowerCase();
                const uyghurName = card.querySelector('.uyghur-name').textContent;

                if (dishName.includes(searchTerm) || dishDesc.includes(searchTerm) || uyghurName.includes(searchTerm)) {
                    card.style.display = 'block';
                    // Re-trigger animation if needed
                    card.classList.add('visible');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;
    const themeIcon = darkModeToggle ? darkModeToggle.querySelector('i') : null;

    // Check saved preference
    if (localStorage.getItem('theme') === 'dark') {
        html.setAttribute('data-theme', 'dark');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            if (html.getAttribute('data-theme') === 'dark') {
                html.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                if (themeIcon) {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
            } else {
                html.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                if (themeIcon) {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                }
            }
        });
    }
});
