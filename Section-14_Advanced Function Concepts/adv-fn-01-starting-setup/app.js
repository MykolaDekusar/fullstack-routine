// FUNZIONE PURA
// Non crea effetti collaterali e non dipende da variabili esterne.
function add(num1, num2) {
  return num1 + num2;
}

// Risultato sempre prevedibile: 2 + 5 farà SEMPRE 7.
console.log(add(2, 5));

// FUNZIONE IMPURA (Non deterministica)
// Non possiamo prevedere il risultato perché dipende da Math.random().
function addRandom(num1) {
  return num1 + Math.random();
}

console.log(addRandom(4)); // Ogni volta che la chiami, il valore cambia.

// FUNZIONE IMPURA (Side Effects su variabili)
let prevResult = 0;

function addMoreNumber(num1, num2) {
  const sum = num1 + num2; // Corretto il refuso "sum2"
  prevResult = sum; // SIDE EFFECT: Stiamo sporcando lo stato globale
  return sum;
}

addMoreNumber(10, 5);
console.log(prevResult); // Ora vale 15, ma la funzione ha cambiato qualcosa "fuori".

// FUNZIONE IMPURA (Mutazione di oggetti/array)
const hobbies = ["basket", "chess"];

function printHobbies(h) {
  // SIDE EFFECT: .push() modifica l'array originale in memoria!
  h.push("hunting");
  console.log(h);
}

printHobbies(hobbies);
console.log(hobbies); // Sorpresa! Anche l'array originale ora contiene "hunting".
