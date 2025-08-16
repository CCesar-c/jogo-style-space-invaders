const { Engine, Runner, Bodies, World, Body, Events, Query } = Matter;

var points = 0;

// Controle do disparo
let canShoot = false;

// Criação do motor e do mundo
const engine = Engine.create();
const world = engine.world;

// Configuração do canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variáveis globais
let randomX = Number();
const enemies = [];
let spawnProbability = 0.01;

// Inicia o motor
const runner = Runner.create();
Runner.run(runner, engine);

// Desativa a gravidade
engine.world.gravity.y = 0;

// Força de movimento do jogador
const playerSpeed = 5;

// Criação do jogador
const player = Bodies.rectangle(640, 360, 50, 50, {
    friction: 1,
    frictionAir: 0.1,
    density: 0.5,
});
World.add(world, [player]);

// Controle de teclas pressionadas
const keys = {};
document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

// Detecta disparo (barra de espaço)
document.addEventListener("keydown", (event) => {
    if (event.key === " ") {
        canShoot = true;
    }
});
document.addEventListener("keyup", (event) => {
    if (event.key === " ") {
        canShoot = false;
    }
});

// Pontos de início e fim do raio do disparo
let rayStart = { x: 0, y: 0 };
let rayEnd = { x: 0, y: 0 };

// Atualização da lógica do jogo
Events.on(engine, "beforeUpdate", () => {

    // Define o raio do disparo (linha reta para cima)
    rayStart = { x: player.position.x, y: player.position.y };
    rayEnd = { x: player.position.x, y: player.position.y - 1000 };

    // Verifica se o jogador está atirando
    if (canShoot) {
        // Realiza a detecção de colisão com o raio
        const rayHits = Query.ray(enemies, rayStart, rayEnd, 1);
        
        // Remove inimigos atingidos
        rayHits.forEach(hit => {
            World.remove(world, hit.body);
            const index = enemies.indexOf(hit.body);
            if (index !== -1) enemies.splice(index, 1);
            points += 1; // Incrementa os pontos
            document.querySelector("h1").innerText = `Pontos: ${points}`;
        });
    }

    // Movimento do jogador baseado nas teclas
    if (keys["a"] || keys["ArrowLeft"]) Body.setVelocity(player, { x: -playerSpeed, y: 0 });
    if (keys["d"] || keys["ArrowRight"]) Body.setVelocity(player, { x: +playerSpeed, y: 0 });
    if (keys["w"] || keys["ArrowUp"]) Body.setVelocity(player, { x: 0, y: -playerSpeed });
    if (keys["s"] || keys["ArrowDown"]) Body.setVelocity(player, { x: 0, y: +playerSpeed });

    // Geração aleatória de inimigos
    if (Math.random() <= spawnProbability) {
        const enemy = Bodies.rectangle(0, 0, 50, 50, {
            friction: 1,
            density: 2,
        });

        // Define posição horizontal aleatória
        randomX = Math.floor(Math.random() * 1280);
        Body.setPosition(enemy, { x: randomX, y: enemy.position.y });

        World.add(world, enemy);
        enemies.push(enemy);

        console.log("enemy spawned");
    }

    // Move os inimigos para baixo e verifica colisão com o player
    enemies.forEach((enemy, i) => {
        Body.setVelocity(enemy, { x: 0, y: 2 });

        // Verifica colisão simples entre player e inimigo
        const dx = Math.abs(enemy.position.x - player.position.x);
        const dy = Math.abs(enemy.position.y - player.position.y);
        if (dx <= 51 && dy <= 51) {
            World.remove(world, enemy);
            enemies.splice(i, 1);
            points += 1; // Incrementa os pontos
            document.querySelector("h1").innerText = `Pontos: ${points}`;

        }
    });
});

// Loop de desenho
(function draw() {
    // Limpa a tela
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // Desenha os inimigos
    ctx.fillStyle = "red";
    enemies.forEach(enemy => {
        ctx.fillRect(enemy.position.x - 25, enemy.position.y - 25, 50, 50);
    });

    // Desenha o jogador
    ctx.fillStyle = "blue";
    ctx.fillRect(player.position.x - 25, player.position.y - 25, 50, 50);

    // Desenha o raio do disparo
    if (canShoot) {
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(rayStart.x, rayStart.y);
        ctx.lineTo(rayEnd.x, rayEnd.y);
        ctx.stroke();
    }

    requestAnimationFrame(draw);
})();
