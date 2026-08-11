/* ====================================================================
   MÓDULO DE AVALIAÇÃO E CORREÇÃO AUTOMÁTICA DE QUESTIONÁRIOS
   ==================================================================== */

var EADQuizzes = (function () {
  var QUIZZES_KEY = 'user_quizzes';

  function init() {
    var savedQuizzes = EADPersistence.get(QUIZZES_KEY, {});

    document.querySelectorAll('.quiz-block').forEach(function (block, index) {
      var quizId = block.dataset.quizId || 'quiz-item-' + (index + 1);
      block.dataset.quizId = quizId;

      var correctOpt = block.dataset.correct || 'a';
      var opts = block.querySelectorAll('.quiz-option');
      var fbOk = block.querySelector('.quiz-feedback.acerto');
      var fbErr = block.querySelector('.quiz-feedback.erro');
      var fbGen = block.querySelector('.quiz-feedback:not(.acerto):not(.erro)');
      var retryBtn = block.querySelector('.quiz-retry');

      // Restaurar estado salvo previamente
      if (savedQuizzes[quizId]) {
        applyQuizState(block, opts, savedQuizzes[quizId].selected, correctOpt, fbOk, fbErr, fbGen, retryBtn);
      }

      // Adicionar listeners de clique nas opções
      opts.forEach(function (opt) {
        opt.addEventListener('click', function () {
          if (block.classList.contains('answered')) return;

          var selectedOpt = opt.dataset.opt;
          var isCorrect = selectedOpt === correctOpt;

          // Persistir estado
          savedQuizzes[quizId] = {
            selected: selectedOpt,
            correct: isCorrect
          };
          EADPersistence.set(QUIZZES_KEY, savedQuizzes);

          applyQuizState(block, opts, selectedOpt, correctOpt, fbOk, fbErr, fbGen, retryBtn);
          updateScoreDisplay();
        });
      });

      // Botão de refazer (Retry)
      if (retryBtn) {
        retryBtn.addEventListener('click', function () {
          block.classList.remove('answered');
          opts.forEach(function (o) {
            o.classList.remove('correct', 'wrong', 'disabled');
          });
          if (fbOk) fbOk.style.display = 'none';
          if (fbErr) fbErr.style.display = 'none';
          if (fbGen) fbGen.style.display = 'none';
          retryBtn.style.display = 'none';

          delete savedQuizzes[quizId];
          EADPersistence.set(QUIZZES_KEY, savedQuizzes);
          updateScoreDisplay();
        });
      }
    });

    updateScoreDisplay();
  }

  function applyQuizState(block, opts, selectedOpt, correctOpt, fbOk, fbErr, fbGen, retryBtn) {
    block.classList.add('answered');
    var isCorrect = selectedOpt === correctOpt;

    opts.forEach(function (o) {
      o.classList.add('disabled');
      if (o.dataset.opt === selectedOpt) {
        o.classList.add(isCorrect ? 'correct' : 'wrong');
      }
      if (!isCorrect && o.dataset.opt === correctOpt) {
        o.classList.add('correct');
      }
    });

    if (isCorrect) {
      if (fbOk) fbOk.style.display = 'flex';
      if (fbGen) fbGen.style.display = 'flex';
      if (retryBtn) retryBtn.style.display = 'inline-block';
    } else {
      if (fbErr) fbErr.style.display = 'flex';
      if (fbGen) fbGen.style.display = 'flex';
      if (retryBtn) retryBtn.style.display = 'inline-block';
    }
  }

  function updateScoreDisplay() {
    var savedQuizzes = EADPersistence.get(QUIZZES_KEY, {});
    var total = Object.keys(savedQuizzes).length;
    var correctCount = 0;

    Object.keys(savedQuizzes).forEach(function (k) {
      if (savedQuizzes[k].correct) correctCount++;
    });

    var pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    document.querySelectorAll('.quiz-score-badge').forEach(function (badge) {
      badge.textContent = 'Pontuação: ' + pct + '% (' + correctCount + '/' + total + ')';
    });
  }

  return {
    init: init
  };
})();
