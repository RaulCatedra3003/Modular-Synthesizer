import "../css/styles.css";
import "../css/modals.css";
import "../css/audioModules.css";

import {showMenu} from "./Menu/responsiveMenu.js";
import {openNewSecctionModal} from "./Modal/menuModals/newModuleModal.js";
import {openSavedSecctionModal} from "./Modal/menuModals/savedModal.js";
import {openHelpSecctionModal} from "./Modal/menuModals/helpModal.js";
import {openAboutSecctionModal} from "./Modal/menuModals/aboutModal.js";
import {clearMainContent} from "./buttons/clear.js";
import {startSound} from "./synth/synthesizer.js";
import {saveSynth} from "./buttons/save.js";


const hamburguerButton = document.getElementById("hamburguerButton");
const newSecction = document.getElementById("NEW");
const savedSecction = document.getElementById("SAVED");
const helpSecction = document.getElementById("HELP");
const aboutSecction = document.getElementById("ABOUT");
const clearButton = document.getElementById("clear");
const playButton = document.getElementById("play");
const saveButton = document.getElementById("save");


hamburguerButton.addEventListener("click", showMenu);
newSecction.addEventListener("click", openNewSecctionModal);
savedSecction.addEventListener("click", openSavedSecctionModal);
helpSecction.addEventListener("click", openHelpSecctionModal);
aboutSecction.addEventListener("click", openAboutSecctionModal);
clearButton.addEventListener("click", clearMainContent);
playButton.addEventListener("click", startSound);
saveButton.addEventListener("click", saveSynth);