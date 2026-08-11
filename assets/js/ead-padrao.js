/* ====================================================================
   PADRÃO DE INTERAÇÃO COMPARTILHADO — CBIAA / EsCom EAD
   --------------------------------------------------------------------
   Acrescenta aos Assuntos 01–04 os dois controles que só existiam no
   Assunto 05 (Ética em IA):

     • Recolher / expandir o menu lateral
     • Modo claro / modo escuro

   Não depende de nada da página e não toca na navegação existente
   (abas, quizzes, imprimir, voltar ao topo): só cria os dois botões,
   alterna duas classes no <body> e grava a escolha.

   Carregar imediatamente antes de </body>, junto com o CSS
   assets/css/ead-padrao.css.
   ==================================================================== */

(function () {
  'use strict';

  // A escolha do usuário vale para o curso inteiro: todas as páginas
  // estão na mesma origem (lpluiz90.github.io), então dividem o mesmo
  // localStorage.
  //
  // O nome da chave é o que o Assunto 05 já usa. Ele veio de outro
  // repositório e grava com prefixo próprio ('ead_etica_ia_'), e não
  // vamos mexer no código dele para manter a pasta re-sincronizável.
  // Adotar a chave dele aqui é o que faz a preferência valer nos DOIS
  // sentidos — trocar o tema em qualquer página vale para todas.
  // Chave própria nossa só funcionaria de um lado.
  var CHAVE_TEMA = 'ead_etica_ia_user_theme';
  var CHAVE_MENU = 'ead_etica_ia_sidebar_collapsed';

  function disponivel() {
    try {
      window.localStorage.setItem('cbiaa_test', '1');
      window.localStorage.removeItem('cbiaa_test');
      return true;
    } catch (e) {
      // Modo privativo, cookies bloqueados ou storage cheio: os botões
      // continuam funcionando, só não lembram da escolha.
      return false;
    }
  }

  function ler(chave, padrao) {
    if (!disponivel()) return padrao;
    try {
      var bruto = window.localStorage.getItem(chave);
      return bruto === null ? padrao : JSON.parse(bruto);
    } catch (e) {
      return padrao;
    }
  }

  function gravar(chave, valor) {
    if (!disponivel()) return;
    try {
      window.localStorage.setItem(chave, JSON.stringify(valor));
    } catch (e) {
      /* silencioso: não vale quebrar a página por causa de preferência */
    }
  }

  /* ------------------------------------------------------------------
     MODO CLARO / MODO ESCURO
     ------------------------------------------------------------------ */

  function criarBotaoTema() {
    // Se a página já tiver o botão (caso do Assunto 05), reaproveita.
    var existente = document.getElementById('theme-toggle');
    if (existente) return existente;

    var caixa = document.createElement('div');
    caixa.className = 'top-ctrl-wrap';

    var botao = document.createElement('button');
    botao.id = 'theme-toggle';
    botao.className = 'top-ctrl-btn';
    botao.type = 'button';

    caixa.appendChild(botao);
    document.body.appendChild(caixa);
    return botao;
  }

  function aplicarTema(tema, botao) {
    var escuro = tema === 'dark';
    document.body.classList.toggle('dark-theme', escuro);

    // O rótulo mostra o modo em que a página ESTÁ, igual à referência.
    var rotulo = escuro ? '🌙 Modo Escuro' : '☀️ Modo Claro';
    botao.textContent = rotulo;
    botao.setAttribute('aria-label', 'Alternar tema — ' + rotulo);
    botao.setAttribute('aria-pressed', escuro ? 'true' : 'false');
  }

  function iniciarTema() {
    var botao = criarBotaoTema();
    var tema = ler(CHAVE_TEMA, 'light');
    aplicarTema(tema, botao);

    botao.addEventListener('click', function () {
      var novo = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
      aplicarTema(novo, botao);
      gravar(CHAVE_TEMA, novo);
    });
  }

  /* ------------------------------------------------------------------
     RECOLHER / EXPANDIR O MENU LATERAL
     ------------------------------------------------------------------ */

  function criarBotaoMenu() {
    var existente = document.getElementById('sidebar-toggle');
    if (existente) return existente;

    var botao = document.createElement('button');
    botao.id = 'sidebar-toggle';
    botao.className = 'sidebar-toggle-fixed';
    botao.type = 'button';
    botao.innerHTML = '<span class="sb-toggle-icon">◀</span>' +
                      '<span class="sb-toggle-text">Recolher Menu</span>';

    document.body.appendChild(botao);
    return botao;
  }

  function aplicarMenu(recolhido, botao) {
    document.body.classList.toggle('sidebar-collapsed', recolhido);

    var icone = botao.querySelector('.sb-toggle-icon');
    var texto = botao.querySelector('.sb-toggle-text');
    if (icone) icone.textContent = recolhido ? '▶' : '◀';
    if (texto) texto.textContent = recolhido ? 'Expandir Menu' : 'Recolher Menu';

    botao.title = recolhido ? 'Expandir Menu Lateral' : 'Recolher Menu Lateral';
    botao.setAttribute('aria-label', botao.title);
    botao.setAttribute('aria-expanded', recolhido ? 'false' : 'true');
  }

  function iniciarMenu() {
    // Abaixo de 900px o CSS das páginas já esconde a barra lateral por
    // completo; o botão de recolher não teria o que recolher.
    if (!document.getElementById('sidebar')) return;

    var botao = criarBotaoMenu();
    aplicarMenu(ler(CHAVE_MENU, false), botao);

    botao.addEventListener('click', function () {
      var recolhido = !document.body.classList.contains('sidebar-collapsed');
      aplicarMenu(recolhido, botao);
      gravar(CHAVE_MENU, recolhido);
    });
  }

  function iniciar() {
    iniciarTema();
    iniciarMenu();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
