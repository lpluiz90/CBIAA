# RELEASE NOTES — VERSÃO 1.0 (VERSÃO DEFINITIVA DE PRODUÇÃO)

**Minicurso: Ética em Inteligência Artificial**  
**Escola de Comunicações (EsCom) — Exército Brasileiro**  
**Data de Emissão**: 08 de Agosto de 2026

---

## 1. Identificação da Release

* **Nome do Projeto**: Minicurso de Ética em Inteligência Artificial
* **Versão**: 1.0 (Release Candidate & Production Final)
* **Data da Homologação**: 10 de Agosto de 2026
* **Status**: VERSÃO 1.0 HOMOLOGADA PARA PUBLICAÇÃO
* **Autor / Responsável Técnico**: 2º Sargento Matheus Henrique — Instrutor da EsCom
* **Instituição responsável**: Exército Brasileiro · Escola de Comunicações (EsCom)
* ** DOI: 10.5281/zenodo.21876231
* **Release Final**: Sim (Edição Definitiva Canônica)

---

## 2. Visão Geral

O **Minicurso de Ética em Inteligência Artificial** é um ambiente virtual de aprendizagem autônomo e interativo desenvolvido pela Escola de Comunicações (EsCom) com carga horária de 20 horas/aula (PLADIS).

* **Objetivo Geral**: Proporcionar aos alunos, militares e pesquisadores uma formação sólida e estruturada sobre os fundamentos éticos, os riscos sociotécnicos e o ordenamento jurídico regulatório aplicável ao emprego de sistemas de Inteligência Artificial, com ênfase em ambientes operacionais e de apoio à decisão.
* **Finalidade da Plataforma**: Servir como ambiente virtual interativo autossuficiente (EAD SPA), operacionalizável tanto em redes internas quanto via internet, integrando leitura pedagógica, reflexões individuais persistidas, exercícios formativos autocorretivos e bibliografia consultiva.
* **Público-Alvo**: Oficiais, Praças, servidores civis e integrantes das Forças Armadas e órgãos de segurança pública envolvidos na pesquisa, desenvolvimento, homologação, regulação ou emprego de tecnologias inteligentes.
* **Abordagem Pedagógica**: Tripartida e alinhada ao Plano de Disciplinas (PLADIS), articulando três pilares essenciais:
  1. *Alinhamento Ético* (Factual & Conceitual — Aula 01);
  2. *Robustez Sociotécnica* (Factual & Procedimental — Aula 02);
  3. *Conformidade Legal* (Conceitual & Governança — Aula 03).

---

## 3. Escopo da Release

A Release 1.0 contempla a entrega integral de todos os módulos pedagógicos e computacionais do projeto:

* **Módulo Home (Página Inicial)**: Apresentação institucional, catalogação, competências, Quadro 1 do PLADIS com links diretos aos objetivos didáticos e a Central de Gerenciamento do Progresso.
* **Módulo Aula 01 — Fundamentos de Ética em IA**: Cobertura de Ética, Moral vs. Direito, Relatório Belmont, 3 pilares da IA Confiável, 4 imperativos éticos e o Estudo de Caso Lavender (Gaza).
* **Módulo Aula 02 — Externalidades Negativas e Dilemas Éticos da IA**: Cobertura de opacidade algorítmica (caixas-pretas), viés e discriminação (COMPAS/Amazon), capitalismo de vigilância (cookies/Zuboff), Infocalipse, manipulação (dark patterns), desemprego tecnológico, viés de automação e o Estudo de Caso Zelensky (Deepfake).
* **Módulo Aula 03 — Regulação da IA e Aspectos Jurídicos**: Cobertura de Direitos Humanos, AI Act da UE, GDPR Art. 22, LGPD Art. 20, Marco Civil da Internet, Código Civil Art. 927, Resoluções CNJ 332/615, NIST AI RMF 1.0, ISO/IEC 42001:2023, diretrizes do Exército Brasileiro e o Estudo de Caso Parauapebas (Prompt Injection).
* **Módulo Referências**: Bibliografia consolidada com 48 entradas formatadas em ABNT NBR 6023 divididas em 5 categorias temáticas.
* **Navegação SPA & Layout**: Abas superiores (`.aulas-tabs`), menu lateral dinâmico (`#sidebar`), Header Hero dinâmico (`#hero-global`), barra de progresso por rolagem, breadcrumb dinâmico e alternador de modo claro/escuro.
* **Recursos Interativos**: 7 Pausas para Reflexão (auto-save em localStorage), 3 Questionários Formativos (30 questões autocorretivas) e Exportação em PDF do relatório de aprendizagem.
* **Central de Gerenciamento do Progresso**: Modal institucional para reinicialização segura dos dados locais do aluno.

