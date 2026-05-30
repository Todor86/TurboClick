document.addEventListener('DOMContentLoaded', async () => {
  requireAuth();

  // Elements
  const userName = document.getElementById('user-name');
  const userBalance = document.getElementById('user-balance');
  const totalCoins = document.getElementById('total-coins');
  const coinsPerClick = document.getElementById('coins-per-click');
  const passiveIncome = document.getElementById('passive-income');
  const clickBtn = document.getElementById('click-btn');
  const upgradesList = document.getElementById('upgrades-list');

  let userData = null;

  // Load user data
  async function loadMe() {
    const res = await api.getMe();
    if (!res) return;
    userData = await res.json();
    updateUI();
  }

  // Load upgrades
  async function loadUpgrades() {
    const res = await api.getUpgrades();
    if (!res) return;
    const upgrades = await res.json();
    renderUpgrades(upgrades);
  }

  function updateUI() {
    userName.textContent = userData.name;
    userBalance.textContent = formatCoins(userData.coins);
    totalCoins.textContent = formatCoins(userData.coins);
    coinsPerClick.textContent = userData.coinsPerClick;
    passiveIncome.textContent = userData.passiveIncomePerSec;
  }

  function formatCoins(n) {
    return Number(n).toLocaleString();
  }

  const UPGRADE_ICONS = {
    clickAccelerator: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28.0001 32.0001C28.5305 32.0001 29.0392 31.7894 29.4143 31.4143C29.7893 31.0392 30.0001 30.5305 30.0001 30.0001V26.0001C30.0001 25.4697 30.2108 24.9609 30.5858 24.5859C30.9609 24.2108 31.4696 24.0001 32.0001 24.0001H38.5861C38.8658 24.0001 39.1392 23.9173 39.3718 23.7619C39.6044 23.6065 39.7857 23.3857 39.8927 23.1272C39.9998 22.8688 40.0278 22.5845 39.9732 22.3101C39.9186 22.0358 39.7839 21.7838 39.5861 21.5861L25.7081 7.70809C25.4839 7.48362 25.2176 7.30554 24.9245 7.18404C24.6315 7.06254 24.3173 7 24.0001 7C23.6828 7 23.3687 7.06254 23.0756 7.18404C22.7825 7.30554 22.5163 7.48362 22.2921 7.70809L8.41206 21.5881C8.21494 21.7859 8.08082 22.0378 8.02663 22.3117C7.97244 22.5857 8.0006 22.8696 8.10757 23.1276C8.21453 23.3856 8.39551 23.6062 8.62767 23.7614C8.85982 23.9167 9.13277 23.9998 9.41206 24.0001H16.0001C16.5305 24.0001 17.0392 24.2108 17.4143 24.5859C17.7893 24.9609 18.0001 25.4697 18.0001 26.0001V30.0001C18.0001 30.5305 18.2108 31.0392 18.5858 31.4143C18.9609 31.7894 19.4696 32.0001 20.0001 32.0001H28.0001Z" stroke="#ffd700" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 40H30" stroke="#ffd700" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    coinMultiplier: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M40 16H20C17.7909 16 16 17.7909 16 20V40C16 42.2091 17.7909 44 20 44H40C42.2091 44 44 42.2091 44 40V20C44 17.7909 42.2091 16 40 16Z" stroke="#ffd700" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 32C5.8 32 4 30.2 4 28V8C4 5.8 5.8 4 8 4H28C30.2 4 32 5.8 32 8" stroke="#ffd700" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    powerTap: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28 8.19995L24 12" stroke="#ffd700" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.1999 15.9999L4.3999 14.3999" stroke="#ffd700" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 24L8.19995 28" stroke="#ffd700" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M14.3999 4.3999L15.9999 10.1999" stroke="#ffd700" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.0741 19.3801C17.9965 19.1974 17.9753 18.9957 18.0132 18.8008C18.051 18.606 18.1463 18.4269 18.2866 18.2866C18.4269 18.1463 18.606 18.051 18.8008 18.0132C18.9957 17.9753 19.1974 17.9965 19.3801 18.0741L41.3801 27.0741C41.5759 27.1544 41.7411 27.2948 41.8521 27.475C41.963 27.6552 42.0139 27.866 41.9975 28.077C41.981 28.288 41.8981 28.4883 41.7605 28.6492C41.623 28.81 41.4379 28.9231 41.2321 28.9721L32.5341 31.0541C32.175 31.1398 31.8467 31.3233 31.5854 31.5842C31.3242 31.845 31.1403 32.1731 31.0541 32.5321L28.9741 41.2321C28.9256 41.4386 28.8127 41.6245 28.6516 41.7626C28.4905 41.9008 28.2897 41.9841 28.0782 42.0006C27.8666 42.0171 27.6553 41.9658 27.4748 41.8543C27.2943 41.7427 27.1539 41.5766 27.0741 41.3801L18.0741 19.3801Z" stroke="#ffd700" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    goldenTouch: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M36 28L44 36L36 44" stroke="#ffd700" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M36 4L44 12L36 20" stroke="#ffd700" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 35.9999H7.946C9.23898 36.0088 10.5148 35.7041 11.6643 35.1119C12.8137 34.5198 13.8025 33.6578 14.546 32.5999L25.454 15.3999C26.1975 14.342 27.1862 13.4801 28.3357 12.888C29.4852 12.2958 30.761 11.9911 32.054 11.9999H44" stroke="#ffd700" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 11.9999H7.944C9.43492 11.9896 10.8991 12.396 12.1713 13.1735C13.4435 13.951 14.4731 15.0685 15.144 16.3999" stroke="#ffd700" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M44.0001 36H31.9181C30.6072 35.9866 29.3197 35.6513 28.1689 35.0236C27.018 34.3958 26.039 33.4949 25.3181 32.4L24.6001 31.5" stroke="#ffd700" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    coinStream: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 36H8C6.93913 36 5.92172 35.5786 5.17157 34.8284C4.42143 34.0783 4 33.0609 4 32V16C4 14.9391 4.42143 13.9217 5.17157 13.1716C5.92172 12.4214 6.93913 12 8 12H40C41.0609 12 42.0783 12.4214 42.8284 13.1716C43.5786 13.9217 44 14.9391 44 16V26" stroke="#ffd700" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M36 24H36.02" stroke="#ffd700" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M38 44V32" stroke="#ffd700" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M44 38L38 32L32 38" stroke="#ffd700" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 24H12.02" stroke="#ffd700" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 28C26.2091 28 28 26.2091 28 24C28 21.7909 26.2091 20 24 20C21.7909 20 20 21.7909 20 24C20 26.2091 21.7909 28 24 28Z" stroke="#ffd700" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    miningDrone: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.0999 16.8999L41.3759 21.0739C41.5705 21.1532 41.7351 21.2917 41.8465 21.4699C41.9579 21.648 42.0103 21.8567 41.9964 22.0664C41.9825 22.276 41.9028 22.4759 41.7688 22.6378C41.6348 22.7996 41.4533 22.9151 41.2499 22.9679L29.0019 26.1279C28.3099 26.3058 27.6781 26.6658 27.1724 27.1706C26.6666 27.6753 26.3053 28.3063 26.1259 28.9979L22.9679 41.2499C22.9151 41.4533 22.7996 41.6348 22.6378 41.7688C22.4759 41.9028 22.276 41.9825 22.0664 41.9964C21.8567 42.0103 21.648 41.9579 21.4699 41.8465C21.2917 41.7351 21.1532 41.5705 21.0739 41.3759L16.8999 31.1019" stroke="#ffd700" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M44 4L4 44" stroke="#ffd700" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.632 23.056L8.07404 9.37604C7.99511 9.19388 7.97277 8.99218 8.00992 8.79716C8.04708 8.60213 8.14201 8.42278 8.2824 8.2824C8.42278 8.14201 8.60213 8.04708 8.79716 8.00992C8.99218 7.97277 9.19388 7.99511 9.37604 8.07404L23.056 13.632" stroke="#ffd700" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  };

  const DOLLAR_ICON = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 15C9.644 15.86 10.843 16.35 12 16.391C13.536 16.446 15 15.711 15 14C15 11 9.5 12.5 9.5 9.5C9.5 7.87 10.68 7.273 12 7.309C13.109 7.339 14.315 7.815 15 8.5M12 7.309V5.5M12 16.391V18.5" stroke="white" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  function renderUpgrades(upgrades) {
    upgradesList.innerHTML = '';
    upgrades.forEach((upg, i) => {
      const card = document.createElement('div');
      card.className = 'upgrade-card' + (i === 0 ? ' featured' : '');
      const icon = UPGRADE_ICONS[upg.id] || '';
      const owned = userData && userData.ownedUpgrades[upg.id] > 0;
      card.innerHTML = `
        <div class="upgrade-icon">${icon}</div>
        <div class="upgrade-body">
          <span class="upgrade-title">${upg.title}</span>
          <span class="upgrade-desc">${upg.description}</span>
          <div class="upgrade-price-row">
            ${DOLLAR_ICON}
            <span class="upgrade-price">${formatCoins(upg.price)}</span>
          </div>
        </div>
        <div class="upgrade-right">
          <button class="btn-buy" data-id="${upg.id}" ${owned ? 'disabled' : ''}>${owned ? 'Owned' : 'Buy'}</button>
          <p class="upgrade-error" id="err-${upg.id}"></p>
        </div>
      `;
      upgradesList.appendChild(card);
    });

    upgradesList.querySelectorAll('.btn-buy').forEach(btn => {
      if (!btn.disabled) btn.addEventListener('click', () => handleBuy(btn.dataset.id));
    });
  }

  async function handleBuy(upgradeId) {
    const errEl = document.getElementById(`err-${upgradeId}`);
    errEl.textContent = '';
    const res = await api.buy(upgradeId);
    if (!res) return;
    const data = await res.json();
    if (res.ok) {
      userData.coins = data.coins;
      userData.coinsPerClick = data.coinsPerClick;
      userData.passiveIncomePerSec = data.passiveIncomePerSec;
      userData.ownedUpgrades[upgradeId] = 1;
      updateUI();
      // Заблокувати кнопку без перерендеру всього списку
      const btn = upgradesList.querySelector(`[data-id="${upgradeId}"]`);
      if (btn) { btn.disabled = true; btn.textContent = 'Owned'; }
    } else {
      errEl.textContent = data.error === 'Not enough coins' ? 'Not enough coins' : data.error;
    }
  }

  // Click handler
  clickBtn.addEventListener('click', async () => {
    const res = await api.click();
    if (!res) return;
    const data = await res.json();
    if (res.ok) {
      userData.coins = data.coins;
      updateUI();

      // Visual feedback
      clickBtn.classList.add('clicked');
      setTimeout(() => clickBtn.classList.remove('clicked'), 100);
    }
  });

  // Passive income UI update every second
  setInterval(() => {
    if (userData && userData.passiveIncomePerSec > 0) {
      userData.coins += userData.passiveIncomePerSec;
      updateUI();
    }
  }, 1000);

  await loadMe();
  await loadUpgrades();
});