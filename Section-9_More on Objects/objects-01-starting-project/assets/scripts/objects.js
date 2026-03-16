// Objects recap
// le chiavi degli oggeti vengono automaticamente interpretati come stringhe da
const userChosenKey = "height"; // Esempio
const person = {
  //key: value
  //first-name: 'Nico' CI DA ERRORE PERCHE FIRST-NAME NON E' VALIDO
  //POSSIAMO PERO FARE COSI
  "first-name": "Luca",
  name: "Nico",
  age: 28,
  hobbies: ["Racing", "Gaming"],
  // Importante, negli oggetti non si usano arrow functions
  greet: function () {
    console.log(`Hi there I'm ${this.name}`);
  },
  //Possiamo anche assegnare numeri POSITIVI come chiavi
  1.5: "Hello",
  // Possiamo anche dinamicamente settare le chiavi dell'oggetto
  [userChosenKey]: '',
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
// Dobbiamo passare una stringa tra le quadre, altrimenti cerca una variabile nel codice da passare
console.log(person["age"]);
console.log(person["first-name"]);
console.log(person[1.5]);
console.log(person["1.5"]);

// Possiamo anche accedere dinamicamente ai valori 
const keyName = "first-name";
console.log(person[keyName]);

// Se volessimo copiare l'oggetto person possiamo usare lo spread operator

// Possiamo usare lo spread operator ... per copiare anche l'array
// In modo che non rimanga reference dentro person 2
const person2 = {...person, hobbies: [...person.hobbies]};

//**********************************************************
//Abbiamo un altro metodo per copiare gli oggetti
//                          target
const person3 = Object.assign({}, person);
// Ci permette di unire varie cose come fondere 2 oggetti che hanno diversi proprieta
// Quindi possiamo prendere una persona e unirci delle particolarita (Essere umano, respira etc...)
