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
  console.log('Getting Position...'); // Verra mostato subito perche navigator richiede tempo ed è async
}

button.addEventListener("click", getUserLocation);
