const UPGRADES = [
  {
    id: 'clickAccelerator',
    title: 'Click Accelerator',
    description: 'speed of earning x10',
    price: 75,
    effects: { coinsPerClick: 10 }
  },
  {
    id: 'coinMultiplier',
    title: 'Coin Multiplier',
    description: 'ClickCoins per click x10',
    price: 200,
    effects: { multiplier: 10 }
  },
  {
    id: 'powerTap',
    title: 'Power Tap',
    description: 'ClickCoins per click x2',
    price: 50,
    effects: { coinsPerClick: 2 }
  },
  {
    id: 'goldenTouch',
    title: 'Golden Touch',
    description: 'random bonus on click',
    price: 300,
    effects: { goldenTouch: true }
  },
  {
    id: 'coinStream',
    title: 'Coin Stream',
    description: 'passive income x10',
    price: 500,
    effects: { passiveIncomePerSec: 10 }
  },
  {
    id: 'miningDrone',
    title: 'Mining Drone',
    description: 'automated clicks for 1 min',
    price: 1000,
    effects: { passiveIncomePerSec: 5 }
  }
];

module.exports = { UPGRADES };
