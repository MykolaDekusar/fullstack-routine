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
document.title = "Dive into the DOM!";

// E possiamo modificare il so contenuto con
title.innerText = "Nuovo titolo";
// Oppure con pero innerHTML distrugge tutto il codice interno
title.innerHTML = "<h2>Ho <em>usato</em> <span>innerHTML</span></h2>";
// Cambiare il suo stile con
title.style.color = "red";
title.style.backgroundColor = "black";

// Se volessimo selezionare solo un elemento della lista per esempio l'ultimo
const lastLiEl = document.querySelector("li:last-of-type");
// e possiamo modificarlo
lastLiEl.innerText = "Sono stato modificato";
// possiamo anche fare concatenazioni
lastLiEl.textContent += "ho aggiunto questo!";

// Ora vediamo come aggiungere elementi HTML tramite javascript
const section = document.querySelector("section");

// Prova con createElement()
// Si usa sempre sul document riceve come primo valore il tag li, p, div etc...
const unList = document.querySelector('ul');
const newListElement = document.createElement('li');
// Una volta creato l'elemento possiamo inserirci il testo dentro o lo stile
newListElement.textContent = 'Sono un nuovo elemento';
newListElement.style.backgroundColor = "red";
// e ovviamente dopo tutte le modifiche possiamo aggiungerlo a ul
unList.appendChild(newListElement);
// Esiste anche .append
unList.append('Ecco che uso append', ' Sono sempre io');
// Oppure .prepend facendo cosi salgo in cima alla lista ma non ne faccio parte
unList.prepend("Sto usando prepend");
