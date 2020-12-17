export { showMenu };

const navList = document.querySelector(".nav--list");

function showMenu(){
    navList.classList.toggle("show");
}