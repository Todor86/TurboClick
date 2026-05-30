document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signin-form');
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

    if (!email || !password) return (errorEl.textContent = 'Please fill in all fields');

    const res = await api.signin(email, password);
    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('accessToken', data.accessToken);
      window.location.href = 'home.html';
    } else {
      errorEl.textContent = data.error || 'Something went wrong';
    }
  });
});