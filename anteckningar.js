document.addEventListener("DOMContentLoaded", () => {
    const textarea = document.getElementById("anteckningar");
    const buttons = document.querySelectorAll(".ämnen button");
    const title = document.getElementById("current-ämne");

    let currentÄmne = "svenska";

    
    function loadNote(ämne) {
        currentÄmne = ämne;
        title.textContent = ämne.charAt(0).toUpperCase() + ämne.slice(1);
        textarea.value = localStorage.getItem("anteckning_" + ämne) || "";
    }

    
    textarea.addEventListener("input", () => {
        localStorage.setItem("anteckning_" + currentÄmne, textarea.value);
    });

    
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            
            localStorage.setItem("anteckning_" + currentÄmne, textarea.value);
            
            
            loadNote(button.dataset.ämne);
        });
    });

    
    loadNote(currentÄmne);
});
