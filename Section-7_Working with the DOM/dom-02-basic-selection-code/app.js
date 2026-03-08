// Selezioniamo tutti gli elementi li
// Questo è il metodo piu moderno
const listElements = document.querySelectorAll("li");

// Abbiamo anche un altro modo
// Questo metodo pero ci da una lista live che riflette i cambiamenti
const lElements = document.getElementsByTagName("li");

// Poi possiamo ciclare su di essi lavorandoci sopra

for (const listEl of listElements) {
  console.log(listEl);
}
for (const listEl of lElements) {
  console.log(listEl);
}

// Possiamo selezionare un unico elemento basandoci sul suo ID
const title = document.getElementById("main-title");
// E possiamo modificare il so contenuto con
title.innerText = "Nuovo titolo";
// Cambiare il suo stile con
title.style.color = "red";
title.style.backgroundColor = "black";


// Se volessimo selezionare solo un elemento della lista per esempio l'ultimo
const lastLiEl = document.querySelector('li:last-of-type');
// e possiamo modificarlo
lastLiEl.innerText = "Sono stato modificato";
// possiamo anche fare concatenazioni
lastLiEl.textContent +=  "ho aggiunto questo!";