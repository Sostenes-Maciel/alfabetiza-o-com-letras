/**
 * PROJETO DE JOGO WEB EDUCATIVO - ALFABETIZAÇÃO COM LETRAS
 *
 * Arquivo: game.js
 * Descrição: Contém a lógica principal do jogo.
 * Tecnologias: JavaScript (ES6) e DOM Manipulation.
 */

document.addEventListener("DOMContentLoaded", () => {
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

  const imageContainer = document.getElementById("imagem_container");
  const puzzleWordDisplay = document.getElementById("quebra_cabeça");
  const choicesGrid = document.getElementById("escolhas_botão");
  const levelDisplay = document.getElementById("level");
  const gameContainer = document.getElementById("game_container");

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

    const missingIndex = Math.floor(Math.random() * palavraCompleta.length);
    const letraCorreta = palavraCompleta[missingIndex];

    let distratores = [...currentChallenge.distractors];
    distratores = distratores.filter((l) => l !== letraCorreta);
    distratores.sort(() => 0.5 - Math.random());

    let optionsFinais = [
      letraCorreta,
      distratores[0],
      distratores[1],
      distratores[2],
    ];

    optionsFinais.sort(() => 0.5 - Math.random());

    imageContainer.innerHTML = `<img src="${currentChallenge.imagePath}" alt="Imagem de um(a) ${palavraCompleta}">`;

    puzzleWordDisplay.innerHTML = "";
    const palavraDividida = palavraCompleta.split("");

    for (let idx = 0; idx < palavraDividida.length; idx++) {
      const letter = palavraDividida[idx];
      const span = document.createElement("span");

      if (idx === missingIndex) {
        span.className = "missing-letter-slot";
        span.textContent = "_";
        span.dataset.letraCorreta = letter;
      } else {
        span.className = "letter-filled";
        span.textContent = letter;
      }
      puzzleWordDisplay.appendChild(span);
    }

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
   * Força o navegador a baixar todas as imagens do jogo 
   * antecipadamente (preloading) para evitar delays durante o jogo.
   */
  function precarregarImagens() {
    console.log("Iniciando pré-carregamento dos GIFs...");
    
    for (let i = 0; i < desafios.length; i++) {
        
        const img = new Image(); 
        
        img.src = desafios[i].imagePath;
    }
    console.log("Pré-carregamento concluído.");
  }

  /**
   * Define o estado inicial da interface e carrega o primeiro desafio.
   */
  function initGame() {
    if (gameContainer) gameContainer.style.display = "flex";
    if (telaFinal) telaFinal.style.display = "none";

    carregarDesafio(currentChallengeIndex);
  }

  precarregarImagens();
  initGame();
  
});