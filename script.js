```javascript
/* =====================================================
   TRANSFORMARTE
   SCRIPT.JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       MENÚ MÓVIL
    ================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", (event) => {

            event.stopPropagation();

            const isOpen = navMenu.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.textContent = isOpen ? "✕" : "☰";
        });


        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.textContent = "☰";
            });

        });


        document.addEventListener("click", (event) => {

            const clickedInsideMenu =
                navMenu.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedToggle &&
                navMenu.classList.contains("active")
            ) {

                navMenu.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.textContent = "☰";
            }

        });


        window.addEventListener("resize", () => {

            if (window.innerWidth > 700) {

                navMenu.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.textContent = "☰";
            }

        });

    }


    /* =================================================
       NAVEGACIÓN SUAVE
    ================================================== */

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const navbar =
                document.querySelector(".navbar");

            const navbarHeight =
                navbar
                    ? navbar.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =================================================
       NAVBAR AL HACER SCROLL
    ================================================== */

    const navbar =
        document.querySelector(".navbar");

    if (navbar) {

        const updateNavbar = () => {

            if (window.scrollY > 40) {

                navbar.classList.add(
                    "navbar-scrolled"
                );

            } else {

                navbar.classList.remove(
                    "navbar-scrolled"
                );

            }

        };

        window.addEventListener(
            "scroll",
            updateNavbar,
            { passive: true }
        );

        updateNavbar();
    }


    /* =================================================
       ANIMACIONES AL HACER SCROLL

       IMPORTANTE:
       No se modifica opacity de las secciones.
       De esta manera ningún contenido puede quedar
       oculto si el Observer falla.
    ================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        "IntersectionObserver" in window &&
        !prefersReducedMotion
    ) {

        const animatedElements =
            document.querySelectorAll(
                ".section-heading, " +
                ".about-content, " +
                ".founder-profile, " +
                ".pillar-card, " +
                ".program-card, " +
                ".transformation-item, " +
                ".teen-benefit-card, " +
                ".offer-item, " +
                ".event-card, " +
                ".gallery-item, " +
                ".testimonial-placeholder, " +
                ".instagram-content, " +
                ".instagram-placeholder, " +
                ".contact-content, " +
                ".contact-image"
            );


        animatedElements.forEach((element) => {

            element.classList.add("scroll-ready");

        });


        const observer =
            new IntersectionObserver(
                (entries, observerInstance) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "scroll-visible"
                            );

                            observerInstance.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: 0.08,
                    rootMargin: "0px 0px -40px 0px"
                }
            );


        animatedElements.forEach((element) => {

            observer.observe(element);

        });

    }


    /* =================================================
       ANIMACIÓN ESCALONADA DE TARJETAS
    ================================================== */

    const cardGroups = [
        ".pillar-card",
        ".program-card",
        ".transformation-item",
        ".teen-benefit-card",
        ".offer-item",
        ".gallery-item"
    ];


    cardGroups.forEach((selector) => {

        const cards =
            document.querySelectorAll(selector);

        cards.forEach((card, index) => {

            card.style.setProperty(
                "--animation-delay",
                `${index * 0.08}s`
            );

        });

    });


    /* =================================================
       VALIDACIÓN DE IMÁGENES
    ================================================== */

    const images =
        document.querySelectorAll("img");

    images.forEach((image) => {

        image.addEventListener("error", () => {

            image.classList.add(
                "image-error"
            );

            image.setAttribute(
                "alt",
                "Imagen no disponible"
            );

        });

    });


    /* =================================================
       AÑO AUTOMÁTICO DEL FOOTER
    ================================================== */

    const footerYear =
        document.querySelector(".footer-bottom p");

    if (footerYear) {

        const currentYear =
            new Date().getFullYear();

        footerYear.textContent =
            `© ${currentYear} TransformARTE. ` +
            `Todos los derechos reservados.`;
    }


    /* =================================================
       HOVER DE GALERÍA
    ================================================== */

    const galleryImages =
        document.querySelectorAll(
            ".gallery-item img"
        );

    galleryImages.forEach((image) => {

        image.addEventListener(
            "mouseenter",
            () => {

                if (!prefersReducedMotion) {

                    image.style.transform =
                        "scale(1.06)";
                }

            }
        );


        image.addEventListener(
            "mouseleave",
            () => {

                image.style.transform =
                    "scale(1)";
            }
        );

    });


    /* =================================================
       GARANTIZAR VISIBILIDAD DEL FUNDADOR
    ================================================== */

    const founderProfile =
        document.querySelector(".founder-profile");

    const founderStory =
        document.querySelector(".founder-story");


    if (founderProfile) {

        founderProfile.classList.add(
            "founder-visible"
        );
    }


    if (founderStory) {

        founderStory.classList.add(
            "founder-visible"
        );
    }


    /* =================================================
       MENSAJE DE COMPROBACIÓN
    ================================================== */

    console.log(
        "TransformARTE: página cargada correctamente."
    );

    console.log(
        "Fundador encontrado:",
        !!founderProfile
    );

});
```
