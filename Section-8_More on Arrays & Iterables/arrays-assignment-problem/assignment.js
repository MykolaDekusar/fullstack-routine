// First assignment

const numbers = [23, 42, 65, 3, 1, 5, 321, 67, 54, 23];
const filteredNumbers = numbers.filter((number) => number > 5);
const mappedNumbers = numbers.map((number) => {
  return { num: number };
});

const multNumbers = numbers.reduce((prev, next) => {
  return prev * next;
}, 1);

console.log(filteredNumbers, mappedNumbers, multNumbers);

// Second assignment and third assignment

function findMax(...numb) {
  let maxNum = numb[0];
  let minNum = numb[0];
  for (const num of numb) {
    if (num >= maxNum) maxNum = num;
    if (num <= minNum) minNum = num;
  }
  return [maxNum, minNum];
}
const [maxNumber, minNumber] = findMax(...numbers);

console.log(maxNumber, minNumber);
