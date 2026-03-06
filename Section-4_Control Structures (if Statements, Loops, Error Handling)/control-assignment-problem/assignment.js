const randomNumber = Math.random(); // produces random number between 0 (including) and 1 (excluding)



const arrayForLoop = [3,4,5,6,7,2,13,5,6,77,423] ;
for(let i = arrayForLoop.length; i > 0; i--){
 
  console.log(arrayForLoop[i-1]);
}
for(const element of arrayForLoop){
  console.log(element);
}

const anotherRandomNumber = Math.random();

if(anotherRandomNumber > 0.7 && randomNumber > 0.7 || anotherRandomNumber < 0.2 || randomNumber < 0.2){
  alert(`Both numbers where grater than 0.7 or one of them was lower than 0.2 ${randomNumber} ${anotherRandomNumber}`);
}

if(randomNumber > 0.7 ){
  alert("The number is greater than 0.7");
}