const startGameBtn = document.getElementById("start-game-btn");

const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";
const PLAYER_WINS = "PLAYER WINS";
const COMPUTER_WINS = "COMPUTER WINS";
const DRAW = "DRAW";
const DEFAULT_USER_CHOICE = ROCK;
let gameIsRunning = false;
const gameChoices = [ROCK, PAPER, SCISSORS];

function getPlayerChoice() {
  const selection = (
    prompt(`${ROCK}, ${PAPER} or ${SCISSORS}?`, "") || ""
  ).toUpperCase();
  if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
    alert(`Invalid choice! We chose ${DEFAULT_USER_CHOICE} for you!`);
    return DEFAULT_USER_CHOICE;
  }
  return selection;
}

function getComputerChoice() {
  const randomNumber = Math.floor(Math.random() * gameChoices.length);
  return gameChoices[randomNumber];
}

function gameLogic(player, computer) {
  if (player === computer) {
    return DRAW;
  } else if (
    (player === ROCK && computer === SCISSORS) ||
    (player === SCISSORS && computer === PAPER) ||
    (player === PAPER && computer === ROCK)
  ) {
    return PLAYER_WINS;
  } else {
    return COMPUTER_WINS;
  }
}

startGameBtn.addEventListener("click", function () {
  if (gameIsRunning) {
    return;
  }
  gameIsRunning = true;
  console.log("Game is starting...");
  const playerSelection = getPlayerChoice();
  const computerSelecton = getComputerChoice();
  const result = gameLogic(playerSelection, computerSelecton);
  console.log(
    `Player choose ${playerSelection}\nComputer choose ${computerSelecton}\n${result}`,
  );
  gameIsRunning = false;
});
