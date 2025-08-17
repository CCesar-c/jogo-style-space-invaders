
document.addEventListener("click", () =>{
    var musica = document.querySelector("audio");
    musica.play();
})
document.addEventListener("DOMContentLoaded", () => {
    const musica = document.getElementById("musica");

    const volumeSalvo = localStorage.getItem("volumeMusica");

    if (volumeSalvo !== null) {
        musica.volume = parseFloat(volumeSalvo);
    } else {
        musica.volume = 0.5; // valor padrão caso não tenha nenhum salvo
    }

    // Garante que a música toque (autoplay pode ser bloqueado)
    document.addEventListener("click", () => {
        musica.play().catch(err => {
            console.warn("Autoplay bloqueado. Clique para iniciar a música.");
        });
    });
});

var pop = document.querySelector("pop")
var divi = document.querySelector("div")
document.querySelector(".Comecar").addEventListener("click", () => {
   window.location.href = 'game.html'
})
document.querySelector(".Opções").addEventListener("click", () => {
    window.location.href = 'Opções.html'
})

var dificuldade = document.querySelector("[name='dificuldade']");

var dificuldadeTexto = document.querySelector("#dificuldade-texto");

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
    }

});