const startGameBtn = document.getElementById('start-game-btn'); 

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const DEFAULT_USER_CHOICE = ROCK;
let gameIsRunning = false;
const gameChoices = [ROCK, PAPER, SCISSORS];

function getPlayerChoice() {
  const selection = prompt(`${ROCK}, ${PAPER} or ${SCISSORS}?`, '').toUpperCase();
  if (
    selection !== ROCK &&
    selection !== PAPER &&
    selection !== SCISSORS
  ) {
    alert(`Invalid choice! We chose ${DEFAULT_USER_CHOICE} for you!`);
    return DEFAULT_USER_CHOICE;
  }
  return selection;
};

function getComputerChoice(){
  const randomNumber = Math.floor(Math.random() * gameChoices.length);
  return gameChoices[randomNumber];
}

function gameLogic(player, computer){
  if(player === computer){
    console.log(`Player choose ${player}\nComputer choose ${computer}\nDRAW`);
    return;
  }
  if(player === ROCK && computer === SCISSORS){
    console.log(`Player choose ${player}\nComputer choose ${computer}\nPlayer WINS`);
    return;
  }
  if(player === SCISSORS && computer === PAPER){
    console.log(`Player choose ${player}\nComputer choose ${computer}\nPlayer WINS`);
    return;
  }
  if(player === PAPER && computer === ROCK){
    console.log(`Player choose ${player}\nComputer choose ${computer}\nPlayer WINS`);
    return;
  }
  console.log(`Player choose ${player}\nComputer choose ${computer}\nComputer WINS`);
  return;
}



startGameBtn.addEventListener('click', function() {
  if(gameIsRunning){
    return;
  }
  gameIsRunning = true;
  console.log('Game is starting...');
  const playerSelection = getPlayerChoice();
  const computerSelecton = getComputerChoice();

  console.log(playerSelection, computerSelecton);
  gameLogic(playerSelection,computerSelecton);
  gameIsRunning = false;
});
