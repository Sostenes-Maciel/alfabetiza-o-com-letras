/**
 * PROJETO DE JOGO WEB EDUCATIVO - ALFABETIZAÇÃO COM LETRAS
 *
 * Arquivo: game.js
 * Descrição: Contém a lógica principal do jogo.
 * Tecnologias: JavaScript (ES6) e DOM Manipulation.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Referências da Interface (Música e Tela Final)
  const telaFinal = document.getElementById("end_game_screen");
  const btnReiniciar = document.getElementById("restart_button");
  const musica = document.getElementById("musica_fundo");
  const botao = document.getElementById("botao_musica");

  if (telaFinal) telaFinal.style.display = "none";

  if (btnReiniciar) {
    btnReiniciar.addEventListener("click", () => {
      location.reload();
    });
  }

  if (musica) {
    musica.volume = 0.5;
    musica.play().catch((error) => {
      console.log("A reprodução automática foi bloqueada pelo navegador.");
    });
  }

  if (botao && musica) {
    botao.addEventListener("click", () => {
      if (musica.paused) {
        musica.play();
        botao.textContent = "🔇 Parar Música";
      } else {
        musica.pause();
        botao.textContent = "🎵 Tocar Música";
      }
    });
  }

  // Array dos desafios do jogo
  const desafios = [
    {
      id: 1,
      word: "SOL",
      imagePath: "../assets/imagens/sol.gif",
      distractors: ["W", "V", "T", "O"],
    },
    {
      id: 2,
      word: "RATO",
      imagePath: "../assets/imagens/rato.gif",
      distractors: ["U", "O", "A", "E"],
    },
    {
      id: 3,
      word: "BARCO",
      imagePath: "../assets/imagens/barco.gif",
      distractors: ["L", "G", "F", "C"],
    },
    {
      id: 4,
      word: "CARRO",
      imagePath: "../assets/imagens/carro.gif",
      distractors: ["S", "A", "O", "P"],
    },
    {
      id: 5,
      word: "TESOURO",
      imagePath: "../assets/imagens/tesouro.gif",
      distractors: ["O", "U", "H", "R"],
    },
    {
      id: 6,
      word: "ELEFANTE",
      imagePath: "../assets/imagens/elefante.gif",
      distractors: ["B", "F", "N", "M"],
    },
    {
      id: 7,
      word: "PROFESSOR",
      imagePath: "../assets/imagens/professor.gif",
      distractors: ["S", "R", "O", "T"],
    },
    {
      id: 8,
      word: "CAMALEÃO",
      imagePath: "../assets/imagens/camaleao.gif",
      distractors: ["N", "M", "Ã", "X"],
    },
    {
      id: 9,
      word: "CHOCOLATE",
      imagePath: "../assets/imagens/chocolate.gif",
      distractors: ["L", "U", "X", "H"],
    },
    {
      id: 10,
      word: "PROGRAMADOR",
      imagePath: "../assets/imagens/programador.gif",
      distractors: ["P", "F", "E", "C"],
    },
  ];

  // Referências aos Elementos do Jogo (DOM)
  const imageContainer = document.getElementById("imagem_container");
  const puzzleWordDisplay = document.getElementById("quebra_cabeça");
  const choicesGrid = document.getElementById("escolhas_botão");
  const levelDisplay = document.getElementById("level");
  const gameContainer = document.getElementById("game_container");

  // Variáveis de estado do jogo
  let currentChallengeIndex = 0;
  let currentChallenge = null;

  /**
   * Atualiza o número da Fase (Nível) na interface do usuário.
   */
  function atualizarNivel() {
    if (levelDisplay) {
      levelDisplay.textContent = currentChallengeIndex + 1;
    }
  }

