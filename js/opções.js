var dificuldade = document.querySelector("[name='dificuldade']");
var dificuldadeTexto = document.querySelector("#dificuldade-texto");

dificuldade.value = localStorage.getItem("dificuldade");
dificuldade.innerText = localStorage.getItem("dificuldade");

document.addEventListener("click", () => {
    sound_fundo_game.play();

    sound_fundo_game.loop = true;
    sound_fundo_game.autoplay = true;
})

dificuldade.addEventListener("change", () => {
    switch (dificuldade.value) {
        case "1":
            localStorage.setItem("dificuldade", 0.01);
            dificuldadeTexto.innerText = "Fácil";
            break;
        case "2":
            localStorage.setItem("dificuldade", 0.02);
            dificuldadeTexto.innerText = "Média";
            break;

        case "3":
            localStorage.setItem("dificuldade", 0.03);
            dificuldadeTexto.innerText = "Difícil";
            break;

        case "4":
            localStorage.setItem("dificuldade", 0.04);
            dificuldadeTexto.innerText = "Hardcore";
            break;
        default:
            localStorage.setItem("dificuldade", 0.02);
            dificuldadeTexto.innerText = "Média";
    }

});

