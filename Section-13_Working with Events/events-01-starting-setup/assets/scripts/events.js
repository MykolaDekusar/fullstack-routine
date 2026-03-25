const buttons = document.querySelectorAll("button");
// Possiamo assegnare onclick che deve essere una funzione che si attiva al click del bottone
//button.onclick = () => {};

function buttonClickHandler(event) {
  console.log("Clicked button");
  console.log(event);
}
// Attenzione, funziona solo per 1 funzione alla volta
//button.onclick = buttonClickHandler;

// E' raccomandato usare addEventListener()
buttons.forEach((btn) => {
  // Abbiamo diversi eventi come click, mouseenter
  btn.addEventListener("click", (event) => {
    buttonClickHandler(event);
  });
});

// Rimuoviamo l'event listenere dopo 2 secondi
// setTimeout(()=>{
//   console.log('Rimosso');
//   button.removeEventListener('click', buttonClickHandler);
// }, 2000)

// window.addEventListener("scroll", (event) => {
//   console.log(event); //Crea tantissimi eventi quando si scrolla
// });

//Vediamo un esempio di scroll infinito 
let curElementNumber = 0;
 
function scrollHandler() {
    const distanceToBottom = document.body.getBoundingClientRect().bottom;
 
    if (distanceToBottom < document.documentElement.clientHeight + 150) {
        const newDataElement = document.createElement('div');
        curElementNumber++;
        newDataElement.innerHTML = `<p>Element ${curElementNumber}</p>`;
        document.body.append(newDataElement);
    }
}
 
window.addEventListener('scroll', scrollHandler);

// Vediamo come prevenire l'invio automatico del form
const form = document.querySelector('form');
// Ascoltiamo all'evento submit (manda)
form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log(event);
})

// Vediamo l'Event Propagation e stopPropagation()
// Bubbled execution, DA DENTRO A FUORI
const div = document.querySelector('div');
div.addEventListener('click', (event)=> {
  event.stopPropagation();
  console.log(event);
  console.log('Clicked DIV!'); // Possiamo aggiungere un terzo argomento che di default é false
  // ma se lo mettiamo a true diciamo che questo evento deve far parte di 
  // CAPTURING quindi parte per primo
}, true) //Clicked DIV! Clicked button
//Senza il true Clicked button Clicked DIV!

