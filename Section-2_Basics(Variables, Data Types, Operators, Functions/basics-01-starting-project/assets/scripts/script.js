// All'avvio dello script (quando apri la pagina), posizioniamo subito il cursore nel campo del testo
userInput.focus();
let currentResult = 0;
let selectedOperation = "";
let firstOperand = null;
let chainingNumbers = false;
let calculationLog = [];

function getUserNumberInput() {
  return userInput.valueAsNumber;
}

function logFunction(n1, n2, oper, res) {
  const currentLog = {
    currentNumber: n1,
    nextNumber: n2,
    operation: oper,
    calculationResult: res,
  };

  calculationLog.push(currentLog);
}

// Aggiungiamo gli event listeneres ai bottoni con eventuali funzioni da eseguire
addBtn.addEventListener("click", () => chooseOperation("+"));
subtractBtn.addEventListener("click", () => chooseOperation("-"));
multiplyBtn.addEventListener("click", () => chooseOperation("*"));
divideBtn.addEventListener("click", () => chooseOperation("/"));
resultBtn.addEventListener("click", calculateResult);

function chooseOperation(operator) {
  const enteredNumber = getUserNumberInput();
  // VALIDAZIONE: Blocca tutto se l'input è vuoto e non stiamo concatenando
  if (isNaN(enteredNumber) && !chainingNumbers) {
    alert("Inserisci un numero valido prima di scegliere un'operazione.");
    return;
  }
  // Se NON stiamo continuando un calcolo precedente, prendiamo il numero dall'input
  // Altrimenti, lasciamo intatto il firstOperand (che è già uguale al currentResult)
  if (!chainingNumbers) {
    firstOperand = enteredNumber;
  }

  selectedOperation = operator;
  userInput.value = "";
  chainingNumbers = false;
  userInput.focus();
}

function calculateResult() {
  const enteredNumber = getUserNumberInput();
  if (!selectedOperation || isNaN(enteredNumber)) return;
  if (enteredNumber === 0) {
    alert("Divisione per 0, ERRORE!!!");
    return;
  }

  // Eseguiamo il calcolo in base all'operazione scelta
  switch (selectedOperation) {
    case "+":
      currentResult = firstOperand + enteredNumber;
      break;
    case "-":
      currentResult = firstOperand - enteredNumber;
      break;
    case "*":
      currentResult = firstOperand * enteredNumber;
      break;
    case "/":
      currentResult = firstOperand / enteredNumber;
      break;
    default:
      return;
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
