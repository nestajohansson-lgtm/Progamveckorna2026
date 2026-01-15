document.addEventListener("DOMContentLoaded", () => {
    const textarea = document.getElementById("anteckningar");
    const buttons = document.querySelectorAll(".ämnen button");
    const title = document.getElementById("current-ämne");

    let currentÄmne = "svenska";

    // Ladda anteckning för valt ämne
    function loadNote(ämne) {
        currentÄmne = ämne;
        title.textContent = ämne.charAt(0).toUpperCase() + ämne.slice(1);
        textarea.value = localStorage.getItem("anteckning_" + ämne) || "";
    }

    // Spara text när man skriver
    textarea.addEventListener("input", () => {
        localStorage.setItem("anteckning_" + currentÄmne, textarea.value);
    });

    // Klick på ämnesknappar
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            // Spara nuvarande text först
            localStorage.setItem("anteckning_" + currentÄmne, textarea.value);
            
            // Ladda ny anteckning
            loadNote(button.dataset.ämne);
        });
    });

    // Ladda Svenska först
    loadNote(currentÄmne);
});
