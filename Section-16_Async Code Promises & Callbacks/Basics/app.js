const button = document.querySelector("button");

// Creiamo una funzione per ottenere la posizione dell'utente
// Se falliamo diamo errore

function getUserLocation() {
  navigator.geolocation.getCurrentPosition(
    (posData) => {
      console.log(posData);
    },
    (error) => console.log(error),
  );
  //anche se settassimo setTimeout a 0 esso andra nell'event loop ritardando l'esecuzione del codice
  setTimeout(() =>{
    console.log("I'm timed to 0");
  }, 0); // 0 non è il tempo garantito, è il tempo minimo possibile
  console.log('Getting Position...'); // Verra mostato subito perche navigator richiede tempo ed è async
}

button.addEventListener("click", getUserLocation);
