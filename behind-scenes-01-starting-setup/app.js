 // Possiamo abilitare l'uso di strict mode che disabilita certe cose
 // come creazione di variabili senza let const e var
 provaNoVariabile = "non uso let, var , const";
 console.log(provaNoVariabile);
 // In questo caso ha effetto solo per il codice dopo, va scritto in alto
 'use strict';
// Le variabili let e const sono block e function scoped
let myName = "Nico";
// Ricreare let myName = "Marco" ci darebbe errore qua
var mioNome = "Nico";
// Con var non mi da errore se modifico la stessa variabile mioNome
var mioNome = "Marco";

if (mioNome === "Marco") {
  var hobbies = ["Gaming", "Gym"];
  console.log(hobbies);
}

function greet() {
  // L'eta è bloccata nello scope della function
  let age = 28;
  // Il var dentro una funzione é bloccato dentro di essa
  var eta = 30;
  // Creiamo una variabile shadow
  let myName = "Marco";
  // La variabile var anche se create dentro il blocco if rimane globale
  console.log(myName, mioNome, age, hobbies);
}
// La variabile var anche se create dentro il blocco if rimane globale invece se creato dentro
// la funzione rimane bloccato dentro la funzione
console.log(
  `${myName}, ${mioNome}, ${hobbies}, ${typeof eta !== "undefined" ? eta : "non esiste"}`,
);
greet();
// In questo caso non mi da errore perche le var subiscono HOISTING
// Vengono portate in altro e invisibilmente fa
// var userName;
// Quindi mi da undefined
console.log(userName);
var userName = "Marco";
// In questo caso mi da errore perche con let e const vanno
// sempre dichiarate prima di utilizzarle
console.log(letUserName);
let letUserName = "Nico";
