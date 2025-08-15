const { Engine, Runner, Bodies, World, Body, Events } = Matter;

var puedeShot = Boolean();
const engine = Engine.create();
const world = engine.world;

// Configuración del canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var valor = Number();

const enemiges = [];
var max = 0.01;

// Iniciar motor
const runner = Runner.create();
Runner.run(runner, engine);
engine.world.gravity.y = 0;
//engine.world.gravity.x = 0;

// jugador
var force = 3;

const player = Bodies.rectangle(640, 360, 50, 50, {
    friction: 1, // deslizamiento contra objetos
    frictionAir: 0.1, //deslizamiento en el aire
    //frictionStatic: 0.5, // deslizamiento evitado ?
    density: 0.5,
});
World.add(world, [player]);

// Movimiento horizontal
const keys = {};
document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

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
var finRay = 0;
var comienzoRay = 0;
// Actualizar
Events.on(engine, "beforeUpdate", () => {

    // disparo
    comienzoRay = { x: player.position.x, y: player.position.y }
    finRay = { x: player.position.x, y: player.position.y - 1000 }

    if (puedeShot) {
        var rayo = Matter.Query.ray(enemiges, comienzoRay, finRay, 1)
        document.querySelector("h1").innerText = rayo.length;
        rayo.forEach(none => {
            // eliminar enemigo
            World.remove(world, none);
        })
        console.log(rayo.length);
    }
    if (keys["a"] || keys["ArrowLeft"]) Body.setVelocity(player, { x: -force, y: 0 });
    if (keys["d"] || keys["ArrowRight"]) Body.setVelocity(player, { x: +force, y: 0 });
    if (keys["w"] || keys["ArrowUp"]) Body.setVelocity(player, { x: 0, y: -force });
    if (keys["s"] || keys["ArrowDown"]) Body.setVelocity(player, { x: 0, y: +force });

    if (Math.random() <= max) {

        // enemigo
        var enemy = Bodies.rectangle(0, 0, 50, 50, {
            friction: 1,
            density: 2,
        })
        valor = Math.floor(Math.random() * 1280);
        Body.setPosition(enemy, { x: valor, y: enemy.position.y })
        World.add(world, enemy);

        enemiges.push(enemy);
        console.log("enemy")
    }
    enemiges.forEach(sim => {
        Body.setVelocity(sim, { x: 0, y: 4 })
    })

});
// Dibujar
(function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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