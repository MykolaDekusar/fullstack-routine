let currentResult = 0;
let selectedOperation = "";
let firstOperand = 0;

// Funzioni
function chooseOperation(operator) {
  firstOperand = userInput.valueAsNumber;
  selectedOperation = operator;
}

function sumFunction() {
  chooseOperation("+");
}

function subFunction() {
  chooseOperation("-");
}

function multFunction() {
  chooseOperation("*");
}

function divideFunction() {
  chooseOperation("/");
}

function calculateResult() {
  const enteredNumber = userInput.valueAsNumber;
  if (!selectedOperation) return;

  // Eseguiamo il calcolo in base all'operazione scelta
  if (selectedOperation === "+") {
    currentResult = firstOperand + enteredNumber;
  } else if (selectedOperation === "-") {
    currentResult = firstOperand - enteredNumber;
  } else if (selectedOperation === "*") {
    currentResult = firstOperand * enteredNumber;
  } else if (selectedOperation === "/") {
    if (enteredNumber === 0) {
      alert("Divisione per 0, ERRORE!!!");
      return;
    }
    currentResult = firstOperand / enteredNumber;
  }

  // Stampiamo a schermo l'intera equazione e il risultato
  outputResult(currentResult, `${firstOperand} ${selectedOperation} ${enteredNumber}`);

  // Resettiamo l'operatore per non causare bug
  selectedOperation = "";

  
}

// Aggiungiamo gli event listeneres ai bottoni con eventuali funzioni da eseguire
addBtn.addEventListener("click", sumFunction);
subtractBtn.addEventListener("click", subFunction);
multiplyBtn.addEventListener("click", multFunction);
divideBtn.addEventListener("click", divideFunction);
resultBtn.addEventListener("click", calculateResult);