---

## 4. Arquitetura

A aplicação foi construída sobre uma arquitetura Web autônoma, leve e sem dependências externas runtime:

```
Minicurso de Ética em IA/
├── index.html                    # Estrutura DOM SPA completa (5 abas)
├── RELEASE_NOTES.md              # Documentação oficial da Release 1.0
├── css/
│   ├── main.css                  # Tokens de cor, variáveis HSL e reset
│   ├── layout.css                # Grid responsivo, sidebar e wrappers
│   └── components.css            # Cards, botões, modais, quizzes e tabelas
├── js/
│   ├── persistence.js            # Wrapper com namespace e isolamento do localStorage
│   ├── theme.js                  # Controle do Dark/Light Mode
│   ├── navigation.js             # Roteador SPA, Scrollspy, Breadcrumbs e Progresso
│   ├── reflections.js            # Gerenciamento de auto-save das reflexões
│   ├── quizzes.js                # Lógica autocorretiva dos questionários
│   ├── pdf.js                    # Mecanismo de consolidação e exportação para impressão/PDF
│   └── app.js                    # Bootstrap da aplicação e Central de Gerenciamento
└── assets/
    └── images/                   # Acervo de ilustrações e figuras oficiais (Figuras 1 a 7)
```

* **HTML5 Semantic**: Marcação estruturada respeitando hierarquia `<h1>` a `<h6>`, com IDs únicos para suporte a testes e acessibilidade.
* **Vanilla CSS**: Sistema modular de estilos baseado em CSS Custom Properties (`--navy`, `--sky`, `--gold`, `--pink`, `--green`), permitindo troca instantânea de tema (Dark/Light).
* **Vanilla JavaScript (ES6/IIFE)**: Arquitetura modular sem frameworks (sem React, Vue ou Angular), garantindo carregamento instantâneo (< 50ms) e execução perfeita em navegadores corporativos e militares offline.
* **SPA (Single Page Application)**: Alternância dinâmica de visibilidade (`display: block / none`) entre os 5 painéis principais (`#page-home`, `#page-aula1`, `#page-aula2`, `#page-aula3`, `#page-referencias`), sem recarga de página.
* **LocalStorage Isolado**: Todos os dados persistidos utilizam obrigatoriamente o prefixo reservado `ead_etica_ia_`, evitando colisões com outros sistemas.

---

## 5. Design

O projeto segue rigorosamente o **Design Master** e a **Arquitetura de Conversão** estabelecida para os cursos virtuais do Exército Brasileiro:

* **Estética Premium Institucional**: Dark Mode padrão com gradientes profundos, transparências vítreas (*glassmorphism*), sombras flutuantes e bordas metálicas em tom de latão/ouro (`--gold`).
* **Tipografia Moderna**: Fontes `Rajdhani` (títulos e marcas institucionais) e `Open Sans` (corpo de texto e tabelas), garantindo alta legibilidade e ergonomia visual.
* **Componentização Consistente**: Emprego padronizado de `.card`, `.dark-card`, `.summary-box`, `.citation`, `.section-sep`, `.quiz-block` e `.reflection-box`.

---

## 6. Conteúdo Pedagógico

O acervo instrucional da Release 1.0 reflete 100% da fonte canônica (`Apostila minicurso ética em IA.docx`):

