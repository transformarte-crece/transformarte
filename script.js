// ========================================
// MENÚ MÓVIL
// ========================================

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

}

// Cerrar menú al seleccionar una opción

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (navMenu) {
            navMenu.classList.remove("active");
        }

    });

});


// ========================================
// ANIMACIONES AL HACER SCROLL
// ========================================

const animatedElements = document.querySelectorAll(
    ".section-heading, " +
    ".about-content, " +
    ".pillar-card, " +
    ".program-card, " +
    ".transformation-item, " +
    ".teen-content, " +
    ".teen-image, " +
    ".event-card, " +
    ".gallery-item, " +
    ".testimonial-placeholder, " +
    ".instagram-content, " +
    ".instagram-placeholder, " +
    ".contact-content"
);


const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.15
    }

);


animatedElements.forEach(element => {

    element.classList.add("reveal");

    observer.observe(element);

});
/* =====================================================
   CARRUSEL DEL CUADRO PRINCIPAL DE GALERÍA
===================================================== */

const galleryCarousel = document.querySelector('.gallery-carousel');

if (galleryCarousel) {

    const track =
        galleryCarousel.querySelector('.gallery-carousel-track');

    const slides =
        galleryCarousel.querySelectorAll('.gallery-carousel-slide');

    const prev =
        galleryCarousel.querySelector('.gallery-carousel-prev');

    const next =
        galleryCarousel.querySelector('.gallery-carousel-next');

    const dots =
        galleryCarousel.querySelectorAll('.gallery-carousel-dot');


    let currentSlide = 0;


    function showGallerySlide(index) {

        if (index < 0) {
            currentSlide = slides.length - 1;
        }

        else if (index >= slides.length) {
            currentSlide = 0;
        }

        else {
            currentSlide = index;
        }


        track.style.transform =
            `translateX(-${currentSlide * 100}%)`;


        dots.forEach((dot, index) => {

            dot.classList.toggle(
                'active',
                index === currentSlide
            );

        });

    }


    /* Flecha anterior */

    prev.addEventListener('click', function () {

        showGallerySlide(currentSlide - 1);

    });


    /* Flecha siguiente */

    next.addEventListener('click', function () {

        showGallerySlide(currentSlide + 1);

    });


    /* Indicadores */

    dots.forEach((dot, index) => {

        dot.addEventListener('click', function () {

            showGallerySlide(index);

        });

    });


    /* =================================================
       DESLIZAMIENTO CON EL DEDO EN CELULARES
    ================================================= */

    let touchStartX = 0;
    let touchEndX = 0;


    galleryCarousel.addEventListener(
        'touchstart',
        function (event) {

            touchStartX = event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    galleryCarousel.addEventListener(
        'touchend',
        function (event) {

            touchEndX = event.changedTouches[0].screenX;

            const difference =
                touchStartX - touchEndX;


            if (Math.abs(difference) < 50) {
                return;
            }


            if (difference > 0) {

                showGallerySlide(currentSlide + 1);

            }

            else {

                showGallerySlide(currentSlide - 1);

            }

        },
        { passive: true }
    );

}