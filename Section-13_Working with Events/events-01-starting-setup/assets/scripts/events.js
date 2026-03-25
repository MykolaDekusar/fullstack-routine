const buttons = document.querySelectorAll("button");
// Possiamo assegnare onclick che deve essere una funzione che si attiva al click del bottone
//button.onclick = () => {};

function buttonClickHandler(event) {
  console.log("I've been clicked");
  console.log(event);
}
// Attenzione, funziona solo per 1 funzione alla volta
//button.onclick = buttonClickHandler;

// E' raccomandato usare addEventListener()
buttons.forEach((btn) => {
  // Abbiamo diversi eventi come click, mouseenter
  btn.addEventListener("mouseenter", buttonClickHandler);
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