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

// Vediamo cosa fa il .splice il primo valore é l'indice di partenza, il secondo è quanti elementi vuoi eliminare
// e il terzo sono gli elementi che vuoi inserire
// Lo usiamo per inserire elementi o eliminarli in posizioni specifiche
ages.splice(0, 0, 123);
console.log(ages); //[ 123, 30, 0, 28, 50, <5 empty slots>, … ]
// Se volessimo inserire per esempio al terzo posto (0, 1, 2) dobbiamo dire indice 2
ages.splice(2, 0 , 123);
console.log(ages); //[ 123, 30, 123, 0, 28, 50, <4 empty slots>, … ]
// Vediamo come eliminare
// Splice ci ritorna anche un array di elementi eliminati
const deletedBySplice = ages.splice(0,3); // [ 123, 30, 123 ]
// Ci elimina 123
console.log(ages, deletedBySplice); // [ 0, 28, 50, <6 empty slots>, 99 ]
// Il splice puo anche ricevere valori negativi e parte dal fondo
const lastRemovedElement = ages.splice(-1, 1);
console.log(ages, lastRemovedElement);// [ 0, 28, 50, <6 empty slots> ], [ 99 ]
 