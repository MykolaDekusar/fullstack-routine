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
const person1 = new Persona();
person1.greet();

const person2 = Persona(); // Gli assegno una funzione che non ha return quindi undefined
person2.greet(); //can't access property "greet", person2 is undefined
