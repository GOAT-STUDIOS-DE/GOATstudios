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
