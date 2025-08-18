
document.addEventListener("click", () =>{
    var musica = document.querySelector("audio");
    musica.volume = localStorage.getItem("som") || 0.5;
    musica.loop = true;
    musica.autoplay = true;
    musica.play();
