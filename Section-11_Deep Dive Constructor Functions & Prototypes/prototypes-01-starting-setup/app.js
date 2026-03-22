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
if (person2) {
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
// Persona.prototype = {
//   printAge(){
//     console.log(this.age);
//   }
// }
// Un modo miglioe per aggiungere qualcosa al prototype
Persona.prototype.printAge = () => {
  console.log(this.age);
};
// Dobbiamo creare una nuova persona
const persona2 = new Persona();

persona2.printAge(); // 28
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


// Un modo per creare un oggetto usando il __proto__
const p1 = new person.__proto__.constructor();
console.log(p1); //Object { name: "Nico", age: 28 } 

// ogni oggetto utilizza Object.prototype come fallback
console.dir(Object.prototype); // Questo è la parte finale

// Vediamo come facciamo a Setting & Getting Prototypes

const course = {     // const course =  new Object() metodo alternativo per creare 
  title: 'Javascript - The Complete Guide.',
  rating: 5,
}; 

// stesso risultato console.log(course.__proto__);
console.log(Object.getPrototypeOf(course)); 

//Modo per modificare il prototype di un Oggetto in questo caso course
Object.setPrototypeOf(course, {
  printRating: function(){
    console.log(`${this.rating = 2}`);
  }
})

course.printRating();

// Abbiamo un altro modo di creare un nuovo Oggetto
// è un modo speciale che ci permette di settare il prototype
const student = Object.create({showProgress: () => {console.log(this.progress)}});
console.log(student); /*
Object {  }
  <prototype>: Object { showProgress: showProgress() }
*/

//Possiamo aggiungere normalmente una proprietà
student.name = 'Nico';

// Modo per modificare una proprità
Object.defineProperty(student, 'progress', {
  configurable:true,
  enumerable: true,
  value: 0.8,
  writable: false
})

console.log(student.progress); //0.8
