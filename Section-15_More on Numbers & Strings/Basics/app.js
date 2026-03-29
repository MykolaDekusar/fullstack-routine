/**
 * MAX_SAFE_INTEGER: Il limite della precisione.
 * Oltre questo numero, JS non può più garantire che (n + 1) sia diverso da n.
 */
const maxSafe = Number.MAX_SAFE_INTEGER; // 9,007,199,254,740,991
const pow253 = Math.pow(2, 53); // 9,007,199,254,740,992

console.log("Safe:", maxSafe);
console.log("2^53:", pow253);
console.log("Sono uguali?", maxSafe === pow253 - 1); // true

// MIN_SAFE_INTEGER: Speculare al massimo, ma negativo.
console.log("Min Safe:", Number.MIN_SAFE_INTEGER); // -9,007,199,254,740,991

// MAX_VALUE: Il numero più grande in assoluto prima di arrivare a 'Infinity'
console.log("Max Absolute:", Number.MAX_VALUE); // ~1.79e+308

// MIN_VALUE: Attenzione! Non è il numero più "negativo",
// ma il numero POSITIVO più piccolo (più vicino allo zero).
console.log("Smallest Positive:", Number.MIN_VALUE); // 5e-324

/**
 * Perché 0.2 + 0.4 non fa 0.6?
 * Il computer cerca di memorizzare 0.2, ma in binario è infinito (0.00110011...).
 * Deve arrotondarlo, e l'arrotondamento crea un micro-errore.
 */
const sum = 0.2 + 0.4;

console.log("0.2 + 0.4 =", sum); // 0.6000000000000001
console.log("È uguale a 0.6?", sum === 0.6); // false

// TRUCCO: Per confrontarli si usa spesso un arrotondamento o una tolleranza
console.log("Corretto?", sum.toFixed(1) === "0.6"); // true (ma diventa stringa)

//Possiamo anche convertire i numeri in modo binario
// Usiamo le parentesi (1) per evitare che il punto venga scambiato per un decimale
console.log("1 in binario:", (1).toString(2)); // "1"
console.log("5 in binario:", (5).toString(2)); // "101"

// 0.2 in binario: nota la ripetizione '1100' infinita
console.log("0.2 in binario:", (0.2).toString(2));
// "0.001100110011001100110011001100110011001100110011001101"

/*
 Se mai dovrai lavorare con prezzi o soldi, 
 non usare mai i decimali. 
 Trasforma tutto in centesimi (numeri interi), fai i calcoli,
 e dividi per 100 solo alla fine per visualizzare il risultato. 
 Eviterai che i tuoi clienti perdano centesimi 
 per colpa dei numeri periodici! 
*/
// ESEMPIO: Un carrello della spesa
const prezzoProdotto = 20.2; // 20€ e 20 centesimi

// 1. TRASFORMAZIONE: Portiamo tutto in centesimi (interi)
const prezzoInCentesimi = Math.round(prezzoProdotto * 100); // 2020

// 2. CALCOLO: Operiamo solo con interi
const totaleCentesimi = prezzoInCentesimi * 3; // 6060

// 3. DISPLAY: Dividiamo per 100 solo quando dobbiamo mostrare il prezzo all'utente
const displayPrezzo = (totaleCentesimi / 100).toFixed(2);

console.log(`Prezzo finale: ${displayPrezzo}€`); // "60.60€"

// Possiamo superare il MAX_SAFE_INTEGER aggiungendo n alla fine del numero
const numeroEnorme = 9007199254740991n;
const ancoraPiuGrande = numeroEnorme + 2n;

console.log(ancoraPiuGrande); // 9007199254740993n

// ERRORI E SOLUZIONI
// 10n - 4; // ❌ TypeError: Cannot mix BigInt and other types

// Soluzione A: Trasforma il numero normale in BigInt
console.log(10n - BigInt(4)); // 6n (Corretto)

// Soluzione B: Trasforma il BigInt in un numero normale (Attenzione alla perdita di precisione!)
console.log(Number(10n) - 4); // 6 (Corretto)

// Soluzione C: Usare parseInt (anche se meno comune per i BigInt)
console.log(parseInt(10n) - 4); // 6 (Corretto)


// --- COSTANTI SPECIALI ---
// Rappresenta l'infinito positivo
const piuInfinito = Number.POSITIVE_INFINITY; // Infinity

// Rappresenta l'infinito negativo
const menoInfinito = Number.NEGATIVE_INFINITY; // -Infinity


// --- METODI DI VALIDAZIONE ---

// Verifica se il valore è un numero finito (ritorna false per Infinity o NaN)
Number.isFinite(Infinity);  // false
Number.isFinite(100);       // true

// Verifica se il valore è "Not-a-Number"
// Molto utile per capire se un'operazione matematica è fallita
Number.isNaN(NaN);          // true
Number.isNaN(5);            // false

// Converte una stringa in un numero intero
Number.parseInt("42px");    // 42

// --- PROPRIETÀ (Costanti) ---
Math.PI;      // 3.141592653589793 (Rapporto tra circonferenza e diametro)
Math.E;       // 2.718... (Base dei logaritmi naturali)


// --- METODI COMUNI ---

// Valore Assoluto: trasforma numeri negativi in positivi
Math.abs(-5);    // 5

// Numeri Random: genera un decimale tra 0 (incluso) e 1 (escluso)
Math.random();   // es: 0.4523...

// Arrotondamenti
Math.round(4.7); // 5 (all'intero più vicino)
Math.floor(4.7); // 4 (per difetto)
Math.ceil(4.1);  // 5 (per eccesso)

// Potenze e Radici
Math.pow(2, 3);  // 8 (2 elevato alla terza)
Math.sqrt(16);   // 4 (radice quadrata)
