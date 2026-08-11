/* ====================================================================
   MÓDULO DE INTERATIVIDADE, SALVAMENTO E FEEDBACK DE REFLEXÕES
   ==================================================================== */

var EADReflections = (function () {
  var REFLECTIONS_KEY = 'user_reflections';
  var debounceTimers = {};

  function init() {
    var savedReflections = EADPersistence.get(REFLECTIONS_KEY, {});

    document.querySelectorAll('.reflection-box').forEach(function (box, index) {
      var textarea = box.querySelector('.reflection-textarea');
      if (!textarea) return;

      var refId = textarea.dataset.reflectionId || 'ref-item-' + (index + 1);
      textarea.dataset.reflectionId = refId;

      var submitBtn = box.querySelector('.reflection-submit-btn');
      var instructorReply = box.querySelector('.reflection-instructor-reply');

      // Restaurar resposta salva previamente
      if (savedReflections[refId]) {
        textarea.value = savedReflections[refId];
        updateBadge(box, '💾 Salvo');
      }

      // Restaurar estado de resposta enviada (se o aluno já tiver enviado)
      if (savedReflections[refId + '_submitted']) {
        if (instructorReply) {
          instructorReply.style.display = 'block';
          instructorReply.classList.add('animate-appear');
        }
        if (submitBtn) {
          submitBtn.textContent = '✓ Resposta Enviada (Atualizar)';
          submitBtn.classList.add('submitted');
        }
      }

      // Escutar alterações de texto no textarea
      textarea.addEventListener('input', function () {
        updateBadge(box, '✍️ Digitando...');

        clearTimeout(debounceTimers[refId]);
        debounceTimers[refId] = setTimeout(function () {
          saveReflection(refId, textarea.value, false);
          updateBadge(box, '💾 Salvo automaticamente');
        }, 500);
      });

      // Clique no botão Enviar
      if (submitBtn) {
        submitBtn.addEventListener('click', function () {
          if (!textarea.value.trim()) {
            alert('Por favor, escreva uma resposta antes de enviar.');
            textarea.focus();
            return;
          }

          saveReflection(refId, textarea.value, true);
          updateBadge(box, '✅ Resposta Registrada');

          if (instructorReply) {
            instructorReply.classList.remove('animate-appear');
            void instructorReply.offsetWidth; // Força reflow para reiniciar animação
            instructorReply.classList.add('animate-appear');
            instructorReply.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }

          submitBtn.textContent = '✓ Resposta Enviada (Atualizar)';
          submitBtn.classList.add('submitted');
        });
      }
    });
  }

  function saveReflection(refId, text, isSubmitted) {
    var savedReflections = EADPersistence.get(REFLECTIONS_KEY, {});
    savedReflections[refId] = text;
    if (isSubmitted) {
      savedReflections[refId + '_submitted'] = true;
    }
    EADPersistence.set(REFLECTIONS_KEY, savedReflections);
  }

  function updateBadge(box, message) {
    var badge = box.querySelector('.reflection-saved-badge');
    if (badge) {
      badge.textContent = message;
    }
  }

  function getAllReflections() {
    return EADPersistence.get(REFLECTIONS_KEY, {});
  }

  return {
    init: init,
    getAllReflections: getAllReflections
  };
})();
