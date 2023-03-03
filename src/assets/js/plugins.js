'use strict';
(function loadTheme() {
  const { theme } = window;
  if (!theme) {
    return;
  }
  window.addEventListener('load', () => {
    theme.init();
  });
  setTimeout(() => {
    theme.init();
  });
})();
