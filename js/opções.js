var sound_fundo_game = new Audio("assets/musica-fundo.mp3");

var som = document.querySelector("[name='sound']");
var somTexto = document.querySelector("#volume-texto");

var dificuldade = document.querySelector("[name='dificuldade']");
var dificuldadeTexto = document.querySelector("#dificuldade-texto");

dificuldade.value = parseInt(localStorage.getItem("dificuldade"));
dificuldade.innerText = localStorage.getItem("dificuldade");

som.value = parseInt(localStorage.getItem("som")) *100;
somTexto.innerText = parseInt(localStorage.getItem("som"));

sound_fundo_game.volume = parseInt(localStorage.getItem("som"));
document.addEventListener("click", () => {
    sound_fundo_game.play();

    sound_fundo_game.loop = true;
    sound_fundo_game.autoplay = true;
})

som.addEventListener("change", () => {
    switch (som.value) {
        case 0:
            somTexto.innerText = "Mute";
            localStorage.setItem("som", 0);
            break;
        case 100:
            somTexto.innerText = "Ao maximo, tem certeza?";
            localStorage.setItem("som", 1);
            break;
        default:
            somTexto.innerText = som.value;
            localStorage.setItem("som", som.value);
            break;
    }
})



dificuldade.addEventListener("change", () => {
    switch (dificuldade.value) {
        case 1:
            localStorage.setItem("dificuldade", 0.01);
            dificuldadeTexto.innerText = "Fácil";
            break;
        case 2:
            localStorage.setItem("dificuldade", 0.02);
            dificuldadeTexto.innerText = "Média";
            break;

        case 3:
            localStorage.setItem("dificuldade", 0.03);
            dificuldadeTexto.innerText = "Difícil";
            break;

        case 4:
            localStorage.setItem("dificuldade", 0.04);
            dificuldadeTexto.innerText = "Hardcore";
            break;

    }

});

