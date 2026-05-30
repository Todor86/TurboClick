function requireAuth() {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    window.location.href = 'signin.html';
  }
}

function logout() {
  localStorage.removeItem('accessToken');
  window.location.href = 'signin.html';
}