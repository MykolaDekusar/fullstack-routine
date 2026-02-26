const ATTACK_VALUE = 10;
let chosenMaxLife = 10;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackHandler() {
  const damageDealt = dealMonsterDamage(ATTACK_VALUE);
  const damageTaken = dealPlayerDamage(ATTACK_VALUE);
  currentMonsterHealth -= damageDealt; 
  currentPlayerHealth-= damageTaken


  if (currentMonsterHealth <= 0) {
    setTimeout(() => {
      alert("Player wins");
    }, 100);
  } else if(currentPlayerHealth <= 0) {
    setTimeout(() => {
      alert("Monster wins");
    }, 100);
  }
 
}

attackBtn.addEventListener("click", attackHandler);
