const hamburguerButton = document.getElementById("hamburguerButton");
const navList = document.querySelector(".nav--list");

hamburguerButton.addEventListener("click", showMenu);


function showMenu(){
    navList.classList.toggle("show");
}