(() => {
  const root = document.documentElement;
  const button = document.querySelector('.theme-toggle');
  function applyTheme(theme) {
    root.dataset.theme = theme;
    if (button) {
      button.textContent = theme === 'dark' ? 'Use light theme' : 'Use dark theme';
      button.setAttribute('aria-pressed', String(theme === 'dark'));
    }
    document.querySelectorAll('[data-color-token]').forEach(el => {
      const color = getComputedStyle(root).getPropertyValue('--' + el.dataset.colorToken).trim();
      el.querySelector('code').textContent = color.toUpperCase();
    });
  }
  let saved;
  try { saved = localStorage.getItem('dk-gate2-theme'); } catch {}
  applyTheme(saved === 'dark' ? 'dark' : 'light');
  button?.addEventListener('click', () => {
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(theme);
    try { localStorage.setItem('dk-gate2-theme', theme); } catch {}
  });
  document.querySelector('.copy-decision')?.addEventListener('click', async () => {
    const field = document.querySelector('#decision-text');
    const status = document.querySelector('.copy-status');
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(field.value);
      status.textContent = 'Copied. Paste your decision into our chat to approve this direction.';
    } catch {
      field.focus();
      field.select();
      status.textContent = 'Your decision is selected. Press Ctrl+C (or ⌘C), then paste it into our chat.';
    }
  });
})();
