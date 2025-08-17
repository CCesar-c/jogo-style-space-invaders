
const { Engine, Runner, Bodies, World, Body, Events } = Matter;


// Iniciar motor
const runner = Runner.create();
const engine = Engine.create();
const world = engine.world;

Runner.run(runner, engine);
engine.world.gravity.y = 0;


// Configuración del canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var valor = Number();
var mortes = 0; // contador de muertes

const enemiges = [];

// dificuldade
var max = parseFloat(localStorage.getItem("dificuldade")) || 0.02;
alert(localStorage.getItem("dificuldade"));

//4 paredes
const paredAbaixo = Bodies.rectangle(640, 695, 1280, 50, { isStatic: true, label: "paredAbaixo" });
const paredEsquerda = Bodies.rectangle(25, 360, 50, 720, { isStatic: true });
const paredDireita = Bodies.rectangle(1255, 360, 50, 720, { isStatic: true });
World.add(world, [paredAbaixo, paredEsquerda, paredDireita]);

// jugador
var force = 3;
const player = Bodies.rectangle(640, 360, 50, 50, {
    friction: 1, // deslizamiento contra objetos
    frictionAir: 0.1, //deslizamiento en el aire
    //frictionStatic: 0.5, // deslizamiento evitado ?
    density: 0.5,
    label: "player",
});
World.add(world, [player]);

// entrar colisión el enemy con la pared y eliminarlo
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
            // Aquí puedes agregar la lógica para finalizar el juego
        } else if (boda.label == "enemy" && bodb.label == "player") {
            console.log("perdiste el juego");
            World.remove(world, bodb);
            // parar el tiempo de juego
            document.querySelector("[name='game-over']").classList.remove("desactive");
            document.querySelector("[name='game-over']").classList.add("active");
            player.label = "muerto";
        }

        if (boda.label == "enemy" && bodb.label == "paredAbaixo") {
            // eliminar enemigo del mundo
            console.log("enemigo eliminado");
            World.remove(world, boda);
            // eliminar enemigo del array
            const index = enemiges.indexOf(boda);
            if (index >= 0) {
                enemiges.splice(index, 1);
            }
        } else if (boda.label == "paredAbaixo" && bodb.label == "enemy") {
            // eliminar enemigo del mundo
            console.log("enemigo eliminado");
            World.remove(world, bodb);
            // eliminar enemigo del array
            const index = enemiges.indexOf(bodb);
            if (index >= 0) {
                enemiges.splice(index, 1);
            }
        }
    })
});

// Movimiento horizontal
const keys = {};
document.addEventListener("keydown", (e) => {
    keys[e.key] = true
});
document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

// disparos
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
var finRay = { x: 0, y: 0 };
var comienzoRay = { x: 0, y: 0 };
var puedeShot = false;
// Actualizar
Events.on(engine, "beforeUpdate", () => {
    // Reiniciar el juego
    if (keys["r"] && player.label == "muerto") {
        console.log("reiniciar juego");
        window.location.href = "game.html"; // reiniciar el juego
    } else if (keys["q"] && player.label == "muerto") {
        console.log("salir del juego");
        window.location.href = "/home/chopito/Documents/jogo-style-space-invaders/index.html"; // redirigir al inicio del juego
    }

    // movimiento del jugador
    if (keys["a"] || keys["ArrowLeft"]) { Body.setVelocity(player, { x: -force, y: 0 }); }
    if (keys["d"] || keys["ArrowRight"]) { Body.setVelocity(player, { x: +force, y: 0 }); }
    if (keys["w"] || keys["ArrowUp"]) { Body.setVelocity(player, { x: 0, y: -force }); }
    if (keys["s"] || keys["ArrowDown"]) { Body.setVelocity(player, { x: 0, y: +force }); }

    var contador_interno =  Number();
    switch (contador_interno) {
        case 50:
            max += 0.01;
            console.log("max");
            contador_interno = 0;
            break;
    }
    document.querySelector("h1").innerText = `score: ${mortes}`;

    // disparo
    comienzoRay = { x: player.position.x, y: player.position.y }
    finRay = { x: player.position.x, y: player.position.y - 500 }

    if (puedeShot && player.label != "muerto") {
        var rayo = Matter.Query.ray(enemiges, comienzoRay, finRay, 1)
        rayo.forEach(none => {
            none = none.body; // asegurarse de que none es un cuerpo
            // encontrar el índice del enemigo en el array
            // none.body es el cuerpo del enemigo
            const indicador = enemiges.indexOf(none);
            // si lo encuentra
            if (indicador >= 0) {
                // eliminarlo del array
                enemiges.splice(indicador, 1);
                // eliminarlo del mundo
                World.remove(world, none);
                mortes++;
                contador_interno++
            }
        })
        setTimeout(() => {
            puedeShot = false; // desactivar el disparo después de un tiempo
        }, 100); // 100 ms de espera antes de permitir otro disparo
    }

    if (Math.random() <= max) {

        // enemigo
        var enemy = Bodies.rectangle(0, 0, 50, 50, {
            friction: 1,
            density: 2,
            label: "enemy",
        })
        valor = Math.floor(Math.random() * 1280);
        Body.setPosition(enemy, { x: valor, y: enemy.position.y })

        World.add(world, enemy);
        enemiges.push(enemy);// añadir enemigo al array
    }
    enemiges.forEach(sim => {
        Body.setVelocity(sim, { x: 0, y: 4 })
    })

});

// Dibujar
(function draw() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // Dibuja paredes
    ctx.fillStyle = "white";
    var arrayParedes = [paredAbaixo, paredEsquerda, paredDireita];
    arrayParedes.forEach(pare => {
        ctx.fillRect(pare.position.x - pare.width / 2, pare.position.y - pare.height / 2, pare.width, pare.height);
    });

    // Desenha inimigo
    ctx.fillStyle = "red";
    enemiges.forEach(none => {
        ctx.fillRect(none.position.x - 25, none.position.y - 25, 50, 50);
    })

    // Desenha jogador
    ctx.fillStyle = "blue";
    ctx.fillRect(player.position.x - 25, player.position.y - 25, 50, 50);

    // Dibuja rayo
    if (puedeShot) {
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(comienzoRay.x, comienzoRay.y);
        ctx.lineTo(finRay.x, finRay.y);
        ctx.stroke();
    }
    requestAnimationFrame(draw);
})();