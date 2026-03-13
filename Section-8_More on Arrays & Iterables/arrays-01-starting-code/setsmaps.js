// Per creare un nuovo set dobbiamo usare sempre new Set();
// I Set non permettono duplicati e ci permettono di gestire valori unici
const ids = new Set([1,2,3]);
console.log(ids); //Set(3) [ 1, 2, 3 ]
console.log(ids.has(1)); // true

ids.add(2); // Anche se aggiungiamo 2, 2 esiste gia quindi non aggiunge nulla
ids.delete(3);
console.log(ids); //Set(3) [ 1, 2] 

console.log(ids.entries());
for (const entry of ids.entries()){
  console.log(entry);//Array [ 1, 1 ] Array [ 2, 2 ]
  console.log(entry[0]);// 1  2
}