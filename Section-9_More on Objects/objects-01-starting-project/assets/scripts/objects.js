// Objects recap
const person = {
  //key: value
  //first-name: 'Nico' CI DA ERRORE PERCHE FIRST-NAME NON E' VALIDO
  //POSSIAMO PERO FARE COSI
  "first-name": "Luca",
  name: "Nico",
  age: 28,
  hobbies: ["Racing", "Gaming"],
  greet: function () {
    console.log(`Hi there I'm ${this.name}`);
  },
};

person.greet();

// Vediamo come modificare i valori di un oggetto'
person.name = "Max";
console.log(person);

// E come aggiungere una key: value
person.isMarried = false;
console.log(person); //Object { name: "Max", age: 28, hobbies: (2) […], greet: greet(), isMarried: false }

// E come eliminare una proprieta dall' Object
delete person.isMarried;
// Oppure person.isMarried = undefined; PERO NON E' PULITO

// Vediamo come accedere alle key speciali come stringa "first-name"
// Dobbiamo passare una stringa tra le quadre, altrimenti cerca una variabile
console.log(person["age"]);
console.log(person["first-name"]);
