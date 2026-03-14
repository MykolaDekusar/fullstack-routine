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
  if (numb.length === 0) return [null, null];
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

// Fourth assignment

const list = new Set([123, 42, 32, 6, 4, 1, 4]);

function addToList(num){
  if(list.has(num)) console.log("Errore:Duplicato!");
  list.add(num);
}

addToList(4);
addToList(5);
console.log(list);
