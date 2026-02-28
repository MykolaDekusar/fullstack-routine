const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 15;
const MONSTER_ATTACK_VALUE = 20;
const draw = "Draw";
const pWins = "Player Wins";
const mWins = "Monster Wins";
const battleLog = [];
const healing = 15;
const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";
const MODE_HEALING = "HEAL";
let roundCounter = 0;
let bonusLife = 1;

// Chiediamo la vita del giocatore e convertiamo subito in intero
let inputPlayerHealth = parseInt(
  prompt("Inserisci la vita massima del giocatore (es: 100)"),
);

// Se l'utente preme Annulla (null), inserisce lettere (NaN) o un numero <= 0, diamo un default
if (isNaN(inputPlayerHealth) || inputPlayerHealth <= 0) {
  inputPlayerHealth = 100;
  console.log("Valore non valido. Impostata vita giocatore a 100 di default.");
}

let inputMonsterHealth = parseInt(
  prompt("Inserisci la vita massima del mostro (es: 100)"),
);

if (isNaN(inputMonsterHealth) || inputMonsterHealth <= 0) {
  inputMonsterHealth = 100;
  console.log("Valore non valido. Impostata vita mostro a 100 di default.");
}

// Inizializziamo le variabili globali
let userPlayerHealth = inputPlayerHealth;
let userMonsterHealth = inputMonsterHealth;
let currentPlayerHealth = userPlayerHealth;
let currentMonsterHealth = userMonsterHealth;

adjustHealthBars(currentPlayerHealth, currentMonsterHealth);

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
    playerAttackDamage: playerAttack,
    playerAction: playerAction,
    monsterAttackDamage: damageTaken,
    monsterHealth: monsterHealth,
    battleRounds: roundCounter + 1,
    battleResult: "unknown",
  });
}

// L'alert è ritardato per permettere al browser di aggiornare prima la grafica (DOM)
function showResult(result) {
  setTimeout(() => {
    alert(result);
  }, 200);
}


function attackHandler() {
  attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTACK);
}

function healPlayer() {
  attackMonster(MODE_HEALING);
}

// Funzione ponte per smistare il tipo di azione scelta dall'utente
function attackMonster(attackType) {
  let playerAttack = null;
  let playerAction = null;
  if (attackType === MODE_ATTACK) {
    playerAttack = Math.round(Math.random() * ATTACK_VALUE);
    playerAction = MODE_ATTACK;
  } else if (attackType === MODE_STRONG_ATTACK) {
    playerAttack = Math.round(Math.random() * STRONG_ATTACK_VALUE);
    playerAction = MODE_STRONG_ATTACK;
  } else if (attackType === MODE_HEALING) {
    playerAttack = 0;
    playerAction = MODE_HEALING;
  }
  healOrDamage(playerAction, playerAttack);
}

// Logica principale: calcola i cambiamenti di salute e verifica la fine del gioco
function healOrDamage(playerAction, playerAttack) {
  let effectiveHeal = healing;
  if (playerAction === MODE_HEALING) {
    // Verifica per non curarmi con la vita massima
    if (currentPlayerHealth >= inputPlayerHealth) {
      alert("Hai già la vita piena!!!");
      return;
    }

    // Impedisce alla vita del giocatore di superare il limite massimo impostato
    if (currentPlayerHealth + effectiveHeal > inputPlayerHealth) {
      effectiveHeal = inputPlayerHealth - currentPlayerHealth;
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

  // Verifico e uso la vita extra
  if (currentPlayerHealth <= 0 && bonusLife === 1) {
    currentPlayerHealth += damageTaken;
    increasePlayerHealth(currentPlayerHealth);
    bonusLife = 0;
    removeBonusLife();
    setTimeout(() => {
      alert("Extra life used");
    }, 200);
  }

  gameLog(
    currentPlayerHealth,
    currentMonsterHealth,
    playerAttack,
    playerAction,
    damageTaken,
  );
  if (playerAction === MODE_HEALING)
    battleLog[roundCounter].healValue = effectiveHeal;

  endGame(currentMonsterHealth, currentPlayerHealth);

  roundCounter++;
}

function showLog() {
  console.table(battleLog);
}

function reset() {
  currentMonsterHealth = userMonsterHealth;
  currentPlayerHealth = userPlayerHealth;
  bonusLife = 1;
  addBonusLife();
  resetGame(userPlayerHealth, userMonsterHealth);
}

function endGame(currentMonsterHealth, currentPlayerHealth) {
  if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    battleLog[roundCounter].battleResult = draw;
    showResult(draw);
    reset();
  } else if (currentPlayerHealth <= 0) {
    battleLog[roundCounter].battleResult = mWins;
    showResult(mWins);
    reset();
  } else if (currentMonsterHealth <= 0) {
    battleLog[roundCounter].battleResult = pWins;
    showResult(pWins);
    reset();
  }
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayer);
logBtn.addEventListener("click", showLog);
