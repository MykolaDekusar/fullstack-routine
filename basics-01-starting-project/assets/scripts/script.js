let result = 0;

// Funzioni

function sumFunction() {
  result = result + parseInt(userInput.value);
  outputResult(result, "");
  return;
}

function subFunction(num1, num2) {
  return num1 - num2;
}

function multFunction(num1, num2) {
  return num1 * num2;
}

function divideFunction(num1, num2) {
  if (num2 === 0) {
    alert("Error: division by zero");
    return
  }
  return num1 / num2;
}

// Aggiungiamo gli event listeneres ai bottoni con eventuali funzioni da eseguire
addBtn.addEventListener("click", sumFunction); 
subtractBtn.addEventListener("click", subFunction);
multiplyBtn.addEventListener("click", multFunction);
divideBtn.addEventListener("click", divideFunction);


