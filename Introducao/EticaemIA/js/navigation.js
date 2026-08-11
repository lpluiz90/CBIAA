/* ====================================================================
   INFRAESTRUTURA DE NAVEGAÇÃO, BREADCRUMB E PROGRESSO DINÂMICO (SPA)
   ==================================================================== */

var CourseNavigation = (function () {
  var ACTIVE_PAGE_KEY = 'active_page';
  var SCROLL_POS_KEY = 'scroll_pos';

  var tabs = [];
  var sbPanels = [];
  var heroDyns = [];
  var pagePanels = [];
  var progressBar = null;
  var backToTopBtn = null;
  var scrollTimer = null;

  function init() {
    tabs = document.querySelectorAll('.aulas-tabs .aula-tab');
    sbPanels = document.querySelectorAll('.sb-panel');
    heroDyns = document.querySelectorAll('.hero-dyn');
    pagePanels = document.querySelectorAll('.page-panel');
    progressBar = document.getElementById('progress-bar');
    backToTopBtn = document.getElementById('back-to-top');

    bindEvents();
    bindReferences();
    initSidebarToggle();

    // Restaurar página ativa salva
    var savedPage = EADPersistence.get(ACTIVE_PAGE_KEY, 0);
    activate(savedPage, false);

    // Restaurar posição de rolagem salva
    var savedScroll = EADPersistence.get(SCROLL_POS_KEY, 0);
    if (savedScroll > 0) {
      setTimeout(function () {
        window.scrollTo({ top: savedScroll, behavior: 'smooth' });
      }, 100);
    }
  }

  function activate(idx, resetScroll) {
    if (idx < 0 || idx >= pagePanels.length) idx = 0;
    if (typeof resetScroll === 'undefined') resetScroll = true;

    tabs.forEach(function (t, i) {
      t.classList.toggle('active', i === idx);
    });

    sbPanels.forEach(function (p, i) {
      p.classList.toggle('active', i === idx);
    });

    heroDyns.forEach(function (h) {
      h.classList.toggle('active', h.id === 'hero-dyn-' + idx);
    });

    pagePanels.forEach(function (c, i) {
      c.classList.toggle('active', i === idx);
    });

    if (resetScroll) {
      window.scrollTo(0, 0);
      EADPersistence.set(SCROLL_POS_KEY, 0);
    }

    EADPersistence.set(ACTIVE_PAGE_KEY, idx);
    updateBreadcrumb(idx);
    updateProgressBar();
  }

  function updateBreadcrumb(idx) {
    var bcLine2 = document.querySelector('.bc-line-2');
    if (!bcLine2) return;

    var titles = [
      'Página Inicial — Apresentação do Minicurso',
      'Aula 01 — Fundamentos de Ética em IA',
      'Aula 02 — Externalidades Negativas da IA',
      'Aula 03 — Conformidade Legal e Regulação da IA',
      '📚 Bibliografia Consolidada do Minicurso'
    ];

    bcLine2.textContent = titles[idx] || titles[0];
  }

  function updateProgressBar() {
    if (!progressBar) return;
    var totalHeight = document.body.scrollHeight - window.innerHeight;
    var pct = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    progressBar.style.width = (isNaN(pct) ? 0 : Math.min(100, Math.max(0, pct))) + '%';
  }

  function bindEvents() {
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () {
        activate(i, true);
      });
    });

    window.addEventListener('scroll', function () {
      updateProgressBar();

      if (backToTopBtn) {
        backToTopBtn.classList.toggle('visible', window.scrollY > 300);
      }

      updateScrollspy();

      // Debounce para persistir a posição de rolagem
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function () {
        EADPersistence.set(SCROLL_POS_KEY, window.scrollY);
      }, 300);
    }, { passive: true });

    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    document.querySelectorAll('.sb-panel a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var targetId = link.getAttribute('href').slice(1);
        var activePage = document.querySelector('.page-panel.active');
        if (!activePage) return;

        var target = activePage.querySelector('#' + targetId) || document.getElementById(targetId);
        if (target) {
          var offset = target.getBoundingClientRect().top + window.scrollY - 20;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
      });
    });
  }

  function updateScrollspy() {
    var activePage = document.querySelector('.page-panel.active');
    if (!activePage) return;

    var sections = activePage.querySelectorAll('[id]');
    var activeSb = document.querySelector('.sb-panel.active');
    if (!activeSb) return;

    var links = activeSb.querySelectorAll('a');
    var currentId = '';

    sections.forEach(function (s) {
      if (window.scrollY >= s.offsetTop - 130) {
        currentId = s.id;
      }
    });

    links.forEach(function (a) {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + currentId) {
        a.classList.add('active');
      }
    });
  }

  function bindReferences() {
    document.querySelectorAll('.reference-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var content = btn.nextElementSibling;
        if (content && content.classList.contains('reference-content')) {
          var isExpanded = content.classList.toggle('show');
          var textSpan = btn.querySelector('.ref-text');
          if (textSpan) {
            textSpan.textContent = isExpanded ? 'Ocultar referência ▲' : 'Mostrar referência ▼';
          }
        }
      });
    });
  }

  function initSidebarToggle() {
    var toggleBtn = document.getElementById('sidebar-toggle');
    if (!toggleBtn) return;

    var SIDEBAR_COLLAPSED_KEY = 'sidebar_collapsed';

    function updateBtnState(isCollapsed) {
      var icon = toggleBtn.querySelector('.sb-toggle-icon');
      var text = toggleBtn.querySelector('.sb-toggle-text');
      if (isCollapsed) {
        if (icon) icon.textContent = '▶';
        if (text) text.textContent = 'Expandir Menu';
        toggleBtn.title = 'Expandir Menu Lateral';
      } else {
        if (icon) icon.textContent = '◀';
        if (text) text.textContent = 'Recolher Menu';
        toggleBtn.title = 'Recolher Menu Lateral';
      }
    }

    var isSavedCollapsed = EADPersistence.get(SIDEBAR_COLLAPSED_KEY, false);
    if (isSavedCollapsed) {
      document.body.classList.add('sidebar-collapsed');
      updateBtnState(true);
    }

    toggleBtn.addEventListener('click', function () {
      var isCollapsed = document.body.classList.toggle('sidebar-collapsed');
      updateBtnState(isCollapsed);
      EADPersistence.set(SIDEBAR_COLLAPSED_KEY, isCollapsed);
    });
  }

  function navigateToSection(pageIdx, targetId) {
    activate(pageIdx, false);
    setTimeout(function () {
      var activePage = document.querySelector('.page-panel.active');
      if (!activePage) return;
      var target = activePage.querySelector('#' + targetId) || document.getElementById(targetId);
      if (target) {
        var offset = target.getBoundingClientRect().top + window.scrollY - 20;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    }, 60);
  }

  return {
    init: init,
    activate: activate,
    navigateToSection: navigateToSection
  };
})();

