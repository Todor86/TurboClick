const router = require('express').Router();
const authMiddleware = require('../middleware/auth.middleware');
const { click, buyUpgrade } = require('../services/game.service');

router.post('/click', authMiddleware, (req, res) => {
  try {
    const result = click(req.user);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

router.post('/buy', authMiddleware, (req, res) => {
  try {
    const { upgradeId } = req.body;
    const result = buyUpgrade(req.user, upgradeId);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

module.exports = router;