function atualizarPontos() {
    fetch('/pontos_receber')
    .then(response => response.text())
    .then(result => {
        document.querySelector(".pontos").innerText = result;
        console.log("Pontos atualizados: " + result);
    })
}

setInterval(atualizarPontos, 1000);

document.addEventListener("click", () =>{
    var musica = document.querySelector("audio");
    musica.loop = true;
    musica.autoplay = true;
    musica.play();
});