const monsterHealthBar = document.getElementById('monster-health');
const playerHealthBar = document.getElementById('player-health');
const bonusLifeEl = document.getElementById('bonus-life');

const attackBtn = document.getElementById('attack-btn');
const strongAttackBtn = document.getElementById('strong-attack-btn');
const healBtn = document.getElementById('heal-btn');
const logBtn = document.getElementById('log-btn');

function adjustHealthBars(maxLifePlayer, maxLifeMonster) {
  monsterHealthBar.max = maxLifeMonster;
  monsterHealthBar.value = maxLifeMonster;
  playerHealthBar.max = maxLifePlayer;
  playerHealthBar.value = maxLifePlayer;
}

function dealMonsterDamage(damage) {
  const dealtDamage = damage;
  monsterHealthBar.value = +monsterHealthBar.value - dealtDamage;
  return dealtDamage;
}

function dealPlayerDamage(damage) {
  const dealtDamage = damage;
  playerHealthBar.value = +playerHealthBar.value - dealtDamage;
  return dealtDamage;
}

function increasePlayerHealth(healValue) {
  playerHealthBar.value = +playerHealthBar.value + healValue;
}


function resetGame(valuePlayer,valueMonster) {
  playerHealthBar.value = valuePlayer;
  monsterHealthBar.value = valueMonster;
}

function removeBonusLife() {
  bonusLifeEl.classList.add('hidden');
}

function addBonusLife() {
  bonusLifeEl.classList.remove('hidden');
}

function setPlayerHealth(health) {
  playerHealthBar.value = health;
}
