const bcrypt = require('bcrypt');
const { users } = require('../data/memoryStore');
const { signToken } = require('../utils/jwt');
const { isValidEmail, isValidPassword } = require('../utils/validation');

async function signup({ email, password }) {
  if (!email || !password) throw { status: 400, message: 'Email and password are required' };
  if (!isValidEmail(email)) throw { status: 400, message: 'Invalid email format' };
  if (!isValidPassword(password)) throw { status: 400, message: 'Password must be at least 6 characters' };

  const exists = users.find(u => u.email === email);
  if (exists) throw { status: 409, message: 'Email already exists' };

  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    id: 'u' + Date.now(),
    email,
    passwordHash,
    name: email.split('@')[0],
    coins: 0,
    coinsPerClick: 1,
    multiplier: 1,
    passiveIncomePerSec: 0,
    ownedUpgrades: { clickAccelerator: 0, coinMultiplier: 0, powerTap: 0, goldenTouch: 0, coinStream: 0, miningDrone: 0 },
    lastTickAt: Date.now()
  };

  users.push(user);
  return { message: 'User created' };
}

async function signin({ email, password }) {
  if (!email || !password) throw { status: 400, message: 'Email and password are required' };

  const user = users.find(u => u.email === email);
  if (!user) throw { status: 401, message: 'Invalid credentials' };

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) throw { status: 401, message: 'Invalid credentials' };

  const accessToken = signToken({ id: user.id });
  return {
    accessToken,
    user: { id: user.id, email: user.email, name: user.name }
  };
}

module.exports = { signup, signin };