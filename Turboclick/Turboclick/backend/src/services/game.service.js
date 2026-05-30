const { UPGRADES } = require('../data/upgrades.config');
const { applyPassiveIncome } = require('./user.service');

function click(user) {
  applyPassiveIncome(user);
  let earned = user.coinsPerClick * user.multiplier;
  if (user.ownedUpgrades.goldenTouch > 0) {
    earned += Math.floor(Math.random() * earned);
  }
  user.coins += earned;
  return { coins: user.coins };
}

function buyUpgrade(user, upgradeId) {
  applyPassiveIncome(user);

  const upgrade = UPGRADES.find(u => u.id === upgradeId);
  if (!upgrade) throw { status: 400, message: 'Invalid upgradeId' };
  if (user.ownedUpgrades[upgradeId] > 0) throw { status: 409, message: 'Already purchased' };
  if (user.coins < upgrade.price) throw { status: 422, message: 'Not enough coins' };

  user.coins -= upgrade.price;

  const { effects } = upgrade;
  if (effects.coinsPerClick) user.coinsPerClick += effects.coinsPerClick;
  if (effects.multiplier) user.multiplier *= effects.multiplier;
  if (effects.passiveIncomePerSec) user.passiveIncomePerSec += effects.passiveIncomePerSec;
  // goldenTouch — просто фіксуємо покупку, ефект застосовується в click()

  user.ownedUpgrades[upgradeId] = (user.ownedUpgrades[upgradeId] || 0) + 1;

  return {
    message: 'Purchased',
    coins: user.coins,
    coinsPerClick: user.coinsPerClick,
    passiveIncomePerSec: user.passiveIncomePerSec
  };
}

module.exports = { click, buyUpgrade };