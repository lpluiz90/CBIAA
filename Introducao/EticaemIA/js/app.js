/* ====================================================================
   BOOTSTRAP DA APLICAÇÃO (IIFE DE INICIALIZAÇÃO DOS MÓDULOS)
   ==================================================================== */

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    // 1. Inicializar Tema (Modo Escuro / Modo Claro)
    if (typeof EADTheme !== 'undefined' && EADTheme.init) {
      try { EADTheme.init(); } catch (e) { console.error('Erro em EADTheme.init:', e); }
    }

    // 2. Inicializar Navegação SPA, Scrollspy e Progresso
    if (typeof CourseNavigation !== 'undefined' && CourseNavigation.init) {
      try { CourseNavigation.init(); } catch (e) { console.error('Erro em CourseNavigation.init:', e); }
    }

    // 3. Inicializar Pausas para Reflexão (Auto-save)
    if (typeof EADReflections !== 'undefined' && EADReflections.init) {
      try { EADReflections.init(); } catch (e) { console.error('Erro em EADReflections.init:', e); }
    }

    // 4. Inicializar Questionários Formativos (Auto-correct)
    if (typeof EADQuizzes !== 'undefined' && EADQuizzes.init) {
      try { EADQuizzes.init(); } catch (e) { console.error('Erro em EADQuizzes.init:', e); }
    }

    // 5. Inicializar Exportação em PDF / Consolidação
    if (typeof EADPDF !== 'undefined' && EADPDF.init) {
      try { EADPDF.init(); } catch (e) { console.error('Erro em EADPDF.init:', e); }
    }
  });
})();

/* ====================================================================
   CENTRAL DE GERENCIAMENTO DO PROGRESSO DO CURSO
   ==================================================================== */
var EADCourseManager = (function () {
  function openResetModal() {
    var modal = document.getElementById('modal-reset-progress');
    if (modal) {
      modal.style.display = 'flex';
    }
  }

  function closeResetModal() {
    var modal = document.getElementById('modal-reset-progress');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  function confirmResetProgress() {
    closeResetModal();

    // 1. Apagar dados do curso salvos no localStorage
    EADPersistence.clearCourseData();

    // 2. Limpar caixas de texto das reflexões
    var reflectionTextareas = document.querySelectorAll('.reflection-textarea');
    reflectionTextareas.forEach(function (ta) {
      ta.value = '';
    });
    var reflectionFeedbacks = document.querySelectorAll('.reflection-feedback');
    reflectionFeedbacks.forEach(function (fb) {
      fb.style.display = 'none';
    });

    // 3. Resetar blocos de questionários para o estado inicial
    var quizOptions = document.querySelectorAll('.quiz-option');
    quizOptions.forEach(function (opt) {
      opt.classList.remove('selected');
    });
    var quizFeedbacks = document.querySelectorAll('.quiz-feedback');
    quizFeedbacks.forEach(function (fb) {
      fb.style.display = 'none';
    });
    var quizRetries = document.querySelectorAll('.quiz-retry');
    quizRetries.forEach(function (btn) {
      btn.style.display = 'none';
    });

    // 4. Retornar à página inicial no topo
    CourseNavigation.activate(0, true);
  }

  return {
    openResetModal: openResetModal,
    closeResetModal: closeResetModal,
    confirmResetProgress: confirmResetProgress
  };
})();
