const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 15;
const MONSTER_ATTACK_VALUE = 15;
let chosenMaxLife = 10;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
const battleLog = [];
let battleCounter = 0;

adjustHealthBars(chosenMaxLife);

function gameLog(playerHeath, monsterHealth, playerAttack) {
  battleLog.push({
    playerHealth: playerHeath,
    playerDamage: playerAttack,
    monsterDamage: MONSTER_ATTACK_VALUE,
    monsterHealth: monsterHealth,
    battleRounds: battleCounter+1,
    battleResult: "unknown",
  });
}

function showResult(result) {
  setTimeout(() => {
    alert(result);
  }, 100);
}

function attackHandler() {
  const draw = "Draw";
  const pWins = "Player Wins";
  const mWins = "Monster Wins";

  const damageDealt = dealMonsterDamage(ATTACK_VALUE);
  currentMonsterHealth -= damageDealt;

  const damageTaken = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= damageTaken;

  gameLog(currentPlayerHealth, currentMonsterHealth, ATTACK_VALUE);
 
  
  if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    battleLog[battleCounter].battleResult = draw;
    showResult("Draw");
  } else if (currentPlayerHealth <= 0) {
    battleLog[battleCounter].battleResult = mWins;
    showResult("Monster wins");
  } else if (currentMonsterHealth <= 0) {
    battleLog[battleCounter].battleResult = pWins;
    showResult("Player wins");
  }
   battleCounter ++;

  console.log(battleLog);
}

function strongAttackHandler() {
  const draw = "Draw";
  const pWins = "Player Wins";
  const mWins = "Monster Wins";

  const damageDealt = dealMonsterDamage(STRONG_ATTACK_VALUE);
  currentMonsterHealth -= damageDealt;

  const damageTaken = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= damageTaken;

  gameLog(currentPlayerHealth, currentMonsterHealth, STRONG_ATTACK_VALUE);

  if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    battleLog[battleCounter].battleResult = draw;
    showResult("Draw");
  } else if (currentPlayerHealth <= 0) {
    battleLog[battleCounter].battleResult = mWins;
    showResult("Monster wins");
  } else if (currentMonsterHealth <= 0) {
    battleLog[battleCounter].battleResult = pWins;
    showResult("Player wins");
  }
    battleCounter++;
  console.log(battleLog);
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
