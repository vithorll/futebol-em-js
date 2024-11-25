// Seleciona os elementos do DOM
const jogador1 = document.getElementById('jogador1');
const jogador2 = document.getElementById('jogador2');
const bola = document.getElementById('bola');
const golEsquerdo = document.getElementById('golEsquerdo');
const golDireito = document.getElementById('golDireito');
const placarTime1 = document.getElementById('time1');
const placarTime2 = document.getElementById('time2');

// Inicializa posições
let posicaoJogador1 = { x: 100, y: 175 };
let posicaoJogador2 = { x: 650, y: 175 };
let posicaoBola = { x: 390, y: 190 };
let velocidadeBola = { x: 3, y: 3 };
let placar = { time1: 0, time2: 0 };

// Atualiza as posições no DOM
function atualizarPosicoes() {
    jogador1.style.left = `${posicaoJogador1.x}px`;
    jogador1.style.top = `${posicaoJogador1.y}px`;

    jogador2.style.left = `${posicaoJogador2.x}px`;
    jogador2.style.top = `${posicaoJogador2.y}px`;

    bola.style.left = `${posicaoBola.x}px`;
    bola.style.top = `${posicaoBola.y}px`;
}

// Detecta gols
function detectarGol() {
    if (
        posicaoBola.x <= golEsquerdo.offsetWidth &&
        posicaoBola.y >= golEsquerdo.offsetTop &&
        posicaoBola.y <= golEsquerdo.offsetTop + golEsquerdo.offsetHeight
    ) {
        placar.time2++;
        resetarBola();
    }

    if (
        posicaoBola.x + bola.offsetWidth >= golDireito.offsetLeft &&
        posicaoBola.y >= golDireito.offsetTop &&
        posicaoBola.y <= golDireito.offsetTop + golDireito.offsetHeight
    ) {
        placar.time1++;
        resetarBola();
    }

    placarTime1.textContent = placar.time1;
    placarTime2.textContent = placar.time2;
}

// Reseta a bola para o centro
function resetarBola() {
    posicaoBola = { x: 390, y: 190 };
    velocidadeBola = { x: 3, y: 3 };
}

// Atualiza a posição da bola
function atualizarBola() {
    posicaoBola.x += velocidadeBola.x;
    posicaoBola.y += velocidadeBola.y;

    // Colisões com as bordas superiores e inferiores
    if (posicaoBola.y <= 0 || posicaoBola.y >= 380) velocidadeBola.y *= -1;

    // Detecta colisões com jogadores
    if (
        posicaoBola.x <= posicaoJogador1.x + 50 &&
        posicaoBola.x + 20 >= posicaoJogador1.x &&
        posicaoBola.y <= posicaoJogador1.y + 50 &&
        posicaoBola.y + 20 >= posicaoJogador1.y
    ) {
        velocidadeBola.x *= -1;
    }

    if (
        posicaoBola.x <= posicaoJogador2.x + 50 &&
        posicaoBola.x + 20 >= posicaoJogador2.x &&
        posicaoBola.y <= posicaoJogador2.y + 50 &&
        posicaoBola.y + 20 >= posicaoJogador2.y
    ) {
        velocidadeBola.x *= -1;
    }

    // Colisões com as paredes laterais (gol esquerdo e gol direito)
    if (posicaoBola.x <= 0) {
        posicaoBola.x = 0; // Impede a bola de ultrapassar a parede esquerda
        velocidadeBola.x *= -1; // Reflete a bola
    }

    if (posicaoBola.x + bola.offsetWidth >= 800) {
        posicaoBola.x = 800 - bola.offsetWidth; // Impede a bola de ultrapassar a parede direita
        velocidadeBola.x *= -1; // Reflete a bola
    }

    detectarGol();
}

// Variáveis de controle de movimento contínuo
let movimentoJogador1 = { up: false, down: false, left: false, right: false };
let movimentoJogador2 = { up: false, down: false, left: false, right: false };

