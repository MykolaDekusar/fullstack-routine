const NAME = "Nico";
const PHRASE = "Hello there ";

const sayHello = name => console.log("Hi " + name + "!");

function newSayHello(phrase, name) {
  console.log(phrase + name + "!");
}

function hardCodedHello() {
  console.log("Hello  there Nico!");
}

const outputHello = (name ,phrase = "I'm default, hello ") => phrase + name;

const checkInput = (allGood, ...dati) =>{
  for(let data of dati){
    if(!data){
      return;
    }
  }
  allGood();
};

const allGood = () => console.log("Tutto a posto");

sayHello(NAME);
newSayHello(PHRASE, NAME);
hardCodedHello();
console.log(outputHello(NAME));
checkInput(allGood, PHRASE, NAME, "Ma se non lo fosse? ");

