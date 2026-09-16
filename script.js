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