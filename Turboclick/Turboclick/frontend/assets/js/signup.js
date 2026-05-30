document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signup-form');
  const errorEl = document.getElementById('error-msg');

  document.getElementById('toggle-password').addEventListener('click', () => {
    const input = document.getElementById('password');
    const icon = document.getElementById('eye-icon');
    const isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';
    icon.style.transition = 'opacity 0.2s';
    icon.style.opacity = '0';
    setTimeout(() => {
      icon.src = isHidden ? 'assets/images/eye-closed.svg' : 'assets/images/eye-open.svg';
      icon.style.opacity = '1';
    }, 200);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorEl.textContent = '';

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValid) return (errorEl.textContent = 'Invalid email format');
    if (password.length < 6) return (errorEl.textContent = 'Password must be at least 6 characters');

    const res = await api.signup(email, password);
    const data = await res.json();

    if (res.ok) {
      window.location.href = 'signin.html';
    } else {
      errorEl.textContent = data.error || 'Something went wrong';
    }
  });
});