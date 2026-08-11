/* ====================================================================
   MÓDULO DE GERENCIAMENTO DE TEMA (MODO CLARO / MODO ESCURO)
   ==================================================================== */

var EADTheme = (function () {
  var THEME_KEY = 'user_theme';

  function init() {
    var savedTheme = EADPersistence.get(THEME_KEY, 'light');
    applyTheme(savedTheme);

    var toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        var currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        EADPersistence.set(THEME_KEY, newTheme);
      });
    }
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      updateToggleIcon('🌙 Modo Escuro');
    } else {
      document.body.classList.remove('dark-theme');
      updateToggleIcon('☀️ Modo Claro');
    }
  }

  function updateToggleIcon(label) {
    var toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.textContent = label;
      toggleBtn.setAttribute('aria-label', label);
    }
  }

  return {
    init: init
  };
})();
