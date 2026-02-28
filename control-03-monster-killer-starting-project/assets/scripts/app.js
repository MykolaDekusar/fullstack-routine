const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 15;
const MONSTER_ATTACK_VALUE = 20;
const RESULT_DRAW = "Draw";
const RESULT_PLAYER_WINS = "Player Wins";
const RESULT_MONSTER_WINS = "Monster Wins";
const battleLog = [];
const HEAL_VALUE = 15;
const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";
const MODE_HEALING = "HEAL";
let roundCounter = 0;
let bonusLife = 1;
let inputPlayerHealth;
let inputMonsterHealth;
let userPlayerHealth;
let userMonsterHealth;
let currentPlayerHealth;
let currentMonsterHealth;
// Chiediamo la vita del giocatore e convertiamo subito in intero
setTimeout(() => {
  inputPlayerHealth = parseInt(
    prompt("Inserisci la vita massima del giocatore (es: 100)"),
    10,
  );
  inputMonsterHealth = parseInt(
    prompt("Inserisci la vita massima del mostro (es: 100)"),
    10,
  );
  // Se l'utente preme Annulla (null), inserisce lettere (NaN) o un numero <= 0, diamo un default
  if (isNaN(inputPlayerHealth) || inputPlayerHealth <= 0) {
    inputPlayerHealth = 100;
    console.log(
      "Valore non valido. Impostata vita giocatore a 100 di default.",
    );
  }

  if (isNaN(inputMonsterHealth) || inputMonsterHealth <= 0) {
    inputMonsterHealth = 100;
    console.log("Valore non valido. Impostata vita mostro a 100 di default.");
  }
  // Inizializziamo le variabili globali
  userPlayerHealth = inputPlayerHealth;
  userMonsterHealth = inputMonsterHealth;
  currentPlayerHealth = userPlayerHealth;
  currentMonsterHealth = userMonsterHealth;

  adjustHealthBars(currentPlayerHealth, currentMonsterHealth);
}, 500);

// Registra i dati di ogni turno per il debug e la cronologia finale
function gameLog(
  playerHealth,
  monsterHealth,
  playerAttack,
  playerAction,
  damageTaken,
) {
  battleLog.push({
    playerHealth,
    playerAttackDamage: playerAttack,
    playerAction,
    monsterAttackDamage: damageTaken,
    monsterHealth,
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
  performPlayerAction(MODE_ATTACK);
}

function strongAttackHandler() {
  performPlayerAction(MODE_STRONG_ATTACK);
}

function healPlayer() {
  performPlayerAction(MODE_HEALING);
}

// Funzione ponte per smistare il tipo di azione scelta dall'utente
function performPlayerAction(attackType) {
  if (
    currentPlayerHealth == null ||
    currentMonsterHealth == null ||
    userPlayerHealth == null ||
    userMonsterHealth == null
  ) {
    alert("Attendi l'inizializzazione del gioco.");
    return;
  }
  let playerAttack = null;
  let playerAction = null;
  switch (attackType) {
    case MODE_ATTACK:
      playerAttack = Math.round(Math.random() * ATTACK_VALUE);
      playerAction = MODE_ATTACK;
      break;
    case MODE_STRONG_ATTACK:
      playerAttack = Math.round(Math.random() * STRONG_ATTACK_VALUE);
      playerAction = MODE_STRONG_ATTACK;
      break;
    case MODE_HEALING:
      playerAttack = 0;
      playerAction = MODE_HEALING;
      break;
    default:
      return;
  }
  healOrDamage(playerAction, playerAttack);
  // if (attackType === MODE_ATTACK) {
  //   playerAttack = Math.round(Math.random() * ATTACK_VALUE);
  //   playerAction = MODE_ATTACK;
  // } else if (attackType === MODE_STRONG_ATTACK) {
  //   playerAttack = Math.round(Math.random() * STRONG_ATTACK_VALUE);
  //   playerAction = MODE_STRONG_ATTACK;
  // } else if (attackType === MODE_HEALING) {
  //   playerAttack = 0;
  //   playerAction = MODE_HEALING;
  // }
}

// Logica principale: calcola i cambiamenti di salute e verifica la fine del gioco
function healOrDamage(playerAction, playerAttack) {
  let effectiveHeal = HEAL_VALUE;
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
    increasePlayerHealth(damageTaken);
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
  roundCounter = 0;
  addBonusLife();
  resetGame(userPlayerHealth, userMonsterHealth);
}

function endGame(currentMonsterHealth, currentPlayerHealth) {
  if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    battleLog[roundCounter].battleResult = RESULT_DRAW;
    showResult(RESULT_DRAW);
    reset();
  } else if (currentPlayerHealth <= 0) {
    battleLog[roundCounter].battleResult = RESULT_MONSTER_WINS;
    showResult(RESULT_MONSTER_WINS);
    reset();
  } else if (currentMonsterHealth <= 0) {
    battleLog[roundCounter].battleResult = RESULT_PLAYER_WINS;
    showResult(RESULT_PLAYER_WINS);
    reset();
  }
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayer);
logBtn.addEventListener("click", showLog);
