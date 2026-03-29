/**
 * Una "Tag Function" riceve:
 * 1. Un array di stringhe (le parti fisse del testo)
 * 2. I valori delle espressioni (${...}) come argomenti separati
 */
function productDescription(strings, productName, productPrice) {
  // strings conterrà: ["This product (", ") is ", "."]
  console.log("Parti testuali:", strings);

  // productName e productPrice contengono i valori passati nelle espressioni
  console.log("Nome Prodotto:", productName);
  console.log("Prezzo Prodotto:", productPrice);

  // Logica di trasformazione dei dati
  let priceCategory = "economico rispetto al suo prezzo";

  if (productPrice > 20) {
    priceCategory = "prezzo equo";
  }

  // Una Tag Function può restituire QUALSIASI cosa.
  // Qui, invece di una stringa, restituiamo un oggetto strutturato.
  return {
    name: productName,
    price: productPrice,
    category: priceCategory,
  };
}

const prodName = "Corso JavaScript";
const prodPrice = 29.99;

// Invocazione tramite Tagged Template
const productOutput = productDescription`This product (${prodName}) is ${prodPrice}.`;

// Il risultato sarà l'oggetto restituito dalla funzione
console.log(productOutput);
// Output: { name: 'Corso JavaScript', price: 29.99, category: 'prezzo equo' }
