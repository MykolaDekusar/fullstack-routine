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

const checkInput = (allGood, ...dati) => {
  for (let data of dati) {
    if (!data) {
      return;
    }
  }
  allGood();
};

const allGood = () => console.log("Tutto a posto");

sayHello(NAME);
newSayHello(PHRASE, NAME);
hardCodedHello();
outputHello(NAME);
outputHello2(NAME, "I'm not default");
checkInput(allGood, PHRASE, NAME, "Ma se non lo fosse? ");
