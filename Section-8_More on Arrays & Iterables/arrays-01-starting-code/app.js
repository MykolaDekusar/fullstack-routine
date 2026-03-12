// Lavoriamo sugli array e vediamo i metodi per crearli

const numbers = [1, 2, 3, 4, 5]; //Il modo piu comune
console.log(numbers);

const moreNumbers = new Array(1, 3, 4); // Utilizziamo un constructor per creare un array [1,3,4]
console.log(moreNumbers);

// Se passiamo solo un numero lui ci crea un array vuoto di lunghezza con il numero passato
const arrayLengthSet = new Array(5); // Ci crea un array vuoto [     ] lunghezza 5
console.log(arrayLengthSet);

// Possiamo anche omettere new
const noNewAray = Array("Non", "ho", "usato", "new");
console.log(noNewAray);

// Un altro modo pero è piu lento per le performance ed è più niche...
const anotherWay = Array.of(1, 3, 4);
console.log(anotherWay);

//***********************************************************
// Un modo più utile è
// Prende un solo iterable o un array like object e lo trasfroma in un array
const usefulArray = Array.from("Ciao a tutti!"); // ['C','i','a','o',' ','a',' ' ,'t','u','t','t','i','!']
console.log(usefulArray);

// Vediamo un esempio reale...
const listItems = document.querySelectorAll("li"); //NodeList
console.log(listItems);
const arrayListItems = Array.from(listItems); //Lo trasformiamo in array permettendoci di usare i metodi per gli array
console.log(arrayListItems);

// Gli array possono contenere, numeri, stringe o anche oggetti tutti nello stesso array

const hobbies = ["Gaming", "Reading", "Coding"];
// Possiamo avere un mix di dati
const mixed = [
  30,
  "Gaming",
  { name: "Nico", age: 28, hobbies: ["running", "swimming"] },
  [1, 2, 3, 4, 5],
];
//Possiamo anche avere aray bidimensionali e tridimensionali
const twoDData = [
  [13, 42, 52],
  [12, 32, 56],
];

//***********************************************************
// Vediamo dei metodi che possiamo applicare agli array
const ages = [30, 23, 28, 50];
ages.push(99); // Aggiunge 99 alla fine dell'array e ritorna la nuova lunghezza dell'array
ages.unshift(0); // Aggiunge 0 all'inizio dell'array e ritorna la nuova lunghezza dell'array
console.log(ages);

const poppedValue = ages.pop(); // Rimuove l'ultimo elemento dall'array, possiamo anche salvare il valore
const shiftedValue = ages.shift(); // Rimuove il primo elemento dall'array, possiamo anche salvare il valore
console.log(ages, poppedValue, shiftedValue);

// Unshift e shift sono molto piu lenti perchè affliggono tutto l'array spostando gli elementi di 1 posto
//Ovviamente possiamo anche modificare l'array accendendo direttamente all'indice
ages[1] = 0;
console.log(ages);

//Possiamo anche assegnare valori a indici che non esistono pero tutti gli indici prima saranno vuoti
ages[10] = 99;
console.log(ages); //[ 30, 0, 28, 50, <6 empty slots>,99]

//***********************************************************
// Vediamo cosa fa il .splice il primo valore é l'indice di partenza, il secondo è quanti elementi vuoi eliminare
// e il terzo sono gli elementi che vuoi inserire
// Lo usiamo per inserire elementi o eliminarli in posizioni specifiche
ages.splice(0, 0, 123);
console.log(ages); //[ 123, 30, 0, 28, 50, <5 empty slots>, … ]

// Se volessimo inserire per esempio al terzo posto (0, 1, 2) dobbiamo dire indice 2
ages.splice(2, 0, 123);
console.log(ages); //[ 123, 30, 123, 0, 28, 50, <4 empty slots>, … ]

//***********************************************************
// Vediamo come eliminare
// Splice ci ritorna anche un array di elementi eliminati
const deletedBySplice = ages.splice(0, 3); // [ 123, 30, 123 ]
// Ci elimina 123
console.log(ages, deletedBySplice); // [ 0, 28, 50, <6 empty slots>, 99 ]

