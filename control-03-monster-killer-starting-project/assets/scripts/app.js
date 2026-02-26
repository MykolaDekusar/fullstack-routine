const ATTACK_VALUE = 10;
let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackHandler(){
  const damageDealt = dealMonsterDamage(ATTACK_VALUE);
  currentMonsterHealth -= damageDealt;
  if(currentMonsterHealth <= 0){
    alert("Player wins");
  }
}

attackBtn.addEventListener("click", attackHandler);