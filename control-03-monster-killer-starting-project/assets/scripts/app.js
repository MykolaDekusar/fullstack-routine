const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 15;
const MONSTER_ATTACK_VALUE = 20;
const draw = "Draw";
const pWins = "Player Wins";
const mWins = "Monster Wins";
const battleLog = [];
const healing = 15;

let chosenMaxLife = 20;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let roundCounter = 0;
let bonusLife = 1;

adjustHealthBars(chosenMaxLife);

// Registra i dati di ogni turno per il debug e la cronologia finale
function gameLog(
  playerHeath,
  monsterHealth,
  playerAttack,
  playerAction,
  damageTaken,
) {
  battleLog.push({
    playerHealth: playerHeath,
    playerAttack: playerAttack,
    playerAction: playerAction,
    monsterAttack: damageTaken,
    monsterHealth: monsterHealth,
    battleRounds: roundCounter + 1,
    battleResult: "unknown",
  });
}

// L'alert è ritardato per permettere al browser di aggiornare prima la grafica (DOM)
function showResult(result) {
  setTimeout(() => {
    alert(result);
  }, 100);
}

function attackHandler() {
  attackMonster("ATTACK");
}

function strongAttackHandler() {
  attackMonster("STRONG_ATTACK");
}

function healPlayer() {
  attackMonster("HEAL");
}

// Funzione ponte per smistare il tipo di azione scelta dall'utente
function attackMonster(attackType) {
  let playerAttack;
  let playerAction;
  if (attackType === "ATTACK") {
    playerAttack = Math.round(Math.random() * ATTACK_VALUE);
    playerAction = "ATTACK";
  } else if (attackType === "STRONG_ATTACK") {
    playerAttack = Math.round(Math.random() * STRONG_ATTACK_VALUE);
    playerAction = "STRONG_ATTACK";
  } else if (attackType === "HEAL") {
    playerAttack = 0;
    playerAction = "HEAL";
  }
  healOrDamage(playerAction, playerAttack);
}



// Logica principale: calcola i cambiamenti di salute e verifica la fine del gioco
function healOrDamage(playerAction, playerAttack) {
  if (playerAction === "HEAL") {
    let effectiveHeal = healing;
    // Impedisce alla vita del giocatore di superare il limite massimo impostato
    if (currentPlayerHealth + effectiveHeal > chosenMaxLife) {
      effectiveHeal = chosenMaxLife - currentPlayerHealth;
    }
    currentPlayerHealth += effectiveHeal;
    increasePlayerHealth(effectiveHeal);
  } else {
    const damageDealt = dealMonsterDamage(playerAttack);
    currentMonsterHealth -= damageDealt;
  }

  // Risposta del mostro: attacca sempre, anche se il giocatore si è curato
  const damageTaken = dealPlayerDamage(
    Math.round(Math.random() * MONSTER_ATTACK_VALUE),
  );
  currentPlayerHealth -= damageTaken;
  console.log(currentPlayerHealth <= 0 && bonusLife === 1);
  if(currentPlayerHealth <= 0 && bonusLife === 1){
     
    currentPlayerHealth = 1;
    increasePlayerHealth(currentPlayerHealth);
    bonusLife = 0;
    removeBonusLife();
  }

  gameLog(
    currentPlayerHealth,
    currentMonsterHealth,
    playerAttack,
    playerAction,
    damageTaken,
  );

  endGame(currentMonsterHealth, currentPlayerHealth);

  roundCounter++;
  console.log(battleLog);
}

function endGame(currentMonsterHealth, currentPlayerHealth) {
  
    if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
      battleLog[roundCounter].battleResult = draw;
      showResult("Draw");
      resetGame(chosenMaxLife);
    } else if (currentPlayerHealth <= 0) {
      battleLog[roundCounter].battleResult = mWins;
      showResult("Monster wins");
      resetGame(chosenMaxLife);
    } else if (currentMonsterHealth <= 0) {
      battleLog[roundCounter].battleResult = pWins;
      showResult("Player wins");
      resetGame(chosenMaxLife);
    }
    
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayer);
