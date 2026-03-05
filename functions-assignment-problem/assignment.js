const NAME = "Nico";
const PHRASE = "Hello there ";

const sayHello = (name) => console.log("Hi " + name + "!");

function newSayHello(phrase, name) {
  console.log(phrase + name + "!");
}

function hardCodedHello() {
  console.log("Hello there Nico!");
}

const outputHello = (name, phrase = "I'm default, hello ") => console.log(phrase + name);
const outputHello2 = (name, phrase = "I'm default, hello ") => console.log(phrase + name);

const checkInput = (confirmation, ...dati) => {
  for (let data of dati) {
    if (!data) {
      return;
    }
  }
  confirmation(dati);
};
const checkInput2 = (funz, ...dati) => {
  for (let data of dati) {
    
    if (!data) {
      return;
    }
  }
  funz();
};

const allGood = (dati) => console.log("Tutto a posto ecco i tuoi dati " + dati);

sayHello(NAME);
newSayHello(PHRASE, NAME);
hardCodedHello();
outputHello(NAME);
outputHello2(NAME, "I'm not default");
checkInput(allGood, PHRASE, NAME, "Ma se non lo fosse? ");
checkInput2(() => console.log("Tutto a posto"), PHRASE, NAME, "Ma se non lo fosse? ");