* **Aulas Didáticas**: 3 Aulas + Módulo Home + Módulo Referências.
* **Capítulos de Conteúdo**: 10 Capítulos Temáticos.
* **Objetivos do PLADIS**: 5 Objetivos de Aprendizagem alinhados.
* **Estudos de Caso Paradigmáticos**: 3 Casos Reais (Caso Lavender, Caso Zelensky e Caso Parauapebas).
* **Questionários Formativos**: 3 Questionários (10 questões por aula = 30 questões didáticas).
* **Pausas para Reflexão**: 7 Atividades Reflexivas dissertativas com salvamento automático.
* **Referências Bibliográficas**: 48 Obras e Diplomas Legais consolidados na norma ABNT NBR 6023.
* **Acervo Iconográfico**: 7 Figuras didáticas oficiais com legendas e notas bibliográficas.

---

## 7. Recursos Implementados

* **Navegação SPA com Histórico**: Troca de abas instantânea com ajuste automático de título no Header Hero.
* **Scrollspy e Leitura Guiada**: Detecção de rolagem com destaque dinâmico dos tópicos no menu lateral.
* **Barra de Progresso**: Indicador visual da evolução da leitura ao longo do documento.
* **Navegação por Âncoras Diretas**: Possibilidade de saltar da Home diretamente para o bloco de objetivos de cada aula.
* **Auto-Save de Reflexões**: Salvamento silencioso dos textos do aluno em tempo real no localStorage.
* **Questionários Auto-Corretivos**: Feedback imediato com justificativa pedagógica e opção de tentar novamente.
* **Exportador de Relatório PDF**: Geração consolidada contendo as reflexões e o aproveitamento do aluno para envio aos instrutores.
* **Central de Gerenciamento do Progresso**:
  * Funcionalidade "Reiniciar progresso do curso";
  * Modal institucional de confirmação prévia;
  * Limpeza segura e exclusiva dos dados com prefixo `ead_etica_ia_`;
  * Restauração da plataforma ao estado inicial de primeiro acesso.

---

## 8. Compatibilidade

* **Execução Local e Offline**: 100% funcional via protocolo `file:///` sem necessidade de servidor Node.js, Python ou Apache.
* **Caminhos Relativos**: Todos os recursos (CSS, JS, Imagens) utilizam referências relativas, permitindo execução a partir de qualquer diretório.
* **Distribuição Simplificada**: Suporte total à cópia e execução por pasta zipada (`.zip`) ou pen-drive.
* **Hospedagem Estática**: Totalmente compatível com GitHub Pages, GitLab Pages, AWS S3 estático e servidores de Intranet militar.

---

## 9. Homologação

A Release 1.0 foi submetida a um rigoroso ciclo de auditorias técnicas e editoriais:

1. **Auditoria de Conformidade Editorial**: Comparação linha por linha contra a Apostila Oficial.
2. **Auditoria de Não Conformidades (NC-01 a NC-06)**: Conversão integral da Aula 03, inclusão dos questionários, pausas para reflexão, epígrafes e estudos de caso.
3. **Auditoria de Integridade DOM**: Verificação automatizada via parser de árvore DOM confirmando **0 erros de marcação e 0 tags não fechadas**.
4. **Testes de Regressão de Navegação**: Validação de 100% dos links do sumário interativo e rotas SPA.

---

## 10. Limitações Conhecidas

* **Declaração de Ausência de Limitações Impeditivas**: Não foram identificadas limitações técnicas ou funcionais que impeçam o pleno uso pedagógico da versão 1.0 em ambiente de produção.

---

## 11. Evoluções Futuras

Para versões futuras (Release 2.0+), sugere-se a avaliação dos seguintes aprimoramentos opcionais:

1. Integrar suporte opcional a LMS via padrão SCORM 1.2 / xAPI (Tin Can).
2. Adicionar gerador automático de certificado de conclusão em PDF com validação por QR Code.
3. Implementar sintetizador de voz (Text-to-Speech) para acessibilidade auditiva dos capítulos.

---

## 12. Conclusão

Declara-se formalmente que a **Release 1.0** constitui a versão oficial, homologada e definitiva do **Minicurso de Ética em Inteligência Artificial**, pronta para disponibilização e uso pelos alunos, instrutores e integrantes da **Escola de Comunicações (EsCom)**.

---
*Brasília - DF, 08 de Agosto de 2026.*  
*Exército Brasileiro · Escola de Comunicações*
