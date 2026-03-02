let myName = "Nico";
function greet(){
  //L'eta è bloccata nello scope della function
  let age = 28;
  // Creiamo una variabile shadow
  let myName = "Marco";
  console.log(myName, age);
}
console.log(myName);
greet();