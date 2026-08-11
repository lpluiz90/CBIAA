/* ====================================================================
   MÓDULO DE EXPORTAÇÃO PDF E CONSOLIDAÇÃO DE REFLEXÕES
   ==================================================================== */

var EADPDF = (function () {

  function init() {
    var btnConsolidar = document.getElementById('btn-consolidar-reflexoes');
    if (btnConsolidar) {
      btnConsolidar.addEventListener('click', function () {
        consolidarReflexoes();
      });
    }

    var btnPrint = document.getElementById('print-btn');
    if (btnPrint) {
      btnPrint.addEventListener('click', function () {
        window.print();
      });
    }
  }

  function consolidarReflexoes() {
    var reflections = EADReflections.getAllReflections();
    var keys = Object.keys(reflections);

    if (keys.length === 0) {
      alert('Nenhuma reflexão foi registrada até o momento.');
      return;
    }

    var dataAtual = new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    var win = window.open('', '_blank');
    if (!win) {
      alert('Por favor, permita popups em seu navegador para gerar o documento.');
      return;
    }

    var html = '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"/>';
    html += '<title>Consolidação de Reflexões — Ética em IA</title>';
    html += '<style>';
    html += 'body { font-family: "Source Sans 3", Arial, sans-serif; color: #1a2535; margin: 30px; line-height: 1.6; }';
    html += '.header { border-bottom: 3px solid #192437; padding-bottom: 15px; margin-bottom: 25px; }';
    html += '.header h1 { font-family: "Rajdhani", Arial, sans-serif; font-size: 24px; color: #192437; margin: 0; text-transform: uppercase; }';
    html += '.header h2 { font-size: 16px; color: #4a9fc8; margin: 5px 0 0; }';
    html += '.meta { font-size: 13px; color: #5a6a7e; margin-top: 8px; }';
    html += '.item { background: #f8fafc; border-left: 4px solid #7b1fa2; border-radius: 4px; padding: 15px; margin-bottom: 18px; page-break-inside: avoid; }';
    html += '.item-title { font-family: "Rajdhani", Arial, sans-serif; font-size: 14px; font-weight: 700; color: #7b1fa2; text-transform: uppercase; margin-bottom: 6px; }';
    html += '.item-text { font-size: 15px; color: #1a2535; white-space: pre-wrap; }';
    html += '.footer { font-size: 11px; color: #5a6a7e; text-align: center; margin-top: 40px; border-top: 1px solid #dfe6eb; padding-top: 15px; }';
    html += '@media print { body { margin: 15mm; } }';
    html += '</style></head><body>';

    html += '<div class="header">';
    html += '<h1>Exército Brasileiro · Escola de Comunicações</h1>';
    html += '<h2>Minicurso de Ética em Inteligência Artificial — Relatório de Reflexões</h2>';
    html += '<div class="meta"><strong>Documento Consolidado em:</strong> ' + dataAtual + '</div>';
    html += '</div>';

    keys.forEach(function (k, idx) {
      var text = reflections[k];
      if (text && text.trim() !== '') {
        html += '<div class="item">';
        html += '<div class="item-title">Pausa para Reflexão #' + (idx + 1) + ' (' + k + ')</div>';
        html += '<div class="item-text">' + escapeHTML(text) + '</div>';
        html += '</div>';
      }
    });

    html += '<div class="footer">';
    html += 'Este documento constitui a consolidação de reflexões pedagógicas registradas pelo aluno.<br/>';
    html += 'EsCom EAD — Direitos Reservados © Exército Brasileiro';
    html += '</div>';

    html += '<script>window.onload = function() { window.print(); };</script>';
    html += '</body></html>';

    win.document.write(html);
    win.document.close();
  }

  function escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  return {
    init: init,
    consolidarReflexoes: consolidarReflexoes
  };
})();
