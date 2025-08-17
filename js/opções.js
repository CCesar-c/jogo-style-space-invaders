
// Controle de volume
const musica = document.getElementById("musica");
const volumeInput = document.getElementById("volume");
const volumeValor = document.getElementById("volume-valor");

// Carrega o volume salvo (se existir)
const volumeSalvo = localStorage.getItem("volumeMusica");
if (volumeSalvo !== null) {
    volumeInput.value = volumeSalvo;
    musica.volume = volumeSalvo;
    volumeValor.innerText = volumeSalvo;
} else {
    musica.volume = volumeInput.value;
    volumeValor.innerText = volumeInput.value;
}

// Atualiza o volume, o texto e salva no localStorage ao mover o slider
volumeInput.addEventListener("input", () => {
    musica.volume = volumeInput.value;
    volumeValor.innerText = volumeInput.value;
    localStorage.setItem("volumeMusica", volumeInput.value);
});

// Garante que o som toque ao clicar (caso autoplay seja bloqueado)
document.addEventListener("click", () =>{
    musica.play();
});
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