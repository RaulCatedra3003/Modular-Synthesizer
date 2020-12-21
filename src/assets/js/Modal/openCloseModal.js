export { showModal, removeModalEventListeners, addPrincipalEventListeners };

import {openNewSecctionModal} from "./menuModals/newModuleModal.js";
import {openSavedSecctionModal} from "./menuModals/savedModal.js";
import {openHelpSecctionModal} from "./menuModals/helpModal.js";
import {openAboutSecctionModal} from "./menuModals/aboutModal.js";
import {showMenu} from "../Menu/responsiveMenu.js";
import {createModule} from "../Modules/createModule.js";
import {clearMainContent} from "../buttons/clear.js";
import {changeOscilatorPropertyes, hiddeOscilatorModal} from "./modulesModals/oscilatorModal.js";
import {changeAudioOutputPropertyes, hiddeAudioOutputModal} from "./modulesModals/audioOutputModal.js";
import {changePotenciometerPropertyes, hiddePotenciometerModal} from "./modulesModals/potenciometerModal.js";


const modal = document.getElementById("modal--section");
const closeModal = document.getElementById("close--modal");
const newSecction = document.getElementById("NEW");
const savedSecction = document.getElementById("SAVED");
const helpSecction = document.getElementById("HELP");
const aboutSecction = document.getElementById("ABOUT");
const clearButton = document.getElementById("clear");


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

function addPrincipalEventListeners() {
    newSecction.addEventListener("click", openNewSecctionModal);
    savedSecction.addEventListener("click", openSavedSecctionModal);
    helpSecction.addEventListener("click", openHelpSecctionModal);
    aboutSecction.addEventListener("click", openAboutSecctionModal);
    hamburguerButton.addEventListener("click", showMenu);
    clearButton.addEventListener("click", clearMainContent);
}

function removePincipalEventListeners() {
    newSecction.removeEventListener("click", openNewSecctionModal);
    savedSecction.removeEventListener("click", openSavedSecctionModal);
    helpSecction.removeEventListener("click", openHelpSecctionModal);
    aboutSecction.removeEventListener("click", openAboutSecctionModal);
    hamburguerButton.removeEventListener("click", showMenu);
    clearButton.removeEventListener("click", clearMainContent);
}


function addModalEventListeners() {
    closeModal.addEventListener("click", hiddeModal);
    window.addEventListener("keyup", hiddeModal);
    modal.addEventListener("click", hiddeModal);
}

function removeModalEventListeners(openModal) {
    closeModal.removeEventListener("click", hiddeModal);
    window.removeEventListener("keyup", hiddeModal);
    modal.removeEventListener("click", hiddeModal);
    const save = document.getElementById("save");
    const cancel = document.getElementById("cancel");
    if(openModal === "menuModules") {
        const modulesTypes = document.querySelectorAll(".modules--type");
        modulesTypes.forEach(e => {
            e.removeEventListener("click", createModule);
        });
    } else if(openModal === "modulesModalOscilator") {
        save.removeEventListener("click", changeOscilatorPropertyes);
        cancel.removeEventListener("click", hiddeOscilatorModal);
    } else if(openModal === "modulesModalAudioOutout") {
        save.addEventListener("click", changeAudioOutputPropertyes);
        cancel.addEventListener("click", hiddeAudioOutputModal);
    } else if(openModal === "modulesModalPotenciometer") {
        save.addEventListener("click", changePotenciometerPropertyes);
        cancel.addEventListener("click", hiddePotenciometerModal);
    }
}
