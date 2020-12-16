const newSecction = document.getElementById("NEW");
const savedSecction = document.getElementById("SAVED");
const helpSecction = document.getElementById("HELP");
const aboutSecction = document.getElementById("ABOUT");
const modal = document.getElementById("modal--section");
const closeModal = document.getElementById("close--modal");
const modalContent = document.getElementById("modal--content");


newSecction.addEventListener("click", openNewSecctionModal);
savedSecction.addEventListener("click", openSavedSecctionModal);
helpSecction.addEventListener("click", openHelpSecctionModal);
aboutSecction.addEventListener("click", openAboutSecctionModal);


function openNewSecctionModal() {
    showModal()
    modalContent.innerHTML = "";
    modalContent.innerHTML = `NEW MODULE`;
}
function openSavedSecctionModal() {
    showModal()
    modalContent.innerHTML = "";
    modalContent.innerHTML = `SAVED SYNTHS`;
}
function openHelpSecctionModal() {
    showModal()
    modalContent.innerHTML = "";
    modalContent.innerHTML = `APP HELP`;
}
function openAboutSecctionModal() {
    showModal()
    modalContent.innerHTML = "";
    modalContent.innerHTML = `ABOUT`;
}


function showModal() {
    removePincipalEventListeners();
    addModalEventListeners();
    modal.classList.toggle("hidden");
}
function hiddeModal(e) {
    if(e.keyCode === 27) {
        removeModalEventListeners();
        addPrincipalEventListeners();
        modal.classList.toggle("hidden");
    } else if(e.target.id === "close--modal") {
        removeModalEventListeners();
        addPrincipalEventListeners();
        modal.classList.toggle("hidden");
    } else if(e.target.id === "modal--section") {
        removeModalEventListeners();
        addPrincipalEventListeners();
        modal.classList.toggle("hidden");
    }
}


function removePincipalEventListeners() {
    newSecction.addEventListener("click", openNewSecctionModal);
    savedSecction.addEventListener("click", openSavedSecctionModal);
    helpSecction.addEventListener("click", openHelpSecctionModal);
    aboutSecction.addEventListener("click", openAboutSecctionModal);
    hamburguerButton.addEventListener("click", showMenu);
}
function removeModalEventListeners() {
    closeModal.removeEventListener("click", hiddeModal);
    window.removeEventListener("keyup", hiddeModal);
    modal.removeEventListener("click", hiddeModal);
}
function addPrincipalEventListeners() {
    newSecction.addEventListener("click", openNewSecctionModal);
    savedSecction.addEventListener("click", openSavedSecctionModal);
    helpSecction.addEventListener("click", openHelpSecctionModal);
    aboutSecction.addEventListener("click", openAboutSecctionModal);
    hamburguerButton.addEventListener("click", showMenu);
}
function addModalEventListeners() {
    closeModal.addEventListener("click", hiddeModal);
    window.addEventListener("keyup", hiddeModal);
    modal.addEventListener("click", hiddeModal);
}
