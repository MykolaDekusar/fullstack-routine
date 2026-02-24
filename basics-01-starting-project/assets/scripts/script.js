// All'avvio dello script (quando apri la pagina), posizioniamo subito il cursore nel campo del testo
userInput.focus();
let currentResult = 0;
let selectedOperation = "";
let firstOperand;
let chainingNumbers = false;
let calculationLog = [];

// Funzioni
function getUserNumberInput() {
  return userInput.valueAsNumber;
}

function chooseOperation(operator) {
  // Se NON stiamo continuando un calcolo precedente, prendiamo il numero dall'input
  // Altrimenti, lasciamo intatto il firstOperand (che è già uguale al currentResult)
  if (!chainingNumbers) {
    firstOperand = getUserNumberInput();
  }
  selectedOperation = operator;

  // Svuotiamo imput visivo del calcolatore per il secondo numero
  userInput.value = "";

  // Resettiamo il flag, perchè siamo pronti a ricevere il secondo numero
  chainingNumbers = false;
  // Rimettiamo il focus sull'input dopo aver scelto l'operazione
  userInput.focus();
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

function logFunction(n1,n2,oper,res){
   const currentLog = {
    currentNumber: n1,
    nextNumber: n2,
    operation: oper,
    calculationResult: res
  }

  calculationLog.push(currentLog);
}

function calculateResult() {
  const enteredNumber = getUserNumberInput();
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
  outputResult(
    currentResult,
    `${firstOperand} ${selectedOperation} ${enteredNumber}`,
  );

  // Creaiamo un log dei calcoli ad ogni uguale
  logFunction(firstOperand, enteredNumber, selectedOperation, currentResult);
  console.log(calculationLog);

  // Resettiamo l'operatore per non causare bug
  selectedOperation = "";

  // Impostiamo il risultato come nuovo primo operatore
  firstOperand = currentResult;

  // Diciamo al programma che il prossimo operatore cliccato dovrà utilizzare questo risultato
  chainingNumbers = true;
  // Rimettiamo il focus sull'input anche dopo aver cliccato "="
  userInput.focus();
  
}

// Aggiungiamo gli event listeneres ai bottoni con eventuali funzioni da eseguire
addBtn.addEventListener("click", sumFunction);
subtractBtn.addEventListener("click", subFunction);
multiplyBtn.addEventListener("click", multFunction);
divideBtn.addEventListener("click", divideFunction);
resultBtn.addEventListener("click", calculateResult);
