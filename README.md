# 🚀 Alfabetização com Letras (Projeto Web 2)

Bem-vindo ao "Alfabetização com Letras"! Este é um jogo educativo interativo com a temática "Aventura Espacial", focado no auxílio à alfabetização infantil.

O projeto foi desenvolvido como requisito acadêmico, demonstrando os conceitos de **Programação para Internet II** através da criação de uma aplicação web dinâmica e centrada no usuário, utilizando apenas HTML, CSS e JavaScript puro (Vanilla JS).

---

## 👾 Como Funciona (A Interatividade)

Diferente de uma página estática (Web 1.0), este jogo gera seu conteúdo dinamicamente, respondendo às ações do usuário em tempo real.

O *game loop* funciona da seguinte maneira:

1.  **Desafio Dinâmico:** O jogo apresenta uma imagem (GIF animado) de um objeto (ex: "SOL").
2.  **Sorteio de Letra (Aleatoriedade 1):** O sistema sorteia aleatoriamente *qual* letra da palavra ficará faltando (ex: "S_L" ou "SO_").
3.  **Sorteio de Opções (Aleatoriedade 2):** O sistema cria 4 opções de botões: a letra correta (ex: "O") e 3 letras "distratoras" (incorretas).
4.  **Embaralhamento (Aleatoriedade 3):** A *posição* desses 4 botões na tela é embaralhada a cada rodada. Isso força o usuário a identificar a letra correta, em vez de apenas memorizar a posição do botão.
5.  **Feedback Imediato:**
    * **Ao Errar:** O botão clicado fica "congelado" em vermelho, e o usuário pode tentar outra opção.
    * **Ao Acertar:** O jogo dá um feedback positivo e, após um breve intervalo, carrega o próximo desafio.
6.  **Finalização:** Após 10 desafios, o jogo exibe uma tela de "Parabéns!" e oferece a opção de reiniciar.

## 💻 Tecnologias Utilizadas

Este projeto foi construído do zero (sem frameworks ou bibliotecas externas de lógica) para demonstrar o domínio dos pilares da web:

* **HTML5:** Utilizado para a estrutura semântica dos elementos do jogo (nível, área da imagem, botões).
* **CSS3:** Responsável por toda a estilização, o tema "Aventura Espacial", as animações de feedback (erro/acerto) e o layout responsivo (usando Flexbox e Grid).
* **JavaScript (ES6+):** O motor do jogo. O JS é responsável por:
    * Manipulação do DOM (ex: carregar imagens, criar botões).
    * Gerenciamento de estado (ex: rastrear a fase atual).
    * Toda a lógica de aleatorização e verificação de respostas.
    * Gerenciamento de áudio (música de fundo).

## 🚀 Como Acessar

O jogo está publicado e pode ser acessado ao vivo através do GitHub Pages.

**🔗 Link para o Jogo:** `https://sostenes-maciel.github.io/alfabetiza-o-com-letras/html`