/**
   * Carrega um desafio (imagem, palavra, opções) na tela com base no índice.
   * SORTEIA a letra faltante E randomiza as opções.
   * @param {number} index - O índice do desafio a ser carregado.
   */
  function carregarDesafio(index) {
    if (index >= desafios.length) {
      finalizarJogo();
      return;
    }

    currentChallenge = desafios[index];
    const palavraCompleta = currentChallenge.word;

    // --- INÍCIO DA NOVA LÓGICA DE SORTEIO ---

    // 1. Sorteia o índice da letra que vai faltar
    const missingIndex = Math.floor(Math.random() * palavraCompleta.length);
    const letraCorreta = palavraCompleta[missingIndex];

    // 2. Prepara as 3 letras distratoras
    let distratores = [...currentChallenge.distractors]; // Copia os distratores
    
    // Filtra distratores para garantir que não sejam a letra correta
    distratores = distratores.filter(l => l !== letraCorreta); 
    
    // Embaralha os distratores restantes
    distratores.sort(() => 0.5 - Math.random());

    // 3. Cria o array final de opções (A correta + 3 distratores)
    let optionsFinais = [letraCorreta, distratores[0], distratores[1], distratores[2]];

    // 4. Embaralha o array final de opções (o que você já fazia)
    optionsFinais.sort(() => 0.5 - Math.random());

    // --- FIM DA NOVA LÓGICA DE SORTEIO ---

    imageContainer.innerHTML = `<img src="${currentChallenge.imagePath}" alt="Imagem de um(a) ${palavraCompleta}">`;

    // Monta a palavra incompleta (usando o missingIndex sorteado)
    puzzleWordDisplay.innerHTML = "";
    const palavraDividida = palavraCompleta.split("");

    for (let idx = 0; idx < palavraDividida.length; idx++) {
      const letter = palavraDividida[idx];
      const span = document.createElement("span");

      if (idx === missingIndex) { // Usa o índice sorteado
        span.className = "missing-letter-slot";
        span.textContent = "_";
        span.dataset.letraCorreta = letter; // Armazena a letra correta sorteada
      } else {
        span.className = "letter-filled";
        span.textContent = letter;
      }
      puzzleWordDisplay.appendChild(span);
    }

    // Cria os botões (usando as optionsFinais embaralhadas)
    choicesGrid.innerHTML = "";
    for (let i = 0; i < optionsFinais.length; i++) {
      const option = optionsFinais[i];
      const button = document.createElement("button");
      button.className = "choice-btn";
      button.textContent = option;
      button.addEventListener("click", (e) => verificarResposta(option, e));
      choicesGrid.appendChild(button);
    }

    atualizarNivel();
  }
  /**
   * Verifica a resposta do usuário e aplica o feedback visual (certo/errado).
   * @param {string} letraEscolhida - A letra que o usuário clicou.
   * @param {Event} event - O objeto do evento de clique (para estilizar o botão).
   */
  function verificarResposta(letraEscolhida, event) {
    const alternativas = puzzleWordDisplay.querySelector(
      ".missing-letter-slot"
    );
    const letraCorreta = alternativas.dataset.letraCorreta;

    if (letraEscolhida === letraCorreta) {
      alternativas.textContent = letraEscolhida;
      alternativas.classList.add("correct");
      event.target.classList.add("certo");

      const botoes = choicesGrid.children;
      for (let i = 0; i < botoes.length; i++) {
        botoes[i].disabled = true;
      }

      setTimeout(() => {
        currentChallengeIndex++;
        carregarDesafio(currentChallengeIndex);
      }, 1500);
    } else {
      event.target.classList.add("error");
      event.target.disabled = true;
    }
  }

  /**
   * Esconde a tela de jogo e exibe a tela final de "Parabéns".
   */
  function finalizarJogo() {
    if (gameContainer) {
      gameContainer.style.display = "none";
    }
    if (telaFinal) {
      telaFinal.style.display = "flex";
    }
  }

  /**
   * Define o estado inicial da interface e carrega o primeiro desafio.
   */
  function initGame() {
    if (gameContainer) gameContainer.style.display = "flex"; // Garante que o jogo apareça
    if (telaFinal) telaFinal.style.display = "none"; // Garante que a tela final esteja oculta

    carregarDesafio(currentChallengeIndex);
  }

  // Ponto de entrada do script
  initGame();
  
}); 