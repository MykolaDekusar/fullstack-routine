let result = 0;

result = result + 10;

outputResult(result, "");

// Funzioni

function sumFunction(num1, num2) {
  return num1 + num2;
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
