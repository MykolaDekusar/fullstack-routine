// Le variabili let e const sono block e function scoped
let myName = "Nico";
// Ricreare let myName = "Marco" ci darebbe errore qua
var mioNome = "Nico";
// Con var non mi da errore
var mioNome = "Marco";

function greet(){
  //L'eta è bloccata nello scope della function
  let age = 28;
  // Creiamo una variabile shadow
  let myName = "Marco";
  console.log(myName, mioNome, age);
}
console.log(myName, mioNome);
greet();