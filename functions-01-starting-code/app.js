const startGameBtn = document.getElementById('start-game-btn');

function startGame(){
  console.log("Game Started!!!");
}

const person = {
name: "Nico",
greet: function (){
  console.log(this.name);
}
}

person.greet();
console.log(person.name);
startGameBtn.addEventListener('click', startGame);