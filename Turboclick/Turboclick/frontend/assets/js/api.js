const BASE_URL = 'http://localhost:3000/api';

function getToken() {
  return localStorage.getItem('accessToken');
}

async function request(method, path, body = null) {
  const headers = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(BASE_URL + path, options);

  if (res.status === 401) {
    localStorage.removeItem('accessToken');
    window.location.href = 'signin.html';
    return;
  }

  return res;
}

const api = {
  signup: (email, password) => request('POST', '/auth/signup', { email, password }),
  signin: (email, password) => request('POST', '/auth/signin', { email, password }),
  getMe: () => request('GET', '/me'),
  getUpgrades: () => request('GET', '/upgrades'),
  click: () => request('POST', '/game/click'),
  buy: (upgradeId) => request('POST', '/game/buy', { upgradeId }),
};