// Função para mover jogador
function moverJogadores() {
    const velocidadeJogador = 5;

    if (movimentoJogador1.up && posicaoJogador1.y > 0) posicaoJogador1.y -= velocidadeJogador;
    if (movimentoJogador1.down && posicaoJogador1.y < 350) posicaoJogador1.y += velocidadeJogador;
    if (movimentoJogador1.left && posicaoJogador1.x > 0) posicaoJogador1.x -= velocidadeJogador;
    if (movimentoJogador1.right && posicaoJogador1.x < 750) posicaoJogador1.x += velocidadeJogador;

    if (movimentoJogador2.up && posicaoJogador2.y > 0) posicaoJogador2.y -= velocidadeJogador;
    if (movimentoJogador2.down && posicaoJogador2.y < 350) posicaoJogador2.y += velocidadeJogador;
    if (movimentoJogador2.left && posicaoJogador2.x > 0) posicaoJogador2.x -= velocidadeJogador;
    if (movimentoJogador2.right && posicaoJogador2.x < 750) posicaoJogador2.x += velocidadeJogador;
}

// Adiciona controle dos botões
document.getElementById('up1').addEventListener('mousedown', () => movimentoJogador1.up = true);
document.getElementById('down1').addEventListener('mousedown', () => movimentoJogador1.down = true);
document.getElementById('left1').addEventListener('mousedown', () => movimentoJogador1.left = true);
document.getElementById('right1').addEventListener('mousedown', () => movimentoJogador1.right = true);

document.getElementById('up2').addEventListener('mousedown', () => movimentoJogador2.up = true);
document.getElementById('down2').addEventListener('mousedown', () => movimentoJogador2.down = true);
document.getElementById('left2').addEventListener('mousedown', () => movimentoJogador2.left = true);
document.getElementById('right2').addEventListener('mousedown', () => movimentoJogador2.right = true);

// Para a movimentação quando o botão é solto
document.getElementById('up1').addEventListener('mouseup', () => movimentoJogador1.up = false);
document.getElementById('down1').addEventListener('mouseup', () => movimentoJogador1.down = false);
document.getElementById('left1').addEventListener('mouseup', () => movimentoJogador1.left = false);
document.getElementById('right1').addEventListener('mouseup', () => movimentoJogador1.right = false);

document.getElementById('up2').addEventListener('mouseup', () => movimentoJogador2.up = false);
document.getElementById('down2').addEventListener('mouseup', () => movimentoJogador2.down = false);
document.getElementById('left2').addEventListener('mouseup', () => movimentoJogador2.left = false);
document.getElementById('right2').addEventListener('mouseup', () => movimentoJogador2.right = false);

// Eventos de teclado
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') movimentoJogador1.up = true;
    if (event.key === 'ArrowDown') movimentoJogador1.down = true;
    if (event.key === 'ArrowLeft') movimentoJogador1.left = true;
    if (event.key === 'ArrowRight') movimentoJogador1.right = true;

    if (event.key === 'w') movimentoJogador2.up = true;
    if (event.key === 's') movimentoJogador2.down = true;
    if (event.key === 'a') movimentoJogador2.left = true;
    if (event.key === 'd') movimentoJogador2.right = true;
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowUp') movimentoJogador1.up = false;
    if (event.key === 'ArrowDown') movimentoJogador1.down = false;
    if (event.key === 'ArrowLeft') movimentoJogador1.left = false;
    if (event.key === 'ArrowRight') movimentoJogador1.right = false;

    if (event.key === 'w') movimentoJogador2.up = false;
    if (event.key === 's') movimentoJogador2.down = false;
    if (event.key === 'a') movimentoJogador2.left = false;
    if (event.key === 'd') movimentoJogador2.right = false;
});

// Loop principal
function loopJogo() {
    moverJogadores();
    atualizarBola();
    atualizarPosicoes();
    requestAnimationFrame(loopJogo);
}

// Inicia o jogo
loopJogo();
