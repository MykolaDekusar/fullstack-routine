let result = 0;

// Funzioni
function sumFunction() {
  const enteredNumber = parseInt(userInput.value);
  const initialResult = result;
  result = result + enteredNumber;
  outputResult(result, `${initialResult} + ${enteredNumber}`);
}

function subFunction() {
  const enteredNumber = parseInt(userInput.value);
  const initialResult = result;
  result = result - enteredNumber;
  outputResult(result, `${initialResult} - ${enteredNumber}`);
}

function multFunction() {
  const enteredNumber = parseInt(userInput.value);
  const initialResult = result;
  result = result * enteredNumber;
  outputResult(result, `${initialResult} * ${enteredNumber}`);
}

function divideFunction() {
  const enteredNumber = parseInt(userInput.value);

  if (parseInt(userInput.value) === 0) {
    alert("Error: division by zero");
    return;
  }
  const initialResult = result;
  result = result / enteredNumber;
  outputResult(result, `${initialResult} / ${enteredNumber}`);
}

// Aggiungiamo gli event listeneres ai bottoni con eventuali funzioni da eseguire
addBtn.addEventListener("click", sumFunction);
subtractBtn.addEventListener("click", subFunction);
multiplyBtn.addEventListener("click", multFunction);
divideBtn.addEventListener("click", divideFunction);
