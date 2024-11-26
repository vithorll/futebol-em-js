// seleciona os elementos
const jogador1 = document.getElementById('jogador1');
const jogador2 = document.getElementById('jogador2');
const bola = document.getElementById('bola');
const golEsquerdo = document.getElementById('golEsquerdo');
const golDireito = document.getElementById('golDireito');
const placarTime1 = document.getElementById('time1');
const placarTime2 = document.getElementById('time2');
const telaReinicio = document.getElementById('tela-reinicio');
const reiniciarButton = document.getElementById('reiniciar-button');

// define as posições dos objetos
let posicaoJogador1 = { x: 232, y: 300 };
let posicaoJogador2 = { x: 656, y: 300 };
let posicaoBola = { x: 452, y: 310 };
let velocidadeBola = { x: 4, y: 4 };
let placar = { time1: 0, time2: 0 };
let goalscore = new Audio('sons/goalfx.mp3');
let goalinter = new Audio('sons/goal-inter.mp3');
let goalgremio = new Audio('sons/goal-gremio.mp3');

// atualiza as posições dos objetos
function atualizarPosicoes() {
    jogador1.style.left = `${posicaoJogador1.x}px`;
    jogador1.style.top = `${posicaoJogador1.y}px`;

    jogador2.style.left = `${posicaoJogador2.x}px`;
    jogador2.style.top = `${posicaoJogador2.y}px`;

    bola.style.left = `${posicaoBola.x}px`;
    bola.style.top = `${posicaoBola.y}px`;
}

document.getElementById('iniciar-button').addEventListener('click', function() {
    document.getElementById('tela-inicial').style.display = 'none';
    iniciarJogo();
});

function iniciarJogo() {
    console.log("jogo iniciado!");
}

// detecta os gols
function detectarGol() {
    if (
        posicaoBola.x <= golEsquerdo.offsetWidth &&
        posicaoBola.y >= golEsquerdo.offsetTop &&
        posicaoBola.y <= golEsquerdo.offsetTop + golEsquerdo.offsetHeight
    ) {
        placar.time2++;
        goalinter.play();
        posicaoJogador1 = { x: 232, y: 300 };
        posicaoJogador2 = { x: 656, y: 300 };
        resetarBola();
    }

    if (
        posicaoBola.x + bola.offsetWidth >= golDireito.offsetLeft &&
        posicaoBola.y >= golDireito.offsetTop &&
        posicaoBola.y <= golDireito.offsetTop + golDireito.offsetHeight
    ) {
        placar.time1++;
        goalgremio.play();
        posicaoJogador1 = { x: 232, y: 300 };
        posicaoJogador2 = { x: 656, y: 300 };
        resetarBola();
    }

    placarTime1.textContent = placar.time1;
    placarTime2.textContent = placar.time2;

    verificarFimDeJogo();
}

// verifica se algum time fez gol
function verificarFimDeJogo() {
    if (placar.time1 === 5 || placar.time2 === 5) {
        exibirTelaDeReinicio();
    }
}

// reseta a bola para o centro
function resetarBola() {
    posicaoBola = { x: 452, y: 310 };
    velocidadeBola = { x: 4, y: 4 };
}

// atualiza a posição da bola
function atualizarBola() {
    posicaoBola.x += velocidadeBola.x;
    posicaoBola.y += velocidadeBola.y;

    // colisão (borda superior & inferior)
    if (posicaoBola.y <= 0 || posicaoBola.y >= 618) velocidadeBola.y *= -1;

    // colisão (borda esquerda & direita)
    if (posicaoBola.x <= 0 || posicaoBola.x >= 908) velocidadeBola.x *= -1;
    

    // colisão da bola com os jogadores
    if (
        posicaoBola.x < posicaoJogador1.x + 50 && // Lado direito do jogador
        posicaoBola.x + 20 > posicaoJogador1.x && // Lado esquerdo da bola
        posicaoBola.y < posicaoJogador1.y + 50 && // Base do jogador
        posicaoBola.y + 20 > posicaoJogador1.y    // Topo da bola
    ) {
        velocidadeBola.x *= -1; // Inverte a direção horizontal da bola
    
        // Reposiciona a bola fora do jogador para evitar sobreposição
        posicaoBola.x = posicaoBola.x < posicaoJogador1.x
            ? posicaoJogador1.x - 20 // Bola à esquerda do jogador
            : posicaoJogador1.x + 50; // Bola à direita do jogador
    }

    if (
        posicaoBola.x < posicaoJogador2.x + 50 && // Lado direito do jogador
        posicaoBola.x + 20 > posicaoJogador2.x && // Lado esquerdo da bola
        posicaoBola.y < posicaoJogador2.y + 50 && // Base do jogador
        posicaoBola.y + 20 > posicaoJogador2.y    // Topo da bola
    ) {
        velocidadeBola.x *= -1; // Inverte a direção horizontal da bola
    
        // Reposiciona a bola fora do jogador para evitar sobreposição
        posicaoBola.x = posicaoBola.x < posicaoJogador2.x
            ? posicaoJogador2.x - 20 // Bola à esquerda do jogador
            : posicaoJogador2.x + 50; // Bola à direita do jogador
    }

    detectarGol();
}

