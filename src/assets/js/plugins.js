'use strict';
function initTheme() {
  const { theme } = window;
  if (!theme) {
    return;
  }
  setTimeout(() => {
    theme.init();
  });
}

(function onLoad() {
  window.addEventListener('load', () => {
    initTheme();
  });
  if (document.readyState === 'complete') {
    initTheme();
  }
})();
