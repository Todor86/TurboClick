function applyPassiveIncome(user) {
  const now = Date.now();
  const deltaSec = Math.floor((now - user.lastTickAt) / 1000);
  if (deltaSec > 0) {
    user.coins += deltaSec * user.passiveIncomePerSec;
    user.lastTickAt = now;
  }
}

function getMe(user) {
  applyPassiveIncome(user);
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    coins: user.coins,
    coinsPerClick: user.coinsPerClick,
    passiveIncomePerSec: user.passiveIncomePerSec,
    ownedUpgrades: user.ownedUpgrades
  };
}

module.exports = { getMe, applyPassiveIncome };