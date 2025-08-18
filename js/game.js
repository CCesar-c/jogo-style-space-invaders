document
const { Engine, Runner, Bodies, World, Body, Events } = Matter;


// Inicia o motor
const runner = Runner.create();
const engine = Engine.create();
const world = engine.world;

Runner.run(runner, engine);
engine.world.gravity.y = 0;

// Configuração do canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

var valor = Number();
var mortes = 0; // contador de mortes
const enemiges = [];

// Progressão de dificuldade
var max = parseFloat(localStorage.getItem("dificuldade")) || 0.5;
var enemySpeed = 2;
function aumentarDificuldade() {
    // Aumenta a dificuldade a cada 10 mortes, até um limite
    if (mortes > 0 && mortes % 10 == 0) {
        if (max < 0.2) {
            max += 0.005;
            if (max > 0.2) max = 0.2;
            console.log(`Dificuldade aumentada! max = ${max.toFixed(3)}`);
        }
        // Aumenta a velocidade dos inimigos até um limite
        if (enemySpeed < 10) {
            enemySpeed += 0.5;
            if (enemySpeed > 10) enemySpeed = 10;
            console.log(`Velocidade dos inimigos: ${enemySpeed}`);
        }
    }
}

// Dificuldade


//4 paredes
const sprite_pared = new Image();
sprite_pared.src = "assets/pared.png";

const paredAbaixo = Bodies.rectangle(640, 695, 1280, 50, { isStatic: true, label: "paredAbaixo" });
paredAbaixo.width = 1280;
paredAbaixo.height = 50;

const paredEsquerda = Bodies.rectangle(25, 360, 50, 720, { isStatic: true });
paredEsquerda.width = 50;
paredEsquerda.height = 720;

const paredDireita = Bodies.rectangle(1255, 360, 50, 720, { isStatic: true });
paredDireita.width = 50;
paredDireita.height = 720;

World.add(world, [paredAbaixo, paredEsquerda, paredDireita]);
// enemygo dibujo
const sprite_enemy = new Image();
sprite_enemy.src = "assets/enemy.png";


// jugador
const sprite_player = new Image();
sprite_player.src = "assets/sprite-player.png";

var force = 5;

const player = Bodies.rectangle(640, 360, 50, 50, {
    friction: 1, // atrito contra objetos
    frictionAir: 0.1, // atrito no ar
    //frictionStatic: 0.5, // atrito estático evitado ?
    density: 0.5,
    label: "player",
});
World.add(world, [player]);

// Detecta colisão do inimigo com a parede e remove
Events.on(engine, "collisionStart", (event) => {
    event.pairs.forEach(pair => {
        let boda = pair.bodyA;
        let bodb = pair.bodyB;

        if (boda.label == "player" && bodb.label == "enemy") {
            console.log("perdiste el juego");
            document.querySelector("[name='game-over']").classList.remove("desactive");
            document.querySelector("[name='game-over']").classList.add("active");
            player.label = "muerto";
            World.remove(world, boda);
            document.querySelector("h2").innerText = "VOCE PERDEU \n" + " Pressione R para reiniciar OU Pressione Q para sair";
            // Aqui você pode adicionar a lógica para finalizar o jogo
        } else if (boda.label == "enemy" && bodb.label == "player") {
            console.log("perdiste el juego");
            World.remove(world, bodb);
            // parar o tempo do jogo
            document.querySelector("[name='game-over']").classList.remove("desactive");
            document.querySelector("[name='game-over']").classList.add("active");
            player.label = "muerto";

        }

        if (boda.label == "enemy" && bodb.label == "paredAbaixo") {
            // remover inimigo do mundo
            console.log("enemigo eliminado");
            World.remove(world, boda);
            // remover inimigo do array
            const index = enemiges.indexOf(boda);
            if (index >= 0) {
                enemiges.splice(index, 1);
            }
        } else if (boda.label == "paredAbaixo" && bodb.label == "enemy") {
            // remover inimigo do mundo
            console.log("enemigo eliminado");
            World.remove(world, bodb);
            // remover inimigo do array
            const index = enemiges.indexOf(bodb);
            if (index >= 0) {
                enemiges.splice(index, 1);
            }
        }
    })
});

// Movimento horizontal
const keys = {};
document.addEventListener("keydown", (e) => {
    keys[e.key] = true
});
document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});


// disparos
var sound_shot = new Audio("assets/laser-312360.mp3");
var sound_fundo_game = new Audio("assets/fundo-gameplay.mp3");


