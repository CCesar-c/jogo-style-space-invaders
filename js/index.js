
document.addEventListener("click", () =>{
    var musica = document.querySelector("audio");
    musica.loop = true;
    musica.autoplay = true;
    musica.play();
});