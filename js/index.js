fetch('/pontos_receber')
.then(response => parseInt(response.text()))
.then(result => {
    document.querySelector(".pontos").innerText = result;
});
document.addEventListener("click", () =>{
    var musica = document.querySelector("audio");
    musica.loop = true;
    musica.autoplay = true;
    musica.play();
});