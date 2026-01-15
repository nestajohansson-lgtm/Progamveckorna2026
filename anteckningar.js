const textarea = document.getElementById("notes");

// Ladda sparade anteckningar när sidan öppnas
textarea.value = localStorage.getItem("anteckningar") || "";

// Spara automatiskt när användaren skriver
textarea.addEventListener("input", () => {
    localStorage.setItem("anteckningar", textarea.value);
});