import "../css/styles.css"

import {showMenu} from "./Menu/responsiveMenu.js";
import {openNewSecctionModal} from "./Modal/menuModals/newModuleModal.js";
import {openSavedSecctionModal} from "./Modal/menuModals/savedModal.js";
import {openHelpSecctionModal} from "./Modal/menuModals/helpModal.js";
import {openAboutSecctionModal} from "./Modal/menuModals/aboutModal.js";


const hamburguerButton = document.getElementById("hamburguerButton");
const newSecction = document.getElementById("NEW");
const savedSecction = document.getElementById("SAVED");
const helpSecction = document.getElementById("HELP");
const aboutSecction = document.getElementById("ABOUT");


hamburguerButton.addEventListener("click", showMenu);
newSecction.addEventListener("click", openNewSecctionModal);
savedSecction.addEventListener("click", openSavedSecctionModal);
helpSecction.addEventListener("click", openHelpSecctionModal);
aboutSecction.addEventListener("click", openAboutSecctionModal);