class Person {
  name = "Nico";

  constructor() {
    this.age = 28;
  }

  greet() {
    console.log(`Hi my name is ${this.name} and I'm ${this.age} years old.`);
  }
}

const person = new Person();
person.greet();

// Vediamo come questa classe verrebbe scritta con una function

function Persona() {
  // La parola new ci crea un oggetto
  // this = {}
  this.age = 28;
  this.name = "Nico";
  this.greet = function () {
    console.log(`Hi my name is ${this.name} and I'm ${this.age} years old.`);
  };
  // E sempre grazie a new ci ritorna
  // return this;
}
// La cosa importane è la parola NEW che ci permette di fare queste cose
// Altrimenti sarebbe solo una funzione void che non ritorna nulla
const persona = new Persona();
persona.greet();

const person2 = Persona(); // Gli assegno una funzione che non ha return quindi undefined
if(person2){
  person2.greet(); //can't access property "greet", person2 is undefined
} else {
  console.warn("undefined");
}


// Ogni oggetto ha un prototype
console.log(persona); 
/*
age: 28
greet: function greet()
name: "Nico"
<prototype>: Object { … }
*/

console.log(persona.__proto__); 
/*
Object { … }
  constructor: function Persona()
  <prototype>: Object { … }
 */
console.log(person.__proto__ === Person.prototype); // true Sono ESATTAMENTE lo stesso oggetto

// Ogni oggetto basato sulla classe Person avra un prototipe che è esattamente questo oggetto
Persona.prototype = {
  printAge(){
    console.log(this.age);
  }
}
// Dobbiamo creare una nuova persona 
const persona2 = new Persona();

persona2.printAge();// 28
console.log(persona2.__proto__); /*
  Object { printAge: printAge() }
    printAge: function printAge()
*/

console.log(persona.__proto__); 
/*
constructor: function Persona()
  arguments: null
  caller: null
  length: 0
  name: "Persona"
  prototype: Object { printAge: printAge() } 
*/
