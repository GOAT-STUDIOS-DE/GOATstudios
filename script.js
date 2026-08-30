document.addEventListener("DOMContentLoaded", () => {

    // --- Timeline Scroll-Animation ---
    const observerOptions = {
        root: null, // nutzt das Browser-Sichtfeld
        rootMargin: "0px 0px -60px 0px", // triggert kurz bevor das Element komplett sichtbar ist
        threshold: 0.12 // 12% des Elements müssen sichtbar sein
    };

    const timelineObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Fügt die CSS-Klasse für die Animation hinzu
                entry.target.classList.add("visible");
                // Element muss danach nicht mehr überwacht werden
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const timelineItems = document.querySelectorAll(".timeline-item");
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // --- Hamburger-Menü (Mobile) ---
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");

    if (hamburger && navLinks) {
        const closeMenu = () => {
            navLinks.classList.remove("open");
            hamburger.classList.remove("open");
            hamburger.setAttribute("aria-expanded", "false");
        };

        hamburger.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");
            hamburger.classList.toggle("open", isOpen);
            hamburger.setAttribute("aria-expanded", String(isOpen));
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("click", (e) => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                closeMenu();
            }
        });
    }

    // --- Active-State für Nav-Links basierend auf sichtbarer Sektion ---
    const navAnchors = document.querySelectorAll('.nav-links a[href*="#"]');
    const sections = document.querySelectorAll("main section[id]");

    if (navAnchors.length && sections.length) {
        const navSectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute("id");
                    navAnchors.forEach(a => {
                        const isMatch = a.getAttribute("href").endsWith(`#${id}`);
                        a.classList.toggle("active", isMatch);
                    });
                }
            });
        }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

        sections.forEach(sec => navSectionObserver.observe(sec));
    }

    // --- Dynamisches Copyright-Jahr ---
    const yearEl = document.getElementById("current-year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // --- Kontaktformular: erzeugt einen mailto-Link mit den Formulardaten ---
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            const subject = encodeURIComponent(`Projektanfrage von ${name}`);
            const body = encodeURIComponent(
                `Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}`
            );

            window.location.href = `mailto:contact@goatstudios.tech?subject=${subject}&body=${body}`;
        });
    }
});
