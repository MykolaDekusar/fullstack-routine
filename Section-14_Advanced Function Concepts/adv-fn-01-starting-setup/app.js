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

  return function (amount) {
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
console.log(calculateVat(100)); // 100 * 0.22 * 1.1 = 24.2
console.log(calculateIncomeTax(200)); // 200 * 0.25 * 1.1 = 55.0

// Dimostrazione dello Scope Globale:
// Se cambio il moltiplicatore globale, le funzioni se ne accorgono subito,
// perché NON lo hanno bloccato (a differenza del taxRate).
globalMultiplier = 1.2;

console.log("Dopo il cambio globale:");
console.log(calculateVat(100)); // 100 * 0.22 * 1.2 = 26.4
console.log(calculateIncomeTax(200)); // 200 * 0.25 * 1.2 = 60.0

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

// RECURSION
/**
 * CALCOLO POTENZA: Iterativo
 * Ragionamento: "Parto da 1 e moltiplico per x tante volte quante dice n"
 */
function powerOf(x, n) {
  let result = 1; // Punto di partenza (neutro per la moltiplicazione)

  for (let i = 0; i < n; i++) {
    result *= x; // Ad ogni giro, accumulo il valore
  }

  return result;
}

console.log("Iterativo (2^3):", powerOf(2, 3)); // 8

/**
 * CALCOLO POTENZA: Ricorsivo
 * Ragionamento: "x^n è uguale a x moltiplicato per x^(n-1)"
 */
function recPowerOf(x, n) {
  // --- 1. BASE CASE (Punto di uscita) ---
  // Se n è 0, il risultato è sempre 1 (qualsiasi numero elevato a 0 fa 1)
  // Questo ferma la ricorsione ed evita che il computer esploda!
  if (n === 0) {
    return 1;
  }

  // --- 2. RECURSIVE STEP (Il richiamo) ---
  // Moltiplico x per il risultato della stessa funzione, ma con n diminuito di 1
  return x * recPowerOf(x, n - 1);
}

// Versione "Pro" contratta (Ternary Operator)
const recPowerOfShort = (x, n) => (n === 0 ? 1 : x * recPowerOfShort(x, n - 1));

console.log("Ricorsivo (2^3):", recPowerOf(2, 3)); // 8
console.log("Ricorsivo Short (2^3):", recPowerOfShort(2, 3)); // 8

const myself = {
  name: "Nico",
  friends: [
    {
      name: "Argjent",
      friends: [
        {
          name: "Don Di Alba",
          friends: [{ name: "Marco", friends: [{ name: "Giulia" }] }],
        },
      ],
    },
    { name: "Bebo" },
  ],
};

function getFriendNames(person) {
  // 1. IDENTITÀ: Ogni "copia" della funzione si occupa solo della persona che riceve.
  // In questo momento, per questa specifica chiamata, "person" è un individuo unico.
  const collectedNames = [];
  collectedNames.push(person.name);

  // 2. CASO BASE (Punto di uscita): Se la persona non ha amici,
  // non c'è nulla da esplorare. Restituisco l'array con il solo nome della persona.
  if (!person.friends || person.friends.length === 0) {
    return collectedNames;
  }

  // 3. DISCESA RICORSIVA: Se ci sono amici, chiedo alla funzione di esplorare ognuno di loro.
  for (const friend of person.friends) {
    // "Ehi getFriendNames, vai a vedere chi ha con sé questo amico..."
    const namesFromBranch = getFriendNames(friend);

    // "...e quando torni, aggiungi tutto quello che hai trovato alla mia lista."
    collectedNames.push(...namesFromBranch);
  }

  return collectedNames;
}

console.log(getFriendNames(myself));
