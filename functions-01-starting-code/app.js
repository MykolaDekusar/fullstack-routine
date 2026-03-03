const startGameBtn = document.getElementById("start-game-btn");

function startGame() {
  console.log("Game Started!!!");
}
// Possiamo anche assegnare le funzioni a delle variabili pero dovremmo chiamarla
// per il nome della sua variabile che è start e possiamo omettere il nome della funzione
// siccome non ha piu importanza e questa diventa una funzione anonima
const start = function () //startGame
{
  console.log("Game Started!!!");
};

const person = {
  name: "Nico",
  //Una funzione dentro un oggetto diventa un metodo dell'oggetto
  greet: function () {
    console.log(this.name);
  },
};
//Una funzione dentro un oggetto diventa un metodo dell'oggetto
person.greet();
console.log(person.name);
// In questo caso addEventListener è un metodo dell'oggetto startGameBtn
// è diventato oggetto grazie a getElementById ottenuto dall document che è una variabile
// globale che ci da accesso al documento
startGameBtn.addEventListener("click", start);
