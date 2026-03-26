// ==========================================
// 1. ASSEGNAZIONE DEGLI EVENTI
// ==========================================
const buttons = document.querySelectorAll("button");

function buttonClickHandler(event) {
  console.log("Clicked button");
  console.log(event);
}

// Sconsigliato: funziona solo per 1 funzione alla volta
// button.onclick = buttonClickHandler;

// Raccomandato: usare addEventListener()
buttons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    buttonClickHandler(event);
  });
});

// Esempio per rimuovere un event listener
// setTimeout(()=>{
//   console.log('Rimosso');
//   buttons[0].removeEventListener('click', buttonClickHandler);
// }, 2000);


// ==========================================
// 2. PREVENIRE IL COMPORTAMENTO DI DEFAULT
// ==========================================
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Evita che la pagina si ricarichi
  console.log("Form non inviato in automatico:", event);
});


// ==========================================
// 3. EVENTI DELLA FINESTRA: SCROLL INFINITO
// ==========================================
let curElementNumber = 0;

function scrollHandler() {
  const distanceToBottom = document.body.getBoundingClientRect().bottom;

  if (distanceToBottom < document.documentElement.clientHeight + 150) {
    const newDataElement = document.createElement("div");
    curElementNumber++;
    newDataElement.innerHTML = `<p>Element ${curElementNumber}</p>`;
    document.body.append(newDataElement);
  }
}

// (Attenzione: lo scroll crea tantissimi eventi)
window.addEventListener("scroll", scrollHandler);


// ==========================================
// 4. EVENT PROPAGATION E CAPTURING
// ==========================================
const div = document.querySelector("div");

div.addEventListener("click", (event) => {
    event.stopPropagation(); // Blocca il bubbling verso l'esterno
    console.log(event);
    console.log("Clicked DIV!");
  },
  true // TRUE = attiva il CAPTURING (parte da fuori verso dentro)
);


// ==========================================
// 5. EVENT DELEGATION (Migliora le prestazioni)
// ==========================================
const list = document.querySelector("ul");

// Invece di mettere un listener su ogni <li>, lo mettiamo sull'<ul>
list.addEventListener("click", (event) => {
  console.log("Elemento genitore (UL):", event.currentTarget); 
  console.log("Elemento effettivamente cliccato:", event.target.tagName);
  
  // closest() cerca l'elemento specificato risalendo l'albero DOM.
  // Utile se dentro il tag <li> ci sono altri elementi più piccoli.
  const clickedItem = event.target.closest("li");
  
  if (clickedItem) {
      clickedItem.classList.toggle("selected");
  }
});