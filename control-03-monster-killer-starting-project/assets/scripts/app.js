const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 15;
let chosenMaxLife = 10;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
const battleLog = [];
let battleCounter = 0;

adjustHealthBars(chosenMaxLife);

function gameLog(playerHeath, monsterHealth) {
  battleLog.push({
    playerHealth: playerHeath,
    playerDamage: ATTACK_VALUE,
    monsterDamage: MONSTER_ATTACK_VALUE,
    monsterHealth: monsterHealth,
    battleRounds: battleCounter,
    battleResult: 'unknown',
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
  battleCounter++;

  battleLog.push(gameLog(currentPlayerHealth, currentMonsterHealth));

  if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    battleLog[battleCounter].battleResult = draw;
    showResult("Draw");
  } else if (currentPlayerHealth <= 0) {
    battleLog[battleCounter].battleResult = pWins;
    showResult("Monster wins");
  } else if (currentMonsterHealth <= 0) {
    battleLog[battleCounter].battleResult = mWins;
    showResult("Player wins");
  }
  console.log(battleLog);
}


attackBtn.addEventListener("click", attackHandler);