// variáveis de controles
let movimentoJogador1 = { up: false, down: false, left: false, right: false };
let movimentoJogador2 = { up: false, down: false, left: false, right: false };

// função de movimentação do jogador
function moverJogadores() {
    const velocidadeJogador = 5;

    if (movimentoJogador1.up && posicaoJogador1.y > 0) posicaoJogador1.y -= velocidadeJogador;
    if (movimentoJogador1.down && posicaoJogador1.y < 600) posicaoJogador1.y += velocidadeJogador;
    if (movimentoJogador1.left && posicaoJogador1.x > 0) posicaoJogador1.x -= velocidadeJogador;
    if (movimentoJogador1.right && posicaoJogador1.x < 890) posicaoJogador1.x += velocidadeJogador;

    if (movimentoJogador2.up && posicaoJogador2.y > 0) posicaoJogador2.y -= velocidadeJogador;
    if (movimentoJogador2.down && posicaoJogador2.y < 600) posicaoJogador2.y += velocidadeJogador;
    if (movimentoJogador2.left && posicaoJogador2.x > 0) posicaoJogador2.x -= velocidadeJogador;
    if (movimentoJogador2.right && posicaoJogador2.x < 890) posicaoJogador2.x += velocidadeJogador;
}

// adiciona controle dos botões
document.getElementById('up1').addEventListener('mousedown', () => movimentoJogador2.up = true);
document.getElementById('down1').addEventListener('mousedown', () => movimentoJogador2.down = true);
document.getElementById('left1').addEventListener('mousedown', () => movimentoJogador2.left = true);
document.getElementById('right1').addEventListener('mousedown', () => movimentoJogador2.right = true);

document.getElementById('up2').addEventListener('mousedown', () => movimentoJogador1.up = true);
document.getElementById('down2').addEventListener('mousedown', () => movimentoJogador1.down = true);
document.getElementById('left2').addEventListener('mousedown', () => movimentoJogador1.left = true);
document.getElementById('right2').addEventListener('mousedown', () => movimentoJogador1.right = true);

// verifica quando o botão é solto
document.getElementById('up1').addEventListener('mouseup', () => movimentoJogador2.up = false);
document.getElementById('down1').addEventListener('mouseup', () => movimentoJogador2.down = false);
document.getElementById('left1').addEventListener('mouseup', () => movimentoJogador2.left = false);
document.getElementById('right1').addEventListener('mouseup', () => movimentoJogador2.right = false);

document.getElementById('up2').addEventListener('mouseup', () => movimentoJogador1.up = false);
document.getElementById('down2').addEventListener('mouseup', () => movimentoJogador1.down = false);
document.getElementById('left2').addEventListener('mouseup', () => movimentoJogador1.left = false);
document.getElementById('right2').addEventListener('mouseup', () => movimentoJogador1.right = false);

// verifica os eventos do teclado
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') movimentoJogador2.up = true;
    if (event.key === 'ArrowDown') movimentoJogador2.down = true;
    if (event.key === 'ArrowLeft') movimentoJogador2.left = true;
    if (event.key === 'ArrowRight') movimentoJogador2.right = true;

    if (event.key === 'w') movimentoJogador1.up = true;
    if (event.key === 's') movimentoJogador1.down = true;
    if (event.key === 'a') movimentoJogador1.left = true;
    if (event.key === 'd') movimentoJogador1.right = true;
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowUp') movimentoJogador2.up = false;
    if (event.key === 'ArrowDown') movimentoJogador2.down = false;
    if (event.key === 'ArrowLeft') movimentoJogador2.left = false;
    if (event.key === 'ArrowRight') movimentoJogador2.right = false;

    if (event.key === 'w') movimentoJogador1.up = false;
    if (event.key === 's') movimentoJogador1.down = false;
    if (event.key === 'a') movimentoJogador1.left = false;
    if (event.key === 'd') movimentoJogador1.right = false;
});

// tela de reinicio
function exibirTelaDeReinicio() {
    telaReinicio.style.display = 'flex';
}

reiniciarButton.addEventListener('click', function() {
    placar.time1 = 0;
    placar.time2 = 0;
    placarTime1.textContent = placar.time1;
    placarTime2.textContent = placar.time2;
    resetarBola();
    telaReinicio.style.display = 'none';
});

// looping do jogo
function loopJogo() {
    moverJogadores();
    atualizarBola();
    atualizarPosicoes();
    requestAnimationFrame(loopJogo);
}

// inicialização do jogo
loopJogo();
