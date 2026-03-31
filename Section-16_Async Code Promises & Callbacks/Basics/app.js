const button = document.querySelector("button");

/**
 * Avvia un timer basato su Promise.
 * @param {number} duration - Millisecondi di attesa.
 * @returns {Promise}
 */
function setTimer(duration) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Timer completato!");
    }, duration);
  });
}

/**
 * Ottiene la posizione geografica e gestisce il flusso asincrono.
 */
function getUserLocation() {
  // 1. Operazione Asincrona (Web API)
  navigator.geolocation.getCurrentPosition(
    (posData) => {
      // Questo codice viene eseguito solo quando l'utente accetta e il browser ottiene i dati
      setTimer(2000).then((message) => {
        console.log(message, posData);
      });
    },
    (error) => {
      console.error("Errore nella localizzazione:", error);
    }
  );

  // 2. Timeout a 0 (Macrotask)
  // Anche se lo 0 suggerisce un'esecuzione immediata, deve passare per la Task Queue.
  setTimeout(() => {
    console.log("I'm timed to 0 (Eseguito dopo il codice sincrono)");
  }, 0);

  // 3. Operazione Sincrona
  // Viene eseguita immediatamente perché si trova nel thread principale (Call Stack).
  console.log("Getting Position..."); 
}

button.addEventListener("click", getUserLocation);