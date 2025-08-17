
localStorage.removeItem("dificuldade"); // limpar difficulty
var pop = document.querySelector("pop")
var divi = document.querySelector("div")
document.querySelector(".Comecar").addEventListener("click", () => {
    pop.classList.remove("desactive")
    pop.classList.add("active");
    // div 
    divi.classList.remove("active");
    divi.classList.add("desactive");
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
            dificuldadeTexto.innerText = "HHardcore";
            break;
    }

});