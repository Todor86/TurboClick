const router = require('express').Router();
const authMiddleware = require('../middleware/auth.middleware');
const { getMe } = require('../services/user.service');

router.get('/me', authMiddleware, (req, res) => {
  try {
    const data = getMe(req.user);
    res.status(200).json(data);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

module.exports = router;