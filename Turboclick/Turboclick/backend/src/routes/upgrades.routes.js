const router = require('express').Router();
const authMiddleware = require('../middleware/auth.middleware');
const { UPGRADES } = require('../data/upgrades.config');

router.get('/', authMiddleware, (req, res) => {
  res.status(200).json(UPGRADES);
});

module.exports = router;