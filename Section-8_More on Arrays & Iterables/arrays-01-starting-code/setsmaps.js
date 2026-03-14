// Per creare un nuovo set dobbiamo usare sempre 
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

//****************************************************
// Usiamo la map quando abbiamo un oggetto che non vogliamo modificare
// Ma al quale vogliamo aggiungere dei dati o informazioni VALUE
// Per esempio se lo usiamo da altre parti e non vogliamo modificare l'oggetto originale
const person1 = {name: "Nico"};
const person2 = {name: "Marco"};

// new Map([['key','some values']])
const peopleData = new Map([[person1,[{date:'21st March', price: 10}]]]);
console.log(peopleData);
/* Object { name: "Nico" } → Array [ {…} ]
    <key>: Object { name: "Nico" }
    <value>: Array [ {…} ]
      0: Object { date: "21st March", price: 10 } */
console.log(peopleData.get(person1));
/* Array [ {…} ]
     0: Object { date: "21st March", price: 10 }
 */

// Possiamo anche aggiungere dati ad una Map settata

peopleData.set(person2, [{date: "6 December", price: 23}]);
/*  0: Object { name: "Nico" } → Array [ {…} ]
    1: Object { name: "Marco" } → Array [ {…} ]
        <key>: Object { name: "Marco" }
        <value>: Array [ {…} ]
            0: Object { date: "6 December", price: 23 }*/

//****************************************************    
// Vediamo i 3 modi per mostrare tutte le info sempre con il for of

for(const entry of peopleData.entries()){
  console.log(entry); // Ci ritorna tutti i dati
}

for(const [key, value] of peopleData.entries()){
  console.log(key, value); // Ci ritorna chiave: valore
}

for(const key of peopleData.keys()){
  console.log(key); // Ci ritorna solo le chiavi
}

for(const value of peopleData.values()){
  console.log(value); // Ci ritorna solo i valori
}
//                      2
console.log(peopleData.size); // Ci aiuta a vedere quanti chiavi valori ci sono nella Map