// Il splice puo anche ricevere valori negativi e parte dal fondo
const lastRemovedElement = ages.splice(-1, 1);
console.log(ages, lastRemovedElement); // [ 0, 28, 50, <6 empty slots> ], [ 99 ]

//***********************************************************
// Vediamo il metodo slice
const testResults = [1, 5.2, 123.5, 32];
const referenceCopy = testResults;
// Se lo usiamo in questo modo ci permette di copiare l'array evitando la reference value
// Creando un nuovo spazio in memoria per il nuovo array copiato quindi non hanno connessione in memoria
const testResultsCopy = testResults.slice();
console.log(testResultsCopy === testResults); //false
console.log(testResults === referenceCopy); // true perche hanno la stessa posizione in memoria

// Slice ci permette di prendere pezzi dell'array, specificando l'inizio e la fine del pezzo che vogliamo'
const slicedTestResult = testResults.slice(0, 2);
console.log(slicedTestResult); // [ 1, 5.2 ]

// Possiamo anche usare gli indici negativi pero entrambi devono essere negativi
const slicedFromEnd = testResults.slice(-3, -1);
console.log(slicedFromEnd); //[ 5.2, 123.5 ]

// Ovviamente possiamo anche dirgli solo la posizione da quale partire e ci rida tutto il resto dell'array
const slicedFromIndex = testResults.slice(2);
console.log(slicedFromIndex); //[ 123.5, 32 ]

//***********************************************************
// concat prende uno o più array unendolo all'array che vogliamo e ci ritorna un NUOVO array
const newNoReferenceConcatArray = testResults.concat([111, 112, 113]);
console.log(newNoReferenceConcatArray); // [ 1, 5.2, 123.5, 32, 111, 112, 113 ]

//***********************************************************
// VEDIAMO I MODI PER TROVARE L'INDICE DEGLI ELEMENTI CHE VOGLIAMO CERCARE
// indexOf ci ritorna l'indice dell'elemento che vogliamo cercare
// SI FERMA AL PRIMO VALORE TROVATO ANCHE SE CI SONO PIU VALORI UGUALI NELL'ARRAY
console.log(newNoReferenceConcatArray.indexOf(32)); // index 3 [ 1, 5.2, 123.5, 32, 111, 112, 113 ]
//           0,  1,   2,     3

//***********************************************************
// Possiamo partire dal fondo usando lastIndexOf
console.log(newNoReferenceConcatArray.lastIndexOf(32)); // index 3

// Questi metodi funzionano bene per i valori PRIMITIVI MA NON PER QUELLI REFERENCE
const personData = [{ name: "Nico" }, { name: "Max" }];
console.log(personData.indexOf("Nico")); // Ci ritorna -1 se non riesce a trovare l'elemento

//***********************************************************
// Per gli oggetti o anche gli array possiamo usare find
// richiede fino a 3 argomenti... Il primo è un singolo oggetto dell'array, il secondo è sempre l'indice
// il terzo è l'array completo dopodichè esegue una funzione anonima che effettua la ricerca per ogni oggetto
// dentro l'array e ci ritorna quello che decidiamo
const nico = personData.find((person, indx, persons) => {
  return person.name === "Nico"; //Tipicamente ritorna una comparazione che è un boolean
});
// come l'indexOf si ferma al primo elemento trovato e ci ritorna l'elemento
console.log(nico); // { name: "Nico" }

// FIND NON CREA UNA COPIA, QUINDI SE MODIFICHIAMO IL DATO DENTRO NICO LO MODIFICHIAMO ANCHE NELL' ARRAY ORIGINALE
nico.name = "Marco";
console.log(nico, personData); // { name: "Marco" } [ ​{ name: "Marco" },​{ name: "Max" }]

//***********************************************************
// Abbiamo anche findIndex che ci ritorna l'indice dell'elemento trovato

const max = personData.findIndex((person, indx, persons) => {
  return person.name === "Max"; //Tipicamente ritorna una comparazione che è un boolean
});

console.log(max); // Index 1
