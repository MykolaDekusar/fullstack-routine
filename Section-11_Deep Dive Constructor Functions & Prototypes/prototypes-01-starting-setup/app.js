/**
 * RECAP PROTOTIPI E CLASSI - NICO'S LEARNING
 * Basato sul corso di Max
 */

// --- 1. APPROCCIO MODERNO: LE CLASSI ---
// Le classi sono "zucchero sintattico": rendono il codice pulito ma JS usa i prototipi sotto.
class Person {
  name = "Nico"; // Proprietà di istanza

  constructor() {
    this.age = 28;
  }

  greet() {
    console.log(`[Class] Hi, I'm ${this.name} and I'm ${this.age} years old.`);
  }
}

const person = new Person();
person.greet();

// --- 2. DIETRO LE QUINTE: LE FUNZIONI COSTRUTTRICI ---
function Persona() {
  // Quando usiamo 'new':
  // 1. JS crea un oggetto vuoto: this = {}
  // 2. Collega il prototipo
  this.age = 28;
  this.name = "Nico";
  
  // Definire funzioni qui dentro le copia in OGNI oggetto (poco efficiente per la memoria)
  this.greet = function () {
    console.log(`[Function] Hi, I'm ${this.name} and I'm ${this.age} years old.`);
  };
  // 3. Ritorna l'oggetto: return this;
}

const nico = new Persona();
nico.greet();

// --- 3. IL PROTOTIPO: LA MEMORIA CONDIVISA ---
// Invece di copiare 'printAge' in ogni oggetto, lo mettiamo nel "magazzino" comune (Prototype).
// NOTA: Usiamo function() classica, NON la arrow function, altrimenti il 'this' non funziona!
Persona.prototype.printAge = function() {
  console.log(`La mia età è: ${this.age}`);
};

const nico2 = new Persona();
nico2.printAge(); 

// Verifica del collegamento (il "cordone ombelicale")
console.log("Stesso prototipo?", nico2.__proto__ === Persona.prototype); // true

// --- 4. TRUCCHI AVANZATI: OBJECT.CREATE E PROPRIETÀ ---

// Creare un oggetto impostando subito il suo prototipo
const studentProto = {
  showProgress: function() { console.log(`Progresso: ${this.progress * 100}%`); }
};

const student = Object.create(studentProto);
student.name = 'Nico';

// Definire una proprietà con controllo totale (Sola lettura, non cancellabile)
Object.defineProperty(student, 'progress', {
  value: 0.8,
  writable: false,     // Non può essere modificata
  enumerable: true,    // Appare nei cicli for...in
  configurable: false  // Non può essere cancellata
});

console.log("Studente progress:", student.progress);
student.showProgress();

// --- 5. FALLBACK FINALE ---
// Se JS non trova una proprietà, risale la catena fino a Object.prototype
console.dir(Object.prototype);