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

// ❌ 1. APPROCCIO TRADIZIONALE
// Devi passare ogni volta sia l'importo che la tassa. Ripetitivo e prono a errori.
function calculateTax(amount, tax) {
  return amount * tax;
}
const traditionalVat = calculateTax(100, 0.22); 


// ✅ 2. APPROCCIO FACTORY FUNCTION (La Fabbrica)
let globalMultiplier = 1.1; // Variabile di Scope Globale

function createTaxCalculator(taxRate) {
  // Questa funzione "fabbrica" produce e restituisce una nuova funzione.
  
  return function(amount) {
    // 🧠 MAGIA DELLA CLOSURE:
    // Questa funzione interna "ricorda" per sempre il valore 'taxRate' 
    // con cui è stata creata, anche dopo che la fabbrica ha finito di girare.
    // Invece, legge 'globalMultiplier' in tempo reale dall'esterno.
    return amount * taxRate * globalMultiplier;
  };
}

// Creiamo due calcolatori "pre-impostati" (il taxRate viene bloccato/ricordato)
const calculateVat = createTaxCalculator(0.22); // IVA al 22%
const calculateIncomeTax = createTaxCalculator(0.25); // Tassa al 25%

// Testiamo le funzioni create
console.log(calculateVat(100));        // 100 * 0.22 * 1.1 = 24.2
console.log(calculateIncomeTax(200));  // 200 * 0.25 * 1.1 = 55.0

// Dimostrazione dello Scope Globale:
// Se cambio il moltiplicatore globale, le funzioni se ne accorgono subito,
// perché NON lo hanno bloccato (a differenza del taxRate).
globalMultiplier = 1.2;

console.log("Dopo il cambio globale:");
console.log(calculateVat(100));        // 100 * 0.22 * 1.2 = 26.4
console.log(calculateIncomeTax(200));  // 200 * 0.25 * 1.2 = 60.0

// VARIABILI GLOBALI
let userName = "Nico";
let pName = "Nicolas"; 

function greetUser() {
  // 1. LEGGE LA VARIABILE ESTERNA
  // Non salva "Nico", ma si appunta: "Vai a leggere cosa c'è dentro userName in questo momento"
  let name = userName; 
  console.log("Hi " + name);
  
  // 2. SHADOWING (Oscuramento)
  // Creiamo una variabile locale con lo STESSO NOME di una globale.
  // La variabile locale "vince" sempre su quella globale all'interno di questa funzione.
  let pName = "Anna"; 
  console.log("Hi " + pName); // Stamperà "Anna", ignorando "Nicolas"
}

// Cambiamo il valore della variabile globale PRIMA di chiamare la funzione
userName = "Max";

// Eseguiamo la funzione
greetUser(); 
// Risultato: 
// "Hi Max" (Perché legge il valore aggiornato della globale)
// "Hi Anna" (Perché la variabile locale oscura quella globale)