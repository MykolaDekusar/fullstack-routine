const addListenerBtn = document.getElementById('add-listener-btn');
const clickableBtn = document.getElementById('clickable-btn');
const messageInput = document.getElementById('click-message-input');
// Facendo cosi va tutto bene, non abbiamo memory leaks perche il browser sa gestire
// le funzioni
function printMessage() {
  const value = messageInput.value;
  console.log(value || 'Clicked me!');
  console.log(typeof(() => {}));
}

function addListener() {
  clickableBtn.addEventListener('click', printMessage);
}

addListenerBtn.addEventListener('click', addListener);
// se clicchiamo piu volte addListenerBtn gli assegnamo piu volte la funzione
// anonima allocando sempre spazio vuoto per essa ed occupando memoria
addListenerBtn.addEventListener('click', leakedListener);

// Se invece dovessimo creare un listener con un assegnazione di una funzione anonima
// le funzioni diventerebbero molteplici e avremmo molti memory leaks
function leakedListener(){
  clickableBtn.addEventListener('click', function () {
    const value = 'Leaked function';
    console.log(value || 'Leaked');
  })
}