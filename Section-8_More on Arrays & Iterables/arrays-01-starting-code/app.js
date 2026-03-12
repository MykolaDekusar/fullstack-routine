// Lavoriamo sugli array e vediamo i metodi per crearli

const numbers = [1, 2, 3, 4, 5]; //Il modo piu comune
console.log(numbers);

const moreNumbers = new Array(1,3,4); // Utilizziamo un constructor per creare un array [1,3,4]
console.log(moreNumbers);

// Se passiamo solo un numero lui ci crea un array vuoto di lunghezza con il numero passato
const arrayLengthSet = new Array(5); // Ci crea un array vuoto [     ] lunghezza 5
console.log(arrayLengthSet);

// Possiamo anche omettere new 
const noNewAray = Array('Non', 'ho', 'usato', 'new');
console.log(noNewAray);

// Un altro modo pero è piu lento per le performance ed è più niche... 
const anotherWay = Array.of(1,3,4);
console.log(anotherWay);

// Un modo più utile è
// Prende un solo iterable o un array like object e lo trasfroma in un array
const usefulArray = Array.from("Ciao a tutti!");// ['C','i','a','o',' ','a',' ' ,'t','u','t','t','i','!']
console.log(usefulArray);

// Vediamo un esempio reale...
const listItems = document.querySelectorAll('li'); //NodeList
console.log(listItems);
const arrayListItems= Array.from(listItems); //Lo trasformiamo in array permettendoci di usare i metodi per gli array
console.log(arrayListItems);

// Gli array possono contenere, numeri, stringe o anche oggetti tutti nello stesso array
const ages = [30,23,28,50];
const hobbies = ["Gaming","Reading","Coding"];
// Possiamo avere un mix di dati
const mixed = [30,"Gaming", {name : "Nico", age: 28, hobbies: ["running", "swimming"]}, [1,2,3,4,5]]

