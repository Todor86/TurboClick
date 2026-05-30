const router = require('express').Router();
const { signup, signin } = require('../services/auth.service');

router.post('/signup', async (req, res) => {
  try {
    const result = await signup(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const result = await signin(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

module.exports = router;