document.addEventListener("mousedown", (event) => {
    if (event.button == 0) {
        puedeShot = true;
    }
})
document.addEventListener("mouseup", (event) => {
    if (event.button == 0) {
        puedeShot = false;
    }
})
// Disparos com espaço
document.addEventListener("keydown", (event) => {
    if (event.key == " ") {
        puedeShot = true;
    }
})
document.addEventListener("keyup", (event) => {
    if (event.key == " ") {
        puedeShot = false;
    }
})

document.addEventListener("keydown", (e) => { keys[e.key] = true;})
document.addEventListener("keyup", (e) => { keys[e.key] = false; })

var finRay = { x: 0, y: 0 };
var comienzoRay = { x: 0, y: 0 };
var puedeShot = false;
// Atualização

Events.on(engine, "beforeUpdate", () => {
    if (player && player.label != "muerto") {
        if (sound_fundo_game && sound_fundo_game.paused) {
            sound_fundo_game.loop = true;

            sound_fundo_game.play().catch(err => {
                console.warn("⚠️ No se pudo reproducir el sonido (esperando interacción):", err);
            });
        }
    } else {
        sound_fundo_game.pause();
    }
    // Reiniciar o jogo
    if (keys["r"] && player.label == "muerto") {
        console.log("reiniciar juego");
        window.location.href = "game.html"; // reiniciar o jogo
    } else if (keys["q"] && player.label == "muerto") {
        console.log("salir del juego");
        window.location.href = "index.html"; // voltar para o início do jogo
    }

    // Movimento do jogador
    if (keys["a"] || keys["ArrowLeft"]) { Body.setVelocity(player, { x: -force, y: 0 }); }
    if (keys["d"] || keys["ArrowRight"]) { Body.setVelocity(player, { x: +force, y: 0 }); }
    if (keys["w"] || keys["ArrowUp"]) { Body.setVelocity(player, { x: 0, y: -force }); }
    if (keys["s"] || keys["ArrowDown"]) { Body.setVelocity(player, { x: 0, y: +force }); }

var todo = max * 100;
    document.querySelector("h1").innerText = `Pontos: ${mortes} 
    Dificuldade: ${todo.toFixed(1)}`;

    // Disparo
    comienzoRay = { x: player.position.x, y: player.position.y }
    finRay = { x: player.position.x, y: player.position.y - 500 }

    if (puedeShot && player.label != "muerto") {
        var rayo = Matter.Query.ray(enemiges, comienzoRay, finRay, 1)
        sound_shot.currentTime = 0; // Reinicia o som no início
        sound_shot.play();

        rayo.forEach(none => {
            none = none.body; // garantir que none é um corpo
            // encontrar o índice do inimigo no array
            // none.body é o corpo do inimigo
            const indicador = enemiges.indexOf(none);
            // si lo encuentra
            if (indicador >= 0) {
                // remover do array
                enemiges.splice(indicador, 1);
                // remover do mundo
                World.remove(world, none);
                mortes++;
                aumentarDificuldade();
            }
        })
        setTimeout(() => {
            puedeShot = false; // desativar o disparo após um tempo
        }, 0); // 100 ms de espera antes de permitir outro disparo
    }

    if (Math.random() <= max) {
        // inimigo
        var enemy = Bodies.rectangle(0, 0, 50, 50, {
            friction: 1,
            density: 2,
            label: "enemy",
        })
        valor = Math.floor(Math.random() * 1280);
        Body.setPosition(enemy, { x: valor, y: enemy.position.y })

        World.add(world, enemy);
        enemiges.push(enemy);// adicionar inimigo ao array
    }
    enemiges.forEach(sim => {
        Body.setVelocity(sim, { x: 0, y: enemySpeed })
    });
});


// Dibujar

(function draw() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // Dibuja paredes
    var arrayParedes = [paredAbaixo, paredEsquerda, paredDireita];
    arrayParedes.forEach(pare => {
        ctx.drawImage(sprite_pared, pare.position.x - pare.width / 2, pare.position.y - pare.height / 2, pare.width, pare.height);
    });


    // Desenha inimigo

    enemiges.forEach(none => {
        ctx.drawImage(sprite_enemy, none.position.x - 25, none.position.y - 25, 50, 50);
    })

    // Desenha jogador
    ctx.drawImage(sprite_player, player.position.x - 25, player.position.y - 25, 50, 50);

    // Desenha raio
    if (puedeShot) {
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(comienzoRay.x, comienzoRay.y);
        ctx.lineTo(finRay.x, finRay.y);
        ctx.stroke();
    }
    requestAnimationFrame(draw);
})();