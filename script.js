document.addEventListener("DOMContentLoaded", () => {
    
    // Optionen für den IntersectionObserver
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

    // Alle Timeline-Items einsammeln und dem Observer übergeben
    const timelineItems = document.querySelectorAll(".timeline-item");
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
});